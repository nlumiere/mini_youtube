import React, { useState, useEffect } from "react";
import "./App.css";
import YouTubeData from "./components/YoutubeData";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";
import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import Profile from "./components/Profile";
import Videos from "./components/Videos";
import { getDomain } from "./utils";

export default function App() {
  const [authUrl, setAuthUrl] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchAuthUrl = async () => {
		const response = await fetch(`${getDomain()}:3000/auth`);
		const data = await response.json();
		if (data) {
			setAuthUrl(data.auth_url);
		}
	};

  const ping = async () => {
		const resp = await fetch(`${getDomain()}:3000/ping`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (resp.status === 200) {
			setAuthenticated(true);
		}
	};

	const logout = async () => {
    console.log("HERE");
    await fetch(`${getDomain()}:3000/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAuthenticated(false);
  };

	useEffect(() => {
		fetchAuthUrl();
		ping();
	}, []);

  useEffect(() => {
    if (authenticated) {
      fetch(`${getDomain()}:3000/firstpass`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [authenticated]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar authenticated={authenticated}>
            <nav>
              { !authenticated ?
                <LoginButton authUrl={authUrl} color="inherit"/>
                : <Button onClick={logout} color="inherit">Logout</Button>
              }
            </nav>
          </Navbar>
          <Routes>
            <Route path="/" element={authenticated && <YouTubeData />} />
            <Route path="/profile" element={authenticated && <Profile />} />
            <Route path="/search" element={authenticated && <SearchResults />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export function SearchResults() {
  const [searchResults, setSearchResults] = useState(null);
  const [numItems, setNumItems] = useState(0);
  const navigate = useNavigate();

  const getSearchResults = async () => {
    const params = new URLSearchParams(window.location.search);
    const items = parseInt(params.get("items"));
    setNumItems(items);
    await fetch(`${getDomain()}:3000/retrieveVideos`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
      return res.json();
    }).then((data) => {
      setSearchResults(data);
    }).catch(() => {
      navigate("/verify");
    });
  }

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <Box sx={{marginTop: "100px"}}>
      {searchResults && <Videos bfo={searchResults} search={numItems} />}
    </Box>
  )
}

export function Watch() {
  return (
    <iframe src={"https://www.youtube.com/embed/" + (new URLSearchParams(window.location.search)).get("id") + "?autoplay=1"} allow="autoplay" allowFullScreen></iframe>
  )
}

export function Verify() {
  const [inputState, setInputState] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`${getDomain()}:3000/verify-user`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
      body: JSON.stringify({passphrase: inputState})
		}).then(res => {
      if (res.status === 200) {
        navigate("/");
      }
    }).catch(() => {
      console.log("No :)");
    });
  }

  const handleChange = (event) => {
    setInputState(event.target.value);
  }

  const getIsVerified = async () => {
    await fetch(`${getDomain()}:3000/check-verified`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			}
		}).then(res => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  }

  useEffect(() => {
    getIsVerified();
  }, []);

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <FormControl>
        <InputLabel sx={{color:"white"}} htmlFor="vidlength" className="whitetext">Account Key</InputLabel>
        <Input sx={{color:"white"}} type="text" name="passphrase" id="passphrase" aria-describedby="my-helper-text" className="whitetext"/>
        <FormHelperText sx={{color:"white"}} id="my-helper-text" className="whitetext">This app is in closed alpha. Please input the unique key to grant access.</FormHelperText>
      </FormControl>
      <Button
        type="submit"
      >Submit</Button>
    </form>
  )
}
