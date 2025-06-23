import { useState } from "react";

const genres = [
  { name: "Fantasy", icon: "🧙‍♂️" },
  { name: "Sci-Fi", icon: "🚀" },
  { name: "Horror", icon: "👻" },
  { name: "Romance", icon: "❤️" },
  { name: "Mystery", icon: "🔍" },
  { name: "Adventure", icon: "🗺️" },
  { name: "Thriller", icon: "🔪" },
  { name: "Historical", icon: "📜" },
  { name: "Comedy", icon: "😂" },
];

function GenreSelector({ selectedGenre, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {genres.map((genre) => (
        <button
          key={genre.name}
          onClick={() => onSelect(genre.name)}
          className={`flex items-center justify-center p-3 rounded-lg transition-all ${
            selectedGenre === genre.name
              ? "bg-purple-600 text-white ring-2 ring-purple-400"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <span className="mr-2 text-xl">{genre.icon}</span>
          <span>{genre.name}</span>
        </button>
      ))}
    </div>
  );
}

export default GenreSelector;