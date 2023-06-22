import React, { useEffect, useState } from "react";
import { Container, Box, TextField, Button, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { checkboxTruthyMapping } from "../utils";

export default function UserSettings(props) {
	const [formState, setFormState] = useState(props.settings);

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
    const resp = await fetch("http://localhost:3000/update_profile", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  return (
		<Box>
			{ (formState["vidlength"] || formState["vidlength"] === "") && 
				<form onSubmit={updateProfile} onChange={handleChange}>
					<FormControl>
						<InputLabel htmlFor="vidlength">Minimum Video Length</InputLabel>
						<Input type="number" name="vidlength" id="vidlength" aria-describedby="my-helper-text" defaultValue={formState["vidlength"]} />
						<FormHelperText id="my-helper-text">The minimum length of videos we'll show you.</FormHelperText>
						<FormGroup>
							<FormControlLabel control={<Checkbox name="gaming" checked={formState["gaming"]} defaultValue={checkboxTruthyMapping[formState["gaming"]]}/>} label="Gaming" />
							<FormControlLabel control={<Checkbox name="music" checked={formState["music"]} defaultValue={checkboxTruthyMapping[formState["music"]]}/>} label="Music" />
							<FormControlLabel control={<Checkbox name="other" checked={formState["other"]} defaultValue={checkboxTruthyMapping[formState["other"]]}/>} label="Other" />
						</FormGroup>
					</FormControl>
					<Button
						type="submit"
					>Update Filters</Button>
				</form>
			}
		</Box>
  );
}