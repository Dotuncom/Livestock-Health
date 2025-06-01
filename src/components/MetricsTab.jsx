import React from 'react';

const MetricTabs = ({ options, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {options.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
            ${selected === tab
              ? 'bg-green-600 text-white border-green-700'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MetricTabs;
