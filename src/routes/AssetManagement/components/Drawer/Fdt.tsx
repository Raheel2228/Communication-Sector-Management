import React from 'react';
import { Button, LoadingError, UpdateError } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_FDT, UPDATE_FDT, GET_ALL_FDT } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [drawerData, setDrawerData] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_FDT, {
    variables: {
      fdtId: id,
    },
  });

  React.useEffect(() => {
    if (data) {
      setDrawerData(data?.getFdt);
    }
  }, [data]);
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(UPDATE_FDT, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setDrawerData({ ...drawerData, [field]: value });
  };
  const submitHandler = () => {
    let updatedRecords;
    const input = {
      fdtId: drawerData?.fdtId,
      fdtName: drawerData?.fdtName,
      latitude: drawerData?.latitude,
      longitude: drawerData?.longitude,
      status: drawerData?.status,
    };

    updateMutation({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_FDT,
        });
        updatedRecords = data?.getAllFdt.map(item => {
          if (item.fdtId === drawerData.fdtId) {
            return drawerData;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedRecords, client, GET_ALL_FDT, 'getAllFdt');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;

  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="FDT Details">
        <TextField label="FDT Name" value={drawerData?.fdtName} alternative={true} disabled={true} />
        <Row gutter={[16, 12]}>
          <Col span={8}>
            <TextField
              label="Latitude"
              value={drawerData?.latitude}
              alternative={true}
              disabled={drawerData?.status === 'active' ? false : true}
              onChange={e => updateHandler(e.currentTarget.value, 'latitude')}
            />
          </Col>
          <Col span={8}>
            <TextField
              label="Longitude"
              value={drawerData?.longitude}
              alternative={true}
              disabled={drawerData?.status === 'active' ? false : true}
              onChange={e => updateHandler(e.currentTarget.value, 'longitude')}
            />
          </Col>
        </Row>
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
