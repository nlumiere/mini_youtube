import React, { useState, useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import YouTubeData from "./components/YoutubeData";

function App() {
  const [authUrl, setAuthUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setAuthUrl(data.auth_url);
    };

    fetchAuthUrl();
  }, []);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (window.location.search) {
        const responseToken = new URLSearchParams(window.location.search).get(
          "accessToken"
        );
        if (responseToken) {
          setAccessToken(responseToken);
        }
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken ? (
          <div>
            <h2>{accessToken}</h2>
            <YouTubeData accessToken={accessToken} />
          </div>
        ) : (
          authUrl && <LoginButton authUrl={authUrl} />
        )}
      </header>
    </div>
  );
}

export default App;
