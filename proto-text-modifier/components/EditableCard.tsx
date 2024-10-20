import React, { useState, useRef, useEffect } from 'react';

interface EditableCardProps {
  initialText: string;
  onTextChange?: (text: string) => void;
  className?: string;
}

const EditableCard: React.FC<EditableCardProps> = ({ initialText, onTextChange, className = '' }) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div className={`${className} ${!className.includes('max-w-sm') ? 'max-w-sm' : ''} mx-auto bg-white shadow-lg rounded-lg overflow-hidden`}>
      <div className="p-6">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            style={{ minHeight: '2em' }}
            autoFocus
          />
        ) : (
          <p
            ref={textRef}
            onClick={handleClick}
            className={`cursor-text ${className}`}
          >
            {text || '點擊編輯文字'}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditableCard;
