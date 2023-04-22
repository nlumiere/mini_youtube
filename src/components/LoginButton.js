import React from "react";

const LoginButton = ({ authUrl }) => {
  return (
    <div>
      <a href={authUrl} className="btn btn-primary">
        Login with Google
      </a>
    </div>
  );
};

export default LoginButton;
