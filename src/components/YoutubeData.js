import React, { useEffect, useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Profile from "./Profile";
import Videos from "./Videos";
import { useNavigate } from "react-router-dom";
import { getDomain } from "../utils";

const YouTubeData = () => {
  const [youtubeData, setYoutubeData] = useState(null);
  const navigate = useNavigate();

  const retrieveData = async () => {
    await fetch(`${getDomain()}:3000/retrieveVideos`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setYoutubeData(data);
    }).catch(() => {
      navigate("/verify");
    });
  }

  const getVideos = async () => {
    await fetch(`${getDomain()}:3000/firstpass`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.status === 269) {
        retrieveData();
      } else if (res.status === 200) {
        alert("Update filters before retrieving videos.");
      }
    }).catch(() => {
      navigate("/verify");
    });
  };

  useEffect(() => {
    retrieveData();
  }, [])

  const debug = async () => {
    await fetch(`${getDomain()}:3000/debug`, {
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
            <Button sx={{fontSize:"20px"}} onClick={getVideos}>LET'S GO</Button>
          </Box>
        </Container>
      ) : <Box sx={{marginTop: "100px"}}><Videos bfo={youtubeData} search={false} /></Box>}
    </div>
  );
};

export default YouTubeData;
