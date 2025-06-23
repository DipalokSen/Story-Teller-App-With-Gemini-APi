


function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-purple-400 animate-pulse">Crafting your story...</p>
    </div>
  );
}

export default LoadingSpinner;