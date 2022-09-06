import postReducer from "../store/post";
import LikeUnlike from "./LikeUnlike"

const PostActions = ({ post }) => {
    return (
        <div className="post-actions container">
            <div className="post-actions">
                <LikeUnlike post={post} />
                <svg className="bubble" ariaLabel="Comment" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <div className="likes-amount">
                {post.likes_amount > 0 && `${post.likes_amount} likes`}
            </div>
        </div>
    )
}

export default PostActions;
