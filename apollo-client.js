import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// In this file we have created our apollo client to perform the query and mutation functions to fetch and manipulate data.

// const link = createHttpLink({ uri: "http://localhost:3000/graphql" })
// const csrfToken = document
//     .querySelector('meta[name=csrf-token]')
//     .getAttribute('content')

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:3000/graphql",
        credentials: 'same-origin',
        // headers: {
        //     'X-CSRF-Token': csrfToken,
        // },
    }),
    cache: new InMemoryCache(),
});

export default client;