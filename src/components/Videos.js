import React, { useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import "./Thumbnail";
import Thumbnail from "./Thumbnail";

export default function Videos(props=null) {
  const [videosObject, setVideosObject] = useState(props.bfo);

  const rankVideos = () => {
    return;
  }

  return (
    <Container>
      { videosObject && videosObject[0] && (
        <Grid container spacing={2}>
          {videosObject.map(function(video) {
            return (
              <Grid item xs={4}>
                <Thumbnail video={video} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Container>
  );
}