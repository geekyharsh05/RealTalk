import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { signout, authUser } = useAuthStore();

  const avatar = authUser?.result?.profilePic || null;

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-all group"
          >
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold font-stretch-semi-expanded bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              RealTalk
            </h1>
          </Link>

          {/* Right Side */}
          <div className="relative flex items-center gap-4">
            {authUser && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full shadow ring ring-primary ring-offset-base-100 ring-offset-2">
                    {avatar ? (
                      <img src={avatar} alt="User Avatar" />
                    ) : (
                      <User className="w-6 h-6 text-primary mx-auto mt-2" />
                    )}
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="mt-3 z-[100] p-3 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-xl w-56 font-stretch-expanded"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="hover:bg-base-200 rounded-md flex items-center gap-2 px-2 py-2"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="hover:bg-base-200 rounded-md flex items-center gap-2 px-2 py-2"
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </li>

                  <div className="divider my-2"></div>

                  {/* Sign Out */}
                  <li>
                    <button
                      onClick={() => signout()}
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-700 rounded-md flex items-center gap-2 px-2 py-2 transition-colors"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
