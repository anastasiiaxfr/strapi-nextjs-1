import Head from "next/head";
import Nav from "@/components/Nav";

const Layout = ({children}) => (
  <>
    <Head>
        <title>
            film database            
        </title>
    </Head>
    <Nav />
    <main className="px-4">
    <div
      className="
          flex 
          justify-center
          items-center
          w-full
          mx-auto
          w-2/4
          my-16
          p-16
          bg-white
          rounded-lg">
            <div className="text-2xl font-medium">
                {children}
            </div>
        </div>
    </main>
  </>
);

export default Layout