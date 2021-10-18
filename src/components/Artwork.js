import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useArtworkStyles = makeStyles(theme => ({
  container: {},
  largeCircle: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    borderRadius: '100%',
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    opacity: 0.5,
    background:
      'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 75%)'
  },
  smallCircle: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    marginLeft: '-25px',
    borderRadius: '100%',
    position: 'absolute',
    top: '7.5%',
    right: '7.5%',
    backgroundColor: '#e7e8f4',
    boxShadow: '-15px 15px 3px rgba(0,0,0,0.2)'
  }
}));

export default function Artwork() {
  const classes = useArtworkStyles();
  return (
    <Box className={classes.container} bgcolor={''}>
      <div className={classes.largeCircle}>
        <div className={classes.smallCircle} />
      </div>
    </Box>
  );
}
