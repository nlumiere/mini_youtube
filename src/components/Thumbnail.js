import React, { useState } from "react";
import { Container, Box, Typography, duration, Link } from "@mui/material";

export default function Thumbnail(props=null) {
	const [video] = useState(props.video);
	const id = video["id"];
	const snippet = video["snippet"];

	const getDuration = (durationString) => {
		const hoursMatch = durationString.match(/(\d+)H/);
		const minutesMatch = durationString.match(/(\d+)M/);
		const secondsMatch = durationString.match(/(\d+)S/);

		const hours = hoursMatch ? hoursMatch[1] : "";
		const minutes = minutesMatch ? minutesMatch[1] : "00";
		const hourlessMinutes = minutesMatch ? minutesMatch[1] : "0";
		let seconds = secondsMatch ? secondsMatch[1] : "00";
		if (seconds.length == 1) {
			seconds = "0" + seconds;
		}

		return hours ? hours + ":" + minutes + ":" + seconds : hourlessMinutes + ":" + seconds;
	}

	const duration = getDuration(video["contentDetails"]["duration"]);

	return (
	<Container>
		{video ? (
			// until I can keep it in-app
			<Link href={"https://www.youtube.com/watch?v=" + video["id"]}>
				<Box>  
					<img src={video["snippet"]["thumbnails"]["default"]["url"]} />
					<Typography>{video["snippet"]["channelTitle"]}</Typography>
					<Typography>{video["snippet"]["title"]}</Typography>
					<Typography>{duration}</Typography>
				</Box>
			</Link>
		) :  <Box></Box>}
	</Container>
	);
}