import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import Navbar from "./components/Navbar";
import { StoryProvider } from "./context/StoryContext";
import "./App.css";

function App() {
  return (
    <StoryProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-900 text-white">
          <Navbar />
          <div className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/story" element={<StoryPage />} />
            </Routes>
          </div>
          <footer className="py-4 text-center text-slate-400 bg-slate-800">
            <p>© 2025 AI Storyteller - Craft your adventure</p>
          </footer>
        </div>
      </Router>
    </StoryProvider>
  );
}

export default App;