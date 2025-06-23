const tones = [
  { value: "epic", label: "Epic", description: "Grand, heroic, larger than life" },
  { value: "whimsical", label: "Whimsical", description: "Playful, quirky, magical" },
  { value: "dark", label: "Dark", description: "Gloomy, ominous, foreboding" },
  { value: "comedic", label: "Comedic", description: "Funny, humorous, lighthearted" },
  { value: "dramatic", label: "Dramatic", description: "Intense, emotional, powerful" },
];

function ToneSelector({ selectedTone, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tones.map((tone) => (
        <div
          key={tone.value}
          onClick={() => onSelect(tone.value)}
          className={`flex flex-col p-4 rounded-lg cursor-pointer transition-all ${
            selectedTone === tone.value
              ? "bg-purple-600 text-white ring-2 ring-purple-400"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <span className="font-medium text-lg">{tone.label}</span>
          <span className="text-sm opacity-80">{tone.description}</span>
        </div>
      ))}
    </div>
  );
}

export default ToneSelector;