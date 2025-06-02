import { useState, useEffect } from 'react';

type DiscountModalProps = {
  submitDiscountCode: (discountCode: string) => void;
};

const DiscountModal: React.FC<DiscountModalProps> = ({
  submitDiscountCode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === '?') {
        setShowModal(true);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

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
        <div className="flex flex-col h-full justify-center align-middle gap-4">
          <h2 className="text-center">Enter Discount Code</h2>
          <input
            type="text"
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-[200px] border-0 rounded p-1 shadow-light-purple mx-auto"
          />
          <button
            type="button"
            onClick={() => submitDiscountCode(discountCode)}
          >
            Submit
          </button>
        </div>
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

export default DiscountModal;
