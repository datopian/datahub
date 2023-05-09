export default function ShowcasesItem({ item }) {
  return (
    <a
      className="rounded overflow-hidden group relative border-1 shadow-lg"
      target="_blank"
      href={item.href}
    >
      <div
        className="bg-cover bg-no-repeat bg-top aspect-video w-full group-hover:blur-sm group-hover:scale-105 transition-all duration-200"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-all duration-200"></div>
      </div>
      <div>
        <div className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 left-0 transition-all duration-200 px-2 flex items-center justify-center">
          <div className="text-center text-primary-dark">
            <span className="text-xl font-semibold">{item.title}</span>
            <p className="text-base font-medium">{item.description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
