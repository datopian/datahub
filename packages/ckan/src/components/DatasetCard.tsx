import Link from "next/link";
import { format } from "timeago.js";
import { Dataset } from "../interfaces/dataset.interface";
import ResourceCard from "./ResourceCard";

export default function DatasetCard({
  dataset,
  showOrg = true,
  urlPrefix = ""
}: {
  dataset: Dataset;
  showOrg: boolean;
  urlPrefix?: string;
}) {
  const resourceBgColors = {
    PDF: "bg-cyan-300",
    CSV: "bg-emerald-300",
    JSON: "bg-yellow-300",
    ODS: "bg-amber-400",
    XLS: "bg-orange-300",
    DOC: "bg-red-300",
    SHP: "bg-purple-400",
    HTML: "bg-pink-300",
  };

  const resourceBgColorsProxy = new Proxy(resourceBgColors, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop]
      }
      return "bg-amber-400"
    }
  })

  function DatasetInformations() {
    return (
      <div className="flex align-center gap-2">
        {(dataset.resources.length > 0 && dataset.resources[0].format && (
          <>
            {showOrg !== false && (
              <span
                className={`${
                  resourceBgColorsProxy[
                    dataset.resources[0].format as keyof typeof resourceBgColors
                  ]
                } px-4 py-1 rounded-full text-xs`}
              >
                {dataset.organization
                  ? dataset.organization.title
                  : "No organization"}
              </span>
            )}
            <span
              className={`${
                resourceBgColorsProxy[
                  dataset.resources[0].format as keyof typeof resourceBgColors
                ]
              } px-4 py-1 rounded-full text-xs`}
            >
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )) || (
          <>
            {showOrg !== false && (
              <span className="bg-gray-200 px-4 py-1 rounded-full text-xs">
                {dataset.organization
                  ? dataset.organization.title
                  : "No organization"}
              </span>
            )}
            <span className="bg-gray-200 px-4 py-1 rounded-full text-xs">
              {dataset.metadata_created && format(dataset.metadata_created)}
            </span>
          </>
        )}
      </div>
    );
  }
  return (
    <article className="grid grid-cols-1 md:grid-cols-7 gap-x-2">
      <ResourceCard
        resource={dataset?.resources.find((resource) => resource.format)}
      />
      <div className="col-span-6 place-content-start flex flex-col gap-1">
        <Link href={`${urlPrefix}/@${dataset.organization?.name}/${dataset.name}`}>
            <h1 className="m-auto md:m-0 font-semibold text-lg text-zinc-900">
              {dataset.title || "No title"}
            </h1>
        </Link>
        <p className="text-sm font-normal text-stone-500  line-clamp-2 h-[44px] overflow-y-hidden ">
          {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
        </p>
        <DatasetInformations />
      </div>
    </article>
  );
}
