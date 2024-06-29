import { useState } from 'react';

const CookieNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <p>
          This site requires third-party cookies to function properly. Please enable third-party cookies in your browser settings.
        </p>
        <button onClick={handleClose} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CookieNotification;
