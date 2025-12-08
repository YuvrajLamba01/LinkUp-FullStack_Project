import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
  Sparkles,
  Search,
  Globe,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { fetchConnections } from "../features/connections/connectionsSlice";
import api from "../api/axios";
import toast from "react-hot-toast";

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { connections, pendingConnections, followers, following } = useSelector(
    (state) => state.connections
  );

  const dataArray = [
    { label: "Followers", value: followers, icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Following", value: following, icon: UserCheck, color: "from-green-500 to-emerald-500" },
    { label: "Pending", value: pendingConnections, icon: UserRoundPen, color: "from-orange-500 to-amber-500" },
    { label: "Connections", value: connections, icon: UserPlus, color: "from-purple-500 to-pink-500" },
  ];

  // Filter users based on search term
  const getFilteredUsers = () => {
    const currentData = dataArray.find(item => item.label === currentTab)?.value || [];
    
    if (!searchTerm.trim()) return currentData;
    
    return currentData.filter(user =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/unfollow",
        { id: userId },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message, {
          icon: '👤',
          style: {
            background: '#fef3c7',
            color: '#92400e',
          },
        });
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const acceptConnection = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/accept",
        { id: userId },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message, {
          icon: '✅',
          style: {
            background: '#f0fdf4',
            color: '#166534',
          },
        });
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchConnections(token));
    });
  }, []);

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                Connections
              </h1>
              <p className="text-amber-600 font-medium">Manage your network and discover new connections</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-all duration-300 cursor-pointer ${currentTab === item.label ? 'ring-2 ring-amber-500' : ''}`}
              onClick={() => setCurrentTab(item.label)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10 flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">{item.value.length}</div>
                  <div className="text-slate-600 text-sm font-medium">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                currentTab === tab.label
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25"
                  : "bg-white text-slate-600 hover:text-amber-600 hover:bg-amber-50 border border-slate-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {currentTab === tab.label && <Sparkles className="w-3 h-3 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${currentTab.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {currentTab === "Followers" && <Users className="w-8 h-8 text-slate-400" />}
              {currentTab === "Following" && <UserCheck className="w-8 h-8 text-slate-400" />}
              {currentTab === "Pending" && <UserRoundPen className="w-8 h-8 text-slate-400" />}
              {currentTab === "Connections" && <UserPlus className="w-8 h-8 text-slate-400" />}
            </div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">
              {searchTerm ? "No results found" : `No ${currentTab.toLowerCase()} yet`}
            </h3>
            <p className="text-slate-600 max-w-sm mx-auto">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : `Start connecting with people to see your ${currentTab.toLowerCase()} here`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-all duration-300 hover:border-amber-200"
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.profile_picture}
                      alt="profile"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200 group-hover:border-amber-400 transition-colors shadow-sm"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                      {user.full_name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-2">@{user.username}</p>
                    {user.bio && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all duration-300 font-semibold shadow-lg shadow-amber-500/25"
                  >
                    View Profile
                  </button>

                  {currentTab === "Following" && (
                    <button
                      onClick={() => handleUnfollow(user._id)}
                      className="w-full py-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl active:scale-95 transition-all duration-300 font-medium"
                    >
                      Unfollow
                    </button>
                  )}

                  {currentTab === "Pending" && (
                    <button
                      onClick={() => acceptConnection(user._id)}
                      className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all duration-300 font-semibold"
                    >
                      Accept Connection
                    </button>
                  )}

                  {currentTab === "Connections" && (
                    <button
                      onClick={() => navigate(`/messages/${user._id}`)}
                      className="w-full py-2.5 flex items-center justify-center gap-2 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 rounded-xl active:scale-95 transition-all duration-300 font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Network CTA */}
        {currentTab === "Connections" && connections.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-slate-100">
              <Globe className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-slate-900 font-semibold">Expand your network</p>
                <p className="text-slate-600 text-sm">Discover more amazing people to connect with</p>
              </div>
              <button
                onClick={() => navigate("/discover")}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold"
              >
                Discover
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
