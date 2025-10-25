import { useEffect, useState } from "react";
import { Search, Users, Sparkles, MapPin, User } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";

const Discover = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { getToken } = useAuth();

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === 'click') {
      if (!input.trim()) {
        toast.error("Please enter a search term");
        return;
      }

      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "/api/user/discover",
          { input },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          setUsers(data.users);
          if (data.users.length === 0) {
            toast.success("No users found. Try different keywords.", {
              icon: '🔍',
              style: {
                background: '#fef3c7',
                color: '#92400e',
              },
            });
          }
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  // Load popular users on component mount
  useEffect(() => {
    const loadPopularUsers = async () => {
      try {
        const token = await getToken();
        const { data } = await api.get("/api/user/popular", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (data.success) {
          setSuggestions(data.users);
        }
      } catch (error) {
        console.error("Failed to load popular users:", error);
      }
    };

    loadPopularUsers();
    getToken().then((token) => {
      dispatch(fetchUser(token));
    });
  }, [dispatch, getToken]);

  const popularCategories = [
    { icon: MapPin, label: "Bangalore", color: "from-blue-500 to-cyan-500" },
    { icon: User, label: "Aman", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                Discover
              </h1>
              <p className="text-amber-600 font-medium">Find amazing people worldwide</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Premium Search Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-amber-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name, username, bio, location, or interests..."
                className="w-full pl-12 pr-24 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-slate-700 placeholder-slate-400"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 active:scale-95 transition-all duration-300 font-semibold shadow-lg shadow-amber-500/25"
              >
                Search
              </button>
            </div>
            
            {/* Quick Categories */}
            <div className="flex flex-wrap gap-3 mt-4">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setInput(category.label)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-xl transition-all duration-300 group/category"
                >
                  <category.icon className={`w-4 h-4 group-hover/category:scale-110 transition-transform`} />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Users */}
        {!loading && users.length === 0 && suggestions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Popular Connections</h2>
                <p className="text-slate-600">People you might want to connect with</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.slice(0, 6).map((user) => (
                <UserCard user={user} key={user._id} />
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {users.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Search Results
                  <span className="text-amber-600 ml-2">({users.length} found)</span>
                </h2>
                <p className="text-slate-600">People matching your search</p>
              </div>
              <button
                onClick={() => setUsers([])}
                className="px-4 py-2 bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-xl transition-colors font-medium"
              >
                Clear Results
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <UserCard user={user} key={user._id} />
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!loading && users.length === 0 && input && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">No users found</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Try searching with different keywords or browse popular categories above.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setInput(category.label)}
                  className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl font-medium hover:bg-amber-100 transition-colors"
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <Loading height="40vh" />}

        {/* Empty Initial State */}
        {!loading && users.length === 0 && !input && suggestions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Discover Amazing People</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Search for people by name, username, interests, or location to start building your network.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setInput("Bangalore")}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25"
              >
                Find in Bangalore
              </button>
              <button
                onClick={() => setInput("Aman")}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-amber-100 hover:text-amber-700 transition-all duration-300"
              >
                Find Aman
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
