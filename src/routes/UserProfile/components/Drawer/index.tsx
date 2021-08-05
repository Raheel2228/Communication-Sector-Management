import React from 'react';
import { cloneDeep } from 'lodash';
import { Button, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_USER_PROFILE_QUERY, UPDATE_USER_PROFILE_MUTATION, GET_USER_PROFILES_QUERY } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader, LoadingError } from 'components';
import { Title, RoundButtonWrapper, Header } from './styled.components';
import NewUserCredentials from './../NewUserCredentials';
import { DialogModal } from 'components';
import { LocationDropdown } from 'commons';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery?: $TSFixMe;
}

const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const { error, loading, data } = useQuery(GET_USER_PROFILE_QUERY, {
    variables: {
      id,
    },
  });

  const [updateUserProfile, { loading: updating, error: updateError }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    onError: () => {},
  });
  const [collapseMap, setCollapseMap] = React.useState(new Map());
  const [credentialsDialog, setCredentialsDialog] = React.useState(false);
  const [_status, setStatus] = React.useState('inactive');

  const [_firstName, setFirstName] = React.useState();
  const [_lastName, setLastName] = React.useState();
  const [_email, setEmail] = React.useState();
  const [_mobileNo, setMobileNo] = React.useState();

  const toggleSectionExpand = (key: string) => {
    const _collapseMap = collapseMap;
    _collapseMap.set(key, !collapseMap.get(key));
    setCollapseMap(cloneDeep(_collapseMap));
  };

  const updateUserProfileData = () => {
    const input = {
      loginId: data?.getUserProfile?.loginId,
      managerId: data?.getUserProfile?.manager?.managerId,
      groupId: data?.getUserProfile?.group?.groupId,
      subGroupId: data?.getUserProfile?.subGroup?.subGroupId,
      groupCategoryId: data?.getUserProfile?.groupCategory?.groupCategoryId,
      locationId: data?.getUserProfile?.location.locationId,
      firstName: _firstName,
      lastName: _lastName,
      mobileNo: _mobileNo,
      company: data?.getUserProfile?.company,
      status: _status,
    };

    updateUserProfile({
      variables: {
        input,
      },
      refetchQueries: ['getUserProfile'],
      awaitRefetchQueries: true,
    }).then(() => {
      updateQuery &&
        updateQuery(prev => {
          const updatedCachedData = prev.getAllUserProfiles?.map(a => {
            const returnValue = { ...a };
            if (a.loginId == data?.getUserProfile?.loginId) {
              returnValue.firstName = _firstName;
              returnValue.lastName = _lastName;
              returnValue.mobileNo = _mobileNo;
              returnValue.status = _status;
            }
            return returnValue;
          });
          return { getAllUserProfiles: updatedCachedData };
        });
    });
  };

  React.useEffect(() => {
    if (data && data.getUserProfile?.status) {
      setStatus(data.getUserProfile?.status);
      setFirstName(data.getUserProfile?.firstName);
      setLastName(data.getUserProfile?.lastName);
      setEmail(data.getUserProfile?.username);
      setMobileNo(data.getUserProfile?.mobileNo);
    }
  }, [data]);

  React.useEffect(() => {
    const _collapseMap = collapseMap;
    _collapseMap.set('personal', false);
    _collapseMap.set('company', false);
    _collapseMap.set('manager', false);
    setCollapseMap(cloneDeep(_collapseMap));
  }, []);

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Header>
        <Title>{`${data.getUserProfile.firstName} ${data.getUserProfile.lastName}`}</Title>
        <div>
          <Button
            variant="round"
            label="Crendetials"
            onClick={() => {
              setCredentialsDialog(true);
            }}
          />
        </div>
      </Header>
      <Section
        title="Personal Info"
        collapse={collapseMap.get('personal')}
        toggleCollapse={toggleSectionExpand}
        collapseId={'personal'}
      >
        <TextField
          label="First Name"
          value={_firstName}
          alternative={true}
          onChange={e => setFirstName(e.currentTarget.value)}
          disabled={_status === 'inactive'}
        />
        <TextField
          label="Last Name"
          value={_lastName}
          alternative={true}
          onChange={e => setLastName(e.currentTarget.value)}
          disabled={_status === 'inactive'}
        />
        <TextField label="Password" value={'password'} alternative={true} mode="password" disabled={true} />
        <TextField
          label="Email"
          value={_email}
          alternative={true}
          onChange={e => setEmail(e.currentTarget.value)}
          disabled={true}
        />
        <TextField
          label="Contact Number"
          value={_mobileNo}
          alternative={true}
          onChange={e => setMobileNo(e.currentTarget.value)}
          disabled={_status === 'inactive'}
        />
      </Section>

      <Section
        title="Company Info"
        collapse={collapseMap.get('company')}
        toggleCollapse={toggleSectionExpand}
        collapseId={'company'}
      >
        <TextField label="Company Name" value={data.getUserProfile?.company} alternative={true} disabled={true} />
        <TextField label="Company ID" value={data.getUserProfile?.companyId} alternative={true} disabled={true} />
        <TextField label="Group" value={data.getUserProfile?.group?.groupName} alternative={true} disabled={true} />
        <TextField
          label="Subgroup"
          value={data.getUserProfile?.subGroup?.subGroupName}
          alternative={true}
          disabled={true}
        />
        <TextField
          label="Category"
          value={data.getUserProfile?.groupCategory?.groupCategoryName}
          alternative={true}
          disabled={true}
        />
        <LocationDropdown
          label="Location"
          location={data.getUserProfile?.location?.locationId}
          disabled={true}
          alternative={true}
        />
      </Section>

      <Section
        title="Manager Info"
        collapse={collapseMap.get('manager')}
        toggleCollapse={toggleSectionExpand}
        collapseId={'manager'}
      >
        <TextField
          label="Company Name"
          value={data.getUserProfile?.manager?.managerName}
          alternative={true}
          disabled={true}
        />
        <TextField
          label="Company ID"
          value={data.getUserProfile?.manager?.managerEmail}
          alternative={true}
          disabled={true}
        />
      </Section>

      <Section style={{ margin: '20px 0px', display: 'flex', flexDirection: 'row' }}>
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={_status === 'active' ? true : false}
          onClick={() => {
            _status === 'active' ? setStatus('inactive') : setStatus('active');
          }}
        />
      </Section>

      <Section style={{ marginTop: '20px' }}>
        <RoundButtonWrapper>
          <Button variant="round" label="Save" onClick={updateUserProfileData} />
          <Button variant="round" label="Cancel" onClick={onCloseHandle} />
        </RoundButtonWrapper>
      </Section>
      <DialogModal
        show={credentialsDialog}
        onExit={() => {
          setCredentialsDialog(false);
        }}
        render={NewUserCredentials}
        payload={{
          username: data?.getUserProfile?.username,
        }}
      />
    </React.Fragment>
  );
};

export default Drawer;
