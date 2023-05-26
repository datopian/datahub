import { KBarProvider, Action } from "kbar";

import { Portal } from "./KBarPortal";

interface Props extends React.PropsWithChildren {
  searchDocumentsPath: string;
  startingActions?: Action[];
}

export const KBarModal: React.FC<Props> = ({
  searchDocumentsPath,
  startingActions,
  children,
}) => {
  return (
    <KBarProvider actions={startingActions}>
      <Portal searchDocumentsPath={searchDocumentsPath} />
      {children}
    </KBarProvider>
  );
};
