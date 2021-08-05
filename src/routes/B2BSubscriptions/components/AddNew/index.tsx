import React from 'react';
import { SpinLoader, LoadingError, TextField, Button, SelectField, Section } from 'components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_SERVICE_CATALOG, CREATE_CATALOG_SUBSCRIPTIONS } from 'gql';
import { Row, Col } from 'antd';
import { Modal, Error, SortablesAndActionButtons } from './styled.components';
import {
  sortablesGenerator,
  actionButtonsGenerator,
  tabsToServiceTypeMap,
  tabsToServiceCategoryMap,
} from '../../configurations';
import { Auth as AmplifyAuth } from 'aws-amplify';
import { cloneDeep } from 'lodash';
import { ListSelect } from 'components';
import { Sortables, ActionButtons } from 'commons';
import styled from 'styled-components';
import { palette } from 'components/assets';
import { useInput } from 'utils';
import { serviceNames, connectionCapacityOption } from '../../utils';

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${palette.lightGrey};
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const Name = styled.h4`
  font-weight: bold;
  margin: 0px;
  padding: 0px;
  color: ${palette.ui001};
`;

const BlockRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  & p {
    margin: 0px;
    padding: 0px;
    color: ${palette.darkGrey};
  }
`;
const FieldLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin: 5px !important;
  padding: 0px;
  color: ${palette.darkGrey};
`;
const Selectrow = styled.div`
  display: contents;
  & .ant-col {
    margin-right: 10px;
  }
`;
const SectionScrollable = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

interface Props {
  setLoading: (state: boolean) => void;
  onFinish?: (data: $TSFixMe, error: string) => void;
  activeTab: string;
  subscribedServices: $TSFixMe;
}

const AddNew: React.FC<Props> = ({ setLoading, onFinish, activeTab, subscribedServices }) => {
  const { error, loading, data } = useQuery(GET_ALL_SERVICE_CATALOG);
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [addNew, { loading: addNewLoading }] = useMutation(CREATE_CATALOG_SUBSCRIPTIONS);
  const { value: tax, bind: bindTax } = useInput('');
  const [connectionType, setConnectionType] = React.useState<any>();
  const [selectedListItem, setSelectedListItem] = React.useState<any>();
  const [collapseMap, setCollapseMap] = React.useState(new Map());
  const [sortables, setSortables] = React.useState<Array<string>>();
  const [serviceData, setServiceData] = React.useState();
  const [selectedViewItems, setselectedViewItems] = React.useState<string[]>([]);
  const handleFormSubmit = e => {
    e.preventDefault();
    let d = new Date();
    let d1 = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    AmplifyAuth.currentUserInfo().then(res => {
      if (activeTab === 'residential' || activeTab === 'business') {
        if (selectedItems.length === 0) {
          setRequiredFieldError(true);
          const _collapseMap = collapseMap;
          _collapseMap.set('personal', false);
          _collapseMap.set('personal2', false);
          setCollapseMap(cloneDeep(_collapseMap));
        } else {
          setLoading(true);
          for (let i = 0; i < selectedItems.length; i++) {
            const input = {
              rspId: 1,
              subsStartDate: d.toISOString().split('T')[0],
              subsEndDate: d1.toISOString().split('T')[0],
              subsYrc: subsYrc,
              subsNrc: subsNrc,
              taxAmount: taxAmount,
              autoRenewFlag: false,
              createdBy: res.attributes['custom:first_name'],
              //to be fixed by sending full array
              serviceId: selectedItems[i],
            };
            addNew({ variables: { input } })
              .then(response => {
                if (i === selectedItems.length - 1) {
                  onFinish && onFinish(response, '');
                }
              })
              .catch(error => onFinish && onFinish(null, error));
          }
        }
      } else {
        if (taxAmount === 0 || selectedItems.length === 0) {
          setRequiredFieldError(true);
          const _collapseMap = collapseMap;
          _collapseMap.set('personal', false);
          _collapseMap.set('personal2', false);
          setCollapseMap(cloneDeep(_collapseMap));
        } else {
          setLoading(true);
          for (let i = 0; i < selectedItems.length; i++) {
            const input = {
              rspId: 1,
              subsStartDate: d.toISOString().split('T')[0],
              subsEndDate: d1.toISOString().split('T')[0],
              subsYrc: subsYrc,
              subsNrc: subsNrc,
              taxAmount: taxAmount,
              autoRenewFlag: false,
              createdBy: res.attributes['custom:first_name'],
              //to be fixed by sending full array
              serviceId: selectedItems[i],
            };
            addNew({ variables: { input } })
              .then(response => {
                if (i === selectedItems.length - 1) {
                  onFinish && onFinish(response, '');
                }
              })
              .catch(error => onFinish && onFinish(null, error));
          }
        }
      }
    });
  };
  React.useEffect(() => {
    if (data?.getAllServiceCatalogItem) {
      const filtered = data?.getAllServiceCatalogItem.filter(item => {
        let categoryFilter = true;
        if (activeTab === 'residential' || activeTab === 'business') {
          categoryFilter = item.serviceCategory === tabsToServiceCategoryMap[activeTab];
        }
        return item.serviceType === tabsToServiceTypeMap[activeTab] && categoryFilter;
      });
      var newFiltered = filtered;
      for (let index = 0; index < subscribedServices.length; index++) {
        newFiltered = newFiltered.filter(function(e) {
          return e.serviceId !== subscribedServices[index];
        });
      }
      let connectionTypes: any = [];
      for (let index = 0; index < newFiltered.length; index++) {
        if (!connectionTypes.includes(newFiltered[index].serviceConfig.connectionType)) {
          connectionTypes.push(newFiltered[index].serviceConfig.connectionType);
        }
      }

      connectionTypes = connectionTypes.map((str, index) => ({ key: str, label: str, value: str }));
      setConnectionType(connectionTypes);
      setServiceData(newFiltered);
    }
  }, [data, activeTab]);

  const toggleSelect = (id: string) => {
    let _selectedViewItems = selectedViewItems;
    if (selectedViewItems.includes(id)) {
      const index = selectedViewItems.indexOf(id);
      index > -1 && _selectedViewItems.splice(index, 1);
    } else {
      _selectedViewItems.push(id);
    }

    setselectedViewItems(cloneDeep(_selectedViewItems));
    handleSelectionChange(selectedViewItems);
  };
  const toggleSelectView = (id: string) => {
    let _selectedViewItems = selectedViewItems;
    if (selectedViewItems.includes(id)) {
      let index = _selectedViewItems.indexOf(id);
      _selectedViewItems.splice(index, 1);

      setselectedViewItems(cloneDeep(_selectedViewItems));
      handleSecondSelectionChange(selectedViewItems);
    } else {
      _selectedViewItems.push(id);
    }
  };
  const handleSelectionChange = (_selectedItems: string[]) => {
    setSelectedItems(_selectedItems);
    let selectedList = data?.getAllServiceCatalogItem?.filter(function(itm) {
      return _selectedItems?.includes(itm.serviceId);
    });
    setSelectedListItem(selectedList);
    const _collapseMap = collapseMap;
    _collapseMap.set('personal', false);
    _collapseMap.set('personal2', false);
    setCollapseMap(cloneDeep(_collapseMap));
  };
  const handleSecondSelectionChange = (_selectedItems: string[]) => {
    let newselectedItems = selectedItems.filter(function(itm) {
      return itm == _selectedItems[0];
    });
    setSelectedItems(newselectedItems);
    let selectedList = selectedListItem?.filter(function(itm) {
      return _selectedItems?.includes(itm.serviceId);
    });
    setSelectedListItem(selectedList);
  };
  const handleSortables = async (key: string) => {
    // console.log(key);
  };
  const toggleSectionExpand = (key: string) => {
    const _collapseMap = collapseMap;
    _collapseMap.set(key, !collapseMap.get(key));
    setCollapseMap(cloneDeep(_collapseMap));
  };
  React.useEffect(() => {
    if (data) {
      setSortables(sortablesGenerator(activeTab));
    }
  }, [data]);
  React.useEffect(() => {
    const _collapseMap = collapseMap;
    _collapseMap.set('subscription', false);
    _collapseMap.set('personal', true);
    _collapseMap.set('personal1', false);
    _collapseMap.set('personal2', true);
    setCollapseMap(cloneDeep(_collapseMap));
  }, []);
  let subtotal = 0;
  let subsYrc = 0;
  let subsNrc = 0;
  let taxAmount = 0;
  const listItems = data?.getAllServiceCatalogItem?.map(row => {
    if (selectedItems.includes(row.serviceId)) {
      subtotal = subtotal + row.nrc + row.yrc;
      subsYrc = subsYrc + row.yrc;
      subsNrc = subsNrc + row.nrc;
      taxAmount = Number(((Number(tax) / 100) * Number(subtotal)).toFixed(2));
      return (
        <Block>
          <Name>{row.serviceName}</Name>
          <BlockRow>
            <p>One time charges:</p>
            <p>{row.nrc}</p>
          </BlockRow>
          <BlockRow>
            <p>Yearly recurring charges:</p>
            <p>{row.yrc}</p>
          </BlockRow>
        </Block>
      );
    }
  });

  if (loading) return <SpinLoader />;
  if (error) return <LoadingError />;
  return (
    <Modal>
      <form onSubmit={handleFormSubmit}>
        {requiredFieldError && <Error>Please fill in the required fields!</Error>}
        {(activeTab === 'residential' || activeTab === 'business') && (
          <Section
            style={{ display: 'block' }}
            title={
              activeTab === 'residential'
                ? 'B2B Residential Services (FTTH/P) Catalog'
                : 'B2B Business Services(FTTB-Leased Line(DDC)) Catalog'
            }
            collapse={collapseMap.get('personal1')}
            toggleCollapse={toggleSectionExpand}
            collapseId={'personal1'}
          >
            <Row gutter={16}>
              <Col span={9}>
                <SelectField options={serviceNames} placeholder={'Services'} />
              </Col>
              {/* <Col span={5}>
                <SelectField options={connectionType} placeholder={'Connection Type'} />
              </Col> */}
              <Col span={5}>
                <SelectField options={connectionCapacityOption} placeholder={'Capacity'} />
              </Col>
              <Col span={2}></Col>
            </Row>
            <SectionScrollable>
              <SortablesAndActionButtons>
                {sortables && <Sortables sortables={sortables} onClick={handleSortables} />}
              </SortablesAndActionButtons>
              <ListSelect
                selectedItems={selectedViewItems ? selectedViewItems : []}
                listFlag={0}
                toggleSelect={toggleSelect}
                data={serviceData ? serviceData : []}
                identifier={'serviceId'}
              />
            </SectionScrollable>
          </Section>
        )}
        {(activeTab === 'residential' || activeTab === 'business') && (
          <Section
            style={{ display: 'block' }}
            title={'Selected Services'}
            collapse={collapseMap.get('personal2')}
            toggleCollapse={toggleSectionExpand}
            collapseId={'personal2'}
          >
            <SectionScrollable>
              <SortablesAndActionButtons>
                {sortables && <Sortables sortables={sortables} onClick={handleSortables} />}
              </SortablesAndActionButtons>
              <ListSelect
                selectedItems={selectedViewItems ? selectedViewItems : []}
                toggleSelect={toggleSelectView}
                data={selectedListItem ? selectedListItem : []}
                listFlag={1}
                identifier={'serviceId'}
              />
            </SectionScrollable>
          </Section>
        )}

        {(activeTab === 'interconnect' || activeTab === 'ancillary') && (
          <Section
            style={{ display: 'block' }}
            title={
              <>
                <Selectrow>
                  <Col span={9}>
                    <SelectField options={serviceNames} placeholder={'Services'} />
                  </Col>

                  {activeTab === 'interconnect' && (
                    <>
                      <Col span={5}>
                        <SelectField options={connectionType} placeholder={'Connection Type'} />
                      </Col>
                      <Col span={5}>
                        <SelectField options={connectionCapacityOption} placeholder={'Capacity'} />
                      </Col>
                    </>
                  )}
                  {activeTab === 'interconnect' && <Col span={2}></Col>}
                  {activeTab === 'ancillary' && <Col span={11}></Col>}
                </Selectrow>
              </>
            }
            collapse={collapseMap.get('subscription')}
            toggleCollapse={toggleSectionExpand}
            collapseId={'subscription'}
          >
            <SortablesAndActionButtons>
              {sortables && <Sortables sortables={sortables} onClick={handleSortables} />}
            </SortablesAndActionButtons>
            <ListSelect
              selectedItems={selectedViewItems ? selectedViewItems : []}
              listFlag={0}
              toggleSelect={toggleSelect}
              data={serviceData ? serviceData : []}
              identifier={'serviceId'}
            />
          </Section>
        )}
        {(activeTab === 'interconnect' || activeTab === 'ancillary') && (
          <Section
            style={{ display: 'block' }}
            title="Total subscription cost &amp; details"
            collapse={collapseMap.get('personal')}
            toggleCollapse={toggleSectionExpand}
            collapseId={'personal'}
          >
            {listItems}
            <Block>
              <BlockRow>
                <p>Subtotal charges for this subscription</p>
                <p>{subtotal}</p>
              </BlockRow>
            </Block>
            <Block>
              <BlockRow>
                <Row>
                  <Col span={8}>
                    <FieldLabel>TAX Applies</FieldLabel>
                  </Col>
                  <Col span={16}>
                    <TextField
                      {...bindTax}
                      placeholder={'Tax Applies (%)'}
                      type={'number'}
                      invalid={requiredFieldError}
                    />
                  </Col>
                </Row>
                <p>{((Number(tax) / 100) * Number(subtotal)).toFixed(2)}</p>
              </BlockRow>
            </Block>
            <Block>
              <BlockRow>
                <Name>Total</Name>
                <p>{Math.floor(Number(subtotal) + (Number(tax) / 100) * Number(subtotal)).toFixed(2)}</p>
              </BlockRow>
            </Block>
            <Row>
              <Col span={4}>
                <FieldLabel>Promotional Code</FieldLabel>
              </Col>
              <Col span={6}>
                <TextField placeholder={'Promotional Code'} type={'number'} />
              </Col>
              <Col span={14}></Col>
            </Row>
          </Section>
        )}
        <Row>
          {(activeTab === 'interconnect' || activeTab === 'ancillary') && (
            <>
              <Col span={4}>
                <FieldLabel>Payment Mode</FieldLabel>
              </Col>
              <Col span={6}>
                <SelectField options={connectionType} placeholder={'Payment Mode'} />
              </Col>
              <Col span={11}></Col>
            </>
          )}
          {(activeTab === 'residential' || activeTab === 'business') && <Col span={21}></Col>}
          <Col span={3}>
            <Button label="subscribe" variant="round" type="submit" />
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default AddNew;
