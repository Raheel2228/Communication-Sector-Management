import React from 'react';
import { TextField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_DATA_CENTERS, ADD_NEW_CPE_MUTATION } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  onFinish?: (data: any, error: string) => void;
}

const fdtTypesOptions = [
  { value: 'business', label: 'Business' },
  { value: 'residential', label: 'Residential' },
];

const fdtSplitterNumberOfPortsOptions = [
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: '64', label: '64' },
];

const AddNewCpe: React.FC<Props> = ({ onFinish }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_CPE_MUTATION);

  const { value: ontId, bind: bindOntId } = useInput('');
  const { value: serialNumber, bind: bindSerialNumber } = useInput('');
  const { value: macAddress, bind: bindMacAddress } = useInput('');
  const { value: cpeModelType, bind: bindCpeModelType } = useInput('');
  const { value: modelNumber, bind: bindModelNumber } = useInput('');
  const { value: swVersion, bind: bindSwVersion } = useInput('');
  const { value: assetTag, bind: bindAssetTag } = useInput('');
  const { value: linkOdb, bind: bindLinkOdb } = useInput('');

  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (
      !ontId ||
      !serialNumber ||
      !macAddress ||
      !cpeModelType ||
      !modelNumber ||
      !swVersion ||
      !assetTag ||
      !linkOdb
    ) {
      setRequiredFieldError(true);
    } else {
      const input = {
        cpeSerialNo: serialNumber,
        cpeMacAddress: macAddress,
        cpeModel: modelNumber,
        cpeSwVersion: swVersion,
        cpeAssetTag: assetTag,
      };
      addNew({ variables: { input } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  if (addNewLoading) return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new C</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindOntId} placeholder={'ONT ID'} invalid={requiredFieldError && !ontId} />
          </Col>
          <Col span={12}>
            <TextField
              {...bindSerialNumber}
              placeholder={'Serial Number'}
              invalid={requiredFieldError && !serialNumber}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindMacAddress} placeholder={'MAC Address'} invalid={requiredFieldError && !macAddress} />
          </Col>
          <Col span={12}>
            <TextField
              {...bindCpeModelType}
              placeholder={'CPE Model Type'}
              invalid={requiredFieldError && !cpeModelType}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindModelNumber} placeholder={'Model Number'} invalid={requiredFieldError && !modelNumber} />
          </Col>
          <Col span={12}>
            <TextField {...bindSwVersion} placeholder={'SW Version'} invalid={requiredFieldError && !swVersion} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField {...bindAssetTag} placeholder={'Asset Tag'} invalid={requiredFieldError && !assetTag} />
          </Col>
          <Col span={12}>
            <TextField {...bindLinkOdb} placeholder={'Link ODB'} invalid={requiredFieldError && !linkOdb} />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewCpe;
