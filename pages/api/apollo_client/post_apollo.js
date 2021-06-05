// Adding all the graphql queries/mutations for posts in one file.
import {gql} from "@apollo/client";
import axios from "axios";
import client from "../../../apollo-client";

// Query to fetch all the posts.
export const GET_ALL_POSTS = gql`
    query GetAllPosts {
      allPosts {  
        id
        title  
        details
        date
      }
    }
  `

// Query to fetch particular post by id.
export const FETCH_POST_BY_ID = (id) => gql`
    query GetPostDataById {
      post(id: ${id}) {  
        id
        title  
        details
        date
      }
    }
  `

// Mutation to create post.
export const CREATE_NEW_POST = gql`
mutation ($title: String!, $date: String!, $details: String!, $userId: Int!) {
  createPost(input: {title: $title, date: $date, details: $details, userId: $userId}) {
    post {
      id
      title
      details
      date
    }
    errors
  }
}
`

//Mutation to update post.
export const UPDATE_POST = gql`
mutation ($title: String!, $date: String!, $details: String!, $id: Int!) {
  updatePost(input: {title: $title, date: $date, details: $details, id: $id}) {
    post {
      id
      title
      details
      date
    }
    errors
  }
}
`

// Mutation to delete post.
export const DELETE_POST = gql`
mutation ($id: Int!) {
  deletePost(input: {id: $id}) {
    post {
      id
      title
      details
      date
    }
    errors
  }
}
`

// axios request to fetch the list of all the posts.
export async function getPosts() {
    return axios({
        url: 'http://localhost:3000/graphql',
        method: 'post',
        data: {
            query: `
      query GetAllPosts {
      allPosts {  
        id
        title  
        details
        date
      }
    }
      `
        }
    }).then((result) => {
        console.log(result, 'result`')
        return result.data
    });
}

// This function is used to fetch the posts and return there ids to create the dynamic paths.
export async function getAllPostIds() {
    const {data} = await client.query({
        query: GET_ALL_POSTS
    });
    const {allPosts, paths = []} = data;
    return(
        allPosts.map((value) => {
            return{
                params: {
                    id: value.id
                }
            }
        })
    )
}