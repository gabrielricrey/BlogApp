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
        } catch (error) {
            console.error("Error creating post:", error);
        }
    
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogpost/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [posts]);

  return (
    <PostsContext.Provider value={{ posts, loading, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};