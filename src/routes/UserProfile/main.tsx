import React, { useEffect } from 'react';
import { GridApi } from 'ag-grid-community';
import { AdvanceSearchOptionsType, NewEmail, AdvanceSearch } from './components';
import {
  columnDefsGenerator,
  actionButtonsGenerator,
  tabs,
  sortables,
  iconButtonsGenerator,
  filtersRowGenerator,
} from './configurations';
import { GET_USER_PROFILES_QUERY, CREATE_NEW_USER_MUTATION } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { userProfilesDataProcessor } from 'utils';
import { sortBy } from 'lodash';
import { DELETE_USER_PROFILES_SERVICE } from 'services';
import { Toast } from 'components';
import { useHistory } from 'react-router-dom';
import { Dashboard, TabView } from 'layouts';
import { DialogModal, ListView } from 'components';
import { CardWrapper, SortablesAndActionButtons, AdvanceSearchWrapper } from './styled.components';
import { DetailsDrawer, Sortables, ActionButtons } from 'commons';
import { Modal } from 'antd';
import { Auth as AmplifyAuth } from 'aws-amplify';
import Signup from './../Auth/components/Signup';

const UserProfile: React.FC = () => {
  const [selectAll, setSelectAll] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [inactive, setInactive] = React.useState(true);
  const [newEmailDialog, setNewEmailDialog] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState(false);
  const [newUserDialog, setNewUserDialog] = React.useState(false);
  const [toggleAdvanceSearch, setToggleAdvanceSearch] = React.useState(false);
  const [userProfiles, setUserProfiles] = React.useState<$TSFixMe>();
  const [iconButtons, setIconButtons] = React.useState<$TSFixMe>();
  const [toastMessage, setToastMessage] = React.useState<string>();
  const [severity, setSeverity] = React.useState<'success' | 'error'>('success');
  const [sortByDate, setSortByDate] = React.useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const context = urlParams.get('context');

  const history = useHistory();
  const currentTab = urlParams.get('activeTab');
  const [activeTab, setActiveTab] = React.useState(currentTab || 'projectUser');

  const gridApiRef = React.useRef<GridApi>();
  const { error, loading, data, updateQuery } = useQuery(GET_USER_PROFILES_QUERY);
  const [addNewUser, { loading: addNewUserLoading }] = useMutation(CREATE_NEW_USER_MUTATION);

  useEffect(() => {
    document.title = `User Profile`;

    if (activeTab) {
      history.push(`/user_profile?activeTab=${activeTab}`);
    } else if (!activeTab) {
      history.push(`/user_profile?activeTab=projectUser`);
    }
  }, [activeTab]);

  const getParsedData = async _data => {
    if (activeTab) {
      const parsedData = await userProfilesDataProcessor(_data);
      setUserProfiles(parsedData);
    }
  };

  const handleChangeCheckbox = (name: string) => {
    switch (name) {
      case 'selectAll':
        setSelectAll(!selectAll);
        break;
      case 'active':
        setActive(!active);
        break;
      case 'inactive':
        setInactive(!inactive);
        break;
      default:
        break;
    }
  };

  const handleClickTab = (name: string) => {
    setActiveTab(name);
  };

  const handleClickSortable = (name: string) => {
    let _data: $TSFixMe = [];
    if (name === 'accountNumber') {
      _data = sortBy(data?.getAllUserProfiles, ['userId']);
    }
    if (name === 'customerName') {
      _data = sortBy(data?.getAllUserProfiles, ['firstName', 'lastName']);
    }
    if (name === 'mobileContact') {
      _data = sortBy(data?.getAllUserProfiles, ['mobileNo']);
    }
    getParsedData(_data);
  };

  const handleActionButtonClick = (name: string) => {
    switch (name) {
      case 'toggleAdvanceSearch':
        setToggleAdvanceSearch(!toggleAdvanceSearch);
        break;
      case 'download':
        gridApiRef.current?.exportDataAsCsv();
        break;
      default:
        console.log(name);
        break;
    }
  };

  const handleChangeAdvanceSearch = (options: AdvanceSearchOptionsType) => {
    console.log(options);
    const _data = data.getAllUserProfiles;
    if (_data) {
      const truthiness = (a: string | undefined, b: string | undefined): boolean | undefined => {
        return a
          ?.trim()
          ?.toLowerCase()
          ?.includes(b?.trim()?.toLowerCase() || '');
      };
      const _filteredData = _data.filter(item => {
        const fName: boolean | undefined = truthiness(item.firstName, options.firstName);
        const lName: boolean | undefined = truthiness(item.lastName, options.lastName);
        const email: boolean | undefined = truthiness(item.username, options.email);
        const company: boolean | undefined = truthiness(item.company, options.company);
        const location: boolean | undefined = truthiness(item.location, options.location);
        // const category: boolean | undefined = truthiness(item.category, options.category);
        const group: boolean | undefined = truthiness(item.group?.groupId, options.group);
        return fName && lName && email && company && location && group;
      });
      getParsedData(_filteredData);
    }
  };

  const handleGridReady = params => {
    gridApiRef.current = params.api;
  };

  const handleDrawerExit = () => {
    history.push(`/user_profile?activeTab=${activeTab}`);
  };

  const handleCellClicked = (node: $TSFixMe): void => {
    handleDrawerExit();
    const {
      data: {
        data: { loginId },
      },
    } = node;
    history.push(`/user_profile?activeTab=${activeTab}&context=USER_PROFILE&id=${loginId}`);
  };

  const handleNewEmail = () => {
    let _selectedEmail: $TSFixMe = [];
    const selectedRows = gridApiRef.current?.getSelectedRows();
    selectedRows?.forEach(item => {
      _selectedEmail.push({ name: item.data.firstName, email: item.data.username });
    });

    setSelectedEmail(_selectedEmail);
    console.log(_selectedEmail);
    setNewEmailDialog(true);
  };

  const handleDelete = async () => {
    if (gridApiRef.current?.getSelectedRows()) {
      const selectedRows = gridApiRef.current?.getSelectedRows();
      const filteredData = selectedRows?.map(item => item.data.username);
      const toBeDeleted = filteredData && Object.values(filteredData);
      const newUserProfilesList = data.getAllUserProfiles.filter(i => !toBeDeleted.includes(i.username));
      let currentUserEmail = '';
      await AmplifyAuth.currentUserInfo().then(res => {
        currentUserEmail = res.attributes.email;
      });
      try {
        await DELETE_USER_PROFILES_SERVICE(toBeDeleted, newUserProfilesList);
        handleDrawerExit();
        setToastMessage('Deleted Successfully!');
        toBeDeleted.forEach(item => {
          if (currentUserEmail === item) {
            history.push('/logout');
          }
        });
      } catch {
        setSeverity('error');
        setToastMessage("Couldn't delete, please try again!");
      }
    }
  };

  const handleSort = () => {
    setSortByDate(!sortByDate);
  };

  const handleFullScreen = () => {
    console.log('handleFullScreen');
  };

  const handleNewEmailExit = () => {
    setNewEmailDialog(false);
  };

  const handleNewUser = () => {
    setNewUserDialog(true);
  };

  const handleRowSelected = () => {
    let _iconButtons = iconButtons;
    const count = gridApiRef.current?.getSelectedRows().length || 0;
    if (count > 0) {
      if (count > 1) {
        handleDrawerExit();
      }
      _iconButtons = iconButtonsGenerator(
        handleNewUser,
        handleNewEmail,
        handleDelete,
        handleSort,
        handleFullScreen,
        true,
      );
    } else {
      _iconButtons = iconButtonsGenerator(
        handleNewUser,
        handleNewEmail,
        handleDelete,
        handleSort,
        handleFullScreen,
        false,
      );
    }
    setIconButtons(_iconButtons);
  };

  const resetAllFiltersAndSorting = () => {
    setActive(true);
    setInactive(true);
    setSelectAll(false);
  };

  const handleSignUp = (personalInfo: PersonalInfo, companyInfo: CompanyInfo, location: string) => {
    addNewUser({
      variables: {
        input: {
          managerId: 1,
          username: personalInfo.username,
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          mobileNo: personalInfo.mobileNumber,
          locationId: location,
          groupId: companyInfo.group,
          subGroupId: companyInfo.subgroup,
          groupCategoryId: companyInfo.category,
          company: companyInfo.companyName,
        },
      },
    })
      .then(response => {
        setSeverity('success');
        setToastMessage('New user added successfully!');
        setNewUserDialog(false);

        updateQuery(prev => {
          const _oldUserProfiles = prev.getAllUserProfiles;
          _oldUserProfiles.push(response.data?.createUserProfile);
          const _udpatedCachedData = { getAllUserProfiles: _oldUserProfiles };
          return _udpatedCachedData;

          // TODO: parsed data for list view
        });
      })
      .catch(error => {
        setSeverity('error');
        setToastMessage("Couldn't add new user, please try again!");
        console.log(error);
      });
  };

  // const handleNewUserExit = () => {
  //   setNewUserDialog(false);
  // };

  const filtersRow = filtersRowGenerator(selectAll, active, inactive, handleChangeCheckbox);
  const actionButtons = actionButtonsGenerator(handleActionButtonClick);
  const columnDefs = columnDefsGenerator(handleCellClicked);

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
    if (userProfiles) {
      let _data: $TSFixMe = [];
      _data = data?.getAllUserProfiles.filter(({ status }) => {
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
      getParsedData(_data);
    }
    const _iconButtons = iconButtonsGenerator(
      handleNewUser,
      handleNewEmail,
      handleDelete,
      handleSort,
      handleFullScreen,
      false,
    );
    setIconButtons(_iconButtons);
  }, [active, inactive]);

  React.useEffect(() => {
    if (data && data.getAllUserProfiles) {
      getParsedData(data?.getAllUserProfiles);

      const _iconButtons = iconButtonsGenerator(
        handleNewUser,
        handleNewEmail,
        handleDelete,
        handleSort,
        handleFullScreen,
        false,
      );
      setIconButtons(_iconButtons);
    }
  }, [data]);

  React.useEffect(() => {
    if (!toggleAdvanceSearch && data && data.getAllUserProfiles) {
      getParsedData(data?.getAllUserProfiles);
    }
  }, [toggleAdvanceSearch]);

  React.useEffect(() => {
    if (data?.getAllUserProfiles) {
      getParsedData(data?.getAllUserProfiles);
      resetAllFiltersAndSorting();
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (data && data.getAllUserProfiles) {
      const _data = sortBy(data.getAllUserProfiles, ['creationDate']);
      if (sortByDate) {
        getParsedData(_data);
      } else {
        getParsedData(_data.reverse());
      }
      const _iconButtons = iconButtonsGenerator(
        handleNewUser,
        handleNewEmail,
        handleDelete,
        handleSort,
        handleFullScreen,
        false,
      );
      setIconButtons(_iconButtons);
    }
  }, [sortByDate]);

  return (
    <>
      <Dashboard>
        <CardWrapper className={!!context ? 'collapse' : 'item'}>
          <TabView route={activeTab} tabs={tabs} onClick={handleClickTab}>
            <SortablesAndActionButtons>
              <Sortables sortables={sortables} onClick={handleClickSortable} />
              <ActionButtons actions={actionButtons} />
            </SortablesAndActionButtons>
            {toggleAdvanceSearch && (
              <AdvanceSearchWrapper>
                <AdvanceSearch onChangeAdvanceSearch={handleChangeAdvanceSearch} />
              </AdvanceSearchWrapper>
            )}
            <ListView
              loading={loading || addNewUserLoading}
              error={error}
              data={userProfiles}
              columnDefs={columnDefs}
              onGridReady={handleGridReady}
              onRowSelected={handleRowSelected}
              iconButtons={iconButtons}
              filtersRow={filtersRow}
            />
          </TabView>
        </CardWrapper>
        {!!context && <DetailsDrawer onExit={handleDrawerExit} updateQuery={updateQuery} />}
      </Dashboard>
      <DialogModal show={newEmailDialog} onExit={handleNewEmailExit} payload={selectedEmail} render={NewEmail} />
      <Modal
        title={null}
        centered={true}
        width="750px"
        visible={newUserDialog}
        footer={null}
        onCancel={() => setNewUserDialog(false)}
      >
        <Signup onSubmit={handleSignUp} title="Add New User" isAdmin={true} />
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

export default UserProfile;
