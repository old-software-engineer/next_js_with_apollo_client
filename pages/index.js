import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {useMutation} from '@apollo/client';
import {DELETE_POST, getPosts} from "./api/apollo_client/post_apollo";
import Button from 'react-bootstrap/Button'
import {Card} from "react-bootstrap";
import {useRouter} from 'next/router'

export default function Home({allPosts = []}) {
    const router = useRouter();

    // useMutation hook used to pass our graphql mutation constant that we imported and fetch the function to perform the mutation.
    const [deletePost] = useMutation(DELETE_POST);

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Button type="button" onClick={() => router.push('posts/createNewPost')}>
                Create New Post
            </Button>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Posts</h2>
                <ul className={utilStyles.list}>
                    {
                        allPosts.map((value, index) => {
                            return (
                                <>
                                    <Card border="dark" style={{width: '35rem'}} key={index}>
                                        <Card.Header>Post Id: {value.id}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{value.title}</Card.Title>
                                            <Card.Text>
                                                {value.details} <br/>
                                                {value.date}
                                            </Card.Text>
                                            <Button variant="success" type="button"
                                                    onClick={() => router.push({
                                                        pathname: `posts/[id]`,
                                                        query: { id: value.id },
                                                    })}>
                                                Open Post id: {value.id}
                                            </Button>
                                            {' '}
                                            <Button type={"button"}
                                                    variant="danger"
                                                    onClick={() => {
                                                        deletePost({variables: {id: parseInt(value.id)}}).then(r => {
                                                            router.reload()
                                                        })
                                                    }}>
                                                Delete Post
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                </>
                            )
                        })
                    }
                </ul>
            </section>
        </Layout>
    )
}

// getServerSideProps is run on every request instead of on build time.
export async function getServerSideProps() {
    // function used to fetch the posts data.
    const {data} = await getPosts();

    const {allPosts} = data;
    if (!allPosts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {allPosts}, // will be passed to the page component as props
    }
}