import React, { useState } from "react";
import { Container, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Thumbnail.css";
import { getDomain } from "../utils";

export default function Thumbnail(props=null) {
	const [id] = useState(props.id);
	const [video] = useState(props.video);
	const [search] = useState(props.search);
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
			await fetch(`${getDomain()}:3000/video_clicked`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({id: id, clickedVideo: video, search: search}),
			});
		} catch {
			console.log(":)");
		}

		navigate(`/watch?id=${id}`);
	}

	return (
	<Container>
		{video ? (
			<Link onClick={handleClick} href={"/watch?id=" + id}>
				<Box>  
					<img src={video["thumbnail"]} />
					<Typography className="thumbnail-duration">{duration}</Typography>
					<Typography className="thumbnail-text">{video["channelTitle"]}</Typography>
					<Typography className="thumbnail-text thumbnail-title">{video["videoTitle"]}</Typography>
				</Box>
			</Link>
		) :  <Box></Box>}
	</Container>
	);
}