import React from 'react';
import { Button, LoadingError, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_OLT_SLOT, UPDATE_OLT_SLOT, GET_ALL_OLT_SLOTS } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [drawerData, setDrawerData] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_OLT_SLOT, {
    variables: {
      oltSlotId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setDrawerData(data?.getOltSlot);
    }
  }, [data]);
  const [updateOlt, { loading: updating, error: updateError }] = useMutation(UPDATE_OLT_SLOT, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setDrawerData({ ...drawerData, [field]: value });
  };
  const submitHandler = () => {
    let updatedRecords;
    const input = {
      oltSlotId: drawerData.oltSlotId,
      oltSlotNo: drawerData.oltSlotNo,
      oltId: drawerData.olt?.oltId,
      status: drawerData.status,
    };

    updateOlt({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_OLT_SLOTS,
        });
        updatedRecords = data.getAllOltSlot?.map(item => {
          if (item.oltSlotId === drawerData.oltSlotId) {
            return drawerData;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedRecords, client, GET_ALL_OLT_SLOTS, 'getAllOltSlot');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;

  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="OLT Details">
        <TextField
          label="OLT Slot No"
          alternative={true}
          value={drawerData?.oltSlotNo}
          onChange={e => updateHandler(e.currentTarget.value, 'oltSlotNo')}
        />
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={drawerData?.status === 'active' ? true : false}
          onClick={() => updateHandler(drawerData?.status === 'active' ? 'inactive' : 'active', 'status')}
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

export default Drawer;
