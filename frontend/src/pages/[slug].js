import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from "../lib/auth";
import { useFetchUser } from "../lib/authContext";
import markdownToHtml from "@/lib/markdownToHtml";

const Film = ({ film, jwt, plot, error }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const [review, setReview] = useState({
    value: "",
  });

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = getTokenFromLocalCookie();

    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: await getUserFromLocalCookie(),
            film: film.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error("error with request", error);
    }
  };

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  } else {
    return (
      <Layout user={user}>
        <h1 className="text-4xl font-extrabold leading-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            {film.attributes.title}
          </span>
        </h1>
        <p>
          Directed by{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            {film.attributes.director}
          </span>
        </p>
        <h2 className="text-3xl font-extrabold leading-tighter mb-5 mt-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            Plot
          </span>
        </h2>
        <div
          className="tracking-wide font-normal text-sm space-y-3 mb-10"
          dangerouslySetInnerHTML={{ __html: plot }}
        ></div>
        {user && (
          <>
            <h2 className="text-3xl font-extrabold leading-tighter mb-5 mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2 mb-5">
                Reviews
              </span>
              <form onSubmit={handleSubmit} className="my-4">
                <textarea
                  className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-teal-400 focus:outline-none"
                  rows="4"
                  value={review.value}
                  onChange={handleChange}
                  placeholder="Add your review"
                ></textarea>
                <button
                  className="py-3 px-10 rounded bg-purple-200 text-sm"
                  type="submit"
                >
                  Add Review
                </button>
              </form>
            </h2>
            <ul>
              {film.attributes.reviews.length === 0 && (
                <span>No reviews yet</span>
              )}
              {film.attributes.reviews &&
                film.attributes.reviews.data.map((review) => {
                  return (
                    <li key={review.id} className="text-md">
                      <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {review.attributes.reviewer} 
                      </span> said &quot;{review.attributes.review}&quot;
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </Layout>
    );
  }
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);

  const filmResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films/?filters[slug][$eq]=${slug}&populate=*`
  );

  const get_film = await filmResponse.json();
  const current_film = get_film.data[0];

  if (current_film) {
    const plot = await markdownToHtml(current_film.attributes.plot);
    return {
      props: {
        film: current_film,
        plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: current_film.error.message,
      },
    };
  }
}

export default Film;
