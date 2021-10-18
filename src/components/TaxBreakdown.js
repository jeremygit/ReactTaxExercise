import React, { useContext, useMemo } from 'react';

import { Box, makeStyles } from '@material-ui/core';

import TaxUtil from '../utils/TaxUtil';
import { TaxContext } from '../contexts/TaxContext';

const useBreakdownStyles = makeStyles(theme => ({
  total: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  breakdown: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default function TaxBreakdown({ style }) {
  const classes = useBreakdownStyles();
  const taxContext = useContext(TaxContext);

  const taxBrackets = useMemo(() => {
    return taxContext.taxBreakdown ? Object.keys(taxContext.taxBreakdown) : [];
  }, [taxContext.taxBreakdown]);

  return (
    <Box component="div" style={style}>
      <Box m={1} mt={2}>
        <Box component="span" color={'white'}>
          Your estimated taxable income is:
        </Box>
      </Box>
      <Box
        bgcolor={'white'}
        borderRadius={'borderRadius'}
        justifyContent={'center'}
        display={'flex'}
        p={1}
        m={1}
      >
        <Box
          className={classes.total}
          component="h1"
          color={'primary.main'}
          m={1}
          fontSize={48}
        >
          ${TaxUtil.formatDecimalPrice(taxContext.taxBreakdownTotal)}
        </Box>
      </Box>
      <Box m={1} mt={2}>
        <Box component="span" color={'white'}>
          Breakdown:
        </Box>
      </Box>
      <Box>
        {taxContext.taxBreakdown &&
          Object.keys(taxContext.taxBreakdown).map((key, i) => {
            return (
              <Box
                key={key}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                bgcolor={'white'}
                borderRadius={'borderRadius'}
                m={1}
                p={1}
              >
                <Box flexShrink={0}>
                  <Box>
                    <Box
                      component="span"
                      fontSize={'fontSize'}
                      fontWeight={'fontWeightBold'}
                    >
                      Tax Bracket
                    </Box>
                  </Box>
                  <Box>
                    <Box component="span" fontSize={'fontSize'}>
                      {TaxUtil.formatBracket(
                        taxBrackets[i],
                        taxBrackets[i + 1]
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.breakdown}>
                  <Box component="h3" m={1} color={'primary.main'}>
                    ${TaxUtil.formatPrice(taxContext.taxBreakdown[key])}
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
