import React from 'react';
import { TextField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_CORE_SWITCH_PORT_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  data?: $TSFixMe;
}

const AddNewCoreSwitchPort: React.FC<Props> = ({ onFinish, data }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_CORE_SWITCH_PORT_MUTATION);

  const { value: portNumber, bind: bindPortNumber } = useInput('');
  const { value: defaultVlan, bind: bindDefaultVlan } = useInput('');

  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const coreSwitchData = data.getAllCoreSwPort?.[0]?.swSlot?.coreSw;
  const coreSwitchSlotData = data.getAllCoreSwPort?.[0]?.swSlot;

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!portNumber || !defaultVlan) {
      setRequiredFieldError(true);
    } else {
      const input = { swPortNo: portNumber, swSlotId: coreSwitchSlotData?.swSlotId, defaultVlan };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new Core Switch Port</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField value={coreSwitchData?.swId} disabled alternative={true} />
          </Col>
          <Col span={12}>
            <TextField value={coreSwitchData?.swName} disabled alternative={true} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField value={coreSwitchData?.ipAddress} disabled alternative={true} />
          </Col>
          <Col span={12}>
            <TextField value={coreSwitchSlotData?.swSlotId} disabled alternative={true} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <TextField value={coreSwitchSlotData?.swSlotNo} disabled alternative={true} />
          </Col>
          <Col span={8}>
            <TextField
              value="Port Number"
              {...bindPortNumber}
              placeholder="Port Number"
              invalid={requiredFieldError && !portNumber}
            />
          </Col>
          <Col span={8}>
            <TextField
              value="Default Vlan"
              {...bindDefaultVlan}
              placeholder="Default Vlan"
              invalid={requiredFieldError && !defaultVlan}
            />
          </Col>
        </Row>

        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewCoreSwitchPort;
