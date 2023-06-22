import React, { useEffect, useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Profile from "./Profile";
import Videos from "./Videos";

const YouTubeData = () => {
  const [youtubeData, setYoutubeData] = useState(null);

  const retrieveData = async () => {
    await fetch("http://localhost:3000/retrieveVideos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setYoutubeData(data);
    });
  }

  const getVideos = async () => {
    await fetch("http://localhost:3000/firstpass", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.status === 269) {
        retrieveData();
      }
    })
  };

  useEffect(() => {
    retrieveData();
  }, [])

  const debug = async () => {
    const resp = await fetch("http://localhost:3000/debug", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      {!youtubeData ? (
        <Container>
          <Box>
            <Profile />
            <Button onClick={getVideos}>LET'S GO</Button>
            <Button onClick={debug}>DEBUG</Button>
          </Box>
        </Container>
      ) : <Videos bfo={youtubeData} />}
    </div>
  );
};

export default YouTubeData;
