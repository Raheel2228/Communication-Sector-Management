import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import { palette } from 'components/assets';
import { drawerWidth, drawerCollapsedWidth, drawerCollapsedWidthSm } from 'configs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - ${drawerCollapsedWidth}px)`,
      ['@media (max-height:770px)']: {
        // eslint-disable-line no-useless-computed-key
        width: `calc(100% - ${drawerCollapsedWidthSm}px)`,
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: palette.ui004,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
);

export const MyToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 12px;

  & * {
    fill: ${palette.ui002};
  }
  & input {
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    padding: 0px;
    color: ${palette.ui002};
    outline: none !important;
    margin-top: -30px;
  }
  & input::placeholder {
    color: ${palette.ui002};
  }

  & input:-ms-input-placeholder {
    color: ${palette.ui002};
  }

  & input::-ms-input-placeholder {
    color: ${palette.ui002};
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  border-radius: 0px;

  & > * {
    align-self: stretch;
    border-radius: 0px;
  }
  & > *:hover {
    background: ${palette.uihover};
  }
  & svg {
    color: ${palette.ui002};
  }

  & span.iconLabel {
    font-size: 16px;
    color: ${palette.ui002};
  }
`;
