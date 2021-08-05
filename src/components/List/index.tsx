import React from 'react';
import { Wrapper, Heading, Item, IconWrapper, DataRow, ItemNumber } from './styled.components';
import { ReactComponent as OpenBox } from 'components/assets/icons/open_box.svg';
import { ReactComponent as Home } from 'components/assets/icons/home.svg';
import { ReactComponent as UserGroup } from 'components/assets/icons/user_group.svg';
import { ReactComponent as Contacts } from 'components/assets/icons/contacts.svg';
import { ReactComponent as DollarBill } from 'components/assets/icons/dollar_bill.svg';
import { ReactComponent as UserSettings } from 'components/assets/icons/user_settings.svg';
import { ReactComponent as Cog } from 'components/assets/icons/cog.svg';
import { ReactComponent as Handshake } from 'components/assets/icons/handshake.svg';
import { ReactComponent as SettingsPage } from 'components/assets/icons/settings_page.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  data: $TSFixMe;
}
const Component: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Heading>Active Data</Heading>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" htmlColor={'#BABFD1'} height={25} width={25} component={Home} />
        </IconWrapper>
        <Item>DC</Item>
        <ItemNumber>2</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" htmlColor={'#BABFD1'} height={25} width={25} component={DollarBill} />
        </IconWrapper>
        <Item>OLT</Item>
        <ItemNumber>5</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" height={25} htmlColor={'#BABFD1'} width={25} component={Handshake} />
        </IconWrapper>
        <Item>FDT</Item>
        <ItemNumber>69</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" htmlColor={'#BABFD1'} height={25} width={25} component={UserGroup} />
        </IconWrapper>
        <Item>FDT SPLITTER</Item>
        <ItemNumber>9710</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" htmlColor={'#BABFD1'} height={25} width={25} component={SettingsPage} />
        </IconWrapper>
        <Item>ODB</Item>
        <ItemNumber>19420</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color={'#607196'}>
          <SvgIcon fontSize="large" htmlColor={'#BABFD1'} height={25} width={25} component={Contacts} />
        </IconWrapper>
        <Item>CPE</Item>
        <ItemNumber>20</ItemNumber>
      </DataRow>
      <DataRow>
        <IconWrapper color="#607196">
          <SvgIcon fontSize="large" htmlColor="#BABFD1" height={25} width={25} component={UserSettings} />
        </IconWrapper>
        <Item>Core Switch</Item>
        <ItemNumber>25</ItemNumber>
      </DataRow>
    </Wrapper>
  );
};

export default Component;
