import React from 'react';
import { Button, LoadingError, UpdateError, SelectField } from 'components';
import { Section, TextField, SwitchButton } from 'components';
import {
  GET_FDT_SPLITTER,
  UPDATE_FDT_SPLITTER,
  GET_ALL_FDT,
  GET_ALL_DATA_CENTERS,
  GET_ALL_OLT,
  GET_ALL_OLT_SLOTS,
  GET_ALL_OLT_PORTS,
  GET_ALL_CORE_SWITCH_SLOTS,
  GET_ALL_CORE_SWITCHES,
  GET_ALL_CORE_SWITCH_PORTS,
  GET_ALL_FDT_SPLITTER,
} from 'gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SpinLoader } from 'components';
import { RoundButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';
import { compact } from 'lodash';

interface Props {
  id: string;
  onCloseHandle: () => void;
  updateQuery: (updatedService: $TSFixMe, client: $TSFixMe, _query: $TSFixMe, query_variable: $TSFixMe) => void;
}

const fdtTypesOptions = [
  { value: 'business', label: 'Business' },
  { value: 'residential', label: 'Residential' },
];

const Drawer: React.FC<Props> = ({ id, onCloseHandle, updateQuery }) => {
  const [status, setStatus] = React.useState<'active' | 'inactive'>('active');
  const { data: allDCs } = useQuery(GET_ALL_DATA_CENTERS);
  const { data: allOlts } = useQuery(GET_ALL_OLT);
  const { data: allCoreSwitch } = useQuery(GET_ALL_CORE_SWITCHES);
  const { data: allOltSlots } = useQuery(GET_ALL_OLT_SLOTS);
  const { data: allOltPorts } = useQuery(GET_ALL_OLT_PORTS);
  const { data: allCoreSwSlot } = useQuery(GET_ALL_CORE_SWITCH_SLOTS);
  const { data: allCoreSwSlotPorts } = useQuery(GET_ALL_CORE_SWITCH_PORTS);
  const { data: allFdts } = useQuery(GET_ALL_FDT);
  const { error, loading, data, refetch, client } = useQuery(GET_FDT_SPLITTER, {
    variables: {
      fdtSplitterId: id,
    },
  });
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(UPDATE_FDT_SPLITTER, {
    onError: () => {},
  });

  const submitHandler = () => {
    let updatedRecords;
    const input = {
      fdtSplitterId: data.getFdtSplitter?.fdtSplitterId,
      fdtId: data.getFdtSplitter?.fdt?.fdtId,
      fdtPort: data.getFdtSplitter?.fdtPort,
      fdtSplitterNo: data.getFdtSplitter?.fdtSplitterNo,
      priOltPortId: data.getFdtSplitter?.priOltPort?.oltPortId,
      status: status,
    };
    updateMutation({
      variables: {
        input,
      },
      update(cache) {
        const data: $TSFixMe = cache.readQuery({
          query: GET_ALL_FDT_SPLITTER,
        });
        updatedRecords = data?.getAllFdtSplitter.map(item => {
          if (item.fdtId === data.getFdtSplitter?.fdtSplitterId) {
            return { ...item, ...input };
          } else return item;
        });
      },
    })
      .then(() =>
        refetch().then(() => {
          updateQuery && updateQuery(updatedRecords, client, GET_ALL_FDT_SPLITTER, 'getAllFdtSplitter');
        }),
      )
      .catch(error => console.error(error));
  };

  // DCs
  let dcOptions = [];
  if (allDCs) {
    dcOptions = allDCs?.getAllDataCenter?.map(d => {
      return {
        id: d.dcId,
        value: d.dcId,
        label: d.dcName,
      };
    });
  }

  // OLTs
  let oltOptions = [];
  if (allOlts) {
    oltOptions = compact(
      allOlts?.getAllOlt?.map(o => {
        return {
          id: o.oltId,
          value: o.oltId,
          label: o.oltName,
        };
      }),
    );
  }

  // Olt Slots
  let oltSlotOptions = [];
  if (allOltSlots) {
    oltSlotOptions = compact(
      allOltSlots?.getAllOltSlot?.map(o => {
        return {
          id: o.oltSlotId,
          value: o.oltSlotId,
          label: o.oltSlotNo,
        };
      }),
    );
  }

  // Olt Ports
  let oltPortOptions = [];
  if (allOltPorts) {
    oltPortOptions = compact(
      allOltPorts?.getAllOltPort?.map(o => {
        return {
          id: o.oltPortId,
          value: o.oltPortId,
          label: o.oltPortNo,
        };
      }),
    );
  }

  // Fdts
  let fdtOptions = [];
  if (fdtOptions) {
    fdtOptions = allFdts?.getAllFdt?.map(o => {
      return {
        id: o.fdtId,
        value: o.fdtId,
        label: o.fdtName,
      };
    });
  }

  // Core Switches
  let coreSwitchOptions = [];
  if (coreSwitchOptions) {
    coreSwitchOptions = allCoreSwitch?.getAllCoreSwitch?.map(o => {
      return {
        id: o.swId,
        value: o.swId,
        label: o.swName,
      };
    });
  }

  // Core Switches slot
  let coreSwSlotOptions = [];
  if (coreSwSlotOptions) {
    coreSwSlotOptions = allCoreSwSlot?.getAllCoreSwSlot?.map(o => {
      return {
        id: o.swSlotId,
        value: o.swSlotId,
        label: o.swSlotNo,
      };
    });
  }

  // Core Switches slot port
  let swSlotPortOptions = [];
  if (swSlotPortOptions) {
    swSlotPortOptions = allCoreSwSlotPorts?.getAllCoreSwPort?.map(o => {
      return {
        id: o.swPortId,
        value: o.swPortId,
        label: o.swPortNo,
      };
    });
  }

  // fdt type
  const fdtType = data?.getFdtSplitter?.fdtSplitterType === 1 ? 'business' : 'residential';

  if (loading || updating) return <SpinLoader />;
  if (error) return <LoadingError />;
  return (
    <React.Fragment>
      {updateError && <UpdateError error={updateError.message} />}
      <Section title="FDT Splitter Details">
        <Row gutter={16}>
          <Col span={24}>
            <SelectField
              options={fdtTypesOptions}
              disabled={true}
              value={fdtType}
              placeholder={'FDT Type'}
              label="FDT Type"
            />
          </Col>
          <Col span={24}>
            <SelectField
              options={dcOptions}
              disabled={true}
              placeholder={'Data Center Name'}
              label="Data Center"
              value={data.getFdtSplitter?.priOltPort.oltSlot.olt.dc.dcName}
            />
          </Col>
          <Col span={24}>
            <SelectField
              options={oltOptions}
              label="Olt Name"
              value={data.getFdtSplitter?.priOltPort.oltSlot.olt.oltName}
              disabled={true}
            />
          </Col>
          <Col span={12}>
            <SelectField
              options={oltSlotOptions}
              disabled={true}
              label="Olt Slot"
              value={data.getFdtSplitter?.priOltPort.oltSlot.oltSlotId}
            />
          </Col>
          <Col span={12}>
            <SelectField
              options={oltPortOptions}
              disabled={true}
              label="Olt Port"
              value={data.getFdtSplitter?.priOltPort.oltPortId}
            />
          </Col>
          <Col span={24}>
            <SelectField
              options={fdtOptions}
              disabled={true}
              label="FDT Name"
              value={data.getFdtSplitter?.fdt.fdtName}
              alternative={true}
            />
          </Col>
          <Col span={12}>
            <TextField
              placeholder={'First Splitter Port'} // interchangeably used as "FDT Splitter Number (FDT_SPLITTER_NUMBER in DB)"
              label="First Splitter Port"
              disabled={true}
              value={data.getFdtSplitter?.fdtSplitterNo}
              alternative={true}
            />
          </Col>
          <Col span={12}>
            <TextField label="FDT Port" disabled={true} value={data.getFdtSplitter?.fdtPort} alternative={true} />
          </Col>
          <Col span={24}>
            <TextField
              label="FDT Splitter No. Of Ports" // interchangeably used as "FDT Splitter Type"
              disabled={true}
              value={data.getFdtSplitter?.fdtSplitterType}
              alternative={true}
            />
          </Col>
        </Row>
      </Section>
      <SwitchButton
        onText={'Active'}
        offText={'Inactive'}
        status={data.getFdtSplitter?.status === 'active' ? true : false}
        onClick={() => setStatus(data.getFdtSplitter?.status === 'active' ? 'inactive' : 'active')}
      />
      <Section style={{ marginTop: '20px' }}>
        <RoundButtonWrapper>
          <Button variant="round" label="Save" onClick={submitHandler} />
          <Button variant="round" label="Cancel" onClick={onCloseHandle} />
        </RoundButtonWrapper>
      </Section>{' '}
    </React.Fragment>
  );
};

export default Drawer;
