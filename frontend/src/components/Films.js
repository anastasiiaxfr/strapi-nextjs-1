import Link from 'next/link';

const Films = ({ films }) => {
  return (
    <>
      <ol className="space-y-2 text-xl font-bold mb-3">
        {films &&
          films?.data?.map((film) => {
            return (
              <li key={film.id}>
                <Link href={film.attributes.slug}>
                  {film.attributes.title}
                </Link>
              </li>
            );
          })}
      </ol>
    </>
  );
};

export default Films;