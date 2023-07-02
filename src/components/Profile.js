import React, { useState } from "react";
import UserSettings from "./UserSettings";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDomain } from "../utils";

export default function Profile() {
  const empty = {};
  const [settings, setSettings] = useState(empty);
  const navigate = useNavigate();

  const setProfile = async () => {
    await fetch(`${getDomain()}:3000/get_profile`, {
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
    }).catch(() => {
      navigate("/verify");
    });
  }

  if (settings === empty) {
    setProfile();
  }

  const deleteData = async () => {
    await fetch(`${getDomain()}:3000/delete_data`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      navigate("/verify");
    })
  }

  return (
    <Container>
      <UserSettings settings={settings}/>
      <Button onClick={deleteData}>Delete Data</Button>
    </Container>
  )
}
