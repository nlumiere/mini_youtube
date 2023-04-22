import React, { useState } from "react";
import { Container, Box, TextField, Switch } from "@mui/material";

export default function Profile() {
  const [minVideoTime, setMinVideoTime] = useState(0);
  const [filters, setFilters] = useState([]);

  return (
    <Container>
      <Box>
        <TextField />
      </Box>
      <Box>
        <TextField />
      </Box>
    </Container>
  );
}
