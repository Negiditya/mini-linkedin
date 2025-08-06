import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!user) {
            setError("You must be logged in to create a post");
            setLoading(false);
            return;
        }

        try {
            await axios.post("/posts", { content }, {
                withCredentials: true
            });
            navigate("/"); // Redirect to homepage
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="max-w-xl mx-auto p-4">
                <p className="text-red-500">Please log in to create a post.</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create Post</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                    name="content"
                    placeholder="What's on your mind?"
                    rows="6"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border px-3 py-2 rounded resize-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
