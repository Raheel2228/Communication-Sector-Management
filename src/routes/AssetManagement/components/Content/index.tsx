import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from 'antd';
import { DocumentNode } from 'graphql';
import { ListView, Toast } from 'components';
import {
  sortablesGenerator,
  filtersRowGenerator,
  columnDefsGenerator,
  actionButtonsGenerator,
  iconButtonsGenerator,
  tabsToDataMap,
  tabsToTitleMap,
  tabsToUidsMap,
  tabsToParentUidsMap,
  tabsToDrawer,
} from './../../configurations';
import { useHistory } from 'react-router-dom';
import { listViewDataProcessor, compareValues, leafGenerator } from 'utils';
import { SortablesAndActionButtons } from './../../styled.components';
import { Sortables, ActionButtons } from 'commons';
import { GridApi } from 'ag-grid-community';
import AddNewDataCenter from './../AddNew/DataCenter';
import AddNewCoreSwitch from './../AddNew/CoreSwitch';
import AddNewOlt from './../AddNew/Olt';
import AddNewOltSlot from './../AddNew/OltSlot';
import AddNewOltPort from './../AddNew/OltPort';
import AddNewFdt from './../AddNew/Fdt';
import AddNewFdtSplitter from './../AddNew/FdtSplitter';
import AddNewCpe from './../AddNew/Cpe';
import AddNewCoreSwitchSlot from './../AddNew/CoreSwitchSlot';
import AddNewODB from './../AddNew/AddNewOdb';
import {
  DELETE_DATA_CENTER_SERVICE,
  DELETE_CORE_SWITCH_SERVICE,
  DELETE_OLT_SERVICE,
  DELETE_FDT_SERVICE,
  DELETE_FDT_SPLITTER_SERVICE,
  DELETE_CPE_SERVICE,
  DELETE_CORE_SWITCH_SLOTS_SERVICE,
} from 'services';
import AddNewCoreSwitchPort from '../AddNew/CoreSwitchPort';
import { DELETE_CORE_SWITCH_PORTS_SERVICE } from 'services/asset_management';

interface Props {
  query: DocumentNode;
  activeTab: string;
  childTab?: ChildTabProps;
  parentId?: string;
}

// used in delete bulk mutation service
const tabsToServicesMap = {
  dc: DELETE_DATA_CENTER_SERVICE,
  coreSwitches: DELETE_CORE_SWITCH_SERVICE,
  coreSwitchSlots: DELETE_CORE_SWITCH_SLOTS_SERVICE,
  coreSwitchPorts: DELETE_CORE_SWITCH_PORTS_SERVICE,
  olt: DELETE_OLT_SERVICE,
  fdt: DELETE_FDT_SERVICE,
  fdtSplitter: DELETE_FDT_SPLITTER_SERVICE,
  cpe: DELETE_CPE_SERVICE,
};

const Content: React.FC<Props> = ({ query, activeTab, childTab, parentId }) => {
  const { error, loading, data, refetch } = useQuery(query);
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('activeTab');
  const [sortables, setSortables] = React.useState<Array<string>>();
  const [selectAll, setSelectAll] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [inactive, setInactive] = React.useState(true);
  const [parsedData, setParsedData] = React.useState<any>();
  const [showAddNewDialog, setShowAddNewDialog] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string>();
  const [severity, setSeverity] = React.useState<'success' | 'error'>('success');
  const [iconButtons, setIconButtons] = React.useState<$TSFixMe>();
  const [sortByDate, setSortByDate] = React.useState(false);
  const [opLoading, setOpLoading] = React.useState(false);

  const gridApiRef = React.useRef<GridApi>();

  const getParsedData = async (key: string, newData = null) => {
    let _data: any;
    if (!newData) {
      _data = data[key];
      if (parentId) {
        _data = _data.filter(d => leafGenerator(d, tabsToParentUidsMap[activeTab]) === parentId);
      }
      _data = await listViewDataProcessor(_data);
    } else if (newData) {
      _data = await listViewDataProcessor(newData);
    }
    if (activeTab === 'odbSdu') {
      _data = _data.filter(function(item) {
        return item.data.odbType == 'sdu';
      });
    }
    if (activeTab === 'odbMdu') {
      _data = _data.filter(function(item) {
        return item.data.odbType == 'mdu';
      });
    }

    setParsedData(_data);
    return _data;
  };

  const handleSortables = async (key: string) => {
    const activeData = data[tabsToDataMap[activeTab]];
    let _data: any = [];
    if (activeTab === 'dc') {
      if (key === 'dataCenterName') {
        _data = activeData.sort(compareValues('dcName'));
      } else if (key === 'dataCenterId') {
        _data = activeData.sort(compareValues('dcId', 'number'));
      } else if (key === 'dataCenterLocation') {
        _data = activeData.sort(compareValues('locationName', 'object'));
      }
    }

    if (activeTab === 'coreSwitches') {
      if (key === 'dataCenterName') {
        _data = activeData.sort(compareValues('dcName', 'object'));
      } else if (key === 'assetTag') {
        _data = activeData.sort(compareValues('assetTag'));
      } else if (key === 'name') {
        _data = activeData.sort(compareValues('swName'));
      }
    }

    getParsedData(activeTab, _data);
  };

  const handleActionButtonClick = (key: string) => {
    if (key === 'download') {
      gridApiRef.current?.exportDataAsCsv();
    }
  };

  const handleFilters = async (_active: boolean, _inactive: boolean) => {
    if (parsedData && activeTab) {
      const activeData = await getParsedData(tabsToDataMap[activeTab]);
      let _data: $TSFixMe = [];
      _data = activeData.filter(({ status }) => {
        if (!active && inactive) {
          return status === 'inactive';
        } else if (!inactive && active) {
          return status === 'active';
        } else if (!inactive && !active) {
          return false;
        } else {
          return true;
        }
      });
      setParsedData(_data);
    }
  };

  const handleGridReady = params => {
    gridApiRef.current = params.api;
  };

  const handleCellClicked = (node: $TSFixMe): void => {
    const {
      data: { data },
    } = node;
    if (tabsToDrawer[activeTab]) {
      history.push(`?activeTab=${currentTab}&context=${tabsToDrawer[activeTab]}&id=${data[tabsToUidsMap[activeTab]]}`);
    }
  };

  const handleCheckboxChange = (key: string) => {
    if (key === 'selectAll') {
      setSelectAll(!selectAll);
    } else if (key === 'active') {
      setActive(!active);
    } else if (key === 'inactive') {
      setInactive(!inactive);
    }
  };

  const handleNew = () => setShowAddNewDialog(true);
  const handleDelete = async () => {
    if (gridApiRef.current?.getSelectedRows()) {
      const selectedRows = gridApiRef.current?.getSelectedRows();
      const filteredData = selectedRows?.map(item => item.data[tabsToUidsMap[activeTab]]);
      const toBeDeleted = filteredData && Object.values(filteredData);
      const newRecords = data[tabsToDataMap[activeTab]].filter(i => !toBeDeleted.includes(i[tabsToUidsMap[activeTab]]));
      setOpLoading(true);
      try {
        await tabsToServicesMap[activeTab](toBeDeleted, newRecords);
        // handleDrawerExit();
        setSeverity('success');
        setToastMessage('Deleted Successfully!');
      } catch (error) {
        setSeverity('error');
        setToastMessage("Couldn't delete, please try again!");
        console.error(error);
      }
      setOpLoading(false);
    }
  };

  const handleSort = () => setSortByDate(prev => !prev);

  const handleFullScreen = () => {};

  const handleAddNewOnFinish = async (data: any, error: string) => {
    setToastMessage('');

    if (data && !error) {
      setToastMessage(`${tabsToTitleMap[activeTab]} has been added sucessfully!`);
      setSeverity('success');
      setShowAddNewDialog(false);
      setOpLoading(true);
      await refetch(); // @TODO: need to update DC cache instead
      setOpLoading(false);
    } else if (error) {
      setShowAddNewDialog(false);
      setToastMessage(`Couldn't add the ${tabsToTitleMap[activeTab]}, please try again!`);
      console.error(error);
      setSeverity('error');
    }
  };

  const handleRowSelected = () => {
    let _iconButtons = iconButtons;
    const count = gridApiRef.current?.getSelectedRows().length || 0;
    if (count > 0) {
      if (count > 1) {
        // handleDrawerExit();
      }
      _iconButtons = iconButtonsGenerator(handleNew, handleDelete, handleSort, handleFullScreen, true);
      setIconButtons(_iconButtons);
    } else {
      _iconButtons = iconButtonsGenerator(handleNew, handleDelete, handleSort, handleFullScreen, false);
    }
    setIconButtons(_iconButtons);
  };

  React.useEffect(() => {
    if (data && parsedData) {
      handleFilters(active, inactive);
    }
  }, [active, inactive]);

  React.useEffect(() => {
    if (gridApiRef && gridApiRef.current) {
      if (selectAll) {
        gridApiRef.current.selectAll();
      } else {
        gridApiRef.current.deselectAll();
      }
    }
  }, [selectAll]);

  React.useEffect(() => {
    if (data) {
      const activeData = data[tabsToDataMap[activeTab]];
      const _data = activeData.sort(compareValues('creationDate', 'date', sortByDate ? 'desc' : 'asc'));
      getParsedData(activeTab, _data);
    }
  }, [sortByDate]);

  React.useEffect(() => {
    if (data) {
      getParsedData(tabsToDataMap[activeTab]);
      setSortables(sortablesGenerator(activeTab));
      const _iconButtons = iconButtonsGenerator(handleNew, handleDelete, handleSort, handleFullScreen, false);
      setIconButtons(_iconButtons);
    }
  }, [data]);

  React.useEffect(() => {
    console.log(parentId, 'parentId');
  }, []);
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const columnDefs = columnDefsGenerator(handleCellClicked, childTab);
  const filtersRow = filtersRowGenerator(selectAll, active, inactive, handleCheckboxChange);
  const actionButtons = actionButtonsGenerator(activeTab, handleActionButtonClick);

  return (
    <>
      <SortablesAndActionButtons>
        {sortables && <Sortables sortables={sortables} onClick={handleSortables} />}
        {actionButtons && <ActionButtons actions={actionButtons} />}
      </SortablesAndActionButtons>
      <ListView
        loading={loading || opLoading}
        error={error}
        data={parsedData && parsedData}
        columnDefs={columnDefs}
        filtersRow={filtersRow}
        onGridReady={handleGridReady}
        iconButtons={iconButtons}
        onRowSelected={handleRowSelected}
      />
      <Modal
        title={null}
        footer={null}
        centered={true}
        visible={showAddNewDialog}
        onCancel={() => setShowAddNewDialog(false)}
        destroyOnClose={true}
        width="750px"
      >
        {activeTab === 'dc' && <AddNewDataCenter onFinish={handleAddNewOnFinish} />}
        {activeTab === 'coreSwitches' && <AddNewCoreSwitch onFinish={handleAddNewOnFinish} />}
        {activeTab === 'coreSwitchSlots' && <AddNewCoreSwitchSlot onFinish={handleAddNewOnFinish} data={data} />}
        {activeTab === 'coreSwitchPorts' && <AddNewCoreSwitchPort onFinish={handleAddNewOnFinish} data={data} />}
        {activeTab === 'olt' && <AddNewOlt onFinish={handleAddNewOnFinish} />}
        {activeTab === 'oltSlots' && <AddNewOltSlot onFinish={handleAddNewOnFinish} parentId={parentId} />}
        {activeTab === 'oltPorts' && <AddNewOltPort onFinish={handleAddNewOnFinish} parentId={parentId} />}
        {activeTab === 'fdt' && <AddNewFdt onFinish={handleAddNewOnFinish} />}
        {activeTab === 'fdtSplitter' && <AddNewFdtSplitter onFinish={handleAddNewOnFinish} />}
        {activeTab === 'cpe' && <AddNewCpe onFinish={handleAddNewOnFinish} />}
        {activeTab === 'odb' && <AddNewODB onFinish={handleAddNewOnFinish} />}
        {activeTab === 'odbSdu' && <AddNewODB onFinish={handleAddNewOnFinish} type="SDU" />}
        {activeTab === 'odbMdu' && <AddNewODB onFinish={handleAddNewOnFinish} type="MDU" />}
      </Modal>
      {toastMessage && (
        <Toast
          message={toastMessage}
          severity={severity}
          onClose={() => {
            setToastMessage('');
          }}
        />
      )}
    </>
  );
};

export default Content;
