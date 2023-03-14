import React from 'react';
import { Typography, Button } from '@mui/material';
import './startpage.css';
import AddUser from '../addUser/addUser';

function StartPage() {
  return (
    <div className="main">

      <Typography variant="h4" component="h1" className="heading">
        Welcome 
      </Typography>
      <AddUser/>
    </div>
  );
}

export default StartPage;