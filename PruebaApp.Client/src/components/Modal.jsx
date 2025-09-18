function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        {/* Contenido dinámico */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
