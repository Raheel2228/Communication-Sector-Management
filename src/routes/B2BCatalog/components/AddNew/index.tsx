import React from 'react';
import { TextField, SelectField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_DATA_CENTERS, CREATE_SERVICE_CATALOG, GET_CONNECTION_TYPES } from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';
import { serviceNames, ancillartyServiceNames } from '../../utils';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  activeTab: string;
}

const AddNew: React.FC<Props> = ({ onFinish, activeTab }) => {
  const b2bType = activeTab === 'residential' || activeTab === 'business' ? `Service Port ${activeTab}` : activeTab;
  const serviceType = activeTab === 'residential' || activeTab === 'business' ? 'SERVICEPORT' : activeTab.toUpperCase();
  const { error, loading, data } = useQuery(GET_ALL_DATA_CENTERS);
  const { data: dataR, error: errorR, loading: landingR } = useQuery(GET_CONNECTION_TYPES);
  const [addNew, { loading: addNewLoading }] = useMutation(CREATE_SERVICE_CATALOG);
  const [serviceNameOptions, setServiceNameOption] = React.useState<any>([]);
  const [connectionType, setConnectionType] = React.useState<any>(null);
  const { value: pkgDisplayName, bind: bindPkgDisplayName } = useInput('');
  const { value: volume, bind: bindVolume } = useInput('');
  const { value: upload, bind: bindUpload } = useInput('');
  const { value: capacityA, bind: bindCapacityA } = useInput('');
  const { value: capacityB, bind: bindCapacityB } = useInput('');
  const { value: capacityC, bind: bindCapacityC } = useInput('');
  const { value: capacityD, bind: bindCapacityD } = useInput('');
  const { value: download, bind: bindDownload } = useInput('');
  const { value: nrc, bind: bindNrc } = useInput('');
  const { value: yrc, bind: bindYrc } = useInput('');
  const { value: volumeUnit, bind: bindVolumeUnit } = useInput('');
  // const [selectedServiceType, setServiceType] = React.useState('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    // if (
    //   !serviceNameOptions ||
    //   !selectedServiceType ||
    //   !pkgDisplayName ||
    //   !connectionType ||
    //   !upload ||
    //   !download
    // ) {
    //   setRequiredFieldError(true);
    // } else {

    const input = {
      serviceName: typeof serviceNameOptions === 'object' ? serviceNameOptions.join() : serviceNameOptions,
      serviceType,
      serviceCategory: ((activeTab === 'residential' || activeTab === 'business') && activeTab) || null,
      pkgDisplayName,
      serviceConfig: {
        capacity: (activeTab === 'ancillary' && volume) || null,
        capacityUnit: (activeTab === 'ancillary' && volumeUnit) || null,
        connectionType,
        maxUploadCapacity: Number(upload),
        maxDownloadCapacity: Number(download),
        classACapacity: capacityA ? Number(capacityA) : null,
        classBCapacity: capacityB ? Number(capacityB) : null,
        classCCapacity: capacityC ? Number(capacityC) : null,
        classDCapacity: capacityD ? Number(capacityD) : null,
      },
      nrc,
      yrc,
      paymentMode: 'YEARLY',
    };
    addNew({ variables: { input } })
      .then(response => onFinish && onFinish(response, ''))
      .catch(error => onFinish && onFinish(null, error));
    // }
  };
  if (addNewLoading) return <SpinLoader />;
  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new B2B Catalog {activeTab}</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={12}>
            <TextField disabled={true} placeholder={b2bType} alternative={true} />
          </Col>
          <Col span={12}>
            <SelectField
              options={activeTab === 'ancillary' ? ancillartyServiceNames : serviceNames}
              placeholder={'Service Name'}
              multiple={activeTab !== 'ancillary'}
              value={serviceNameOptions}
              onChange={value => setServiceNameOption(value)}
              invalid={requiredFieldError}
              open={serviceNameOptions.length === 3 ? false : undefined}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              {...bindPkgDisplayName}
              placeholder={'Package Display Name'}
              invalid={requiredFieldError && !pkgDisplayName}
            />
          </Col>
          {activeTab === 'ancillary' && (
            <Col span={12}>
              <TextField {...bindVolume} placeholder={'Volume'} invalid={requiredFieldError && !volume} />
            </Col>
          )}
          {(activeTab === 'residential' || activeTab === 'interconnect' || activeTab === 'business') && (
            <Col span={12}>
              <SelectField
                options={dataR?.__type.enumValues}
                value={connectionType}
                placeholder={'Connection Type'}
                onChange={value => setConnectionType(value)}
                invalid={requiredFieldError}
              />
            </Col>
          )}
        </Row>
        {activeTab === 'ancillary' && (
          <Col span={12}>
            <TextField {...bindVolumeUnit} placeholder={'Volume Unit'} />
          </Col>
        )}
        <Row gutter={16}>
          {/* {activeTab !== 'ancillary' && (
            <Col span={12}>
              <SelectField
                options={classArray}
                disabled={!!error || !classArray || loading}
                placeholder={'Class'}
                onChange={value => console.log(value)}
                invalid={requiredFieldError}
              />
            </Col>
          )} */}
          {(activeTab === 'business' || activeTab === 'interconnect') && (
            <>
              <Col span={6}>
                <TextField
                  {...bindUpload}
                  placeholder={'Upload Max'}
                  type="number"
                  mode="text"
                  invalid={requiredFieldError && !upload}
                />
              </Col>
              <Col span={6}>
                <TextField
                  {...bindDownload}
                  placeholder={'Download Max'}
                  type="number"
                  mode="text"
                  invalid={requiredFieldError && !download}
                />
              </Col>
            </>
          )}
        </Row>
        <Row gutter={16}>
          {(activeTab === 'residential' || activeTab === 'interconnect') && (
            <>
              {serviceNameOptions.includes('Real-Time Sensitive Traffic') && (
                <Col span={6}>
                  <TextField {...bindCapacityA} placeholder={'Capacity Class A'} type="number" mode="text" />
                </Col>
              )}
              {serviceNameOptions.includes('Near Real Time Traffic') && (
                <Col span={6}>
                  <TextField {...bindCapacityB} placeholder={'Capacity Class B'} type="number" mode="text" />
                </Col>
              )}
              {serviceNameOptions.includes('Business Critical Traffic') && (
                <Col span={6}>
                  <TextField {...bindCapacityC} placeholder={'Capacity Class C'} type="number" mode="text" />
                </Col>
              )}
              {serviceNameOptions.includes('Best Effort') && (
                <Col span={6}>
                  <TextField {...bindCapacityD} placeholder={'Capacity Class D'} type="number" mode="text" />
                </Col>
              )}
            </>
          )}
          <Col span={6}>
            <TextField
              {...bindNrc}
              placeholder={'NRC'}
              type="number"
              mode="text"
              invalid={requiredFieldError && !nrc}
            />
          </Col>
          <Col span={6}>
            <TextField
              {...bindYrc}
              placeholder={'YRC'}
              type="number"
              mode="text"
              invalid={requiredFieldError && !yrc}
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
