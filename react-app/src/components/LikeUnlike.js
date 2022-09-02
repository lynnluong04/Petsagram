import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddLike, thunkRemoveLike } from "../store/post";
const IMAGE = (imgName) => {
    return require(`./images/${imgName}`).default
  }

const LikeUnlike = ({ post }) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState('false')
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        if (post?.users_who_liked?.includes(sessionUser)) {
            setLike(true)
        }
    })

    const likePost = async (e) => {
        await dispatch(thunkAddLike(post.id))
        setLike(true)
    }

    const unlikePost = async (e) => {
        await dispatch(thunkRemoveLike(post.id))
        setLike(false)
    }

    return (

        <div onClick={like? ()=> unlikePost() : () => likePost() }>
            <img className="paw" src={like? IMAGE('paw-red.png'): IMAGE('paw.png')} />
        </div>
    )
}

export default LikeUnlike;
