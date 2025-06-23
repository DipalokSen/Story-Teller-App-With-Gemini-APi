import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoryContext } from "../context/StoryContext";
import StoryElement from "../components/StoryElement";
import ChoiceButtons from "../components/ChoiceButtons";
import LoadingSpinner from "../components/LoadingSpinner";

function StoryPage() {
  const { storyState, startNewStory, shareStory } = useContext(StoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If there's no story content, redirect to home
    if (!storyState.storyContent.length && !storyState.loading) {
      navigate("/");
    }
  }, [storyState.storyContent, storyState.loading, navigate]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Your Adventure
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              startNewStory();
              navigate("/");
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            New Story
          </button>
          <button
            onClick={shareStory}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            Share Story
          </button>
        </div>
      </div>

      {storyState.error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded mb-6">
          {storyState.error}
        </div>
      )}

      <div className="space-y-8 mb-12">
        {storyState.storyContent.map((element, index) => (
          <StoryElement key={index} element={element} index={index} />
        ))}
      </div>

      {storyState.loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      <div className="mt-8 text-center text-slate-400">
        <p>Your choices shape this story. Choose wisely!</p>
      </div>
    </div>
  );
}

export default StoryPage;