import React, { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Profile from "./Profile";

const YouTubeData = (accessToken) => {
  const [youtubeData, setYoutubeData] = useState(null);
  const getVideos = async () => {
    await fetch("http://localhost:3000/firstpass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: accessToken }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setYoutubeData(data);
      });
  };

  return (
    <div>
      {!youtubeData && (
        <Container>
          <Box>
            <Profile />
            <Button onClick={getVideos}>GET VEEDO</Button>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default YouTubeData;
