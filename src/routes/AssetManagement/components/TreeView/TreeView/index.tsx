import React from 'react';
import { CustomThemeWrapper, List, FilterAndIconsRow } from './styled.components';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { StatusCellRenderer, TextCellRenderer } from './renderers';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { IconButtonsRow, FiltersRow, IconButtonType, FilterType } from './components';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { ApolloError } from 'apollo-client';
import { FullPageLoader, LoadingError } from 'components';
import { Timeline, Collapse } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_ALL_CORE_SWITCHES,
  GET_ALL_OLT,
  GET_ALL_CORE_SWITCH_SLOTS,
  GET_ALL_CORE_SWITCH_PORTS,
  GET_ALL_OLT_SLOTS,
  GET_ALL_OLT_PORTS,
} from 'gql';
const renderersMap = { StatusCellRenderer, TextCellRenderer };
const { Panel } = Collapse;

interface Props extends AgGridReactProps {
  columnDefs?: (ColDef | ColGroupDef)[];
  data?: Array<$TSFixMe>;
  iconButtons?: Array<IconButtonType>;
  filtersRow?: Array<FilterType>;
  loading?: boolean;
  error?: ApolloError | undefined;
}

const TreeView: React.FC<Props> = ({
  columnDefs,
  data,
  onGridReady,
  iconButtons,
  filtersRow,
  onRowSelected,
  loading,
  error,
}) => {
  const { data: dataCoreSwitches, error: errorCoreSwitches, loading: landingCoreSwitches } = useQuery(
    GET_ALL_CORE_SWITCHES,
  );
  const { data: dataCoreSwitchesSlots, error: errorCoreSwitchesSlots, loading: landingCoreSwitchesSlots } = useQuery(
    GET_ALL_CORE_SWITCH_SLOTS,
  );
  const { data: dataCoreSwitchesPorts, error: errorCoreSwitchesPorts, loading: landingCoreSwitchesPorts } = useQuery(
    GET_ALL_CORE_SWITCH_PORTS,
  );
  const { data: dataOLT, error: errorOLT, loading: landingOLT } = useQuery(GET_ALL_OLT);
  const { data: dataOLTSlots, error: errorOLTSlots, loading: landingOLTSlots } = useQuery(GET_ALL_OLT_SLOTS);
  const { data: dataOLTPorts, error: errorOLTPorts, loading: landingOLTPorts } = useQuery(GET_ALL_OLT_PORTS);
  React.useEffect(() => {
    console.log(dataCoreSwitches);
  }, [dataCoreSwitches]);
  React.useEffect(() => {
    console.log(dataOLT);
  }, [dataOLT]);

  if (loading) return <FullPageLoader />;
  if (error) return <LoadingError />;
  return (
    <div style={{ overflowY: 'scroll', marginTop: 20 }}>
      <List>
        <CustomThemeWrapper className="ag-theme-material">
          <Timeline>
            {data?.map((item, index) => (
              <Timeline.Item>
                <Collapse expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />} ghost>
                  <Panel header={`Data Center : ${item.data.dcName}`} key={index}>
                    <Timeline>
                      <Timeline.Item>
                        <Collapse expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />} ghost>
                          <Panel header={`Core Switches`} key={index}>
                            {dataCoreSwitches?.getAllCoreSwitch
                              ?.filter(sw => sw.dc.dcName === item.data.dcName)
                              ?.map((item, index) => (
                                <Timeline.Item>
                                  <Collapse
                                    expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />}
                                    ghost
                                  >
                                    <Panel header={`Core Switches : ${item.swName}`} key={index}>
                                      {dataCoreSwitchesSlots?.getAllCoreSwSlot
                                        ?.filter(sws => sws.coreSw.swName === item.swName)
                                        ?.map((item, index) => (
                                          <Timeline.Item>
                                            <Collapse
                                              expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />}
                                              ghost
                                            >
                                              <Panel
                                                header={`Core Switches : ${item.coreSw.swName} : Slot : ${item.swSlotNo}`}
                                                key={index}
                                              >
                                                {dataCoreSwitchesPorts?.getAllCoreSwPort
                                                  ?.filter(swp => swp.swSlot.swSlotNo === item.swSlotNo)
                                                  ?.map((item, index) => (
                                                    <Timeline.Item>
                                                      <Collapse
                                                        expandIcon={({ isActive }) => (
                                                          <ListAltIcon style={{ fontSize: 23 }} />
                                                        )}
                                                        ghost
                                                      >
                                                        <Panel
                                                          header={`Core Switches : ${item.swSlot.coreSw.swName} : Slot : ${item.swSlot.swSlotNo} : Port ${item.swPortNo}`}
                                                          key={index}
                                                        ></Panel>
                                                      </Collapse>
                                                    </Timeline.Item>
                                                  ))}
                                              </Panel>
                                            </Collapse>
                                          </Timeline.Item>
                                        ))}
                                    </Panel>
                                  </Collapse>
                                </Timeline.Item>
                              ))}
                          </Panel>
                        </Collapse>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Collapse expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />} ghost>
                          <Panel header={`Optical Line Transmission : OLT`} key={index}>
                            {dataOLT?.getAllOlt
                              ?.filter(olt => olt.dc.dcName === item.data.dcName)
                              ?.map((item, index) => (
                                <Timeline.Item>
                                  <Collapse
                                    expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />}
                                    ghost
                                  >
                                    <Panel header={`OLT : ${item.oltName}`} key={index}>
                                      {dataOLTSlots?.getAllOltSlot
                                        ?.filter(olts => olts.olt.oltName === item.oltName)
                                        ?.map((item, index) => (
                                          <Timeline.Item>
                                            <Collapse
                                              expandIcon={({ isActive }) => <ListAltIcon style={{ fontSize: 23 }} />}
                                              ghost
                                            >
                                              <Panel
                                                header={`OLT : ${item.olt.oltName} : Slot : ${item.oltSlotNo}`}
                                                key={index}
                                              >
                                                {dataOLTPorts?.getAllOltPort
                                                  ?.filter(oltp => oltp.oltSlot.oltSlotNo === item.oltSlotNo)
                                                  ?.map((item, index) => (
                                                    <Timeline.Item>
                                                      <Collapse
                                                        expandIcon={({ isActive }) => (
                                                          <ListAltIcon style={{ fontSize: 23 }} />
                                                        )}
                                                        ghost
                                                      >
                                                        <Panel
                                                          header={`Slot : ${item.oltSlot.oltSlotNo} : Port : ${item.oltPortNo}`}
                                                          key={index}
                                                        ></Panel>
                                                      </Collapse>
                                                    </Timeline.Item>
                                                  ))}
                                              </Panel>
                                            </Collapse>
                                          </Timeline.Item>
                                        ))}
                                    </Panel>
                                  </Collapse>
                                </Timeline.Item>
                              ))}
                          </Panel>
                        </Collapse>
                      </Timeline.Item>
                    </Timeline>
                  </Panel>
                </Collapse>
              </Timeline.Item>
            ))}
          </Timeline>
          {/* <AgGridReact
            columnDefs={columnDefs}
            onRowSelected={onRowSelected}
            rowData={data}
            rowSelection="multiple"
            suppressCellSelection={true}
            frameworkComponents={renderersMap}
            suppressMenuHide={true}
            onGridReady={onGridReady}
          ></AgGridReact> */}
        </CustomThemeWrapper>
      </List>
    </div>
  );
};

export default TreeView;
