import AuthContextProvider from "./authContext";
import PostContextProvider from "./postContext";


const ContextProvider = ({ children }) => (
    <AuthContextProvider>
        <PostContextProvider>
            {children}
        </PostContextProvider>
    </AuthContextProvider>
);

export default ContextProvider;
