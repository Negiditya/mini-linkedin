import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                MiniLinkedIn
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/create" className="hover:underline">
                            Create Post
                        </Link>
                        <Link
                            to={`/profile/${user.username || user._id}`}
                            className="hover:underline"
                        >
                            {user.name || "Profile"}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link to="/register" className="hover:underline">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

