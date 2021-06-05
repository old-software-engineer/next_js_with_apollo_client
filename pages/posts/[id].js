import Layout from "../../components/layout";
import Head from 'next/head'
import client from "../../apollo-client";
import {FETCH_POST_BY_ID, getAllPostIds} from "../api/apollo_client/post_apollo";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

export default function Post({post}) {
    const router = useRouter();

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>
            Id: {post.id}
            <br/>
            Title: {post.title}
            <br/>
            Date: {post.date}
            <br/>
            Details: {post.details}
            <br/>
            <br/>
            <Button variant={"warning"} onClick={() => {
                router.push({
                    pathname: `update/[id]`,
                    query: {id: post.id},
                })
            }}>
                Update this post
            </Button>
            <div dangerouslySetInnerHTML={{__html: post.contentHtml}}/>
        </Layout>
    )
}

// Specify dynamic routes to pre-render pages based on data.
export async function getStaticPaths() {
    // getting all the posts id to create the dynamic routes as per the ids.
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

// This function is used to fetch data at build time.
export async function getStaticProps({params}) {
    const {data} = await client.query({
        query: FETCH_POST_BY_ID(params.id)
    });
    const {post} = data;
    return {
        props: {
            post
        }
    }
}