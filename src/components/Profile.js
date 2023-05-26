import React, { useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";

export default function Profile() {
  const [minVideoTime, setMinVideoTime] = useState(0);
  const [filters, setFilters] = useState([]);

  const updateProfile = async () => {
    const resp = await fetch("http://localhost:3000/update_profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
  }

  return (
    <Container>
      <Box>
        <Box>
          <TextField  />
        </Box>
        <Box>
          <TextField />
        </Box>
        <Button onClick={updateProfile}>UPDATE</Button>
      </Box>
    </Container>
  );
}
