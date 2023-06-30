import React, { useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import "./Thumbnail";
import Thumbnail from "./Thumbnail";

export default function Videos(props) {
  const [videosObject, setVideosObject] = useState(props.bfo);
  console.log(videosObject)

  return (
    <Container>
      { videosObject && (
        <Grid container spacing={2}>
          {videosObject.map(function(video) {
            if (video !== null) {
              return (
                <Grid item xs={4}>
                  <Thumbnail id={Object.keys(video)[1]} video={video[Object.keys(video)[1]]} search={props.search} />
                </Grid>
              )
            }
          })}
        </Grid>
      )}
    </Container>
  );
}