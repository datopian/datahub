import router from "next/router.js";
import { Action } from "kbar";

import { KBarModal } from "./KBarModal";

export const KBarSearchProvider = ({ config, children }) => {
  const defaultActions = config?.defaultActions;
  const searchDocumentsPath = "/search.json";

  let startingActions: Action[] = [
    {
      id: "homepage",
      name: "Homepage",
      keywords: "",
      section: "Home",
      perform: () => router.push("/"),
    },
  ];

  if (defaultActions && Array.isArray(defaultActions))
    startingActions = [...startingActions, ...defaultActions];

  return KBarModal ? (
    <KBarModal
      startingActions={startingActions}
      searchDocumentsPath={searchDocumentsPath}
    >
      {children}
    </KBarModal>
  ) : (
    children
  );
};
