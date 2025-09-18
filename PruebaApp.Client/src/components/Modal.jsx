function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold transition-colors duration-200"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Content */}
        <div className="space-y-6 text-center">
          {children}
          {/* Ensure images are centered */}
          <style>
            {`
              img, iframe {
                display: block;
                margin-left: auto;
                margin-right: auto;
              }

              
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default Modal;


