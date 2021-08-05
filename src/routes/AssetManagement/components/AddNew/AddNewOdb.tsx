import React from 'react';
import { TextField, SelectField, Button, SpinLoader } from 'components';
import { useInput } from 'utils';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_ALL_DATA_CENTERS,
  ADD_NEW_ODB_MUTATION,
  GET_ALL_OLT,
  GET_ALL_OLT_SLOTS,
  GET_ALL_OLT_PORTS,
  GET_ALL_FDT_SPLITTER,
  GET_ALL_FDT_SPLITTER_PORTS,
} from 'gql';
import { Modal, Error, ButtonWrapper } from './styled.components';
import { Row, Col } from 'antd';
import { compact } from 'lodash';

interface Props {
  onFinish?: (data: $TSFixMe, error: string) => void;
  type?: string;
}

interface ODBInput {
  odbName?: string;
  fdtSplitterPort?: string;
  odbSplitterType?: string;
  odbSplitterShelf?: number;
  area?: string;
  street?: string;
  street1?: string;
  latitude?: number;
  longitude?: number;
  dataCenter?: string;
  oltSlot?: string;
  oltName?: string;
  fdtSplitter?: string;
  oltPort?: string;
}

export const odbTypes = [
  { id: 'SDU', value: 'SDU', label: 'SDU' },
  { id: 'MDU', value: 'MDU', label: 'MDU' },
];

const fdtSplitterTypeMapping = {
  SDU: [32],
  MDU: [1, 2, 4, 8],
};

const odbSplitterTypeOptions = [
  { id: '1', value: '1', label: '1' },
  { id: '2', value: '2', label: '2' },
  { id: '4', value: '4', label: '4' },
  { id: '8', value: '8', label: '8' },
];

const selectFieldOptions = [{ value: '', label: '' }];

const AddNewOdb: React.FC<Props> = ({ type, onFinish }) => {
  const [addNew, { loading: addNewLoading }] = useMutation(ADD_NEW_ODB_MUTATION);

  const { data: allDataCenters, loading: fetchingDataCenters, error: errorFetchingDataCenters } = useQuery(
    GET_ALL_DATA_CENTERS,
  );
  const { data: allOlts, loading: fetchingOlts, error: errorFetchingOlts } = useQuery(GET_ALL_OLT);
  const { data: allOltSlots, loading: fetchingOltSlots, error: errorFetchingOltSlots } = useQuery(GET_ALL_OLT_SLOTS);
  const { data: allOltPorts, loading: fetchingOltPorts, error: errorFetchingOltPorts } = useQuery(GET_ALL_OLT_PORTS);
  const { data: allFdtSplitter, loading: fetchingFdtSplitter, error: errorFetchingFdtSplitters } = useQuery(
    GET_ALL_FDT_SPLITTER,
  );
  const { data: allFdtSplitterPort, loading: fetchingFdtSplitterPort, error: errorFetchingFdtSplitterPort } = useQuery(
    GET_ALL_FDT_SPLITTER_PORTS,
  );

  const [odb, setOdb] = React.useState<ODBInput>({});
  const [odbType, setOdbType] = React.useState(type);

  const { value: area, bind: bindArea } = useInput('');
  const { value: street, bind: bindStreet } = useInput('');
  const { value: madkhal, bind: bindMadkhal } = useInput('');
  const { value: house, bind: bindHouse } = useInput('');
  const { value: odbName, bind: bindOdbName } = useInput('');
  const { value: odbSplitterShelf, bind: bindOdbSplitterShelf } = useInput('');
  const { value: longitude, bind: bindLongitude } = useInput('');
  const { value: latitude, bind: bindLatitude } = useInput('');

  const [oltOptions, setOltOptions] = React.useState<Array<SelectFieldOptionType>>(selectFieldOptions);
  const [oltSlotOptions, setOltSlotOptions] = React.useState<Array<SelectFieldOptionType>>(selectFieldOptions);
  const [oltPortOptions, setOltPortOptions] = React.useState<Array<SelectFieldOptionType>>(selectFieldOptions);
  const [fdtSplitterOptions, setFdtSplitterOptions] = React.useState<Array<SelectFieldOptionType>>(selectFieldOptions);
  const [fdtSplitterPortOptions, setFdtSplitterPortOptions] = React.useState<Array<SelectFieldOptionType>>(
    selectFieldOptions,
  );

  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const { dataCenter, oltSlot, oltName, fdtSplitter, fdtSplitterPort, oltPort, odbSplitterType } = odb;

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!area || !oltSlot || !oltName || !fdtSplitter || !dataCenter || !fdtSplitterPort || !oltPort) {
      setRequiredFieldError(true);
    } else {
      const inputBase = {
        //SDU
        odbName,
        fdtSplitterPortId: fdtSplitterPort,
        odbSplitterType: odbType === 'SDU' ? 1 : odbSplitterType,
        area,
        street,
        street1: `${house} ${madkhal}`,
        latitude,
        longitude,
      };
      const inputExtended = { ...inputBase, odbSplitterShelf }; // MDU

      addNew({ variables: { input: odbType === 'SDU' ? inputBase : inputExtended } })
        .then(response => onFinish && onFinish(response, ''))
        .catch(error => onFinish && onFinish(null, error));
    }
  };

  const updateOdb = (value, field) => {
    setOdb({ ...odb, [field]: value });
  };

  let dataCenterOptions: $TSFixMe;
  if (allDataCenters) {
    dataCenterOptions = allDataCenters?.getAllDataCenter.map(d => {
      return {
        id: d.dcId,
        value: d.dcId,
        label: d.dcName,
      };
    });
  }

  // OLTs
  React.useEffect(() => {
    updateOdb('', 'oltName'); //reset
    if (allOlts && dataCenter) {
      const _oltOptions: Array<SelectFieldOptionType> = compact(
        allOlts?.getAllOlt.map(o => {
          if (o.dc.dcId === dataCenter) {
            return {
              id: o.oltId,
              value: o.oltId,
              label: o.oltName,
            };
          }
        }),
      );
      setOltOptions(_oltOptions);
    }
  }, [allOlts, dataCenter]);

  // Olt Slots
  React.useEffect(() => {
    updateOdb('', 'oltSlot'); //reset
    setOltSlotOptions([]);
    if (allOltSlots) {
      const _oltSlotOptions: Array<SelectFieldOptionType> = allOltSlots?.getAllOltSlot.map(o => {
        return {
          id: o.oltSlotId,
          value: o.oltSlotId,
          label: o.oltSlotNo,
        };
      });
      setOltSlotOptions(_oltSlotOptions);
    }
  }, [allOltSlots, oltName]);

  // Olt Ports
  React.useEffect(() => {
    updateOdb('', 'oltPort'); //reset
    if (allOltPorts) {
      const _oltPortOptions: Array<SelectFieldOptionType> = allOltPorts?.getAllOltPort.map(o => {
        return {
          id: o.oltPortId,
          value: o.oltPortId,
          label: o.oltPortNo,
        };
      });
      setOltPortOptions(_oltPortOptions);
    }
  }, [allOltPorts, oltSlot]);

  // FDT Splitter
  React.useEffect(() => {
    updateOdb('', 'fdtSplitter'); //reset
    if (allFdtSplitter && odbType) {
      const _fdtSplitterOptions: Array<SelectFieldOptionType> = compact(
        allFdtSplitter?.getAllFdtSplitter.map(o => {
          if (o.priOltPort?.oltPortId === oltPort && fdtSplitterTypeMapping[odbType].includes(o.fdtSplitterType)) {
            return {
              id: o.fdtSplitterId,
              value: o.fdtSplitterId,
              label: o.fdt.fdtName,
            };
          }
        }),
      );
      setFdtSplitterOptions(_fdtSplitterOptions);
    }
  }, [odbType, allFdtSplitter, oltPort]);

  // Fdt splitter ports
  React.useEffect(() => {
    updateOdb('', 'fdtSplitterPort'); //reset
    if (allFdtSplitterPort) {
      const _fdtSplitterPortOptions: Array<SelectFieldOptionType> = compact(
        allFdtSplitterPort?.getAllFdtSplitterPort.map(o => {
          if (o.fdtSplitter?.fdtSplitterId === fdtSplitter) {
            return {
              id: o.fdtSplitterPortId,
              value: o.fdtSplitterPortId,
              label: o.fdtSplitterPortNo,
            };
          }
        }),
      );
      setFdtSplitterPortOptions(_fdtSplitterPortOptions);
    }
  }, [allFdtSplitter, fdtSplitter]);

  if (
    addNewLoading ||
    fetchingOlts ||
    fetchingOltSlots ||
    fetchingOltPorts ||
    fetchingFdtSplitter ||
    fetchingFdtSplitterPort
  )
    return <SpinLoader />;

  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        <h3>Setup a new ODB {type}</h3>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <SelectField
              options={odbTypes}
              value={type}
              disabled={!odbTypes || !!type} // if type is give from prop then this should be disabled
              placeholder={'Type'}
              onChange={value => setOdbType(value)}
              invalid={requiredFieldError && !odbType}
            />
          </Col>
          <Col span={12}>
            <TextField {...bindArea} placeholder={'Cluster Area'} invalid={requiredFieldError && !area} />
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <TextField {...bindStreet} placeholder={'Cluster Street'} invalid={requiredFieldError && !street} />
          </Col>
          <Col span={6}>
            <TextField {...bindMadkhal} placeholder={'Cluster Madkhal'} invalid={requiredFieldError && !madkhal} />
          </Col>
          <Col span={6}>
            <TextField {...bindHouse} placeholder={'Cluster House No'} invalid={requiredFieldError && !house} />
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={8}>
            <SelectField
              options={dataCenterOptions}
              disabled={!!errorFetchingDataCenters || !dataCenterOptions || !odbType}
              placeholder={'Data Centre Name'}
              value={dataCenter}
              onChange={value => updateOdb(value, 'dataCenter')}
              invalid={requiredFieldError && !dataCenter}
            />
          </Col>
          <Col span={8}>
            <SelectField
              options={oltOptions}
              disabled={!!errorFetchingOlts || !oltOptions || fetchingOlts || !dataCenter}
              placeholder={'OLT Name'}
              value={oltName}
              onChange={value => updateOdb(value, 'oltName')}
              invalid={requiredFieldError && !oltName}
            />
          </Col>
          <Col span={8}>
            <SelectField
              options={oltSlotOptions}
              disabled={!!errorFetchingOltSlots || !oltSlotOptions || fetchingOltSlots || !oltName}
              placeholder={'OLT Slot'}
              onChange={value => updateOdb(value, 'oltSlot')}
              value={oltSlot}
              invalid={requiredFieldError && !oltSlot}
            />
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={8}>
            <SelectField
              options={oltPortOptions}
              disabled={!!errorFetchingOltPorts || !oltPortOptions || fetchingOltPorts || !oltSlot}
              placeholder={'OLT Port'}
              value={oltPort}
              onChange={value => updateOdb(value, 'oltPort')}
              invalid={requiredFieldError && !oltPort}
            />
          </Col>
          <Col span={8}>
            <SelectField
              options={fdtSplitterOptions}
              disabled={!!errorFetchingFdtSplitters || !fdtSplitterOptions || !oltPort}
              placeholder={'FDT Splitter'}
              value={fdtSplitter}
              onChange={value => updateOdb(value, 'fdtSplitter')}
              invalid={requiredFieldError && !fdtSplitter}
            />
          </Col>
          <Col span={8}>
            <SelectField
              options={fdtSplitterPortOptions}
              disabled={!!errorFetchingFdtSplitterPort || !fdtSplitterPortOptions || !fdtSplitter}
              placeholder={'First Splitter Port'}
              value={fdtSplitterPort}
              onChange={value => updateOdb(value, 'fdtSplitterPort')}
              invalid={requiredFieldError && !fdtSplitterPort}
            />
          </Col>
        </Row>
        {odbType === 'MDU' && (
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <TextField
                {...bindOdbSplitterShelf}
                placeholder={'Second Splitter No'}
                invalid={requiredFieldError && !odbSplitterShelf}
              />
            </Col>
            <Col span={12}>
              <SelectField
                options={odbSplitterTypeOptions}
                disabled={!odbSplitterTypeOptions || !odbType || !fdtSplitterPort}
                placeholder={'ODB Splitter Type'}
                value={odbSplitterType}
                onChange={value => updateOdb(value, 'odbSplitterType')}
                invalid={requiredFieldError && !odbSplitterType}
              />
            </Col>
          </Row>
        )}
        <Row gutter={[16, 8]}>
          <Col span={8}>
            <TextField {...bindOdbName} placeholder={'ODB Name'} invalid={requiredFieldError && !odbName} />
          </Col>
          <Col span={8}>
            <TextField {...bindLatitude} placeholder={'Latitude'} invalid={requiredFieldError && !latitude} />
          </Col>
          <Col span={8}>
            <TextField {...bindLongitude} placeholder={'Longitude'} invalid={requiredFieldError && !longitude} />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button variant={'round'} label="submit" type="submit" />
        </ButtonWrapper>
      </form>
    </Modal>
  );
};

export default AddNewOdb;
