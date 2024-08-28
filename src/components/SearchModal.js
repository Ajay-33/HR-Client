import React from "react";

const SearchModal = ({ isOpen, onClose, query, onCopy, onSave, onOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-8 w-1/2">
        <h2 className="text-xl font-semibold mb-4">Your Search Query</h2>
        <p className="mb-4">
          Copy, save or open the search string in Google and find the right candidates.
        </p>
        <input
          type="text"
          value={query}
          readOnly
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCopy}
            className="bg-gray-200 p-2 rounded-lg text-gray-700 hover:bg-gray-300"
          >
            Copy URL
          </button>
          <button
            onClick={onSave}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
          >
            Save Search
          </button>
          <button
            onClick={onOpen}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            Open in Google
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-5 right-4 text-gray-700 hover:text-gray-900 text-3xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
