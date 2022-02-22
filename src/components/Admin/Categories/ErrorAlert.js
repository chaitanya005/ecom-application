import React from "react";

const ErrorAlert = ({ msg }) => {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {msg}
      </div>
    </div>
  );
};

export default ErrorAlert;
