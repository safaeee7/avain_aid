
import React from 'react';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-[60vh] text-center animate-fadeIn">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{title}</h1>
        <p className="mt-4 text-xl text-gray-500">Coming Soon</p>
      </div>
    </div>
  );
};

export default ComingSoonPage;