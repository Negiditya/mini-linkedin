import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div className="border border-gray-300 rounded-md shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <Link to={`/profile/${post.author.username}`} className="font-semibold hover:underline">
                    {post.author.name || "Anonymous"}
                </Link>

                <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                </span>
            </div>

            <p className="text-gray-800">{post.content}</p>
        </div>
    );
};

export default PostCard;
