import React from 'react';
import { Modal } from 'antd';
import { ListView, Toast } from 'components';
import {
  sortablesGenerator,
  filtersRowGenerator,
  columnDefsGenerator,
  actionButtonsGenerator,
  iconButtonsGenerator,
  tabsToTitleMap,
  tabsToDrawer,
} from '../../configurations';
import { useHistory } from 'react-router-dom';
import { listViewDataProcessor, compareValues } from 'utils';
import { Sortables, ActionButtons } from 'commons';
import { SortablesAndActionButtons } from '../../styled.component';
import AddNew from '../AddNew';
import { GridApi } from 'ag-grid-community';
import { DELETE_B2B_CATALOG_SUBSCRIPTIONS_SERVICE } from 'services';

interface Props {
  activeTab: string;
  rawData: $TSFixMe;
  data: $TSFixMe;
  loading: boolean;
  error: $TSFixMe;
  refetch?: $TSFixMe;
}

const Content: React.FC<Props> = ({ activeTab, rawData, data, loading, error, refetch }) => {
  const history = useHistory();

  const [sortables, setSortables] = React.useState<Array<string>>();
  const [selectAll, setSelectAll] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [inactive, setInactive] = React.useState(true);
  const [subscribedServices, setSubscribedServices] = React.useState<any>();
  const [parsedData, setParsedData] = React.useState<any>();
  const [showAddNewDialog, setShowAddNewDialog] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string>();
  const [severity, setSeverity] = React.useState<'success' | 'error'>('success');
  const [iconButtons, setIconButtons] = React.useState<$TSFixMe>();
  const [sortByDate, setSortByDate] = React.useState(false);
  const [opLoading, setOpLoading] = React.useState(false);

  const gridApiRef = React.useRef<GridApi>();

  const getParsedData = async (newData = null) => {
    let _data: any;
    if (!newData) {
      _data = await listViewDataProcessor(data);
    } else if (newData) {
      _data = await listViewDataProcessor(newData);
    }
    let selectedSkills: any = [];
    for (let index = 0; index < _data.length; index++) {
      if (!selectedSkills.includes(_data[index].data.serviceDetails.serviceId)) {
        selectedSkills.push(_data[index].data.serviceDetails.serviceId);
      }
    }
    setSubscribedServices(selectedSkills);
    setParsedData(_data);
    return _data;
  };

  const handleSortables = async (key: string) => {
    // console.log(key);
  };

  const handleActionButtonClick = (key: string) => {
    if (key === 'download') {
      gridApiRef.current?.exportDataAsCsv();
    }
  };

  const handleFilters = async () => {
    if (data) {
      const activeData = await getParsedData();
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
      history.push(`?activeTab=${activeTab}&context=${tabsToDrawer[activeTab]}&id=${data?.subscriptionId}`);
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
    if (gridApiRef.current?.getSelectedRows() && data) {
      const selectedRows = gridApiRef.current?.getSelectedRows();
      const filteredData = selectedRows?.map(item => item.data?.subscriptionId);
      const toBeDeleted: string[] = filteredData && Object.values(filteredData);
      const newRecords = rawData.filter(i => !toBeDeleted.includes(i.subscriptionId));
      const rspId = 1; //Needs to implement Access Control and Update it
      setOpLoading(true);
      try {
        await DELETE_B2B_CATALOG_SUBSCRIPTIONS_SERVICE(toBeDeleted, newRecords, rspId);
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

  const handleFullScreen = () => {
    // console.log('handleFullScreen');
  };

  const handleAddNewOnFinish = async (data: any, error: string) => {
    setToastMessage('');

    if (data && !error) {
      setToastMessage(`${tabsToTitleMap[activeTab]} has been added sucessfully!`);
      setSeverity('success');
      refetch().then(() => setShowAddNewDialog(false));
      setOpLoading(false);
    } else if (error) {
      setShowAddNewDialog(false);
      setToastMessage(`Couldn't add the ${tabsToTitleMap[activeTab]}, please try again!`);
      console.error(error);
      setSeverity('error');
      setOpLoading(false);
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
      handleFilters();
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
      const activeData = data;
      if (activeData) {
        const _data = activeData && activeData.sort(compareValues('creationDate', 'date', sortByDate ? 'desc' : 'asc'));
        getParsedData(_data);
      }
    }
  }, [sortByDate]);

  React.useEffect(() => {
    if (data) {
      getParsedData();
      setSortables(sortablesGenerator(activeTab));
      const _iconButtons = iconButtonsGenerator(handleNew, handleDelete, handleSort, handleFullScreen, false);
      setIconButtons(_iconButtons);
    }
  }, [data]);

  const columnDefs = columnDefsGenerator(handleCellClicked);
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
        width="1000px"
        style={{ top: 100 }}
      >
        <AddNew
          subscribedServices={subscribedServices}
          activeTab={activeTab}
          onFinish={handleAddNewOnFinish}
          setLoading={setOpLoading}
        />
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
