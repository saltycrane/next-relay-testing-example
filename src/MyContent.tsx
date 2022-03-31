import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { graphql, useLazyLoadQuery } from "react-relay";

import { MyContentQuery } from "./__generated__/MyContentQuery.graphql";
import { connToArray } from "./relay";

/**
 * MyContent
 */
export default function MyContent() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div data-testid="my-error">{error.message}</div>
      )}
    >
      <Suspense fallback={<div data-testid="my-loading">Loading</div>}>
        <MyContentUnwrapped />
      </Suspense>
    </ErrorBoundary>
  );
}

/**
 * MyContentUnwrapped
 */
function MyContentUnwrapped() {
  const data = useLazyLoadQuery<MyContentQuery>(
    graphql`
      query MyContentQuery {
        allPeople {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    {},
  );

  return (
    <ul data-testid="my-content">
      {connToArray(data.allPeople).map((person) => {
        return <li key={person.id}>{person.name}</li>;
      })}
    </ul>
  );
}
