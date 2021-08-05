import React from 'react';
import { TextField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_CORE_SWITCH_SLOT_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  data?: $TSFixMe;
}

const AddNewCoreSwitchSlot: React.FC<Props> = ({ onFinish, data }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_CORE_SWITCH_SLOT_MUTATION);
  const { value: slotNumber, bind: bindSlotNumber } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);
  const coreSwitchData = data.getAllCoreSwSlot?.[0]?.coreSw;

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!slotNumber) {
      setRequiredFieldError(true);
    } else {
      const input = { swId: coreSwitchData?.swId, swSlotNo: slotNumber };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new Core Switch Slot</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={8}>
            <TextField value={coreSwitchData?.swId} disabled alternative={true} />
          </Col>
          <Col span={8}>
            <TextField value={coreSwitchData?.swName} disabled alternative={true} />
          </Col>
          <Col span={8}>
            <TextField value={coreSwitchData?.ipAddress} disabled alternative={true} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <TextField
              value="Slot Number"
              {...bindSlotNumber}
              placeholder="Slot Number"
              invalid={requiredFieldError && !slotNumber}
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

export default AddNewCoreSwitchSlot;
