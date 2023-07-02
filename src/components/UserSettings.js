import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { checkboxTruthyMapping, getDomain } from "../utils";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UserSettings(props) {
	const [formState, setFormState] = useState(props.settings);
	const navigate = useNavigate();

	useEffect(() => {
		setFormState(props.settings);
	}, [props.settings]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.name === "vidlength" ? e.target.value : e.target.checked
		});
  };

	const updateProfile = async (event) => {
    event.preventDefault();
    await fetch(`${getDomain()}:3000/update_profile`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
			navigate("/verify");
		})
  }
  
  return (
		<Box>
			{ (formState["vidlength"] || formState["vidlength"] === "") && 
				<form onSubmit={updateProfile} onChange={handleChange}>
					<FormControl sx={{color:"white"}}>
						<InputLabel sx={{color:"white"}} htmlFor="vidlength" className="whitetext">Minimum Video Length</InputLabel>
						<Input sx={{color:"white"}} type="number" name="vidlength" id="vidlength" aria-describedby="my-helper-text" defaultValue={formState["vidlength"]} className="whitetext"/>
						<FormHelperText sx={{color:"white", marginBottom: "10px"}} id="my-helper-text" className="whitetext">The minimum length of videos we'll show you.</FormHelperText>
						<FormGroup>
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="gaming" checked={formState["gaming"]} defaultValue={checkboxTruthyMapping[formState["gaming"]]}/>} label="Gaming" />
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="music" checked={formState["music"]} defaultValue={checkboxTruthyMapping[formState["music"]]}/>} label="Music" />
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="sports" checked={formState["sports"]} defaultValue={checkboxTruthyMapping[formState["sports"]]}/>} label="Sports" />
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="comedy" checked={formState["comedy"]} defaultValue={checkboxTruthyMapping[formState["comedy"]]}/>} label="Comedy" />
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="news" checked={formState["news"]} defaultValue={checkboxTruthyMapping[formState["news"]]}/>} label="News" />
							<FormControlLabel control={<Checkbox sx={{color:"#cccccc"}} name="animals" checked={formState["animals"]} defaultValue={checkboxTruthyMapping[formState["animals"]]}/>} label="Animals" />
						</FormGroup>
					</FormControl>
					<br />
					<Button
						type="submit"
					>Update Filters</Button>
				</form>
			}
		</Box>
  );
}