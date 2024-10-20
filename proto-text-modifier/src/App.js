import React, { useState } from 'react';
import './styles/globals.css';
import EditableCard from './components/EditableCard';
import '@fontsource/noto-sans-tc';
import '@fontsource/noto-serif-tc';
import '@fontsource/roboto';

function App() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div className="App bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <EditableCard
          initialText={title}
          onTextChange={handleTitleChange}
          className="text-3xl font-bold text-black mb-6 text-center"
        />
      </div>
    </div>
  );
}

export default App;
