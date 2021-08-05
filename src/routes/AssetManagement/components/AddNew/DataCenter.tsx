import React from 'react';
import { TextField, SelectField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_DC_LOCATIONS, ADD_NEW_DATA_CENTER_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';

interface Props {
  onFinish?: (data: any, error: string) => void;
}

const AddNewDataCenter: React.FC<Props> = ({ onFinish }) => {
  const { error, loading, data } = useQuery(GET_ALL_DC_LOCATIONS);
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_DATA_CENTER_MUTATION);

  const { value: dataCenterName, bind: dataCenterNameBind } = useInput('');
  const [dataCenterLocation, setDataCenterLocation] = React.useState('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!dataCenterName || !dataCenterLocation) {
      setRequiredFieldError(true);
    } else {
      const input = { dcName: dataCenterName, dcLocationId: dataCenterLocation };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  let locations = [];
  if (data) {
    locations = data?.getAllDcLocation.map(d => {
      return {
        id: d.locationId,
        value: d.locationId,
        label: d.locationName,
      };
    });
  }

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new Data Center</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <TextField {...dataCenterNameBind} placeholder={'DC Name'} invalid={requiredFieldError && !dataCenterName} />
        <SelectField
          options={locations}
          disabled={!!error || !locations || loading}
          placeholder={'DC Location'}
          onChange={value => setDataCenterLocation(value)}
          invalid={requiredFieldError && !dataCenterLocation}
        />
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewDataCenter;
