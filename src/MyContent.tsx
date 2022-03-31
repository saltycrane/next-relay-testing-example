import { graphql, useLazyLoadQuery } from "react-relay";

import { MyContentQuery } from "./__generated__/MyContentQuery.graphql";
import { connToArray } from "./relay";

export default function MyContent() {
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
    <ul>
      {connToArray(data.allPeople).map((person) => {
        return <li key={person.id}>{person.name}</li>;
      })}
    </ul>
  );
}
