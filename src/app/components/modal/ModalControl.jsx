"use client"

import { useState } from "react";

export const ModalControl = ({ action, children, color = "#00D3BB" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        style={{ backgroundColor: color }}
        className="btn lg:flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105"
        onClick={() => setOpen(true)}
      >
        {action}
      </button>

      <dialog open={open} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
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
