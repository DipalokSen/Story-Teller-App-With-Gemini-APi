import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

export const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [storyState, setStoryState] = useState({
    genre: "",
    setting: "",
    characters: "",
    tone: "epic",
    storyContent: [],
    loading: false,
    error: null,
  });

  const updateStoryState = (newState) => {
    setStoryState((prev) => ({ ...prev, ...newState }));
  };

  const generateStory = async (initialPrompt = true, choice = null) => {
    updateStoryState({ loading: true, error: null });

    try {
      let prompt;
      if (initialPrompt) {
        prompt = `Generate the beginning of a ${storyState.tone} story in the ${storyState.genre} genre. 
        Setting: ${storyState.setting}. 
        Main characters: ${storyState.characters}.
        Start with an engaging introduction and end with a situation where the protagonist faces a choice.
        Present exactly TWO choices at the end in the format:
        CHOICE 1: [brief description of first option]
        CHOICE 2: [brief description of second option]`;
      } else {
        const previousContent = storyState.storyContent.map(item => {
          if (item.type === 'narrative') return item.content;
          if (item.type === 'choice' && item.selected) return `The protagonist chose: ${item.selected}`;
          return '';
        }).join('\n\n');

        prompt = `Continue this ${storyState.tone} story in the ${storyState.genre} genre.
        
        Previous story content:
        ${previousContent}
        
        The protagonist chose: ${choice}
        
        Continue the story based on this choice with the next scene. Then present a new situation where the protagonist faces another choice.
        Present exactly TWO choices at the end in the format:
        CHOICE 1: [brief description of first option]
        CHOICE 2: [brief description of second option]
        
        Make sure the story remains coherent and the tone stays ${storyState.tone}.`;
      }

      // Initialize the GoogleGenAI with the API key
      const ai = new GoogleGenAI({ apiKey: "AIzaSyDH6-st7ritojS9zl0mCqojZeI7DVkiqoY" });

      // Call the generateContent method
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Extract the generated text
      const generatedText = response.text;

      // Process the generated text
      const choiceRegex = /CHOICE 1: (.*)\nCHOICE 2: (.*)/s;
      const matches = generatedText.match(choiceRegex);

      if (matches && matches.length === 3) {
        const [fullMatch, choice1, choice2] = matches;
        const narrativeText = generatedText.replace(fullMatch, "").trim();

        let newStoryContent;
        if (initialPrompt) {
          newStoryContent = [
            { type: "narrative", content: narrativeText },
            { type: "choice", options: [choice1, choice2] }
          ];
        } else {
          newStoryContent = [
            ...storyState.storyContent,
            { type: "narrative", content: narrativeText },
            { type: "choice", options: [choice1, choice2] }
          ];
        }

        updateStoryState({
          storyContent: newStoryContent,
          loading: false
        });
      } else {
        updateStoryState({
          storyContent: initialPrompt 
            ? [{ type: "narrative", content: generatedText }] 
            : [...storyState.storyContent, { type: "narrative", content: generatedText }],
          loading: false
        });
      }
    } catch (error) {
      console.error("Error generating story:", error);
      updateStoryState({
        loading: false,
        error: "Failed to generate story. Please try again."
      });
    }
  };

  const makeChoice = async (choiceIndex, choiceText) => {
    // Update the last choice in the story with the selected option
    const updatedContent = [...storyState.storyContent];
    const lastChoiceIndex = updatedContent.findLastIndex(item => item.type === "choice");
    
    if (lastChoiceIndex !== -1) {
      updatedContent[lastChoiceIndex] = {
        ...updatedContent[lastChoiceIndex],
        selected: choiceText
      };
      
      updateStoryState({ storyContent: updatedContent });
      
      // Generate the next part of the story based on the choice
      await generateStory(false, choiceText);
    }
  };

  const startNewStory = () => {
    updateStoryState({
      storyContent: [],
      error: null
    });
  };

  const shareStory = () => {
    const storyText = storyState.storyContent
      .map(item => {
        if (item.type === "narrative") return item.content;
        if (item.type === "choice" && item.selected) return `Decision: ${item.selected}`;
        return "";
      })
      .filter(text => text !== "")
      .join("\n\n");

    navigator.clipboard.writeText(storyText)
      .then(() => {
        alert("Story copied to clipboard!");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <StoryContext.Provider
      value={{
        storyState,
        updateStoryState,
        generateStory,
        makeChoice,
        startNewStory,
        shareStory
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};