const Loading = ({ height = "100vh", size = "medium" }) => {
  // Size variants
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
    xl: "w-20 h-20 border-4"
  };

  return (
    <div
      style={{ height }}
      className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Amber Spinner */}
        <div
          className={`rounded-full border-amber-500 border-t-transparent animate-spin ${sizeClasses[size]}`}
        ></div>
        
        {/* Optional Loading Text */}
        <div className="text-center space-y-2">
          <p className="text-slate-600 font-medium text-sm">Loading amazing content</p>
          <div className="flex items-center justify-center gap-1">
            <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-150"></div>
            <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
