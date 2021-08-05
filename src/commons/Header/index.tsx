import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { Icons } from 'components/assets';
import { SearchBox, MyToolbar as Toolbar, IconsWrapper, useStyles } from './styled.components';
import { Input, Dropdown } from 'antd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { Fullscreen, ExpandMore, Settings, NotificationsNone, AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

interface Props {
  sidebarIsMini: boolean;
}
const Header: React.FC<Props> = ({ sidebarIsMini }) => {
  const history = useHistory();
  const [userDropMenu, setUserDropMenu] = React.useState(null);

  const handleClickUserMenu = event => {
    setUserDropMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserDropMenu(null);
  };

  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: !sidebarIsMini,
      })}
    >
      <Toolbar>
        <SearchBox>
          <div style={{ paddingTop: '20px' }}>
            <Icons name={'search'} style={{ fontSize: 30 }} />
          </div>
          <div>
            <Input placeholder="Search" />
          </div>
        </SearchBox>
        <IconsWrapper>
          <IconButton>
            <Fullscreen style={{ fontSize: 22 }} />
          </IconButton>

          <IconButton>
            <Settings style={{ fontSize: 22 }} />
          </IconButton>

          <IconButton>
            <Badge badgeContent={4} color="secondary" style={{ verticalAlign: 'baseline' }}>
              <NotificationsNone style={{ fontSize: 22 }} />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClickUserMenu}>
            <AccountCircle style={{ fontSize: 22 }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={userDropMenu}
            keepMounted
            open={Boolean(userDropMenu)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              {' '}
              <a target="_blank" rel="noopener noreferrer" onClick={() => history.push('/user_profile_edit')}>
                User Profile
              </a>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              {' '}
              <a target="_blank" rel="noopener noreferrer" onClick={() => history.push('/logout')}>
                Logout
              </a>
            </MenuItem>
          </Menu>
          <IconButton>
            <span className="iconLabel">Eng</span>
            <ExpandMore style={{ fontSize: 22 }} />
          </IconButton>
        </IconsWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
