const IconBeaker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  </svg>
);

const IconDocs = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const IconCode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>
);

const ActionButton = ({ title, Icon, href, className = '' }) => (
  <a
    title={title}
    target="_blank"
    href={href}
    className={`rounded-full p-2 hover:bg-secondary transition-all duration-250 ${className}`}
  >
    <Icon />
  </a>
);

export default function GalleryItem({ item }) {
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
            <div className="flex justify-center mt-2">
              <ActionButton Icon={IconBeaker} title="Demo" href={item.href} />
              {item.docsUrl && (
                <ActionButton
                  Icon={IconDocs}
                  title="Documentation"
                  href={item.docsUrl}
                  className="mx-5"
                />
              )}
              {item.sourceUrl && (
                <ActionButton
                  Icon={IconCode}
                  title="Source code"
                  href={item.sourceUrl}
                />
              )}

              {/* Maybe: Blog post */}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
