import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const Home = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/posts");
                setPosts(res.data); // Backend returns posts directly, not { posts: [...] }
            } catch (err) {
                console.error("Failed to fetch posts", err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome {user?.name || "Guest"}!
            </h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p>Loading posts...</p>
            ) : posts.length === 0 ? (
                <p>No posts to show. Be the first to create one!</p>
            ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
            )}
        </div>
    );
};

export default Home;
