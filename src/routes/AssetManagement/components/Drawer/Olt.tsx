import React from 'react';
import { Button, LoadingError, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_OLT, UPDATE_OLT, GET_ALL_OLT } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const OltDrawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [olt, setOlt] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_OLT, {
    variables: {
      oltId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setOlt(data?.getOlt);
    }
  }, [data]);
  const [updateOlt, { loading: updating, error: updateError }] = useMutation(UPDATE_OLT, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setOlt({ ...olt, [field]: value });
  };
  const submitHandler = () => {
    let updatedRecords;
    const input = {
      oltId: olt.oltId,
      oltName: olt.oltName,
      dcId: olt.dc?.dcId,
      status: olt.status,
    };

    updateOlt({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_OLT,
        });
        updatedRecords = data.getAllOlt?.map(item => {
          if (item.oltId === olt.oltId) {
            return olt;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedRecords, client, GET_ALL_OLT, 'getAllOlt');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;

  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="OLT Details">
        <TextField label="Data Center" value={olt?.dc?.dcName} alternative={true} disabled={true} />
        <TextField label="OLT ID" value={olt?.oltId} alternative={true} disabled={true} />
        <TextField
          label="OLT Name"
          value={olt?.oltName}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'oltName')}
        />
        <SwitchButton
          onText={'Active'}
          offText={'Inactive'}
          status={olt?.status === 'active' ? true : false}
          onClick={() => updateHandler(olt.status === 'active' ? 'inactive' : 'active', 'status')}
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

export default OltDrawer;
