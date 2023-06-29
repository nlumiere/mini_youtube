import { React, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 

export default function Navbar(props) {
	const [searchValue, setSearchValue] = useState(null);
	const navigate = useNavigate();

	const handleUpdate = (event) => {
		setSearchValue(event.target.value);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		event.persist();
		const query = searchValue;
		await fetch("http://localhost:3000/logSearchResults", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({query: query}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		navigate(`/search?q=${escape(query)}`)
	}

  return (
    <Box sx={{ width: "100%", position: "fixed", marginBottom: "10px", top: 0}}>
      <AppBar position="static">
        <Toolbar>
					<Link to="/">
						Home
					</Link>
					<Link to="/profile">
						Profile
					</Link>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'black'}}
          >
						<MenuIcon />
          </IconButton> */}
					<form onSubmit={handleSubmit}>
						<FormControl>
							<InputLabel htmlFor="query" sx={{color:"inherit"}}>Search</InputLabel>
							<Input type="text" name="query" id="query" onChange={handleUpdate} sx={{color:"inherit"}}/>
						</FormControl>
						<Button
							type="submit"
						><SearchIcon /></Button>
					</form>
					<Box sx={{ position: "fixed", right: 20}}>
						{props.children}
					</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
