import React from 'react';
import { Button, UpdateError, LoadingError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import {
  GET_CORE_SWITCH_PORT,
  GET_ALL_CORE_SWITCH_PORTS,
  GET_CORE_SW_VLAN,
  UPDATE_CORE_SWITCH_PORT,
  GET_ALL_CORE_SWITCH_SLOTS,
  CREATE_CORE_CW_VLAN,
} from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';
import { cloneDeep } from 'lodash';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [coreSwPort, setCoreSwPort] = React.useState<$TSFixMe>();
  const [vlanArray, setVLANArray] = React.useState<any>([]);
  const { error, loading, data, refetch, client } = useQuery(GET_CORE_SWITCH_PORT, {
    variables: {
      swPortId: id,
    },
  });
  const { error: swVlanError, loading: swVlanLoading, data: swVlan, refetch: refetchSWVlan } = useQuery(
    GET_CORE_SW_VLAN,
    {
      variables: {
        swVlanId: id,
      },
    },
  );

  React.useEffect(() => {
    if (data) {
      setCoreSwPort(data?.getCoreSwPort);
      setVLANArray({ 0: data?.getCoreSwPort?.defaultVlan });
    }
  }, [data]);
  const [updatecoreSwPort, { loading: updating, error: updateError }] = useMutation(UPDATE_CORE_SWITCH_PORT, {
    onError: () => {},
  });
  const [updatecorePortVLAN, { loading: updatingVLAN, error: updateVLANError }] = useMutation(CREATE_CORE_CW_VLAN);
  const updateVlanArray = (index, value) => {
    setVLANArray({ ...vlanArray, [index]: value });
  };
  const addVLAN = index => {
    setVLANArray({ ...vlanArray, [index]: '' });
  };
  const updateHandler = (value, field) => {
    setCoreSwPort({ ...coreSwPort, [field]: value });
  };
  const submitHandler = () => {
    let updatedSwitches;
    const input = {
      swPortId: coreSwPort.swPortId,
      swPortNo: coreSwPort.swPortNo,
      swSlotId: coreSwPort.swSlot.swSlotId,
      status: coreSwPort.status,
      defaultVlan: vlanArray[0],
    };
    updatecoreSwPort({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_CORE_SWITCH_PORTS,
        });
        updatedSwitches = data.getAllCoreSwPort?.map(item => {
          if (item.swPortId === coreSwPort.swPortId) {
            return coreSwPort;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedSwitches, client, GET_ALL_CORE_SWITCH_PORTS, 'getAllCoreSwPort');
      }),
    );
    Object.keys(vlanArray).map(item => {
      if (vlanArray[item + 1]) {
        const input = {
          swPortId: coreSwPort.swPortId,
          swPortNo: coreSwPort.swPortNo,
          vlan: vlanArray[item + 1],
        };
        updatecorePortVLAN({
          variables: { input },
        });
      }
    });
  };

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;
  return (
    <>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="Core Switch Port Details">
        <TextField
          label="Core Switch Name"
          value={coreSwPort?.swSlot?.coreSw?.swName}
          alternative={true}
          disabled={true}
        />
        <TextField
          label="IP Address"
          value={coreSwPort?.swSlot?.coreSw?.ipAddress}
          alternative={true}
          type="number"
          onChange={e =>
            updateHandler(
              {
                ...coreSwPort?.swSlot,
                coreSw: {
                  ...coreSwPort?.swSlot.coreSw,
                  ipAddress: e.currentTarget.value,
                },
              },
              'swSlot',
            )
          }
          disabled={coreSwPort?.status !== 'active'}
        />
        <TextField
          label="Slot No"
          value={coreSwPort?.swSlot?.swSlotNo}
          alternative={true}
          type="number"
          onChange={e =>
            updateHandler(
              {
                ...coreSwPort?.swSlot,
                swSlotNo: Number(e.currentTarget.value),
              },
              'swSlot',
            )
          }
          disabled={true}
        />
        <TextField
          label="Port No"
          value={coreSwPort?.swPortNo}
          alternative={true}
          type="number"
          onChange={e => updateHandler(Number(e.currentTarget.value), 'swPortNo')}
          disabled={coreSwPort?.status !== 'active'}
        />
      </Section>
      <Section title="VLANs" style={{ marginTop: '20px', marginBottom: '50px' }}>
        {vlanArray &&
          Object.keys(vlanArray).map((item, index) => (
            <TextField
              key={item}
              label="VLAN"
              type="number"
              value={vlanArray[item]}
              alternative={true}
              onChange={e => updateVlanArray(index, e.currentTarget.value)}
            />
          ))}
        <Button
          variant="round"
          label="Add more VLAN"
          style={{ width: '190px', marginBottom: '50px' }}
          onClick={() => addVLAN(Object.keys(vlanArray).length)}
        />
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={coreSwPort?.status === 'inactive' ? false : true}
          onClick={() => updateHandler(coreSwPort?.status === 'inactive' ? 'active' : 'inactive', 'status')}
        />
      </Section>
      <Section style={{ marginTop: '20px' }}>
        <RoundButtonWrapper>
          <Button variant="round" label="Save" onClick={submitHandler} />
          <Button variant="round" label="Cancel" onClick={onCloseHandle} />
        </RoundButtonWrapper>
      </Section>{' '}
    </>
  );
};

export default Drawer;
