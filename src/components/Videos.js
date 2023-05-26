import React, { useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import "./Thumbnail";
import Thumbnail from "./Thumbnail";

export default function Videos(props=null) {
  const [videosObject, setVideosObject] = useState(props.bfo);
  // console.log(videosObject)

  const rankVideos = () => {
    return;
  }

  return (
    <Container>
      { videosObject && videosObject[0][0] && (
        <Grid>
          {videosObject.map(function(item) {
            return (
              item.map(function(video) {
                return (
                  <Thumbnail video={video} />
                )
              })
            )
          })}
        </Grid>
      )}
    </Container>
  );
}