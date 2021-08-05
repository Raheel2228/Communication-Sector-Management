import React from 'react';
import { cloneDeep } from 'lodash';
import { Dashboard } from 'layouts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_USER_PROFILE_QUERY, UPDATE_USER_PROFILE_MUTATION, GET_USER_PROFILES_QUERY } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader, LoadingError } from 'components';
import { LocationDropdown } from 'commons';
import { Title, RoundButtonWrapper, Header } from './styled.components';

const Drawer: React.FC = () => {
  const { error, loading, data } = useQuery(GET_USER_PROFILE_QUERY, {
    variables: {
      id: localStorage.getItem('loginId'),
    },
  });

  const [updateUserProfile, { loading: updating, error: updateError }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    onError: () => {},
  });
  const [collapseMap, setCollapseMap] = React.useState(new Map());
  const [_status, setStatus] = React.useState('inactive');

  const [_firstName, setFirstName] = React.useState();
  const [_lastName, setLastName] = React.useState();
  const [_email, setEmail] = React.useState();
  const [_mobileNo, setMobileNo] = React.useState();

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
    <Dashboard>
      <Card style={{ margin: '10% auto', width: 500 }}>
        <CardContent>
          <Section title="Personal Info">
            {updateError && <UpdateError error={updateError.message} />}
            <Header>
              <Title>{`${data.getUserProfile.firstName} ${data.getUserProfile.lastName}`}</Title>
            </Header>
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
          <Section title="Company Info">
            {updateError && <UpdateError error={updateError.message} />}
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
          <Section title="Manager Info">
            {updateError && <UpdateError error={updateError.message} />}
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
            <RoundButtonWrapper>
              <Button variant="round" label="Save" onClick={updateUserProfileData} />
            </RoundButtonWrapper>
          </Section>
        </CardContent>
      </Card>
    </Dashboard>
  );
};

export default Drawer;
