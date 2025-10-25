import { Eye, MessageSquare, Users, Search, Sparkles, BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Messages = () => {
  const { connections } = useSelector((state) => state.connections);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter connections based on search
  const filteredConnections = connections.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-amber-600 font-medium">Connect with your community</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Stats and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-lg border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-slate-900 font-semibold">{connections.length} Connections</p>
              <p className="text-slate-500 text-sm">People you can message</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Connections Grid */}
        <div className="grid gap-4">
          {filteredConnections.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 font-semibold mb-2">No connections found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                {searchTerm ? "Try adjusting your search terms" : "Start connecting with people to see them here"}
              </p>
            </div>
          ) : (
            filteredConnections.map((user) => (
              <div
                key={user._id}
                className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-all duration-300 hover:border-amber-200"
              >
                <div className="flex items-center gap-4">
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
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                        {user.full_name}
                      </h3>
                      <BadgeCheck className="w-4 h-4 text-amber-500 fill-amber-100" />
                    </div>
                    <p className="text-slate-500 text-sm mb-2">@{user.username}</p>
                    {user.bio && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {user.bio}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/messages/${user._id}`)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/25 group/msg"
                    >
                      <MessageSquare className="w-4 h-4 group-hover/msg:scale-110 transition-transform" />
                      <span className="font-semibold text-sm">Message</span>
                    </button>

                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="p-2.5 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-600 rounded-xl active:scale-95 transition-all duration-300 group/view"
                    >
                      <Eye className="w-4 h-4 group-hover/view:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State Illustration */}
        {connections.length === 0 && !searchTerm && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageSquare className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Start Connecting</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Build your network by connecting with amazing people and start meaningful conversations.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25">
              Explore Community
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
