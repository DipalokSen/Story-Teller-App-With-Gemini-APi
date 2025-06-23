import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoryContext } from "../context/StoryContext";

function Navbar() {
  const { storyState } = useContext(StoryContext);
  
  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="font-bold text-xl text-white">AI Storyteller</span>
          </Link>
          <div className="text-white">
            {storyState.genre && (
              <span className="bg-purple-900 bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {storyState.genre}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
