import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryContext } from "../context/StoryContext";
import GenreSelector from "../components/GenreSelector";
import ToneSelector from "../components/ToneSelector";

function HomePage() {
  const { storyState, updateStoryState, generateStory } = useContext(StoryContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");



  const [spinner, setspinner] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate inputs
    if (!storyState.genre || !storyState.setting || !storyState.characters) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      await generateStory(true);
      navigate("/story");
    } catch (error) {
      console.error("Error starting story:", error);
      setFormError("Failed to generate story. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            AI Storyteller
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Craft your own interactive adventure with the help of AI
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-slate-200">
                Genre
              </label>
              <GenreSelector 
                selectedGenre={storyState.genre}
                onSelect={(genre) => updateStoryState({ genre })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-slate-200">
                Setting
              </label>
              <input
                type="text"
                placeholder="Medieval kingdom, space station, haunted manor..."
                value={storyState.setting}
                onChange={(e) => updateStoryState({ setting: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-slate-200">
                Characters
              </label>
              <textarea
                placeholder="Describe your main character(s) and their traits..."
                value={storyState.characters}
                onChange={(e) => updateStoryState({ characters: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                rows="3"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-slate-200">
                Tone
              </label>
              <ToneSelector
                selectedTone={storyState.tone}
                onSelect={(tone) => updateStoryState({ tone })}
              />
            </div>

            {formError && (
              <div className="text-red-400 text-sm font-medium">{formError}</div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={!setspinner}
            >
                Begin Your Adventure
              </button>
            </div>
          </form>
        </div>

        <div className="text-slate-400 text-center p-4">
          <p>
            Create branching narratives where your choices matter. Each decision
            shapes the story's direction!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;