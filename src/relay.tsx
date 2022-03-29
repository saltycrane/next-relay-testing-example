import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
  GraphQLResponse,
} from "relay-runtime";

/**
 * Types
 */
type TConnection<TNode> = {
  readonly edges: ReadonlyArray<{
    readonly node: TNode;
  } | null> | null;
};

type TNullableConnection<TNode> = TConnection<TNode | null> | null;

/**
 * connToArray
 */
export function connToArray<TNode>(connection?: TNullableConnection<TNode>) {
  if (!connection || !connection.edges) {
    return [];
  }
  return connection.edges
    .filter(_isNotNull)
    .map((edge) => edge.node)
    .filter(_isNotNull);
}

/**
 * environment
 */
export const environment = new Environment({
  network: Network.create(_fetchQuery),
  store: new Store(new RecordSource()),
});

/**
 * _fetchQuery
 */
async function _fetchQuery(
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> {
  const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await response.json();
}

/**
 * _isNotNull - use this in an `Array.filter` to tell TypeScript that the
 *   returned array does not contain `null` or `undefined`.
 *
 * Example usage:
 *
 *   const itemsWithoutNulls = itemsWithNulls.filter(isNotNull)
 */
const _isNotNull = <T,>(arg: T): arg is NonNullable<T> =>
  arg !== null && arg !== undefined;
