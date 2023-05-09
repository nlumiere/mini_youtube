import React, { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Profile from "./Profile";

const YouTubeData = () => {
  const [youtubeData, setYoutubeData] = useState(null);
  const getVideos = async () => {
    await fetch("http://localhost:3000/firstpass", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setYoutubeData(data);
      });
  };

  const ping = async () => {
    const resp = await fetch("http://localhost:3000/ping", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
  };

  return (
    <div>
      {!youtubeData && (
        <Container>
          <Box>
            <Profile />
            <Button onClick={getVideos}>GET VEEDO</Button>
            <Button onClick={ping}>PING</Button>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default YouTubeData;
