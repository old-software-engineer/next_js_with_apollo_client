import '../styles/globals.css'
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

// When you load a page of your Next.js app, Next.js
// 1) tries to pre-render it on the server,
// 2) sends the result to the browser, and
// 3) "re-hydrates" the page in the browser.
// Re-hydration means the page is re-rendered again on the browser and compared against the version that was rendered on the server.
// If they disagree, React issues a non-critical warning. This shouldn't actually cause any problems, but it can be annoying.
// Fortunately it's an easy fix. In your custom App, just add the suppressHydrationWarning attribute to the <div>:

function MyApp({Component, pageProps}) {
    return (
        <>
            <div suppressHydrationWarning>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <ApolloProvider client={client}>
                    {typeof window === 'undefined' ? null : <Component {...pageProps} />}
                </ApolloProvider>
            </div>
        </>
    )
}

export default MyApp
