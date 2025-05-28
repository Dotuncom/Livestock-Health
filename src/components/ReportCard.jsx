// src/components/available-vets/view-more-button.jsx
import React from 'react';

export default function ViewMoreButton({ onClick }) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onClick}
        className="border px-4 py-1 rounded border-green-700 text-green-700"
      >
        View more
      </button>
    </div>
  );
}
