import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { palette } from 'components/assets';

export const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  solidBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    background: palette.ui004,
  },
}));

export const SpinLoaderWrapper = styled.div`
  & .spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 100px auto;
  }

  & .double-bounce1 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${palette.ui001};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
  }
  & .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${palette.ui007};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  & .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;
