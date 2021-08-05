import React from 'react';
import { TextField, LoadingError, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_NEW_OLT_PORT_MUTATION, GET_OLT_SLOT } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  parentId?: string;
}

const AddNew: React.FC<Props> = ({ onFinish, parentId }) => {
  const { data, loading, error } = useQuery(GET_OLT_SLOT, {
    variables: {
      oltSlotId: parentId,
    },
  });
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_OLT_PORT_MUTATION);
  const { value: oltPortNo, bind: bindoltPortNo } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!oltPortNo) {
      setRequiredFieldError(true);
    } else {
      const input = { oltPortNo: Number(oltPortNo), oltSlotId: parentId };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  if (addNewLoading || loading) return <SpinLoader />;
  if (error) return <LoadingError />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Configure Port under OLT Slot</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField value={data?.getOltSlot?.olt?.dc?.dcName} disabled={true} alternative={true} />
          </Col>
          <Col span={12}>
            <TextField value={data?.getOltSlot?.olt?.oltName} disabled={true} alternative={true} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField value={data?.getOltSlot?.oltSlotNo} disabled={true} alternative={true} />
          </Col>
          <Col span={12}>
            <TextField
              {...bindoltPortNo}
              type="number"
              placeholder={'OLT Port'}
              invalid={requiredFieldError && !oltPortNo}
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

export default AddNew;
