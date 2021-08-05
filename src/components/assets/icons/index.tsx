import React from 'react';
import { ReactComponent as Home } from './home.svg';
import { ReactComponent as UserGroup } from './user_group.svg';
import { ReactComponent as Contacts } from './contacts.svg';
import { ReactComponent as UserSettings } from './user_settings.svg';
import { ReactComponent as OpenBox } from './open_box.svg';
import { ReactComponent as Bell } from './bell.svg';
import { ReactComponent as Menu } from './menu.svg';
import { ReactComponent as Exit } from './exit.svg';
import { ReactComponent as DollarBill } from './dollar_bill.svg';
import { ReactComponent as Handshake } from './handshake.svg';
import { ReactComponent as SettingsPage } from './settings_page.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Fullscreen } from './fullscreen.svg';
import { ReactComponent as Cog } from './cog.svg';
import { ReactComponent as ProfileMenu } from './profile_menu.svg';
import { ReactComponent as BellEmpty } from './bell_empty.svg';
import { ReactComponent as QuestionMark } from './question_mark.svg';
import { ReactComponent as InactiveStatus } from './inactive_status.svg';
import { ReactComponent as ActiveStatus } from './active_status.svg';
import { ReactComponent as EmailSuccess } from './email_success.svg';
import styled from 'styled-components';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

interface IconsProps {
  name: string;
  fillColor?: string;
}

interface IconsToComponentsMap {
  [index: string]: React.FC<React.SVGProps<SVGSVGElement>>;
  home: React.FC<React.SVGProps<SVGSVGElement>>;
  userGroup: React.FC<React.SVGProps<SVGSVGElement>>;
  contacts: React.FC<React.SVGProps<SVGSVGElement>>;
  userSettings: React.FC<React.SVGProps<SVGSVGElement>>;
  openBox: React.FC<React.SVGProps<SVGSVGElement>>;
  bell: React.FC<React.SVGProps<SVGSVGElement>>;
  menu: React.FC<React.SVGProps<SVGSVGElement>>;
  exit: React.FC<React.SVGProps<SVGSVGElement>>;
  dollarBill: React.FC<React.SVGProps<SVGSVGElement>>;
  handshake: React.FC<React.SVGProps<SVGSVGElement>>;
  settingsPage: React.FC<React.SVGProps<SVGSVGElement>>;
  search: React.FC<React.SVGProps<SVGSVGElement>>;
  fullscreen: React.FC<React.SVGProps<SVGSVGElement>>;
  cog: React.FC<React.SVGProps<SVGSVGElement>>;
  profileMenu: React.FC<React.SVGProps<SVGSVGElement>>;
  bellEmpty: React.FC<React.SVGProps<SVGSVGElement>>;
  questionMark: React.FC<React.SVGProps<SVGSVGElement>>;
  inactiveStatus: React.FC<React.SVGProps<SVGSVGElement>>;
  activeStatus: React.FC<React.SVGProps<SVGSVGElement>>;
  emailSuccess: React.FC<React.SVGProps<SVGSVGElement>>;
}

const IconWrapper = styled.span<{ color?: string }>`
  & * {
    ${`fill:${props => props.color}!important`}
  }
`;

const Icons: React.FC<IconsProps & SvgIconProps> = ({ name, fillColor, ...rest }) => {
  const Components: IconsToComponentsMap = {
    home: Home,
    userGroup: UserGroup,
    contacts: Contacts,
    userSettings: UserSettings,
    openBox: OpenBox,
    bell: Bell,
    menu: Menu,
    exit: Exit,
    dollarBill: DollarBill,
    handshake: Handshake,
    settingsPage: SettingsPage,
    search: Search,
    fullscreen: Fullscreen,
    cog: Cog,
    profileMenu: ProfileMenu,
    bellEmpty: BellEmpty,
    questionMark: QuestionMark,
    inactiveStatus: InactiveStatus,
    activeStatus: ActiveStatus,
    emailSuccess: EmailSuccess,
  };

  if (typeof Components[name] !== 'undefined') {
    const Icon = Components[name];
    return (
      <IconWrapper color={fillColor}>
        <SvgIcon component={Icon} {...rest} />
      </IconWrapper>
    );
  }

  return <SvgIcon component={Home} {...rest} />;
};

export default Icons;
