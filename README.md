# next-relay-testing-example

This is an example that tests the loading state, error state, and data rendering for a component using Relay's `useLazyLoadQuery`. Uses [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Relay](https://relay.dev/), [relay-test-utils](https://relay.dev/docs/guides/testing-relay-components/), [Jest](https://jestjs.io/), and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Queries the [Star Wars GraphQL API](https://github.com/graphql/swapi-graphql).

## Code

- [`MyContent.test.tsx`](/src/__tests__/MyContent.test.tsx) - 3 tests using `relay-test-utils`, Jest, and React Testing Library
- [`MyContent.tsx`](/src/MyContent.tsx) - component under test using `useLazyLoadQuery`, `Suspense`, and `react-error-boundary`

## Run dev server

```
$ npm install
$ npm run dev
```

Go to http://localhost:3000 in the browser

## Run tests

```
$ npm install
$ npm run test
```

## References

- https://relay.dev/docs/guides/testing-relay-components/
- https://testing-library.com/docs/react-testing-library/intro/
- https://nextjs.org/docs/testing#setting-up-jest-with-babel
- https://github.com/facebook/react/issues/11098
- https://jestjs.io/docs/jest-object#jestspyonobject-methodname
