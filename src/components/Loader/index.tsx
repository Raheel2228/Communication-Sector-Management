import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { SpinLoaderWrapper, useStyles } from './styled.components';

interface FullPageLoaderProps {
  solid?: boolean;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({ solid = false }) => {
  const classes = useStyles();
  return (
    <Backdrop className={solid ? classes.solidBackdrop : classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const SpinLoader: React.FC = () => {
  return (
    <SpinLoaderWrapper>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </SpinLoaderWrapper>
  );
};
