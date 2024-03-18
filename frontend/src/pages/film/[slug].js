import { fetcher } from "../../lib/api"    
import Layout from "@/components/Layout";

export default function Film ({film}){
    console.log(film)
    return (
        <Layout>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            {film?.attributes.title}
          </span>
        </h1>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`);
    const data = await res.json();
    const paths = data.data.map((post) => ({
        params: { slug: post.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}){
    const { slug } = params;
    

    const filmResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films/?filters[slug][$eq]=${slug}&populate=*`);

    const get_film = await filmResponse.json();
    const current_film = get_film.data[0];

    return {
        props: {
            film: current_film 
        }
    }
}