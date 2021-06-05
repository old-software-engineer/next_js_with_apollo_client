import Layout from "../../../components/layout";
import {getAllPostIds} from "../../../lib/posts";
import {FETCH_POST_BY_ID, UPDATE_POST} from "../../api/apollo_client/post_apollo";
import client from "../../../apollo-client";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";


export default function Post({ post }) {
    const router = useRouter();

    const [postData, setPostData] = useState(post);
    const [updatePost] = useMutation(UPDATE_POST)

    // Update inputs value
    const handleParam = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    // Form Submit function
    const formSubmit = async (e) => {
        e.preventDefault();
        const {title, date, details, id} = postData;

        // Calling update post mutation to update the post.
        const {data} = await updatePost({variables: {title: title, details: details, date: date, id: parseInt(id)}});
        if(data){
           await router.push('/');
        }
    };

    return (
        <Layout>
            <form onSubmit={formSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Title"
                        className="form-control"
                        value={postData.title}
                        onChange={handleParam()}
                    />
                </div>
                <br/>
                <div>
                    <label>Detail</label>
                    <input
                        type="text"
                        name="details"
                        required
                        placeholder="Details"
                        className="form-control"
                        value={postData.details}
                        onChange={handleParam()}
                    />
                </div>
                <br/>
                <div>
                    <label>Date</label>
                    <input
                        type="text"
                        name="date"
                        required
                        placeholder="Date"
                        className="form-control"
                        value={postData.date}
                        onChange={handleParam()}
                    />
                </div>
                <br/>
                <Button type="submit" variant={'warning'}>Update</Button>
                <br/>
            </form>
        </Layout>
    )
}

// Specify dynamic routes to pre-render pages based on data.
export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: FETCH_POST_BY_ID(params.id)
    });
    const { post } = data;
    return {
        props: {
            post
        }
    }
}