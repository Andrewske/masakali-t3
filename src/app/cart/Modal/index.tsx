import React from 'react';
import { useXenditStore } from '~/stores/xenditStore';

const Modal: React.FC = () => {
  const { payerAuthUrl, showModal, setShowModal } = useXenditStore();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-3/4 h-full bg-white px-5 rounded-lg">
        <iframe
          src={payerAuthUrl || ''}
          className="w-full h-full border-none"
          title="3D Secure Authentication"
        />
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2.5 right-2.5"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
