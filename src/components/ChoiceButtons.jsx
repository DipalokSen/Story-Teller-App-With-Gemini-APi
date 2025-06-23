function ChoiceButtons({ choices, onSelect }) {
  return (
    <div className="flex flex-col gap-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(index, choice)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-left"
        >
          {choice}
        </button>
      ))}
    </div>
  );
}

export default ChoiceButtons;