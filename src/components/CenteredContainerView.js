import React from 'react';

import { Grid, Paper, Box, makeStyles } from '@material-ui/core';

const useCenteredContainerStyle = makeStyles(() => ({
  container: {
    height: '100%'
  }
}));

export default function CenteredContainerView({ children }) {
  const classes = useCenteredContainerStyle();

  return (
    <Grid
      className={classes.container}
      container
      justifyContent={'center'}
      alignContent={'center'}
      spacing={0}
    >
      <Grid item xs={12}>
        <Box m={2}>
          <Paper>
            <Box p={5}>{children}</Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
