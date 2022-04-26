import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export type ApolloClientContext = GetServerSidePropsContext;

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (

      <ApolloProvider client={getApolloClient(props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    )
  }
}

export function getApolloClient(ssrCache?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    fetch
  })

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: httpLink,
    cache
  });
}


const httpLink = createHttpLink({
  uri: 'http://localhost:3332/graphql',
  fetch
})

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});
