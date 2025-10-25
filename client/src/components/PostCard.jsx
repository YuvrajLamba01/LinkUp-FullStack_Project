import { BadgeCheck, Heart, MessageCircle, Share2, Sparkles, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  // Safely handle post content
  const postWithHashtags = post?.content?.replace(
    /(#\w+)/g,
    '<span class="text-amber-600 font-medium">$1</span>'
  ) || '';

  const currentUser = useSelector((state) => state.user.value);
  
  // Safely initialize likes state
  const initialLikes = Array.isArray(post?.likes_count) ? post.likes_count : [];
  const [likes, setLikes] = useState(initialLikes);
  
  // Safely check if current user liked the post
  const isCurrentUserLiked = currentUser?._id ? likes.includes(currentUser._id) : false;
  const [isLiked, setIsLiked] = useState(isCurrentUserLiked);

  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Safe navigation function
  const handleProfileClick = () => {
    if (post?.user?._id) {
      navigate(`/profile/${post.user._id}`);
    }
  };

  const handleLike = async () => {
    // Don't proceed if no user is logged in
    if (!currentUser?._id) {
      toast.error("Please login to like posts");
      return;
    }

    // Don't proceed if no post ID
    if (!post?._id) {
      toast.error("Invalid post");
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      const { data } = await api.post(
        "/api/post/like",
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setIsLiked(!isLiked);
        setLikes(prev => {
          if (isLiked) {
            return prev.filter(id => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
        toast.success(data.message, {
          icon: '❤️',
          style: {
            background: '#fef3c7',
            color: '#92400e',
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  // Don't render if post is invalid
  if (!post) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 w-full max-w-2xl">
        <div className="text-slate-500 text-center">Post not available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 space-y-4 w-full max-w-2xl hover:shadow-xl transition-all duration-300">
      {/* User Info - Premium Style */}
      <div className="flex items-center justify-between">
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-3 cursor-pointer group flex-1"
        >
          <div className="relative">
            <img
              src={post.user?.profile_picture || "/default-avatar.png"}
              alt="profile"
              className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200 group-hover:border-amber-400 transition-colors shadow-sm"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                {post.user?.full_name || "Unknown User"}
              </span>
              <BadgeCheck className="w-4 h-4 text-amber-500 fill-amber-100" />
            </div>
            <div className="text-slate-500 text-sm flex items-center gap-2">
              <span>@{post.user?.username || "user"}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-slate-400">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>

        {/* Options Button */}
        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Content */}
      {post.content && (
        <div
          className="text-slate-700 text-base leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* Images - Full Visibility */}
      {post.image_urls && post.image_urls.length > 0 && (
        <div className={`grid gap-3 ${post.image_urls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.image_urls.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt="post"
                className="w-full h-auto object-cover rounded-xl transition-all duration-300 group-hover:shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons - Premium Style with Counts */}
      <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl transition-all duration-300 ${
            isLiked 
              ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
              : 'hover:bg-slate-50 text-slate-600 hover:text-amber-600'
          }`}
          disabled={!currentUser}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-amber-600' : ''}`} />
          <span className="font-medium text-sm">
            {!currentUser ? 'Login' : (isLiked ? 'Liked' : 'Like')}
          </span>
          <span className="text-slate-500 text-sm font-medium">
            {likes.length}
          </span>
          {isLiked && <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />}
        </button>

        <button 
          className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-amber-600 transition-all duration-300"
          disabled={!currentUser}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Comment</span>
          <span className="text-slate-500 text-sm font-medium">12</span>
        </button>

        <button 
          className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-amber-600 transition-all duration-300"
          disabled={!currentUser}
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium text-sm">Share</span>
          <span className="text-slate-500 text-sm font-medium">7</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
