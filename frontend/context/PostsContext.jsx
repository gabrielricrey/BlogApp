import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function addPost(newPost) {
    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
      console.log('No token found')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/blogpost/', { ...newPost }, { headers: { Authorization: `Bearer ${token}` } })
      console.log(response.data)

      setPosts((prevPosts) => [...prevPosts, response.data.post])
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
    }

  }

  async function editPost(post) {
    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
      console.log('No token found')
      return
    }

    const id = post.id;
    delete post.id


    try {
      const response = await axios.put(`http://localhost:3000/api/blogpost/${id}`, { ...post }, { headers: { Authorization: `Bearer ${token}` } })
      console.log(response.data)
      return response.data;

    } catch (error) {
      console.error("Error creating post:", error);
    }

  }

    const fetchPosts = async () => {
      if (!localStorage.getItem('token')) return;

      const token = JSON.parse(localStorage.getItem('token'));

      try {
        const response = await axios.get("http://localhost:3000/api/blogpost/byfriends", { headers: { Authorization: `Bearer ${token}` } });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <PostsContext.Provider value={{ posts, loading, addPost, editPost ,fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};