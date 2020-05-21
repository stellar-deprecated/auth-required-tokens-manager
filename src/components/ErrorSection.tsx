import React from "react";

const ErrorSection = ({
  errorMessage,
  onClearError,
}: {
  errorMessage: string | null | undefined;
  onClearError: () => void;
}) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="notification is-danger is-light">
      <button className="delete" onClick={onClearError}></button>
      <strong>Oops, something went wrong:</strong> {errorMessage}
    </div>
  );
};

export default ErrorSection;
