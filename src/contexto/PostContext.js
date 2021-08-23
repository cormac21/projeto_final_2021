import React, {useContext, useEffect, useState} from 'react'

const PostContext = React.createContext(null);

export function usePostContext() {
    return useContext(PostContext)
}

export function PostProvider( props, {children} ) {

    const [post, setPost] = useState();

    useEffect(() => {
        setPost(props.post)
    }, [])

    const value = {
        post
    }

    return (
        <PostContext.Provider value={value} >
            {children}
        </PostContext.Provider>
    )
}

export default PostContext;
