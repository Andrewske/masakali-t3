import React from 'react';
import { useXenditStore } from '~/stores/xenditStore';

const Modal: React.FC = () => {
  const { payerAuthUrl, showModal, setShowModal } = useXenditStore();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 h-screen w-full mx-auto bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full md:max-w- h-full bg-white p-5 rounded-lg m-4">
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
