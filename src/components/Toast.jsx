import { useEffect, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", action = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000); // auto hide 4s
  };

  // expose global
  useEffect(() => {
    window.showToast = addToast;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast align-items-center text-bg-${t.type} show mb-2`}
          role="alert"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="toast-body">{t.message}</div>
            <div className="d-flex align-items-center">
              {t.action && (
                <button
                  type="button"
                  className="btn btn-sm btn-link text-white me-2"
                  onClick={() => {
                    t.action();
                    removeToast(t.id);
                  }}
                >
                  Undo
                </button>
              )}
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => removeToast(t.id)}
              ></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
