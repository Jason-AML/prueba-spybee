"use client"

import { useState } from "react";

export const ModalControl = ({ action, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn max-w-2xs lg:flex text-white items-center gap-2 bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105"
        onClick={() => setOpen(true)}
      >
        {action}
      </button>

      <dialog open={open} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-5xl">
          {children}
          <div className="modal-action">
            <button className="btn" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
