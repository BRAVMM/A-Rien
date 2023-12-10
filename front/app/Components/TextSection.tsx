import React from 'react';

interface TextSectionProps {
  title: string;
  content: string;
}

function TextSection({ title, content }: TextSectionProps) {
  return (
    <div className="text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 w-2/3 text-sm">{content}</p>
    </div>
  );
}

export default TextSection;
