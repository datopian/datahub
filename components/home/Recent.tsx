import Link from 'next/link';

function Recent() {
  return (
    <section className="my-10 mx-4 lg:my-20">
      <h1 className="text-2xl font-thin mb-4">Recent Datasets</h1>
      <div>
        <div className="border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm">
          <h1 className="text-2xl font-thin">Title</h1>
          <p className="text-gray-500">Description</p>
          <Link href="/">
            <a className="pt-3 flex justify-end text-orange-500">
              View Dataset
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Recent;
