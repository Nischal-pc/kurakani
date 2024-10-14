import { createContext, useState } from "react";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
    const [posts, setPosts] = useState([]);
    
    const createPost = async (data) => {
        console.log(data);
        // Functionality for creating a post goes here
    };
    
    return (
        <PostContext.Provider value={{ posts, createPost }}>
            {children}
        </PostContext.Provider>
    );
}
