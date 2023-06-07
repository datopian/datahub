// TODO don't import router here?
import router from "next/router.js";
import { Action } from "kbar";

import { formatDate } from "../../utils/formatDate";
import { nameFromUrl } from "../../utils/nameFromUrl";

// TODO temp type
type Document = any;

export const kbarActionsFromDocuments = (docs: Document[]): Action[] => {
  const actions: Action[] = [];
  for (const doc of docs) {
    // excluding home path as this is defined in starting actions
    doc.url_path &&
      actions.push({
        id: doc.url_path,
        name: doc.title ?? nameFromUrl(doc.url_path),
        keywords: doc.description ?? "",
        section: doc.sourceDir ?? "Page",
        subtitle: doc.date && formatDate(doc.date, "en-US"),
        perform: () => router.push(`/${doc.url_path}`),
      });
  }
  return actions;
};
