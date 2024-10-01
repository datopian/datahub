export default function ShowcasesItem({ item }) {
  return (
    <div className="rounded overflow-hidden group relative border-1 shadow-lg">
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
            <div className="flex justify-center mt-2 gap-2 ">
              {item.repository && 
              <a
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-secondary rounded-full p-1 hover:scale-110 transition cursor-pointer z-50"
                  href={item.repository}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
                </a>
              }
              {item.href && (
                <a
                  target="_blank"
                  className=" text-white w-8 h-8 p-1 bg-primary rounded-full hover:scale-110 transition cursor-pointer z-50"
                  rel="noreferrer"
                  href={item.href}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 420 420"
                    stroke="white"
                    fill="none"
                  >
                    <path stroke-width="26" d="M209,15a195,195 0 1,0 2,0z" />
                    <path
                      stroke-width="18"
                      d="m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
