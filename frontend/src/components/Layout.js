import Head from "next/head";
import Nav from "@/components/Nav";
import { UserProvider } from '../lib/authContext';

const Layout = ({children, user, loading=false}) => (
  <UserProvider value={{user, loading}}>
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
          items-center
          justify-center
          w-full
          mx-auto
          w-3/4
          my-4
          p-16
          bg-white
          ">
            <div className="text-2xl font-medium">
                {children}
            </div>
        </div>
    </main>
  </UserProvider>
);

export default Layout