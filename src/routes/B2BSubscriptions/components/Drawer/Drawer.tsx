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
import { cloneDeep, truncate } from 'lodash';
import { GET_ALL_SERVICE_SUBSCRIPTIONS, GET_SERVICE_SUBSCRIPTIONS, UPDATE_CATALOG_SUBSCRIPTIONS } from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RoundButtonWrapper } from './styled.components';
import { Row, Col, Switch } from 'antd';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe) => void;
}
const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const { data, error, loading, refetch: refetchCatalogSubscription } = useQuery(GET_SERVICE_SUBSCRIPTIONS, {
    variables: {
      input: {
        subscriptionId: id,
        rspId: 1,
      },
    },
  });
  const [updateCatalogSubscription, { loading: updating, error: updateError }] = useMutation(
    UPDATE_CATALOG_SUBSCRIPTIONS,
    {
      onError: () => {},
    },
  );
  const [collapseMap, setCollapseMap] = React.useState(new Map());
  const [serviceData, setServiceData] = React.useState();

  const updateHandler = (value, field) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  const toggleSectionExpand = (key: string) => {
    const _collapseMap = collapseMap;
    _collapseMap.set(key, !collapseMap.get(key));
    setCollapseMap(cloneDeep(_collapseMap));
  };

  React.useEffect(() => {
    if (data?.getServiceSubscriptionForRsp) {
      setServiceData(data?.getServiceSubscriptionForRsp);
    }
  }, [data]);

  const submitHandler = () => {
    let updatedSubscription;
    const input = {
      subscriptionId: serviceData.subscriptionId,
      rspId: serviceData.rspId,
      autoRenewFlag: serviceData.autoRenewFlag,
      status: serviceData.status,
    };
    updateCatalogSubscription({
      variables: { input },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_SERVICE_SUBSCRIPTIONS,
        });
        updatedSubscription = data.getAllServiceSubscriptionForRsp?.map(item => {
          if (item.subscriptionId === serviceData.subscriptionId) {
            return serviceData;
          } else return item;
        });
      },
    }).then(() => {
      refetchCatalogSubscription().then(() => {
        updateQuery && updateQuery(updatedSubscription);
      });
    });
  };

  React.useEffect(() => {
    const _collapseMap = collapseMap;
    _collapseMap.set('subscription', false);
    setCollapseMap(cloneDeep(_collapseMap));
  }, []);

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;

  if (data) {
    return (
      <React.Fragment>
        {updateError && <UpdateError error={updateError.message} />}
        <Section
          title="B2C OSP Subscription"
          collapse={collapseMap.get('subscription')}
          toggleCollapse={toggleSectionExpand}
          collapseId={'subscription'}
        >
          <TextField
            label="Service"
            value={`${serviceData?.serviceDetails.serviceName}`}
            alternative={true}
            disabled={true}
          />
          <TextField
            disabled={true}
            label="Package"
            value={serviceData?.serviceDetails.pkgDisplayName}
            alternative={true}
          />
          <TextField
            disabled={true}
            label="Connection Type"
            value={serviceData?.serviceDetails.serviceConfig.connectionType}
            alternative={true}
          />
          {serviceData?.serviceDetails.serviceType != 'ANCILLARY' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <TextField
                    disabled={true}
                    label="Capacity A"
                    placeholder="Capacity A"
                    value={serviceData?.serviceDetails.serviceConfig?.classACapacity}
                    alternative={true}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled={true}
                    label="Capacity B"
                    placeholder="Capacity B"
                    value={serviceData?.serviceDetails.serviceConfig?.classBCapacity}
                    alternative={true}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled={true}
                    label="Capacity C"
                    placeholder="Capacity C"
                    value={serviceData?.serviceDetails.serviceConfig?.classCCapacity}
                    alternative={true}
                  />
                </Col>
                <Col span={12}>
                  <TextField
                    disabled={true}
                    label="Capacity D"
                    placeholder="Capacity D"
                    value={serviceData?.serviceDetails.serviceConfig?.classDCapacity}
                    alternative={true}
                  />
                </Col>
              </Row>
            </>
          )}
          {serviceData?.serviceDetails.serviceType === 'ANCILLARY' && (
            <TextField
              disabled={true}
              label="Volume"
              value={`${serviceData?.serviceDetails.serviceConfig.capacity} ${serviceData?.serviceDetails.serviceConfig.capacityUnit}`}
              alternative={true}
            />
          )}
          <TextField disabled={true} label="One Time Charge" value={serviceData?.subsNrc} alternative={true} />
          <TextField disabled={true} label="Yearly Charging" value={serviceData?.subsYrc} alternative={true} />
          <TextField
            disabled={true}
            label="Subscription Start Date"
            value={serviceData?.subsStartDate}
            alternative={true}
          />
          {(serviceData?.serviceDetails.serviceType === 'INTERCONNECT' ||
            serviceData?.serviceDetails.serviceType === 'ANCILLARY') && (
            <>
              <TextField
                disabled={true}
                label="Subscription End Date"
                value={serviceData?.subsEndDate}
                alternative={true}
              />
            </>
          )}
          {(serviceData?.serviceDetails.serviceType === 'INTERCONNECT' ||
            serviceData?.serviceDetails.serviceType === 'ANCILLARY') && (
            <>
              <Row style={{ marginTop: '35px' }}>
                <Col span={21}>
                  <label style={{ fontSize: 16, fontWeight: 600, color: '#5343B2' }}>Renewal Auto</label>
                </Col>
                <Col span={3}>
                  <Switch
                    checked={serviceData?.autoRenewFlag}
                    onClick={() => updateHandler(serviceData?.autoRenewFlag === true ? false : true, 'autoRenewFlag')}
                  />
                </Col>
              </Row>
            </>
          )}
        </Section>
        <Section style={{ marginTop: '35px' }}>
          <SwitchButton
            onText={'Subscribe'}
            offText={'Unsubscribe'}
            status={serviceData?.status === 'active' ? true : false}
            onClick={() => updateHandler(serviceData?.status === 'active' ? 'inactive' : 'active', 'status')}
          />
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
