import { useEffect, useState } from "react";
import { Plus, Sparkles, Play, Image, FileText } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const StoriesBar = () => {
  const { getToken } = useAuth();

  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/story/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setStories(data.stories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Premium Add Story Card */}
        <div
          onClick={() => setShowModal(true)}
          className="relative rounded-2xl shadow-lg min-w-28 max-w-28 max-h-44 aspect-[3/4] cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-dashed border-amber-200 bg-gradient-to-b from-amber-50 to-white group"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/25">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-slate-700 text-center group-hover:text-amber-700 transition-colors">
              Create Story
            </p>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Premium Story Cards */}
        {stories.map((story, index) => (
          <div
            onClick={() => setViewStory(story)}
            key={index}
            className={`relative rounded-2xl shadow-lg min-w-28 max-w-28 max-h-44 cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 group overflow-hidden`}
          >
            {/* User Profile Picture */}
            <div className="absolute top-3 left-3 z-10">
              <div className="size-10 bg-white rounded-full p-0.5 shadow-lg">
                <img
                  src={story.user.profile_picture}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>

            {/* Story Content */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <p className="text-white font-medium text-sm truncate mb-1 group-hover:text-amber-100 transition-colors">
                {story.user.full_name}
              </p>
              {story.content && (
                <p className="text-white/80 text-xs truncate max-w-full">
                  {story.content}
                </p>
              )}
            </div>

            {/* Time Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs font-medium text-white bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                {moment(story.createdAt).fromNow(true)}
              </span>
            </div>

            {/* Media Type Indicator */}
            <div className="absolute top-12 left-3 z-10">
              {story.media_type === "image" ? (
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Image className="w-3 h-3 text-white" />
                </div>
              ) : story.media_type === "video" ? (
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Media Content */}
            {story.media_type !== "text" && (
              <div className="absolute inset-0 z-1 rounded-2xl overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt="story"
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-90"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-90"
                    muted
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-200/50 transition-colors duration-300"></div>
          </div>
        ))}

        {/* Empty State for No Stories */}
        {stories.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>
              <p className="text-slate-600 font-medium">No stories yet</p>
              <p className="text-slate-400 text-sm mt-1">Be the first to share a story!</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Story Modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}

      {/* View Story Modal */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
};

export default StoriesBar;
