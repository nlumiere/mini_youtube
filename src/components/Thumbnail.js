import React, { useState } from "react";
import { Container, Box, Typography, duration, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Thumbnail(props=null) {
	const [id] = useState(props.id);
	const [video] = useState(props.video);
	const navigate = useNavigate();

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

	const duration = getDuration(video["videoLength"]);

	const handleClick = async (event) => {
		event.preventDefault();
		event.persist();

		try {
			await fetch("http://localhost:3000/video_clicked", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({id: id, clickedVideo: video}),
			});
		} catch {
			console.log(":)");
		}

		navigate(`/watch?id=${id}`);
	}

	return (
	<Container>
		{video ? (
			// until I can keep it in-app
			<Link onClick={handleClick} href={"/watch?id=" + id}>
				<Box>  
					<img src={video["thumbnail"]} />
					<Typography>{video["channelTitle"]}</Typography>
					<Typography>{video["videoTitle"]}</Typography>
					<Typography>{duration}</Typography>
				</Box>
			</Link>
		) :  <Box></Box>}
	</Container>
	);
}