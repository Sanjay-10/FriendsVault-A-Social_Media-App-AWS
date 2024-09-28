import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts );
    const token = useSelector((state) => state.token );

    const getPosts = async () => {
        const response = await fetch(`https://3.136.250.119:3001/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`} 
        });                                                                 
        const data = await response.json();
        console.log(data)
        dispatch(setPosts({ posts:data }));
    }

    

    const getUserPosts = async () => {
        try{
            const response = await fetch(`https://3.136.250.119:3001/posts/${userId}/posts`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            console.log(data)
            dispatch(setPosts({ posts:data }));
        }
        catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();    
        } else {
            getPosts();
        }
    }, [] ); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {posts.length >=0 && posts.slice(0).reverse().map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget 
                        key = {_id}
                        postId = {_id}
                        postUserId = {userId}
                        name = {`${firstName} ${lastName}`}
                        description = {description}
                        location = {location}
                        picturePath = {picturePath}
                        userPicturePath = {userPicturePath}
                        likes = {likes}
                        comments = {comments}
                    />
                )
            )}
        </>
    )
};

export default PostsWidget;