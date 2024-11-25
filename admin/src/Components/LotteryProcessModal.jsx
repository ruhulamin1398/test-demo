import React, { useState } from 'react';

const LotteryProcessModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: "Processing" },
    { id: 2, label: "Sending to Blockchain" },
    { id: 3, label: "Sending to Database" },
    { id: 4, label: "Done" }
  ];

  // Proceed to the next step
  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onClose(); // Close the modal when done
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-1/3">
          <h2 className="text-2xl font-bold mb-4">Lottery Creation Process</h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex items-center ${
                  step >= s.id ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center mr-4 ${
                    step >= s.id ? 'bg-green-600 text-white' : 'bg-gray-300'
                  }`}
                >
                  {step > s.id ? '✓' : s.id}
                </div>
                <span className="text-lg">{s.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {step < steps.length ? 'Next' : 'Close'}
          </button>
        </div>
      </div>
    )
  );
};

export default LotteryProcessModal;
