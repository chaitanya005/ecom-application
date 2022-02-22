import React from "react";

const ErrorMessages = ({ msg }) => {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {msg}
      </div>
    </div>
  );
};

export default ErrorMessages;
