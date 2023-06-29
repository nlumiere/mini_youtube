import { Button, Link } from "@mui/material";
import React from "react";

const LoginButton = ({ authUrl }) => {
  return (
    <div>
      <Link color="inherit" href={authUrl} className="btn btn-primary">
        Login with Google 
      </Link>
    </div>
  );
};

export default LoginButton;
