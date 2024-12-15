import { NavLink } from 'react-router-dom';
import { FaUser, FaEdit, FaKey, FaClipboardList } from 'react-icons/fa'; // Import icons

function Dashboard() {
    return (
        <div className="font-sans w-1/4 bg-slate-800 text-white h-screen p-6">
            <h2 className="text-2xl border-b pl-6 pt-3 pb-5 font-semibold mb-8 border-white">
                Dashboard
            </h2>

            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex items-center space-x-4 p-3 rounded-lg ${isActive
                                ? 'bg-white text-slate-800'
                                : 'hover:bg-white text-white hover:text-slate-800'
                            }`
                        }
                    >
                        <FaUser className="text-white text-2xl" />
                        <span className="text-lg">Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/update"
                        className={({ isActive }) =>
                            `flex items-center space-x-4 p-3 rounded-lg ${isActive
                                ? 'bg-white text-slate-800'
                                : 'hover:bg-white text-white hover:text-slate-800'
                            }`
                        }
                    >
                        <FaEdit className="text-white text-2xl" />
                        <span className="text-lg">Update Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/changePassword"
                        className={({ isActive }) =>
                            `flex items-center space-x-4 p-3 rounded-lg ${isActive
                                ? 'bg-white text-slate-800'
                                : 'hover:bg-white text-white hover:text-slate-800'
                            }`
                        }
                    >
                        <FaKey className="text-white text-2xl" />
                        <span className="text-lg">Change Password</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/MyAdds"
                        className={({ isActive }) =>
                            `flex items-center space-x-4 p-3 rounded-lg ${isActive
                                ? 'bg-white text-slate-800'
                                : 'hover:bg-white text-white hover:text-slate-800'
                            }`
                        }
                    >
                        <FaClipboardList className="text-white text-2xl" />
                        <span className="text-lg">My Adds</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;
