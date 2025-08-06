import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const Profile = () => {
    const { username } = useParams();
    const { user: currentUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [profileUser, setProfileUser] = useState(null);
    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBio, setUpdatedBio] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const isOwnProfile = currentUser && (
        currentUser.username === username ||
        currentUser._id === username
    );

    useEffect(() => {
        const fetchProfile = async () => {


            if (authLoading) {

                return;
            }

            if (!username) {
                console.log('No username provided in URL params');
                setError("No username provided in URL");
                setLoading(false);
                return;
            }

            try {
                setError("");
                setLoading(true);


                const res = await axios.get(`/users/${username}`);



                setProfileUser(res.data.user);
                setBio(res.data.user.bio || "");
                setUpdatedBio(res.data.user.bio || "");
                setUserPosts(res.data.posts || []);

            } catch (err) {
                console.error("Profile fetch error:", err);
                console.error("Error response:", err.response?.data);
                console.error("Error status:", err.response?.status);

                if (err.response?.status === 404) {
                    setError(`User "${username}" not found`);
                } else {
                    setError(err.response?.data?.message || "Failed to load profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, authLoading]);

    const handleBioUpdate = async () => {
        if (!currentUser) {
            setError("You must be logged in to update your bio");
            return;
        }

        try {

            const res = await axios.put("/users/bio", { bio: updatedBio }, {
                withCredentials: true
            });


            setBio(res.data.bio);
            setIsEditing(false);

            // Update the profile user state as well
            setProfileUser(prev => ({
                ...prev,
                bio: res.data.bio
            }));

        } catch (err) {
            console.error("Error updating bio:", err);
            if (err.response?.status === 401) {
                setError("You must be logged in to update your bio");
                // Optionally redirect to login
                // navigate('/login');
            } else {
                setError(err.response?.data?.message || "Failed to update bio");
            }
        }
    };

    // Show loading state
    if (authLoading || loading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex justify-center items-center h-32">
                    <div className="text-lg">Loading profile...</div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h3 className="font-bold">Error</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Show not found state
    if (!profileUser) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
                    <p className="text-gray-600 mb-4">The user "{username}" could not be found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Profile Header */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {profileUser.name}
                        </h1>
                        <p className="text-gray-600">@{profileUser.username}</p>
                    </div>
                    {isOwnProfile && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            Your Profile
                        </span>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-gray-600">
                            <strong>Email:</strong> {profileUser.email}
                        </p>
                    </div>
                    {profileUser.createdAt && (
                        <div>
                            <p className="text-gray-600">
                                <strong>Joined:</strong> {new Date(profileUser.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Bio Section */}
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-2">About</h3>
                    {!isEditing ? (
                        <div className="flex items-start justify-between">
                            <p className="text-gray-700 flex-1">
                                {bio || "No bio available."}
                            </p>
                            {isOwnProfile && currentUser && (
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setUpdatedBio(bio);
                                    }}
                                    className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                    Edit Bio
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <textarea
                                value={updatedBio}
                                onChange={(e) => setUpdatedBio(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Tell others about yourself..."
                            />
                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={handleBioUpdate}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setUpdatedBio(bio);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isOwnProfile ? 'Your Posts' : `${profileUser.name}'s Posts`}
                    </h2>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                </div>

                {userPosts.length > 0 ? (
                    <div className="space-y-4">
                        {userPosts.map(post => (
                            <PostCard
                                key={post._id}
                                post={{
                                    ...post,
                                    author: {
                                        name: profileUser.name,
                                        username: profileUser.username
                                    }
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 text-lg mb-2">
                            {isOwnProfile ? "You haven't" : `${profileUser.name} hasn't`} posted anything yet
                        </div>
                        {isOwnProfile && (
                            <div className="mt-4">
                                <p className="text-gray-400 mb-3">
                                    Share your thoughts with the community!
                                </p>
                                <button
                                    onClick={() => navigate('/create')}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    Create Your First Post
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;


