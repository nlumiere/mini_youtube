import React, { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import YouTubeData from "./components/YoutubeData";
import { Button } from "@mui/material";
import { useCookies } from 'react-cookie';

function App() {
  const [authUrl, setAuthUrl] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const response = await fetch("http://localhost:3000/auth");
      const data = await response.json();
      if (data) {
        setAuthUrl(data.auth_url);
      }
    };
    fetchAuthUrl();

    const ping = async () => {
      const resp = await fetch("http://localhost:3000/ping", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        setAuthenticated(true);
      }
    };
    ping();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetch("http://localhost:3000/firstpass", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [authenticated]);

  const logout = async () => {
    console.log("HERE");
    const resp = await fetch("http://localhost:3000/logout", {
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
        {!authenticated ? <h1>HI</h1> : <></>}
      </header>
    </div>
  );
}

export default App;
