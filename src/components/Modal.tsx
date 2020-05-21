import React from "react";

interface Props {
  isActive: Boolean;
  title: string;
  cancelCallback: () => void;
  confirmCallback: () => void;
  children?: React.ReactNode;
}

const Modal = ({
  isActive,
  title,
  cancelCallback,
  confirmCallback,
  children,
}: Props) => {
  let modalClass = "modal";
  if (isActive) {
    modalClass += " is-active";
  }

  return (
    <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={cancelCallback}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>{children}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-dark" onClick={confirmCallback}>
            Ok
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
