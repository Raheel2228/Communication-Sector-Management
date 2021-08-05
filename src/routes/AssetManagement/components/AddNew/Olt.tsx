import React from 'react';
import { TextField, SelectField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_DATA_CENTERS, ADD_NEW_OLT_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
}

const AddNewOlt: React.FC<Props> = ({ onFinish }) => {
  const { error, loading, data } = useQuery(GET_ALL_DATA_CENTERS);
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_OLT_MUTATION);

  const [dcId, setDcId] = React.useState('');
  const { value: oltName, bind: bindOltName } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!dcId || !oltName) {
      setRequiredFieldError(true);
    } else {
      const input = { dcId, oltName };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  let dataCenters: $TSFixMe;
  if (data) {
    dataCenters = data?.getAllDataCenter.map(d => {
      return {
        id: d.dcId,
        value: d.dcId,
        label: d.dcName,
      };
    });
  }

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new Olt</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <SelectField
              options={dataCenters}
              disabled={!!error || !dataCenters || loading}
              placeholder={'Data Center'}
              onChange={value => setDcId(value)}
              invalid={requiredFieldError && !dcId}
            />
          </Col>
          <Col span={12}>
            <TextField {...bindOltName} placeholder={'OLT Name'} invalid={requiredFieldError && !oltName} />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewOlt;
