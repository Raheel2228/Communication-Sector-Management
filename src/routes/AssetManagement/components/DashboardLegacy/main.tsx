import React from 'react';
import { Dashboard } from 'layouts';
import 'react-vis/dist/style.css';
import { ReactComponent as OpenBox } from 'components/assets/icons/open_box.svg';
import { ReactComponent as Home } from 'components/assets/icons/home.svg';
import { ReactComponent as DollarBill } from 'components/assets/icons/dollar_bill.svg';
import { ReactComponent as Handshake } from 'components/assets/icons/handshake.svg';
import { ReactComponent as SettingsPage } from 'components/assets/icons/settings_page.svg';
import { odbByArea, myRadialData, exampleHData, allOneData, lineData, reservedArea } from 'model/assetManagement';
import { Wrapper, TilesWrapper, ChartsWrapper, RadialChartsWrapper } from './styled.components';
import { StatsTile, RadialChart, HorizontalBars, VerticalBar, LineChart, ListData, PercentageChart } from 'components';
const Container: React.FC = () => {
  return (
    <Dashboard>
      <Wrapper>
        <TilesWrapper>
          <StatsTile color="#71cc16" amount="2" label="Data Centers" icon={Home} />
          <StatsTile color="#f15156" amount="5" label="OLT" icon={DollarBill} />
          <StatsTile color="#42bfdd" amount="69" label="FDT" icon={Handshake} />
          <StatsTile color="#fdca40" amount="9710" label="ODB" icon={SettingsPage} />
          <StatsTile color="#b6c649" amount="19420" label="ODB Ports" icon={OpenBox} />
        </TilesWrapper>
        <ChartsWrapper>
          <VerticalBar title={'Area Distribution of ODBs'} data={allOneData} color={'#71cc16'} />
        </ChartsWrapper>
        <RadialChartsWrapper>
          <RadialChart data={myRadialData} />
          <HorizontalBars title={'Area Distribution of ODB SDU'} data={exampleHData} color={'rgb(65, 197, 298)'} />
        </RadialChartsWrapper>
        <RadialChartsWrapper>
          <LineChart data={lineData} />
          <ListData data={lineData} />
          <PercentageChart data={reservedArea} />
        </RadialChartsWrapper>
      </Wrapper>
    </Dashboard>
  );
};

export default Container;
