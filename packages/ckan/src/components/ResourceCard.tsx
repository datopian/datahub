import { Resource } from "../interfaces";

export default function ResourceCard({
  resource,
  small,
}: {
  resource?: Resource;
  small?: boolean;
}) {
  const resourceTextColors = {
    PDF: "text-cyan-300",
    CSV: "text-emerald-300",
    JSON: "text-yellow-300",
    XLS: "text-orange-300",
    ODS: "text-amber-400",
    DOC: "text-red-300",
    SHP: "text-purple-400",
    HTML: "text-pink-300",
  };

  return (
    <div className="col-span-1 md:pt-1.5 place-content-center md:place-content-start">
      <div
        className="bg-slate-900 rounded-lg max-w-[90px] min-w-[60px] mx-auto md:mx-0 flex place-content-center my-auto"
        style={{ minHeight: small ? "60px" : "90px" }}
      >
        {(resource && resource.format && (
          <span
            className={`${
              resourceTextColors[
                resource.format as keyof typeof resourceTextColors
              ]
                ? resourceTextColors[
                    resource.format as keyof typeof resourceTextColors
                  ]
                : "text-gray-200"
            } font-bold ${small ? "text-lg" : "text-2xl"} my-auto`}
          >
            {resource.format}
          </span>
        )) || (
          <span className="font-bold text-2xl text-gray-200 my-auto">NONE</span>
        )}
      </div>
    </div>
  );
}
