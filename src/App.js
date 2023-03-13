import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  
  const [responseData, setResponseData] = useState(null);

  const login = () => {
    return
  }

  const loadFromServer = () => {
    axios({
      method: "GET",
      url:"/login",
    }).then((response) => {
      setResponseData({
        datum: response.data
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  return (
    <div className="App">
      <button onClick={loadFromServer}>HI</button>
      {
        responseData && <div>{responseData.datum}</div>
      }
    </div>
  );
}

export default App;
