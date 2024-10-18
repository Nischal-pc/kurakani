import { createContext, useState } from "react";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const createPost = async (data) => {
        console.log(data);
        try {
            // normal raw data upload
            const docRef = await addDoc(collection(db, "posts"), {
              caption: data.caption,
              tags: data.tags,
              location: data.location,
              created_at: Timestamp.fromDate(new Date()),
              created_by: data.created_by
            });

            //  image uploads and get urls
            let images = [];
            for(let photo of data.photos){
                const storageRef = ref(storage, `posts/${photo.name}`);
                try {
                    const snapshot = await uploadString(storageRef, photo.url, 'data_url');
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    images.push(downloadURL)
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }

            // update post with image urls
            await updateDoc(docRef, {
                images: images
            });

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    };
    const toggleModal = () => {
        setShowModal(prevShowModal => !prevShowModal);
    };
    console.log(showModal)
    
    return (
        <PostContext.Provider value={{ posts, showModal, createPost, toggleModal }}>
            {children}
        </PostContext.Provider>
    );
}
