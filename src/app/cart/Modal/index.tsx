import React from 'react';
import { useXenditStore } from '~/stores/xenditStore';

const Modal: React.FC = () => {
  const { payerAuthUrl, showModal, setShowModal } = useXenditStore();

  if (!showModal) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '600px',
          height: '400px',
          backgroundColor: '#FFF',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <iframe
          src={payerAuthUrl || ''}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="3D Secure Authentication"
        />
        <button
          onClick={() => setShowModal(false)}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
