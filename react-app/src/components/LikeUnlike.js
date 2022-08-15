import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkAddLike, thunkRemoveLike } from "../store/post";

const LikeUnlike = ({ sessionUser, post }) => {
    const [like, setLike] = useState('false')

    useEffect(() => {
        if (post.users_who_liked.includes(sessionUser)) {
            setLike(true)
        }
    })

    const likePost = async (e) => {
        e.preventDefault();
        await dispatch(thunkAddLike(post.id))
        setLike(true)
    }

    const unlikePost = async (e) => {
        e.preventDefault();
        await dispatch(thunkRemoveLike(post.id))
        setLike(false)
    }

    return (

        <div onClick={like? ()=> unlikePost() : () => likePost() }>
            <img src={like? "https://www.linkpicture.com/q/file-03-red.png": "https://www.linkpicture.com/q/File-03.png"} />
        </div>
    )
}
