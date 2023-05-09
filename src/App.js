import React, { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import YouTubeData from "./components/YoutubeData";
import { Button } from "@mui/material";

function App() {
  const [authUrl, setAuthUrl] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const response = await fetch("http://localhost:3000/auth");
      const data = await response.json();
      if (data) {
        setAuthenticated(true);
      }
      setAuthUrl(data.auth_url);
    };

    fetchAuthUrl();
  }, []);

  const logout = async () => {
    console.log("HERE");
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setAuthenticated(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {authenticated ? (
          <div>
            <YouTubeData />
            <Button onClick={logout}>Log Out</Button>
          </div>
        ) : (
          authUrl && <LoginButton authUrl={authUrl} />
        )}
      </header>
    </div>
  );
}

export default App;
