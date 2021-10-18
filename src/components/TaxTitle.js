import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useTitleStyles = makeStyles(() => ({
  title: {
    lineHeight: '1em'
  }
}));

export default function TaxTitle({ style }) {
  const classes = useTitleStyles();
  return (
    <Box component="div" style={style}>
      <Box m={7} mb={20}>
        <Box
          className={classes.title}
          component="h1"
          mb={1}
          color={'white'}
          fontSize={48}
        >
          Tax-o-tron
        </Box>
        <Box component="span" color={'white'}>
          The free and simple online tax calculator.
        </Box>
      </Box>
    </Box>
  );
}
