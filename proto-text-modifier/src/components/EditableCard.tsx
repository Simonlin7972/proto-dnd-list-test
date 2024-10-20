import React, { useState, useCallback } from 'react';
import '@fontsource/noto-sans-tc';
import '@fontsource/noto-serif-tc';
import '@fontsource/roboto';
// import './styles/globals.css';


interface EditableCardProps {
  initialText?: string;
  onTextChange?: (text: string) => void;
  className?: string;
}

type FontFamily = 'Noto Sans TC' | 'Noto Serif TC' | 'Roboto';

const EditableCard: React.FC<EditableCardProps> = ({ initialText = '', onTextChange, className = '' }) => {
  const [text, setText] = useState(initialText);
  const [fontSize, setFontSize] = useState(24);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontFamily, setFontFamily] = useState<FontFamily>('Noto Sans TC');

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  }, [onTextChange]);

  const handleFontSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  }, []);

  const handleLetterSpacingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLetterSpacing(Number(e.target.value));
  }, []);

  const handleLineHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLineHeight(Number(e.target.value));
  }, []);

  const handleFontFamilyChange = useCallback((font: FontFamily) => {
    setFontFamily(font);
  }, []);

  const handleReset = useCallback(() => {
    setText(initialText);
    setFontSize(24);
    setLetterSpacing(0);
    setLineHeight(1.5);
    setFontFamily('Noto Sans TC');
    if (onTextChange) {
      onTextChange(initialText);
    }
  }, [initialText, onTextChange]);

  return (
    <div className={`${className} max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden`}>
      <div className="p-8">
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-32 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ 
            fontSize: `${fontSize}px`, 
            letterSpacing: `${letterSpacing}px`,
            lineHeight: lineHeight,
            fontFamily: fontFamily,
            overflow: text.split('\n').length > 2 ? 'hidden' : 'auto',
            whiteSpace: text.split('\n').length > 2 ? 'nowrap' : 'normal',
            textOverflow: text.split('\n').length > 2 ? 'ellipsis' : 'clip',
          }}
          placeholder="在此輸入文字，可以調整字體大小、字距、行高"
        />
      </div>
      <div className="px-8 py-4 space-y-4">
        <div className="space-y-2">
          {/* <span className="text-sm font-bold text-gray-700">字型</span> */}
          <div className="flex space-x-2">
            {['Noto Sans TC', 'Noto Serif TC', 'Roboto'].map((font) => (
              <button
                key={font}
                onClick={() => handleFontFamilyChange(font as FontFamily)}
                className={`flex-1 py-2 px-4 text-sm font-semibold rounded ${
                  fontFamily === font
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">字體大小</span>
            <span className="text-sm text-gray-600">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="48"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="space-y-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">字距</span>
            <span className="text-sm text-gray-600">{letterSpacing}px</span>
          </div>
          <input
            type="range"
            min="-2"
            max="50"
            step="0.5"
            value={letterSpacing}
            onChange={handleLetterSpacingChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="space-y-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">行高</span>
            <span className="text-sm text-gray-600">{lineHeight.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={lineHeight}
            onChange={handleLineHeightChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-md font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          重設
        </button>
      </div>
    </div>
  );
};

export default EditableCard;
