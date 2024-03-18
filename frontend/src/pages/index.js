import { useState } from "react";
import Layout from "@/components/Layout";
import Films from "@/components/Films";
import { fetcher } from "../lib/api";
import useSWR from "swr";
import { useFetchUser } from "@/lib/authContext";

export default function FilmsPage({ films }) {
  const {user, loading} = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=3`,
    fetcher,
    {
      fallbackData: films,
    }
  );
  return (
    <Layout user={user}>
      <h1 className="text-5xl font-extrabold leading-tighter mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Films
        </span>
      </h1>
      <Films films={data} />

      <div className="space-x-2 space-y-2 mt-8">
        <button
          className={`text-black text-white px-6 py-2  text-sm ${
            pageIndex === 1 ? "bg-gray-300" : "bg-blue-400"
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta?.pagination?.pageCount
        }`}</span>
        <button
          className={`text-black text-white px-6 py-2 text-sm ${
            pageIndex === (data && data.meta?.pagination?.pageCount)
              ? "bg-gray-300"
              : "bg-blue-400"
          }`}
          disabled={pageIndex === (data && data.meta?.pagination?.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=3`
  );

  return {
    props: {
      films: filmsResponse,
    },
  };
}
