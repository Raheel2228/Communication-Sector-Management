import React from 'react';
import {
  Button,
  SelectField,
  Section,
  TextField,
  SwitchButton,
  SpinLoader,
  LoadingError,
  UpdateError,
} from 'components';
import { GET_DATA_CENTER, GET_ALL_DC_LOCATIONS, UPDATE_NEW_DATA_CENTER_MUTATION, GET_ALL_DATA_CENTERS } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RoundButtonWrapper } from './styled.components';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const { data, error, loading, refetch: refetchDC, client } = useQuery(GET_DATA_CENTER, {
    variables: {
      dcId: id,
    },
  });
  const { data: dcLocations, error: errorFetchingDcLocations, loading: fetchingDcLocations, refetch } = useQuery(
    GET_ALL_DC_LOCATIONS,
  );
  const [updateDataCenter, { loading: updating, error: updateError }] = useMutation(UPDATE_NEW_DATA_CENTER_MUTATION, {
    onError: () => {},
  });
  const [dataCenter, setDataCenter] = React.useState({
    dcId: '',
    dcName: '',
    dcLocationId: '',
    status: '',
  });

  let locations = [];
  if (dcLocations) {
    locations = dcLocations?.getAllDcLocation.map(d => {
      return {
        id: d.locationId,
        value: d.locationId,
        label: d.locationName,
      };
    });
  }

  const updateHandler = (value, field) => {
    setDataCenter({ ...dataCenter, [field]: value });
  };

  const submitHandler = () => {
    let updatedDataCenters;
    updateDataCenter({
      variables: { input: dataCenter },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_DATA_CENTERS,
        });
        updatedDataCenters = data.getAllDataCenter?.map(item => {
          if (item.dcId === dataCenter.dcId) {
            return dataCenter;
          } else return item;
        });
      },
    }).then(() =>
      refetchDC().then(() => {
        refetch().then(() => {
          updateQuery && updateQuery(updatedDataCenters, client, GET_ALL_DATA_CENTERS, 'getAllDataCenter');
        });
      }),
    );
  };

  React.useEffect(() => {
    if (data)
      setDataCenter({
        dcId: data.getDataCenter.dcId,
        dcName: data.getDataCenter.dcName,
        dcLocationId: data.getDataCenter.dcLocation.locationId,
        status: data.getDataCenter.status,
      });
  }, [data]);

  if (loading || fetchingDcLocations || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  if (data && data.getDataCenter) {
    return (
      <React.Fragment>
        {updateError && <UpdateError error={updateError.message} />}
        <Section title="Data Center Details">
          <TextField label="ID" value={dataCenter.dcId} alternative={true} disabled={true} />
          <TextField
            label="Name"
            value={dataCenter.dcName}
            alternative={true}
            onChange={e => updateHandler(e.currentTarget.value, 'dcName')}
          />
          <SelectField
            options={locations}
            disabled={!!errorFetchingDcLocations || !locations || fetchingDcLocations}
            label="DC Location"
            value={dataCenter.dcLocationId}
            onChange={value => updateHandler(value, 'dcLocationId')}
            style={{ marginBottom: '20px' }}
          />
          <SwitchButton
            onText={'Active'}
            offText={'Inactive'}
            status={dataCenter.status === 'active' ? true : false}
            onClick={() => updateHandler(dataCenter.status === 'active' ? 'inactive' : 'active', 'status')}
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
  }
  return <LoadingError />;
};

export default Drawer;
