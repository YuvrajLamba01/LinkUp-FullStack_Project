import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut, Sparkles, Settings, User, Heart } from "lucide-react";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { signOut } = useClerk();

  return (
    <div
      className={`w-72 xl:w-80 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 shadow-lg ${
        sidebarOpen ? "translate-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">
        {/* Attractive Logo Section */}
        <div 
          onClick={() => {
            navigate("/");
            setSidebarOpen(false);
          }}
          className="flex items-center gap-3 p-6 pb-4 cursor-pointer group"
        >
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/25 transform group-hover:scale-105 transition-all duration-300">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent tracking-tight">
              LinkUp
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-transparent mt-1 group-hover:w-16 transition-all duration-300"></div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>

        {/* Enhanced Menu Items */}
        <div className="p-4">
          <MenuItems setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Attractive Create Post Button */}
        <Link
          to="/create-post"
          className="relative mx-4 mt-6 group block"
        >
          <div className="relative flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all duration-300 text-white cursor-pointer shadow-lg shadow-amber-500/25 border border-amber-400/30">
            <CirclePlus className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-wide">Create Post</span>
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          </div>
        </Link>
      </div>

      {/* Attractive User Section */}
      <div className="w-full border-t border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center group cursor-pointer flex-1 min-w-0">
            <div className="relative">
              <div className="w-12 h-12 bg-slate-100 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors duration-300">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-xl"
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-slate-900 truncate group-hover:text-amber-700 transition-colors">
                {user.full_name}
              </h1>
              <p className="text-xs text-slate-500 font-medium truncate">
                @{user.username}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Link 
              to="/profile"
              className="p-2 bg-slate-100 hover:bg-amber-100 rounded-lg transition-all duration-300 group"
            >
              <Settings className="w-4 h-4 text-slate-500 group-hover:text-amber-600 transition-colors" />
            </Link>
            
            <button
              onClick={signOut}
              className="p-2 bg-slate-100 hover:bg-red-100 rounded-lg transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Online Status */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-slate-500 text-xs font-medium">Online</span>
          <div className="flex-1"></div>
          <span className="text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
            PRO
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
