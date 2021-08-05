import React from 'react';
import { Button, LoadingError, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_OLT_PORT, UPDATE_OLT_PORT, GET_ALL_OLT_PORTS } from 'gql';
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
  const { error, loading, data, refetch, client } = useQuery(GET_OLT_PORT, {
    variables: {
      oltPortId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setDrawerData(data?.getOltPort);
    }
  }, [data]);
  const [updateOlt, { loading: updating, error: updateError }] = useMutation(UPDATE_OLT_PORT, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setDrawerData({ ...drawerData, [field]: value });
  };
  const submitHandler = () => {
    let updatedRecords;
    const input = {
      oltPortId: drawerData.oltPortId,
      oltPortNo: drawerData.oltPortNo,
      oltSlotId: drawerData.oltSlot?.oltSlotId,
      status: drawerData.status,
    };

    updateOlt({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_OLT_PORTS,
        });
        updatedRecords = data.getAllOltPort?.map(item => {
          if (item.oltPortId === drawerData.oltPortId) {
            return drawerData;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedRecords, client, GET_ALL_OLT_PORTS, 'getAllOltPort');
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
          label="OLT Port No"
          alternative={true}
          value={drawerData?.oltPortNo}
          onChange={e => updateHandler(e.currentTarget.value, 'oltPortNo')}
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
