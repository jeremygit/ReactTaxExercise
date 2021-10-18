import React, { useState, useCallback } from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import TaxForm from './TaxForm';
import TaxBreakdown from './TaxBreakdown';
import TaxTitle from './TaxTitle';
import Artwork from './Artwork';

import TaxContextProvider from '../contexts/TaxContext';

const useTaxViewStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    zIndex: 1
  },
  inner: {
    position: 'relative',
    zIndex: 1
  },
  innerCenter: {
    height: '100%'
  },
  backgroundContainer: {
    position: 'absolute',
    zIndex: 0,
    height: '100%'
  },
  backgroundInner: {
    height: '100%'
  },
  backgroundAnimationContainer: {
    height: '100%'
  },
  backgroundArtworkContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100%'
  }
}));

const taxViewFadeVariants = {
  initial: { opacity: 0, transition: { duration: 0.2 } },
  enter: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const TaxViewGridCentreAlign = ({ children }) => {
  const classes = useTaxViewStyles();

  return (
    <Grid
      className={classes.innerCenter}
      container
      display="flex"
      alignContent={'center'}
    >
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default function TaxView() {
  const classes = useTaxViewStyles();
  const [isCalculating, setIsCalculating] = useState(false);

  const onFormCalculate = useCallback(() => {
    setIsCalculating(!isCalculating);
  });

  return (
    <TaxContextProvider>
      <Grid className={classes.container} container spacing={3}>
        <Grid className={classes.inner} item xs={6}>
          <TaxViewGridCentreAlign>
            <AnimatePresence exitBeforeEnter>
              {!isCalculating ? (
                <motion.div
                  style={{ width: '100%' }}
                  key={'animate-tb'}
                  variants={taxViewFadeVariants}
                  initial={'initial'}
                  animate={'enter'}
                  exit={'exit'}
                >
                  <TaxTitle />
                </motion.div>
              ) : (
                <motion.div
                  style={{ width: '100%' }}
                  key={'animate-tf'}
                  variants={taxViewFadeVariants}
                  initial={'initial'}
                  animate={'enter'}
                  exit={'exit'}
                >
                  <TaxForm
                    disabled={isCalculating}
                    onToggleCalculate={onFormCalculate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </TaxViewGridCentreAlign>
        </Grid>
        <Grid className={classes.inner} item xs={6}>
          <TaxViewGridCentreAlign>
            <AnimatePresence exitBeforeEnter>
              {isCalculating ? (
                <motion.div
                  key={'animate-tb'}
                  variants={taxViewFadeVariants}
                  initial={'initial'}
                  animate={'enter'}
                  exit={'exit'}
                >
                  <TaxBreakdown />
                </motion.div>
              ) : (
                <motion.div
                  key={'animate-tf'}
                  variants={taxViewFadeVariants}
                  initial={'initial'}
                  animate={'enter'}
                  exit={'exit'}
                >
                  <TaxForm
                    disabled={isCalculating}
                    onToggleCalculate={onFormCalculate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </TaxViewGridCentreAlign>
        </Grid>

        <AnimateSharedLayout>
          <Grid
            className={classes.backgroundContainer}
            container
            justifyContent={isCalculating ? 'flex-end' : 'flex-start'}
          >
            <Grid className={classes.backgroundInner} item xs={6}>
              <motion.div
                className={classes.backgroundAnimationContainer}
                layout
              >
                <Box
                  className={classes.backgroundArtworkContainer}
                  p={0}
                  borderRadius={'borderRadius'}
                >
                  <Artwork />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </AnimateSharedLayout>
      </Grid>
    </TaxContextProvider>
  );
}
