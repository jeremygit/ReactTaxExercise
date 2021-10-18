import React, { useContext } from 'react';
import {
  Paper,
  Box,
  FormControl,
  Button,
  TextField,
  Select,
  MenuItem,
  Link,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { TaxContext } from '../contexts/TaxContext';

const useFormStyles = makeStyles(theme => ({
  primaryAlert: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main
  },
  currencyInput: {
    '& > *': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },
  currencySymbol: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    boxSizing: 'content-box',
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2.3),
    paddingBottom: theme.spacing(2.3)
  },
  currencyDecimal: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    boxSizing: 'content-box',
    position: 'absolute',
    display: 'flex',
    right: 0,
    top: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2.3),
    paddingBottom: theme.spacing(2.3)
  },
  calculateButton: {
    textTransform: 'none'
  }
}));

export default function TaxForm({ style, disabled, onToggleCalculate }) {
  const classes = useFormStyles();

  // { updateIncome }
  const taxContext = useContext(TaxContext);

  const onCountryChange = evt => {
    taxContext.updateCountry(evt.target.value);
  };

  const onYearChange = evt => {
    taxContext.updateYear(evt.target.value);
  };

  const onIncomeChange = evt => {
    taxContext.updateIncome(evt.target.value);
  };

  const onCalculateClick = () => {
    onToggleCalculate();
  };

  const onBackClick = evt => {
    evt.preventDefault();
    onToggleCalculate();
  };

  return (
    <Box component="form" onSubmit={evt => evt.preventDefault()} style={style}>
      <Box m={1}>
        <Box component="h1">
          {disabled ? 'Your tax results' : 'Calculate your tax'}
        </Box>
      </Box>
      {!disabled && (
        <Box m={1}>
          <Paper elevation={4}>
            <Alert
              className={classes.primaryAlert}
              variant={'outlined'}
              severity={'info'}
              bgcolor={'white'}
            >
              Fields marked with * are mandatory
            </Alert>
          </Paper>
        </Box>
      )}
      <Box mx={1} mt={2}>
        <Box component="label" htmlFor={'country'} fontSize={'fontSize'}>
          Select your country of residence*
        </Box>
      </Box>
      <Box m={1}>
        <FormControl fullWidth required m={2}>
          <Select
            variant={'outlined'}
            value={taxContext.country}
            onChange={onCountryChange}
            disabled={disabled}
            inputProps={{
              name: 'country',
              id: 'country'
            }}
          >
            {taxContext.TaxCountrys.map(key => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box m={1} mt={2}>
        <Box component="label" htmlFor={'year'} fontSize={'fontSize'}>
          Select an income year*
        </Box>
      </Box>
      <Box m={1}>
        <FormControl fullWidth required>
          <Select
            variant={'outlined'}
            onChange={onYearChange}
            value={taxContext.year}
            disabled={disabled}
            inputProps={{
              name: 'year',
              id: 'year'
            }}
          >
            {taxContext.TaxYears.map((key, i) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box m={1} mt={2}>
        <Box component="label" htmlFor={'income'} fontSize={'fontSize'}>
          Enter your total taxable income*
        </Box>
      </Box>
      <Box m={1}>
        <FormControl fullWidth required>
          <Box className={classes.currencySymbol} component="span">
            $
          </Box>
          <Box className={classes.currencyDecimal} component="span">
            .00
          </Box>
          <TextField
            className={classes.currencyInput}
            variant={'outlined'}
            value={taxContext.income}
            onChange={onIncomeChange}
            disabled={disabled}
          />
        </FormControl>
      </Box>
      <Box m={1} mt={2}>
        {!disabled ? (
          <FormControl fullWidth>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={onCalculateClick}
            >
              <Box className={classes.calculateButton} py={1}>
                Calculate
              </Box>
            </Button>
          </FormControl>
        ) : (
          <Link href="#" onClick={onBackClick}>
            Go back to previous screen
          </Link>
        )}
      </Box>
    </Box>
  );
}
