import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { drawerWidth } from 'configs';
import { palette } from 'components/assets';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      backgroundColor: palette.ui001,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(9) + 1,
      ['@media (max-height:770px)']: {
        // eslint-disable-line no-useless-computed-key
        width: theme.spacing(11) + 1,
      },
    },
  }),
);

export const NavItemContent = styled(ListItem)`
  padding: 25px 0px 10px 20px;
  border-left: 5px solid transparent;

  & * {
    fill: ${palette.ui002}!important;
  }

  &:hover {
    border-left: 5px solid ${palette.yellow};
    background: ${palette.ui003};
  }
  &:hover * {
    color: ${palette.white}!important;
    fill: ${palette.white}!important;
  }
`;

export const NavItemDivider = styled(Divider)`
  width: 20px;
  background-color: ${palette.ui002};
  margin-left: 25px;
`;

export const NavItemLink = styled.span`
  text-decoration: none;
  &.active * {
    color: ${palette.white}!important;
    fill: ${palette.white}!important;
  }

  &.active ${NavItemContent} {
    border-left: 5px solid ${palette.yellow};
  }
`;
export const SubNavItemLink = styled.span`
  text-decoration: none;
  &.active * {
    color: ${palette.white}!important;
    fill: ${palette.white}!important;
  }
`;

export const NavItemIcon = styled(ListItemIcon)`
  min-width: 50px;
`;
export const LogoWrapper = styled.div`
  margin: 20px 0px 20px 20px;
`;

export const ToggleSidebarButton = styled.div`
  padding: 10px;
  padding-bottom: 30px;
`;
export const SideDrawer = styled.div`
  position: fixed;
  left: 73px;
  padding-right: 20px;

  @media screen and (max-height: 770px) {
    left: 89px;
  }
  background-color: #5343b2;
`;

export const NavItemLabel = styled.label`
  color: ${palette.ui002};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
