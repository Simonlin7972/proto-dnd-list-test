import React, { useState } from 'react';
import './styles/globals.css';
import EditableCard from './components/EditableCard';

function App() {
  const [title, setTitle] = useState("請在這邊輸入文字，可以調整字體大小、字距、行高");

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div className="App bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <EditableCard
          initialText={title}
          onTextChange={handleTitleChange}
          className="text-3xl font-bold mb-6 text-center"
        />
      </div>
    </div>
  );
}

export default App;