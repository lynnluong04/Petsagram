import postReducer from "../store/post";
import LikesModal from "./LikesModal";
import LikeUnlike from "./LikeUnlike"
import { NavLink, useLocation } from "react-router-dom";


const PostActions = ({ post }) => {
    const location = useLocation();
    return (
        <div className="post-actions container">
            <div className="post-actions">
                <LikeUnlike post={post} />
                <NavLink to={{
                    pathname:`/${post?.owner_id}/${post?.id}`,
                    state: {background: location}
                    }} activeClassName="active" >
                    <svg className="bubble" aria-label="Comment" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </NavLink>
            </div>
            <LikesModal post={post} />
        </div>
    )
}

export default PostActions;
