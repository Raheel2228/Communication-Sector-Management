import React, { useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import { Logo, Icons } from 'components/assets';
import Collapse from '@material-ui/core/Collapse';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { navigation } from 'configs';
import { NavLink } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import {
  LogoWrapper,
  NavItemLink,
  SubNavItemLink,
  NavItemContent as ListItem,
  NavItemIcon as ListItemIcon,
  ToggleSidebarButton,
  NavItemLabel as ListItemText,
  NavItemDivider,
  useStyles,
  SideDrawer,
} from './styled.components';

interface Props {
  sidebarIsMini: boolean;
  toggleSidebar: () => void;
}

interface SubMenuProps {
  collapse: boolean;
  slug: string;
  label: string;
  subMenu: $TSFixMe;
  subMenusMap: $TSFixMe;
  handleClickSubMenu: $TSFixMe;
  sidebarIsMini: $TSFixMe;
}

const SubMenu: React.FC<SubMenuProps> = ({
  collapse,
  slug,
  label,
  subMenu,
  subMenusMap,
  handleClickSubMenu,
  sidebarIsMini,
}) => {
  return label !== '' ? (
    <Collapse in={collapse} timeout="auto" unmountOnExit>
      <SubNavItemLink as={NavLink} to={slug} exact={true}>
        <List component="div" disablePadding>
          <ListItem button={true}>
            {!subMenusMap && <div style={{ paddingLeft: 20 }}></div>}
            <ListItemIcon>
              <NavItemDivider />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
            {subMenusMap && subMenusMap.has(label) && (
              <span onClick={e => handleClickSubMenu(e, label)}>
                {subMenusMap && subMenusMap.get(slug) ? <ExpandLess /> : <ExpandMore />}
              </span>
            )}
          </ListItem>
        </List>
      </SubNavItemLink>
      {subMenu &&
        subMenu.map(subMenuItem => (
          <div>
            <SubMenu
              key={subMenuItem.slug}
              collapse={subMenusMap && subMenusMap.get(label)}
              label={subMenuItem.label}
              subMenu={subMenuItem.subMenu && subMenuItem.subMenu}
              slug={`${slug}${subMenuItem.slug}`}
              handleClickSubMenu={null}
              sidebarIsMini={null}
              subMenusMap={null}
            />
          </div>
        ))}
    </Collapse>
  ) : (
    <></>
  );
};
const Sidebar: React.FC<Props> = ({ sidebarIsMini, toggleSidebar }) => {
  const classes = useStyles();
  const [menusMap, setMenusMap] = React.useState(new Map());
  const [subMenusMap, setSubMenusMap] = React.useState(new Map());

  useEffect(() => {
    const _menusMap = menusMap;
    const _subMenusMap = subMenusMap;
    navigation &&
      navigation.forEach(parent => {
        if (parent && parent.subMenu && parent.subMenu.length > 0) {
          _menusMap.set(parent.slug, false);
          parent.subMenu.forEach(child => {
            if (child && child.subMenu && child.subMenu.length > 0) {
              _subMenusMap.set(child.label, false);
            }
          });
        }
      });
    setMenusMap(_menusMap);
    console.log(_subMenusMap);
    setSubMenusMap(_subMenusMap);
  }, []);

  const handleClick = (e, slug) => {
    const _menusMap = menusMap;
    _menusMap.forEach((key, index) => {
      if (index !== slug) {
        _menusMap.set(index, false);
      }
    });
    _menusMap.set(slug, !_menusMap.get(slug));
    setMenusMap(cloneDeep(_menusMap));
    e.preventDefault();
  };
  const handleClickSubMenu = (e, slug) => {
    const _menusMap = subMenusMap;
    _menusMap.forEach((key, index) => {
      if (index !== slug) {
        _menusMap.set(index, false);
      }
    });
    _menusMap.set(slug, !_menusMap.get(slug));
    setSubMenusMap(cloneDeep(_menusMap));
    e.preventDefault();
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: !sidebarIsMini,
        [classes.drawerClose]: sidebarIsMini,
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: !sidebarIsMini,
          [classes.drawerClose]: sidebarIsMini,
        }),
      }}
    >
      <div>
        <LogoWrapper>
          <Logo type={sidebarIsMini ? 'icon' : 'text'} height={25} />
        </LogoWrapper>
        <List>
          {navigation.map(item => (
            <React.Fragment key={item.slug}>
              <NavItemLink as={NavLink} to={item.slug} exact={true}>
                <ListItem onMouseEnter={e => sidebarIsMini && handleClick(e, item.slug)} button={true}>
                  <ListItemIcon>
                    <Icons name={item.icon} style={{ fontSize: 25 }} />
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                  {menusMap && menusMap.has(item.slug) && (
                    <span onClick={e => handleClick(e, item.slug)}>
                      {menusMap && menusMap.get(item.slug) ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </ListItem>
                <NavItemDivider />
              </NavItemLink>
              {item.subMenu &&
                item.subMenu.map(subMenuItem => (
                  <SubMenu
                    key={item.slug + subMenuItem.slug}
                    collapse={menusMap && menusMap.get(item.slug) && !sidebarIsMini}
                    label={subMenuItem.label}
                    subMenu={subMenuItem.subMenu && subMenuItem.subMenu}
                    subMenusMap={subMenusMap && subMenusMap}
                    slug={`${item.slug}${subMenuItem.slug}`}
                    sidebarIsMini={sidebarIsMini}
                    handleClickSubMenu={handleClickSubMenu && handleClickSubMenu}
                  />
                ))}
              <SideDrawer onMouseLeave={e => sidebarIsMini && handleClick(e, item.slug)}>
                {item.subMenu &&
                  item.subMenu.map(subMenuItem => (
                    <SubMenu
                      key={item.slug + subMenuItem.slug}
                      collapse={menusMap && menusMap.get(item.slug) && sidebarIsMini}
                      label={subMenuItem.label}
                      subMenu={subMenuItem.subMenu && subMenuItem.subMenu}
                      subMenusMap={subMenusMap && subMenusMap}
                      slug={`${item.slug}${subMenuItem.slug}`}
                      sidebarIsMini={sidebarIsMini}
                      handleClickSubMenu={handleClickSubMenu && handleClickSubMenu}
                    />
                  ))}
              </SideDrawer>
            </React.Fragment>
          ))}
        </List>
      </div>
      <ToggleSidebarButton>
        <IconButton onClick={() => toggleSidebar()}>
          <Icons name={sidebarIsMini ? 'menu' : 'exit'} />
        </IconButton>
      </ToggleSidebarButton>
    </Drawer>
  );
};

export default Sidebar;
