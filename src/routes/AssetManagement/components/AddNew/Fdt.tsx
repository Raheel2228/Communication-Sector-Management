import React from 'react';
import { TextField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_FDT_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
}

const AddNewFdt: React.FC<Props> = ({ onFinish }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_FDT_MUTATION);

  const { value: fdtName, bind: bindFdtName } = useInput('');
  const { value: latitude, bind: bindLatitude } = useInput('');
  const { value: longitude, bind: bindLongitude } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!fdtName || !latitude || !longitude) {
      setRequiredFieldError(true);
    } else {
      const input = { fdtName, latitude, longitude };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new Fdt</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={24}>
            <TextField {...bindFdtName} placeholder={'Fdt Name'} invalid={requiredFieldError && !fdtName} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindLatitude} placeholder={'Latitude'} invalid={requiredFieldError && !latitude} />
          </Col>
          <Col span={12}>
            <TextField {...bindLongitude} placeholder={'Longitude'} invalid={requiredFieldError && !longitude} />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewFdt;
