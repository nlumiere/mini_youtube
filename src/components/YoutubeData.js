import React, { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Profile from "./Profile";
import Videos from "./Videos";

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

  const debug = async () => {
    const resp = await fetch("http://localhost:3000/debug", {
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
      {!youtubeData ? (
        <Container>
          <Box>
            <Profile />
            <Button onClick={getVideos}>GET VEEDO</Button>
            <Button onClick={debug}>DEBUG</Button>
          </Box>
        </Container>
      ) : <Videos bfo={youtubeData} />}
    </div>
  );
};

export default YouTubeData;
