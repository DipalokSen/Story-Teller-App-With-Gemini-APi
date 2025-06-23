import { useContext } from "react";
import { StoryContext } from "../context/StoryContext";
import ChoiceButtons from "./ChoiceButtons";

function StoryElement({ element, index }) {
  const { storyState, makeChoice } = useContext(StoryContext);

  if (element.type === "narrative") {
    return (
      <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
        <div className="prose prose-invert max-w-none">
          {element.content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  } else if (element.type === "choice") {
    if (element.selected) {
      return (
        <div className="bg-purple-900 bg-opacity-50 rounded-lg p-4 border border-purple-700">
          <p className="font-medium text-center">
            Decision: <span className="text-purple-300">{element.selected}</span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-center">What will you do?</h3>
          <ChoiceButtons
            choices={element.options}
            onSelect={(choice, choiceText) => makeChoice(choice, choiceText)}
          />
        </div>
      );
    }
  }
  
  return null;
}

export default StoryElement;