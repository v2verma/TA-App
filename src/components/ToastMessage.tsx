type toastProp = {
    message: string,
    handleClose: () => void
}

const ToastMessage = (props: toastProp) => {
  const { message, handleClose } = props;
  return (
    <div
      className="toast align-items-center text-white bg-success border-0 d-block"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}.</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
};

export default ToastMessage;
