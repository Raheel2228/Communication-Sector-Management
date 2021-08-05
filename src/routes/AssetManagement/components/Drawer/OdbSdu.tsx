import React from 'react';
import { Button, LoadingError, UpdateError, SelectField } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import { GET_ODB, UPDATE_OLT, UPDATE_ODB_MUATION, GET_ALL_FDT_ODB } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';
import { odbTypes } from '../AddNew/AddNewOdb';
import { Row, Col } from 'antd';
import { flattenObject } from 'utils/collections';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [drawerData, setdrawerData] = React.useState<$TSFixMe>();
  const { error, loading, data, refetch, client } = useQuery(GET_ODB, {
    variables: {
      odbId: id,
    },
  });
  React.useEffect(() => {
    if (data) {
      setdrawerData(flattenObject(data?.getOdb));
    }
  }, [data]);
  const [updateOdb, { loading: updating, error: updateError }] = useMutation(UPDATE_ODB_MUATION, {
    onError: () => {},
  });

  const updateHandler = (value, field) => {
    setdrawerData({ ...drawerData, [field]: value });
  };
  const submitHandler = () => {
    let updatedRecords;
    const input = {
      odbId: drawerData?.odbId,
      odbName: drawerData?.odbName,
      fdtSplitterPortId: drawerData?.fdtSplitterPortId,
      odbSplitterType: drawerData?.odbSplitterType,
      odbSplitterShelf: drawerData?.odbSplitterShelf,
      area: drawerData?.area,
      street: drawerData?.street,
      street1: drawerData?.street1,
      latitude: drawerData?.latitude,
      longitude: drawerData?.longitude,
      status: drawerData?.status,
    };

    updateOdb({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_FDT_ODB,
        });
        updatedRecords = data.getAllOdb?.map(item => {
          if (item.odbId === drawerData.odbId) {
            return drawerData;
          } else return item;
        });
      },
    }).then(() =>
      refetch().then(() => {
        updateQuery && updateQuery(updatedRecords, client, GET_ALL_FDT_ODB, 'getAllOdb');
      }),
    );
  };

  if (loading || updating) return <SpinLoader />;

  if (error) return <LoadingError />;

  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="ODB Details">
        <Row gutter={16}>
          <Col span={8}>
            <SelectField
              options={odbTypes}
              label="Type"
              value={drawerData?.odbType}
              disabled={drawerData?.status === 'active' ? false : true}
              placeholder={'Type'}
              onChange={value => updateHandler(value, 'type')}
            />
          </Col>
          <Col span={16}>
            <TextField
              label="Cluster Area^v"
              value={drawerData?.area}
              alternative={true}
              disabled={drawerData?.status === 'active' ? false : true}
              onChange={e => updateHandler(e.currentTarget.value, 'area')}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <TextField
              label="Cluster Street"
              value={drawerData?.street}
              alternative={true}
              disabled={drawerData?.status === 'active' ? false : true}
              onChange={e => updateHandler(e.currentTarget.value, 'street')}
            />
          </Col>
          <Col span={12}>
            <TextField
              label="Cluster Madkhal"
              value={drawerData?.street}
              disabled={drawerData?.status === 'active' ? false : true}
              alternative={true}
              onChange={e => updateHandler(e.currentTarget.value, 'street1')}
            />
            <TextField
              label="Cluster House Number"
              value={drawerData?.street1}
              disabled={drawerData?.status === 'active' ? false : true}
              alternative={true}
              onChange={e => updateHandler(e.currentTarget.value, 'street1')}
            />
          </Col>
        </Row>
      </Section>
      <Section title="SDU Details" style={{ marginTop: '20px' }}>
        <TextField label="DC Name" value={drawerData?.dcName} alternative={true} disabled={true} />
        <TextField
          label="OLT Name"
          value={drawerData?.oltName}
          alternative={true}
          disabled={true}
          onChange={e => updateHandler(e.currentTarget.value, 'oltName')}
        />
        <Row gutter={16}>
          <Col span={8}>
            <TextField
              label="OLT Slot"
              value={drawerData?.oltSlotId}
              disabled={drawerData?.status === 'active' ? false : true}
              alternative={true}
              onChange={e => updateHandler(e.currentTarget.value, 'oltSlotId')}
            />
          </Col>
          <Col span={8}>
            <TextField
              label="OLT Port"
              value={drawerData?.oltPortId}
              disabled={drawerData?.status === 'active' ? false : true}
              alternative={true}
              onChange={e => updateHandler(e.currentTarget.value, 'oltPortId')}
            />
          </Col>
        </Row>
        <TextField
          label="FDT Name"
          value={drawerData?.fdtName}
          alternative={true}
          disabled={drawerData?.status === 'active' ? false : true}
          onChange={e => updateHandler(e.currentTarget.value, 'fdtName')}
        />
        <TextField
          label="FDT Splitter Port"
          value={drawerData?.fdtSplitterPortNo}
          alternative={true}
          disabled={drawerData?.status === 'active' ? false : true}
          onChange={e => updateHandler(e.currentTarget.value, 'fdtSplitterPortNo')}
        />
        <TextField
          label="ODB Name"
          disabled={drawerData?.status === 'active' ? false : true}
          value={drawerData?.odbName}
          alternative={true}
          onChange={e => updateHandler(e.currentTarget.value, 'odbName')}
        />
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
          onClick={() => updateHandler(drawerData.status === 'active' ? 'inactive' : 'active', 'status')}
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
