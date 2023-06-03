import React, { useState } from "react";
import { Container, Box, TextField, Button, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, FormGroup, Checkbox } from "@mui/material";

export default function Profile() {
  const [formState, setFormState] = useState({
    vidlength: 0,
    gaming: true,
    music: true,
    other: true
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.name === "vidlength" ? e.target.value : e.target.checked
    });
  };

  const setProfile = async () => {
    const resp = await fetch("http://localhost:3000/settings", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const updateProfile = async (event) => {
    event.preventDefault();
    console.log(formState);
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
    <Container>
      <Box>
        <form onSubmit={updateProfile} onChange={handleChange}>
          <FormControl>
            <InputLabel htmlFor="vidlength">Minimum Video Length</InputLabel>
            <Input type="number" name="vidlength" id="vidlength" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">The minimum length of videos we'll show you.</FormHelperText>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="gaming" defaultChecked/>} label="Gaming" />
              <FormControlLabel control={<Checkbox name="music" defaultChecked/>} label="Music" />
              <FormControlLabel control={<Checkbox name="other" defaultChecked/>} label="Other" />
            </FormGroup>
          </FormControl>
          <Button
            type="submit"
          >Update Filters</Button>
        </form>
      </Box>
    </Container>
  );
}
