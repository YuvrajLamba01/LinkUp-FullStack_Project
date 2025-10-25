import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import { MessageCircle, Sparkles, Check, CheckCheck, Image, Play } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchRecentMessages = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/user/recent-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // Group messages by sender and get the latest message for each sender
        const groupedMessages = data.messages.reduce((acc, message) => {
          const senderId = message.from_user_id._id;
          if (
            !acc[senderId] ||
            new Date(message.createdAt) > new Date(acc[senderId].createdAt)
          ) {
            acc[senderId] = message;
          }

          return acc;
        }, {});

        // Sort messages by date
        const sortedMessages = Object.values(groupedMessages).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMessages(sortedMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecentMessages();
      setInterval(fetchRecentMessages, 30000);
      return () => {
        clearInterval();
      };
    }
  }, [user]);

  const getMessagePreview = (message) => {
    if (message.text) {
      return message.text.length > 25 ? message.text.substring(0, 25) + "..." : message.text;
    } else if (message.media_url) {
      if (message.media_type === "image") return "📷 Photo";
      if (message.media_type === "video") return "🎥 Video";
      return "📎 File";
    }
    return "Media";
  };

  const getMediaIcon = (message) => {
    if (message.media_type === "image") return <Image className="w-3 h-3" />;
    if (message.media_type === "video") return <Play className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="bg-white max-w-xs mt-4 p-5 min-h-20 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recent Messages</h3>
            <p className="text-slate-500 text-xs">{messages.length} conversations</p>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
      </div>

      {/* Messages List */}
      <div className="flex flex-col max-h-64 overflow-y-auto no-scrollbar space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">No messages yet</p>
            <p className="text-slate-400 text-xs mt-1">Start a conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Link
              to={`/messages/${message.from_user_id._id}`}
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 group transition-all duration-300 border border-transparent hover:border-amber-200"
            >
              {/* Avatar with Online Status */}
              <div className="relative flex-shrink-0">
                <img
                  src={message.from_user_id.profile_picture}
                  alt="profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-gray-200 group-hover:border-amber-300 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-amber-700 transition-colors">
                    {message.from_user_id.full_name}
                  </p>
                  <div className="flex items-center gap-1">
                    {message.seen ? (
                      <CheckCheck className="w-3 h-3 text-amber-500" />
                    ) : (
                      <Check className="w-3 h-3 text-slate-400" />
                    )}
                    <span className="text-slate-400 text-xs">
                      {moment(message.createdAt).fromNow(true)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {getMediaIcon(message)}
                    <p className="text-slate-600 text-xs truncate flex-1">
                      {getMessagePreview(message)}
                    </p>
                  </div>
                  
                  {/* Unread Badge */}
                  {!message.seen && (
                    <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-sm"></div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* View All Button */}
      {messages.length > 0 && (
        <Link
          to="/messages"
          className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 rounded-xl text-center text-sm font-semibold transition-all duration-300 group flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          View All Messages
          <Sparkles className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      )}
    </div>
  );
};

export default RecentMessages;
