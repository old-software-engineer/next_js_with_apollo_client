import React, {useState} from "react";
import {CREATE_NEW_POST} from "../api/apollo_client/post_apollo";
import client from "../../apollo-client";
import Layout from "../../components/layout";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

export default function CreateNewPost() {
    const router = useRouter();

    const [query, setQuery] = useState({
        title: "",
        details: "",
        date: ""
    });

    // Update inputs value
    const handleParam = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Form Submit function
    const formSubmit = async (e) => {
        e.preventDefault();
        const {title, date, details} = query;

        // Another way to call mutations, using apollo client instead of useMutation hooks.
        const {data} = await client.mutate({
            mutation: CREATE_NEW_POST,
            variables: {title: title, details: details, date: date, userId: 2}
        });

        if(data){
            await router.replace('/');
        }
    };

    return (
        <Layout>
            <div className="App">
                <h1>Create New Post</h1>
                <form onSubmit={formSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Title"
                            className="form-control"
                            value={query.title}
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
                            value={query.details}
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
                            value={query.date}
                            onChange={handleParam()}
                        />
                    </div>
                    <br/>
                    <Button variant={'success'} type="submit">Create</Button>
                    <br/>
                </form>
            </div>
        </Layout>
    );
}