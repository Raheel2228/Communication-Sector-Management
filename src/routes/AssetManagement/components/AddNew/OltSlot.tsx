import React from 'react';
import { TextField, Button, SpinLoader, LoadingError } from 'components';
import { useInput } from 'utils';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_NEW_OLT_SLOT_MUTATION, GET_OLT } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';
import { compact } from 'lodash';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  parentId?: string;
}

const AddNewOlt: React.FC<Props> = ({ onFinish, parentId }) => {
  const { data, error, loading } = useQuery(GET_OLT, {
    variables: {
      oltId: parentId,
    },
  });
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_OLT_SLOT_MUTATION);
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);
  const { value: oltSlotNo, bind: bindoltSlotNo } = useInput('');

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!oltSlotNo) {
      setRequiredFieldError(true);
    } else {
      const input = { oltSlotNo: Number(oltSlotNo), oltId: parentId };
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
        <h3>Configure Slot under OLT</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField value={data?.getOlt?.dc?.dcName} disabled={true} alternative={true} />
          </Col>
          <Col span={12}>
            <TextField value={data?.getOlt?.oltName} disabled={true} alternative={true} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              {...bindoltSlotNo}
              type="number"
              placeholder={'OLT Slot'}
              invalid={requiredFieldError && !oltSlotNo}
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

export default AddNewOlt;
