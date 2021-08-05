import React from 'react';
import { Button, LoadingError, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_CORE_SWITCH_SLOT, UPDATE_CORE_SWITCH_SLOT, GET_ALL_CORE_SWITCH_SLOTS } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const CoreSwithSlotDrawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [coreSwSlot, setCoreSwSlot] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_CORE_SWITCH_SLOT, {
    variables: {
      swSlotId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setCoreSwSlot(data?.getCoreSwSlot);
    }
  }, [data]);
  const [updatecoreSwSlot, { loading: updating, error: updateError }] = useMutation(UPDATE_CORE_SWITCH_SLOT, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setCoreSwSlot({ ...coreSwSlot, [field]: value });
  };
  const submitHandler = () => {
    let updatedSwitches;
    const input = {
      swSlotId: coreSwSlot.swSlotId,
      swSlotNo: coreSwSlot.swSlotNo,
      swId: coreSwSlot.coreSw.swId,
      status: coreSwSlot.status,
    };

    updatecoreSwSlot({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_CORE_SWITCH_SLOTS,
        });
        updatedSwitches = data.getAllCoreSwSlot?.map(item => {
          if (item.swSlotId === coreSwSlot.swSlotId) {
            return coreSwSlot;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedSwitches, client, GET_ALL_CORE_SWITCH_SLOTS, 'getAllCoreSwSlot');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="Core Switch Slot Details">
        <TextField label="Core Switch Name" value={coreSwSlot?.coreSw?.swName} alternative={true} disabled={true} />
        <TextField
          label="IP Address"
          value={coreSwSlot?.coreSw?.ipAddress}
          alternative={true}
          onChange={e => updateHandler({ ...coreSwSlot?.coreSw, ipAddress: e.currentTarget.value }, 'coreSw')}
          disabled={coreSwSlot?.status !== 'active'}
        />
        <TextField
          label="Slot Number"
          value={coreSwSlot?.swSlotNo}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'swSlotNo')}
          disabled={coreSwSlot?.status !== 'active'}
        />
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={coreSwSlot?.status === 'inactive' ? false : true}
          onClick={() => updateHandler(coreSwSlot?.status === 'inactive' ? 'active' : 'inactive', 'status')}
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

export default CoreSwithSlotDrawer;
