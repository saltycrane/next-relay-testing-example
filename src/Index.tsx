import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import MyContent from "./MyContent";
import { environment } from "./relay";

export default function Index() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <MyContent />
    </RelayEnvironmentProvider>
  );
}
