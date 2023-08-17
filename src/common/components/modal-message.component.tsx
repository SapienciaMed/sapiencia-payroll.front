import React, { useContext, useRef } from "react";
import { AppContext } from "../contexts/app.context";
import useOnClickOutside from "../hooks/click-outside.hook";
import cancelIcon from "../../public/images/icons/cancel.png";
import okIcon from "../../public/images/icons/ok.png";

function ModalMessageComponent(): React.JSX.Element {
  // Services
  const { message, setMessage } = useContext(AppContext);
  const modal = useRef(null);
  const handleClickOutsideFn = () => {
    setMessage((prev) => ({ ...prev, show: false }));
  };
  useOnClickOutside(
    modal,
    message.onClickOutClose ? handleClickOutsideFn : () => {}
  );

  const closeModal = () => {
    setMessage((prev) => ({ ...prev, show: false }));
  };

  const renderCancelButton = () => {
    if (message.cancelTitle) {
      return (
        <button
          className={`${message.OkButtonStyle ? message.OkButtonStyle : "button-cancel medium"}`}
          onClick={message.onCancel || closeModal}
        >
          {message.cancelTitle}
          {/* <img className="icons" src={cancelIcon} alt="Cancel" /> */}
        </button>
      );
    }
    return null;
  };

  const renderOkButton = () => {
    if (message.OkTitle) {
      return (
        <button
          className={`${message.OkButtonStyle ? message.OkButtonStyle : "button-ok medium"}`}
          onClick={message.onOk || closeModal}
        >
          {message.OkTitle}
          {/* <img className="icons" src={okIcon} alt="OK" /> */}
        </button>
      );
    }
    return null;
  };

  return (
    <div
      className={`modal ${message.background ? "modal-bg" : ""} ${
        message.show ? "is-open" : "modal-close"
      }`}
    >
      <div
        ref={modal}
        className={`modal-container ${message.size ? message.size : ""} ${
          message.style ? message.style : ""
        }`}
      >
        <div className="modal-header">
          <button
            className={`close button-close tiny hover-three`}
            onClick={message.onClose || closeModal}
          >
            X
          </button>
          <p className="text-black huge">{message?.title}</p>
        </div>
        <div className="modal-content">
          {typeof message.description !== "string" ? (
            message?.description
          ) : (
            <p className="text-black large">{message.description}</p>
          )}
        </div>
        <div className="modal-footer">
          {renderCancelButton()}
          {renderOkButton()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ModalMessageComponent);
