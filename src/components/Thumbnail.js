import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";

export default function Thumbnail(props=null) {
	console.log(props)
	const [video, setVideo] = useState(props.video);
	const id = video["id"];
	const snippet = video["snippet"];
	return (
	<Container>
		{video ? (
			<Box>  
				<img src={video["snippet"]["thumbnails"]["default"]["url"]} />
				<Typography>{video["snippet"]["channelTitle"]}</Typography>
				<Typography>{video["snippet"]["title"]}</Typography>
			</Box>
		) :  <Box></Box>}
	</Container>
	);
}