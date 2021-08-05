import React from 'react';
import {
  Button,
  SelectField,
  Section,
  TextField,
  SwitchButton,
  SpinLoader,
  LoadingError,
  UpdateError,
} from 'components';
import { GET_ALL_SERVICE_CATALOG, GET_SERVICE_CATALOG, UPDATE_SERVICE_CATALOG } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RoundButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const { data, error, loading, refetch: refetchCatalog } = useQuery(GET_SERVICE_CATALOG, {
    variables: {
      serviceId: id,
    },
  });
  const [updateServiceCatalog, { loading: updating, error: updateError }] = useMutation(UPDATE_SERVICE_CATALOG, {
    onError: () => {},
  });
  const [serviceData, setServiceData] = React.useState();

  const updateHandler = (value, field) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  React.useEffect(() => {
    if (data?.getServiceCatalogItem) {
      setServiceData(data?.getServiceCatalogItem);
    }
  }, [data]);

  const submitHandler = () => {
    let updatedService;
    const input = {
      serviceId: serviceData.serviceId,
      pkgDisplayName: serviceData.pkgDisplayName,
      nrc: serviceData.nrc,
      yrc: serviceData.yrc,
      status: serviceData.status,
      paymentMode: 'YEARLY',
    };
    updateServiceCatalog({
      variables: { input },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_SERVICE_CATALOG,
        });
        updatedService = data.getAllServiceCatalogItem?.map(item => {
          if (item.serviceId === serviceData.serviceId) {
            return serviceData;
          } else return item;
        });
      },
    }).then(() => {
      refetchCatalog().then(() => {
        updateQuery && updateQuery(updatedService);
      });
    });
  };
  React.useEffect(() => {
    console.log(data, 'changed');
  }, []);
  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  if (data) {
    return (
      <React.Fragment>
        {updateError && <UpdateError error={updateError.message} />}
        <Section title="B2B Interconnect">
          <TextField
            label="Type"
            value={`${serviceData?.serviceType} ${serviceData?.serviceCategory || ''}`}
            alternative={true}
            disabled={true}
          />
          <TextField
            disabled={serviceData?.status === 'inactive' ? true : false}
            label="Service Name"
            value={serviceData?.serviceName}
            alternative={true}
            onChange={e => updateHandler(e.currentTarget.value, 'serviceName')}
          />
          <TextField
            disabled={serviceData?.status === 'inactive' ? true : false}
            label="Package Display Name"
            value={serviceData?.pkgDisplayName}
            alternative={true}
            onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
          />
          <TextField
            disabled={serviceData?.status === 'inactive' ? true : false}
            label="Connection Type"
            value={serviceData?.serviceConfig?.connectionType}
            alternative={true}
            onChange={e =>
              updateHandler({ ...serviceData.serviceConfig, connectionType: e.currentTarget.value }, 'serviceConfig')
            }
          />
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="Capacity A"
                placeholder="Capacity A"
                value={serviceData?.serviceConfig?.classACapacity}
                alternative={true}
                onChange={e =>
                  updateHandler(
                    { ...serviceData.serviceConfig, classACapacity: e.currentTarget.value },
                    'serviceConfig',
                  )
                }
              />
            </Col>
            <Col span={12}>
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="Capacity B"
                placeholder="Capacity B"
                value={serviceData?.serviceConfig?.classBCapacity}
                alternative={true}
                onChange={e =>
                  updateHandler(
                    { ...serviceData.serviceConfig, classBCapacity: e.currentTarget.value },
                    'serviceConfig',
                  )
                }
              />
            </Col>
            <Col span={12}>
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="Capacity C"
                placeholder="Capacity C"
                value={serviceData?.serviceConfig?.classCCapacity}
                alternative={true}
                onChange={e =>
                  updateHandler(
                    { ...serviceData.serviceConfig, classCCapacity: e.currentTarget.value },
                    'serviceConfig',
                  )
                }
              />
            </Col>
            <Col span={12}>
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="Capacity D"
                placeholder="Capacity D"
                value={serviceData?.serviceConfig?.classDCapacity}
                alternative={true}
                onChange={e =>
                  updateHandler(
                    { ...serviceData.serviceConfig, classDCapacity: e.currentTarget.value },
                    'serviceConfig',
                  )
                }
              />
            </Col>
            {serviceData?.serviceCategory === 'business' && (
              <>
                <Col span={12}>
                  <TextField
                    disabled={serviceData?.status === 'inactive' ? true : false}
                    label="Upload Maximum"
                    value={serviceData?.pkgDisplayName}
                    alternative={true}
                    onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled={serviceData?.status === 'inactive' ? true : false}
                    label="Download Maximum"
                    value={serviceData?.pkgDisplayName}
                    alternative={true}
                    onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
                  />
                </Col>
              </>
            )}
            {(serviceData?.serviceCategory === 'residential' || serviceData?.serviceCategory === 'business') && (
              <>
                <Col span={12}>
                  <TextField
                    disabled={serviceData?.status === 'inactive' ? true : false}
                    label="NRC"
                    value={serviceData?.nrc}
                    alternative={true}
                    onChange={e => updateHandler(e.currentTarget.value, 'nrc')}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled={serviceData?.status === 'inactive' ? true : false}
                    label="YRC"
                    value={serviceData?.yrc}
                    alternative={true}
                    onChange={e => updateHandler(e.currentTarget.value, 'yrc')}
                  />
                </Col>
              </>
            )}
          </Row>
          {serviceData?.serviceCategory === 'interconnect' && (
            <>
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="One Type Charges(OTC/NRC)"
                value={serviceData?.pkgDisplayName}
                alternative={true}
                onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
              />
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="Yearly Recurring Charges(YRC)"
                value={serviceData?.pkgDisplayName}
                alternative={true}
                onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
              />
              <TextField
                disabled={serviceData?.status === 'inactive' ? true : false}
                label="B2B Package D"
                value={serviceData?.pkgDisplayName}
                alternative={true}
                style={{ marginBottom: '20px' }}
                onChange={e => updateHandler(e.currentTarget.value, 'pkgDisplayName')}
              />
            </>
          )}
          <Section style={{ marginTop: '35px' }}>
            <SwitchButton
              onText={'Active'}
              offText={'Inactive'}
              status={serviceData?.status === 'active' ? true : false}
              onClick={() => updateHandler(serviceData?.status === 'active' ? 'inactive' : 'active', 'status')}
            />
          </Section>
        </Section>
        <Section style={{ marginTop: '35px' }}>
          <RoundButtonWrapper>
            <Button
              variant="round"
              disabled={serviceData?.status === 'inactive' ? true : false}
              label="Save"
              onClick={submitHandler}
            />
            <Button variant="round" label="Cancel" onClick={onCloseHandle} />
          </RoundButtonWrapper>
        </Section>{' '}
      </React.Fragment>
    );
  }
  return <LoadingError />;
};

export default Drawer;
