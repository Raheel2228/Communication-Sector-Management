import React from 'react';
import { Grid, Grow } from '@material-ui/core';
import { Person, BusinessCenter, LocationOn, Settings } from '@material-ui/icons';
import { TextField, SelectField } from 'components/FormFields';
import * as Styles from './../styled.components';
import { useInput } from 'utils';
import * as Actions from './../actions';
import { GroupsDropdown, LocationDropdown, ManagerDropdown } from 'commons';

interface Props {
  onSubmit: (
    personalInfo: PersonalInfo,
    companyInfo: CompanyInfo,
    location: string,
    serviceProvider: ServiceProvider,
  ) => void;
  title?: string;
  isAdmin?: boolean;
}

const ComponentName: React.FC<Props> = ({ onSubmit, title, isAdmin = false }) => {
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: mobileNumber, bind: bindMobileNumber } = useInput('');
  const { value: companyName, bind: bindCompanyName } = useInput('');

  const [group, setGroup] = React.useState('');
  const [subgroup, setSubgroup] = React.useState('');
  const [groupName, setGroupName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [isServiceProvider, setIsServiceProvider] = React.useState(false);

  const [manager, setManager] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { value: rspName, bind: bindRspName } = useInput('');
  const { value: rspEmail, bind: bindRspEmail } = useInput('');
  const { value: rspAddress, bind: bindRspAddress } = useInput('');
  const { value: rspContactNumber, bind: bindRspContactNumber } = useInput('');

  const [activeTab, setActiveTab] = React.useState(0);
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const personalInfo = {
    firstName,
    lastName,
    username,
    mobileNumber,
    password,
  };

  const companyInfo = {
    companyName,
    group,
    subgroup,
    category,
    manager,
  };

  const serviceProvider = {
    rspName,
    rspEmail,
    rspAddress,
    rspContactNumber,
  };

  const onButtonClick = (action: 'next' | 'previous' | 'submit') => () => {
    setRequiredFieldError(false);
    const response = Actions.signup(
      action,
      activeTab,
      setActiveTab,
      personalInfo,
      companyInfo,
      location,
      serviceProvider,
      isAdmin,
    );
    if (!response) setRequiredFieldError(true);
    if (response && action === 'submit') onSubmit(personalInfo, companyInfo, location, serviceProvider);
  };

  React.useEffect(() => {
    const _isServiceProvider = groupName === 'service_provider';
    setIsServiceProvider(_isServiceProvider);
  }, [groupName]);

  return (
    <Styles.Form>
      <Styles.Title>{title ? title : 'Create your account'}</Styles.Title>
      <Styles.TabWrapper>
        <Styles.Tab active={activeTab === 0}>
          <Styles.TabIcon active={activeTab === 0}>
            <Person />
          </Styles.TabIcon>{' '}
          Personal Info
        </Styles.Tab>
        <Styles.Tab active={activeTab === 1}>
          <Styles.TabIcon active={activeTab === 1}>
            <BusinessCenter />
          </Styles.TabIcon>{' '}
          Company Info
        </Styles.Tab>
        <Styles.Tab active={activeTab === 2}>
          <Styles.TabIcon active={activeTab === 2}>
            <LocationOn />
          </Styles.TabIcon>{' '}
          Location
        </Styles.Tab>
        {isServiceProvider && (
          <Styles.Tab active={activeTab === 3}>
            <Styles.TabIcon active={activeTab === 3}>
              <Settings />
            </Styles.TabIcon>{' '}
            Service Proivder
          </Styles.Tab>
        )}
      </Styles.TabWrapper>
      {requiredFieldError && <Styles.Error>Please fill in the required fields!</Styles.Error>}
      {activeTab === 0 && (
        <Grow in={activeTab === 0} timeout={300}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField invalid={requiredFieldError && firstName === ''} placeholder="First Name" {...bindFirstName} />
            </Grid>
            <Grid item xs={6}>
              <TextField invalid={requiredFieldError && lastName === ''} placeholder="Last Name" {...bindLastName} />
            </Grid>
            <Grid item xs={isAdmin ? 6 : 4}>
              <TextField invalid={requiredFieldError && username === ''} placeholder="Email" {...bindUsername} />
            </Grid>
            {!isAdmin && (
              <Grid item xs={4}>
                <TextField
                  invalid={requiredFieldError && password === ''}
                  placeholder="Password"
                  mode="password"
                  {...bindPassword}
                />
              </Grid>
            )}
            <Grid item xs={isAdmin ? 6 : 4}>
              <TextField
                invalid={requiredFieldError && mobileNumber === ''}
                placeholder="Mobile"
                {...bindMobileNumber}
              />
            </Grid>
          </Grid>
        </Grow>
      )}
      {activeTab === 1 && (
        <Grow in={activeTab === 1} timeout={300}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                placeholder="Company Name"
                {...bindCompanyName}
                invalid={requiredFieldError && companyName === ''}
              />
            </Grid>
            <Grid item xs={12}>
              <GroupsDropdown
                onChangeGroup={(value, group) => {
                  setGroup(value);
                  group && group.groupName && setGroupName(group.groupName);
                }}
                onChangeSubgroup={value => setSubgroup(value)}
                onChangeCategory={value => setCategory(value)}
                isGroupInvalid={requiredFieldError && group === ''}
                isSubGroupInvalid={requiredFieldError && subgroup === ''}
                isCategoryInvalid={requiredFieldError && category === ''}
                layout="row"
                group={group}
                subgroup={subgroup}
                category={category}
              />
            </Grid>
            <Grid item xs={12}>
              <ManagerDropdown
                onChange={value => setManager(value)}
                invalid={requiredFieldError && manager === ''}
                manager={manager}
              />
            </Grid>
          </Grid>
        </Grow>
      )}
      {activeTab === 2 && (
        <Grow in={activeTab === 2} timeout={300}>
          <Grid container spacing={1}>
            <LocationDropdown
              onChange={value => setLocation(value)}
              invalid={requiredFieldError && location === ''}
              location={location}
            />
          </Grid>
        </Grow>
      )}
      {activeTab === 3 && isServiceProvider && (
        <Grow in={activeTab === 3} timeout={300}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField placeholder="RSP Name" {...bindRspName} />
            </Grid>
            <Grid item xs={6}>
              <TextField placeholder="RSP Email" {...bindRspEmail} invalid={requiredFieldError && rspEmail === ''} />
            </Grid>
            <Grid item xs={12}>
              <TextField placeholder="RSP Address" {...bindRspAddress} />
            </Grid>
            <Grid item xs={12}>
              <TextField placeholder="RSP Contact Number" {...bindRspContactNumber} />
            </Grid>
          </Grid>
        </Grow>
      )}
      <Styles.Actions className="signup">
        {activeTab > 0 && <Styles.MyButton label="Previous" variant="round" onClick={onButtonClick('previous')} />}
        {activeTab < 2 && !isServiceProvider && (
          <Styles.MyButton label="Next" variant="round" onClick={onButtonClick('next')} />
        )}
        {activeTab < 3 && isServiceProvider && (
          <Styles.MyButton label="Next" variant="round" onClick={onButtonClick('next')} />
        )}
        {activeTab === 3 && isServiceProvider && (
          <Styles.MyButton label="Submit" variant="round" onClick={onButtonClick('submit')} />
        )}
        {activeTab === 2 && !isServiceProvider && (
          <Styles.MyButton label="Submit" variant="round" onClick={onButtonClick('submit')} />
        )}
      </Styles.Actions>
    </Styles.Form>
  );
};

export default ComponentName;
