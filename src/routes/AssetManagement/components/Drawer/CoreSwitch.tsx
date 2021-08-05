import React from 'react';
import { cloneDeep } from 'lodash';
import { Button, LoadingError } from 'components';
import { Section, TextField, SwitchButton, UpdateError } from 'components';
import { GET_CORE_SWITCH, UPDATE_CORE_SWITCH_MUTATION, GET_ALL_CORE_SWITCHES } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const CoreSwitchDrawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [coreSwitch, setCoreSwitch] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_CORE_SWITCH, {
    variables: {
      swId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setCoreSwitch(data?.getCoreSwitch);
    }
  }, [data]);
  const [updateCoreSwitch, { loading: updating, error: updateError }] = useMutation(UPDATE_CORE_SWITCH_MUTATION, {
    onError: () => {},
  });
  const [collapseMap, setCollapseMap] = React.useState(new Map());

  const toggleSectionExpand = (key: string) => {
    const _collapseMap = collapseMap;
    _collapseMap.set(key, !collapseMap.get(key));
    setCollapseMap(cloneDeep(_collapseMap));
  };
  const updateHandler = (value, field) => {
    setCoreSwitch({ ...coreSwitch, [field]: value });
  };
  const submitHandler = () => {
    let updatedSwitches;
    const input = {
      swId: coreSwitch.swId,
      swName: coreSwitch.swName,
      dcId: coreSwitch.dc?.dcId,
      totalPorts: coreSwitch.totalPorts,
      capacity: coreSwitch.capacity,
      macAddress: coreSwitch.macAddress,
      ipAddress: coreSwitch.ipAddress,
      modelName: coreSwitch.modelName,
      assetTag: coreSwitch.assetTag,
      status: coreSwitch.status,
    };

    updateCoreSwitch({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_CORE_SWITCHES,
        });
        updatedSwitches = data.getAllCoreSwitch?.map(item => {
          if (item.swId === coreSwitch.swId) {
            return coreSwitch;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedSwitches, client, GET_ALL_CORE_SWITCHES, 'getAllCoreSwitch');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section
        title="Core Switch Details"
        collapse={collapseMap.get('personal')}
        toggleCollapse={toggleSectionExpand}
        collapseId={'personal'}
      >
        <TextField label="SW ID" value={coreSwitch?.swId} alternative={true} disabled={true} />
        <TextField label="Data Center" value={coreSwitch?.dc?.dcName} alternative={true} disabled={true} />
        <TextField
          label="Mac Address"
          value={coreSwitch?.macAddress}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'macAddress')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="Core Switch Name"
          value={coreSwitch?.swName}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'swName')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="Model Number"
          value={coreSwitch?.modelName}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'modelName')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="IP Address"
          value={coreSwitch?.ipAddress}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'ipAddress')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="Asset Tag"
          value={coreSwitch?.assetTag}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'assetTag')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="Total Ports"
          value={coreSwitch?.totalPorts}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'totalPorts')}
          disabled={!coreSwitch?.status}
        />
        <TextField
          label="Capacity"
          value={coreSwitch?.capacity}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'capacity')}
          disabled={!coreSwitch?.status}
        />
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={coreSwitch?.status === 'active' ? true : false}
          onClick={() => updateHandler(coreSwitch.status === 'active' ? 'inactive' : 'active', 'status')}
        />
      </Section>
      <Section style={{ marginTop: '20px' }}>
        <RoundButtonWrapper>
          <Button variant="round" label="Save" onClick={submitHandler} />
          <Button variant="round" label="Cancel" onClick={onCloseHandle} />
        </RoundButtonWrapper>
      </Section>{' '}
    </React.Fragment>
  );
};

export default CoreSwitchDrawer;
