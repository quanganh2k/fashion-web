import { makeStyles } from '@mui/styles';


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: '100vh',
      overflow: 'hidden',
      background: 'url(https://i.pinimg.com/originals/c8/ec/cf/c8eccf05f95f95a0283ee2fef07298dd.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:before': {
        content: '""',
        position: 'absolute',
        height: '50%',
        width: '100%',
        background: '#0c0c0d',
        bottom: '0',
        left: '0',
      },
    },
    btn: {
      position: 'absolute',
    },
    notification: {
      zIndex: 10,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    page404: {
      fontSize: '5rem',
      color: '#fff',
      fontWeight: 'bold',
      zIndex: 10,
    },
    notificationTitle: {
      fontSize: '2.5rem',
      color: '#5f5f5f',
      fontWeight: 'bold',
      zIndex: 10,
    },
  };
});

const Page404 = () => {
  const classes = useStyles();
 
  const navigate = useNavigate();

  

  return (
    <div className={classes.container}>
      <div className={classes.notification}>
        <div className={classes.page404}>Error 404 !</div>
       
      </div>
    </div>
  );
};

export default Page404;
