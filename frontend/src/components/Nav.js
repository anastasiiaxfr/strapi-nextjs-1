import Link from "next/link";

const Nav = () => {
  return (
    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <div>
        <Link href="/" className="font-bold text-2xl">
            {/* eslint-disable @next/next/no-img-element */}
            XFR.films
        </Link>
      </div>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/" className="md:p-2 py-2 block hover:text-purple-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/films" className="md:p-2 py-2 block hover:text-purple-400">
              Films
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;