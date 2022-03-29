import {
  RelayEnvironmentProvider,
  graphql,
  useLazyLoadQuery,
} from "react-relay";

import { IndexQuery } from "./__generated__/IndexQuery.graphql";
import { connToArray, environment } from "./relay";

/**
 * Index
 */
export default function Index() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <MyContent />
    </RelayEnvironmentProvider>
  );
}

/**
 * MyContent
 */
function MyContent() {
  const data = useLazyLoadQuery<IndexQuery>(
    graphql`
      query IndexQuery {
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
    <ul>
      {connToArray(data.allPeople).map((person) => {
        return <li key={person.id}>{person.name}</li>;
      })}
    </ul>
  );
}
