import React from 'react';
import { TextField, Button, SelectField, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_ALL_DATA_CENTERS,
  GET_ALL_OLT,
  GET_ALL_OLT_SLOTS,
  GET_ALL_OLT_PORTS,
  GET_ALL_CORE_SWITCH_SLOTS,
  GET_ALL_FDT,
  GET_ALL_CORE_SWITCHES,
  ADD_NEW_FDT_SPLITTER_MUTATION,
  GET_ALL_CORE_SWITCH_PORTS,
} from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';
import { compact } from 'lodash';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
}

const fdtTypesOptions = [
  { value: 'business', label: 'Business' },
  { value: 'residential', label: 'Residential' },
];

const fdtSplitterNumberOfPortsOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '32', label: '32' },
];

const AddNewFdtSplitter: React.FC<Props> = ({ onFinish }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_FDT_SPLITTER_MUTATION);

  const { data: allDCs, loading: fetchingDCs, error: errorFetchingDCs } = useQuery(GET_ALL_DATA_CENTERS);
  const { data: allOlts, loading: fetchingOlts, error: errorFetchingOlts } = useQuery(GET_ALL_OLT);
  const { data: allCoreSwitch, loading: fetchCoreSwitch, error: errorFetchingCoreSwitch } = useQuery(
    GET_ALL_CORE_SWITCHES,
  );
  const { data: allOltSlots, loading: fetchingOltSlots, error: errorFetchingOltSlots } = useQuery(GET_ALL_OLT_SLOTS);
  const { data: allOltPorts, loading: fetchingOltPorts, error: errorFetchingOltPorts } = useQuery(GET_ALL_OLT_PORTS);
  const { data: allCoreSwSlot, loading: fetchingCoreSwSlot, error: errorFetchingCoreSwSlot } = useQuery(
    GET_ALL_CORE_SWITCH_SLOTS,
  );
  const { data: allCoreSwSlotPorts, loading: fetchingCoreSwSlotPorts, error: errorFetchingCoreSwSlotPorts } = useQuery(
    GET_ALL_CORE_SWITCH_PORTS,
  );
  const { data: allFdts, loading: fetchingFdts, error: errorFetchingFdts } = useQuery(GET_ALL_FDT);

  const [newFdtSplitter, setFdtSplitter] = React.useState<any>({});
  const [fdtType, setFdtType] = React.useState<'business' | 'residential' | undefined>('residential');
  const [olt, setOlt] = React.useState('');
  const [oltSlot, setOltSlot] = React.useState('');
  const [oltPort, setOltPort] = React.useState('');
  const [fdt, setFdt] = React.useState('');
  const [fdtSplitterNumberOfPorts, setFdtSplitterNumberOfPortssetFdt] = React.useState('');
  const { value: fdtPort, bind: bindFdtPort } = useInput('');
  const { value: fdtSplitterNumber, bind: bindFdtSplitterNumber } = useInput('');
  //   const { value: fdtName, bind: bindFdtName } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const updateSplitter = (value: string, field: string) => {
    setFdtSplitter({ ...newFdtSplitter, [field]: value });
  };

  const {
    dataCenter,
    coreSwitch,
    coreswSlot,
    slotPort,
    sndDataCenter,
    sndCoreSwitch,
    sndSwtichSlot,
    sndSwitchPort,
  } = newFdtSplitter;

  // DCs Dropdown
  let dcOptions = [];
  if (allDCs) {
    dcOptions = allDCs?.getAllDataCenter.map(d => {
      return {
        id: d.dcId,
        value: d.dcId,
        label: d.dcName,
      };
    });
  }

  // OLTs
  let oltOptions = [];
  if (allOlts && dataCenter) {
    oltOptions = compact(
      allOlts?.getAllOlt.map(o => {
        if (o.dc?.dcId === dataCenter) {
          return {
            id: o.oltId,
            value: o.oltId,
            label: o.oltName,
          };
        }
      }),
    );
  }
  // Olt Slots
  let oltSlotOptions = [];
  if (allOltSlots) {
    oltSlotOptions = compact(
      allOltSlots?.getAllOltSlot.map(o => {
        if (o.olt?.oltId === olt) {
          return {
            id: o.oltSlotId,
            value: o.oltSlotId,
            label: o.oltSlotNo,
          };
        }
      }),
    );
  }

  // Olt Ports
  let oltPortOptions = [];
  if (allOltPorts) {
    oltPortOptions = compact(
      allOltPorts?.getAllOltPort.map(o => {
        if (o.oltSlot?.oltSlotId === oltSlot) {
          return {
            id: o.oltPortId,
            value: o.oltPortId,
            label: o.oltPortNo,
          };
        }
      }),
    );
  }

  // Fdts
  let fdtOptions = [];
  if (fdtOptions) {
    fdtOptions = allFdts?.getAllFdt.map(o => {
      return {
        id: o.fdtId,
        value: o.fdtId,
        label: o.fdtName,
      };
    });
  }
  // core swithc
  let coreSwitchOptions = [];
  if (coreSwitchOptions) {
    coreSwitchOptions = allCoreSwitch?.getAllCoreSwitch.map(o => {
      if (o.dc.dcId === dataCenter) {
        return {
          id: o.swId,
          value: o.swId,
          label: o.swName,
        };
      } else {
        return {};
      }
    });
  }
  // core swtich slot
  let coreSwSlotOptions = [];
  if (coreSwSlotOptions) {
    coreSwSlotOptions = allCoreSwSlot?.getAllCoreSwSlot.map(o => {
      return {
        id: o.swSlotId,
        value: o.swSlotId,
        label: o.swSlotNo,
      };
    });
  }
  // core swtich slot port
  let swSlotPortOptions = [];
  if (swSlotPortOptions) {
    swSlotPortOptions = allCoreSwSlotPorts?.getAllCoreSwPort.map(o => {
      return {
        id: o.swPortId,
        value: o.swPortId,
        label: o.swPortNo,
      };
    });
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (
      !fdtType ||
      !dataCenter ||
      !olt ||
      !oltSlot ||
      !oltPort ||
      !fdt ||
      !fdtPort ||
      !fdtSplitterNumberOfPorts ||
      !fdtSplitterNumber
    ) {
      setRequiredFieldError(true);
    } else {
      const input = {
        fdtId: fdt,
        fdtPort: Number(fdtPort),
        fdtSplitterType: Number(fdtSplitterNumberOfPorts),
        fdtSplitterNo: Number(fdtSplitterNumber),
        priOltPortId: oltPort,
        secOltPortId: oltPort,
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
        <h3>Setup a new Fdt Splitter</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={16}>
          <Col span={8}>
            <SelectField
              options={fdtTypesOptions}
              disabled={!fdtTypesOptions}
              value={fdtType}
              placeholder={'FDT Type'}
              onChange={value => {
                (value === 'residential' || value === 'business') && setFdtType(value);
              }}
              invalid={requiredFieldError && !fdtType}
            />
          </Col>
          <Col span={8}>
            <SelectField
              options={dcOptions}
              disabled={!dcOptions || !!errorFetchingDCs || fetchingDCs}
              placeholder={'Data Center Name'}
              value={dataCenter}
              onChange={value => updateSplitter(value, 'dataCenter')}
              invalid={requiredFieldError && !dataCenter}
            />
          </Col>
          {fdtType === 'business' && (
            <Col span={8}>
              <SelectField
                options={coreSwitchOptions}
                value={coreSwitch}
                disabled={!coreSwitchOptions || !!errorFetchingCoreSwitch || fetchCoreSwitch || !dataCenter}
                placeholder={'Core Switch'}
                onChange={value => updateSplitter(value, 'coreSwitch')}
                invalid={requiredFieldError && !dataCenter}
              />
            </Col>
          )}
          {fdtType === 'residential' && (
            <Col span={8}>
              <SelectField
                options={oltOptions}
                disabled={!oltOptions || !!errorFetchingOlts || fetchingOlts || !dataCenter}
                placeholder={'Olt Name'}
                value={olt}
                onChange={value => setOlt(value)}
                invalid={requiredFieldError && !olt}
              />
            </Col>
          )}
        </Row>
        <Row gutter={fdtType === 'residential' ? 6 : [16, 48]}>
          {fdtType === 'business' && (
            <>
              <Col span={8}>
                <SelectField
                  options={coreSwSlotOptions}
                  disabled={!coreSwSlotOptions || !!errorFetchingCoreSwSlot || fetchingCoreSwSlot || !coreSwitch}
                  placeholder={'Switch Slot'}
                  value={coreswSlot}
                  onChange={value => updateSplitter(value, 'coreswSlot')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
              <Col span={8}>
                <SelectField
                  options={swSlotPortOptions}
                  value={slotPort}
                  disabled={
                    !swSlotPortOptions || !!errorFetchingCoreSwSlotPorts || fetchingCoreSwSlotPorts || !coreswSlot
                  }
                  placeholder={'Switch Port'}
                  onChange={value => updateSplitter(value, 'slotPort')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
            </>
          )}
          {fdtType === 'residential' && (
            <>
              <Col span={6}>
                <SelectField
                  options={oltSlotOptions}
                  disabled={!oltSlotOptions || !!errorFetchingOltSlots || fetchingOltSlots || olt === ''}
                  placeholder={'Olt Slot'}
                  value={oltSlot}
                  onChange={value => setOltSlot(value)}
                  invalid={requiredFieldError && !oltSlot}
                />
              </Col>
              <Col span={6}>
                <SelectField
                  options={oltPortOptions}
                  disabled={!oltPortOptions || !!errorFetchingOltPorts || fetchingOltPorts || oltSlot === ''}
                  placeholder={'Olt Port'}
                  value={oltPort}
                  onChange={value => setOltPort(value)}
                  invalid={requiredFieldError && !oltPort}
                />
              </Col>
            </>
          )}
          <Col span={fdtType === 'residential' ? 6 : 8}>
            <SelectField
              options={fdtOptions}
              disabled={!fdtOptions || !!errorFetchingFdts || fetchingFdts || oltPort === ''}
              placeholder={'Fdt Name'}
              value={fdt}
              onChange={value => setFdt(value)}
              invalid={requiredFieldError && !fdt}
            />
          </Col>
          {fdtType === 'residential' && (
            <Col span={6}>
              <TextField
                {...bindFdtPort}
                placeholder={'Fdt Port'}
                disabled={!fdt || fdt === ''}
                invalid={requiredFieldError && !fdtPort}
                alternative={true}
              />
            </Col>
          )}
        </Row>
        {fdtType === 'residential' && (
          <Row gutter={16}>
            <Col span={12}>
              <SelectField
                options={fdtSplitterNumberOfPortsOptions}
                disabled={!fdtSplitterNumberOfPortsOptions}
                value={fdtSplitterNumberOfPorts}
                placeholder={'Fdt Splitter No. of Ports'}
                onChange={value => setFdtSplitterNumberOfPortssetFdt(value)}
                invalid={requiredFieldError && !fdt}
              />
            </Col>

            <Col span={12}>
              <TextField
                {...bindFdtSplitterNumber}
                disabled={!fdtSplitterNumberOfPorts || fdtSplitterNumberOfPorts === ''}
                placeholder={'Fdt Splitter Number'}
                invalid={requiredFieldError && !fdtSplitterNumber}
                alternative={true}
              />
            </Col>
          </Row>
        )}

        {fdtType === 'business' && (
          <>
            <h3>Secondary Route</h3>
            <Row gutter={16}>
              <Col span={12}>
                <SelectField
                  options={dcOptions}
                  disabled={!dcOptions || !!errorFetchingDCs || fetchingDCs}
                  placeholder={'Data Center Name'}
                  value={sndDataCenter}
                  onChange={value => updateSplitter(value, 'sndDataCenter')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  options={coreSwitchOptions}
                  disabled={!coreSwitch || !!errorFetchingCoreSwitch || fetchingOltSlots}
                  placeholder={'Secondary Core Switch'}
                  value={sndCoreSwitch}
                  onChange={value => updateSplitter(value, 'sndCoreSwitch')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <SelectField
                  options={coreSwSlotOptions}
                  disabled={!coreSwSlotOptions || !!errorFetchingCoreSwSlot || fetchingDCs}
                  placeholder={'Switch Slot'}
                  value={sndSwtichSlot}
                  onChange={value => updateSplitter(value, 'sndSwtichSlot')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
              <Col span={6}>
                <SelectField
                  options={swSlotPortOptions}
                  disabled={!swSlotPortOptions || !!errorFetchingDCs || fetchingDCs}
                  placeholder={'Switch port'}
                  value={sndSwitchPort}
                  onChange={value => updateSplitter(value, 'sndSwitchPort')}
                  invalid={requiredFieldError && !dataCenter}
                />
              </Col>
            </Row>
          </>
        )}
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewFdtSplitter;
