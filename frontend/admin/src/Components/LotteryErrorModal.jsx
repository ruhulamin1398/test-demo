import React from 'react';

function LotteryErrorModal({ onRetry, onClose , text}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-6">
         { text}
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Retry
        </button>
        {/* <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button> */}
      </div>
    </div>
  );
}

export default LotteryErrorModal;
