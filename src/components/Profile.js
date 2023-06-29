import React, { useState } from "react";
import UserSettings from "./UserSettings";
import { Button, Container } from "@mui/material";
export default function Profile() {
  const empty = {};
  const [settings, setSettings] = useState(empty);

  const setProfile = async () => {
    await fetch("http://localhost:3000/get_profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setSettings(data);
    });
  }

  if (settings === empty) {
    setProfile();
  }

  const deleteData = async () => {
    await fetch("http://localhost:3000/delete_data", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Container>
      <UserSettings settings={settings}/>
      <Button onClick={deleteData}>Delete Data</Button>
    </Container>
  )
}
