import React from 'react';
import { TextField, SelectField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_DATA_CENTERS, ADD_NEW_CORE_SWITCH_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
}

const AddNewCoreSwitch: React.FC<Props> = ({ onFinish }) => {
  const { error, loading, data } = useQuery(GET_ALL_DATA_CENTERS);
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_CORE_SWITCH_MUTATION);

  const { value: swName, bind: bindSwName } = useInput('');
  const { value: macAddress, bind: bindMacAddress } = useInput('');
  const { value: modelName, bind: bindModelName } = useInput('');
  const { value: ipAddress, bind: bindIpAddress } = useInput('');
  const { value: assetTag, bind: bindAssetTag } = useInput('');
  const { value: totalPorts, bind: bindTotalPorts } = useInput('');
  const { value: capacity, bind: bindCapacity } = useInput('');
  const [dcId, setDcId] = React.useState('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!swName || !macAddress || !modelName || !ipAddress || !assetTag || !totalPorts || !capacity || !dcId) {
      setRequiredFieldError(true);
    } else {
      const input = { swName, macAddress, modelName, ipAddress, assetTag, totalPorts, capacity, dcId };
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
        <h3>Setup a new Core Switch</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindSwName} placeholder={'SW Name'} invalid={requiredFieldError && !swName} />
          </Col>
          <Col span={12}>
            <SelectField
              options={dataCenters}
              disabled={!!error || !dataCenters || loading}
              placeholder={'Data Center'}
              onChange={value => setDcId(value)}
              invalid={requiredFieldError && !dcId}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindMacAddress} placeholder={'Mac Address'} invalid={requiredFieldError && !macAddress} />
          </Col>
          <Col span={12}>
            <TextField {...bindModelName} placeholder={'Model Name'} invalid={requiredFieldError && !modelName} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindIpAddress} placeholder={'IP Address'} invalid={requiredFieldError && !ipAddress} />
          </Col>
          <Col span={12}>
            <TextField {...bindAssetTag} placeholder={'Asset Tag'} invalid={requiredFieldError && !assetTag} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindTotalPorts} placeholder={'Total Ports'} invalid={requiredFieldError && !totalPorts} />
          </Col>
          <Col span={12}>
            <TextField {...bindCapacity} placeholder={'Capacity'} invalid={requiredFieldError && !capacity} />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewCoreSwitch;
