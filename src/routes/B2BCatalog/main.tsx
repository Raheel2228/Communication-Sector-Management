import React from 'react';
import { Dashboard, TabView } from 'layouts';
import Content from './components/Content';
import { ErrorBoundary } from 'components';
import { tabs, tabsToServiceTypeMap, tabsToServiceCategoryMap } from './configurations';
import { DetailsDrawer } from 'commons';
import { useHistory, useLocation } from 'react-router-dom';
import { CardWrapper } from './styled.component';
import { GET_ALL_SERVICE_CATALOG } from 'gql';
import { useQuery } from '@apollo/react-hooks';
const Container: React.FC = () => {
  const { error, loading, data, refetch, client } = useQuery(GET_ALL_SERVICE_CATALOG);

  const history = useHistory();
  const location = useLocation();
  const activeRoute = location.pathname.replace(/\\|\//g, '');

  const urlParams = new URLSearchParams(window.location.search);
  const context = urlParams.get('context');
  const currentTab = urlParams.get('activeTab');

  const [activeTab, setActiveTab] = React.useState(currentTab || 'interconnect');
  const [serviceData, setServiceData] = React.useState();

  React.useEffect(() => {
    if (data?.getAllServiceCatalogItem) {
      const filtered = data?.getAllServiceCatalogItem.filter(item => {
        let categoryFilter = true;
        if (activeTab === 'residential' || activeTab === 'business') {
          categoryFilter = item.serviceCategory === tabsToServiceCategoryMap[activeTab];
        }
        return item.serviceType === tabsToServiceTypeMap[activeTab] && categoryFilter;
      });
      setServiceData(filtered);
    }
  }, [data, activeTab]);

  const handleDrawerExit = () => {
    history.push(`/${activeRoute}?activeTab=${activeTab}`);
  };
  const _updateQuery = updatedService => {
    client.writeQuery({
      query: GET_ALL_SERVICE_CATALOG,
      data: { getAllServiceCatalogItem: updatedService },
    });
  };

  React.useEffect(() => {
    document.title = `B2B Catalog`;

    if (activeTab) {
      history.push(`/${activeRoute}?activeTab=${activeTab}`);
    } else if (!activeTab) {
      history.push(`/${activeRoute}`);
    }
  }, [activeTab]);

  return (
    <Dashboard>
      <CardWrapper>
        <ErrorBoundary>
          <TabView tabs={tabs} route={activeTab} onClick={(tab: string) => setActiveTab(tab)}>
            {activeTab === 'interconnect' && (
              <Content
                data={serviceData}
                activeTab={activeTab}
                loading={loading}
                error={error}
                refetch={refetch}
                rawData={data?.getAllServiceCatalogItem}
              />
            )}
            {activeTab === 'residential' && (
              <Content
                data={serviceData}
                activeTab={activeTab}
                loading={loading}
                error={error}
                refetch={refetch}
                rawData={data?.getAllServiceCatalogItem}
              />
            )}
            {activeTab === 'business' && (
              <Content
                data={serviceData}
                activeTab={activeTab}
                loading={loading}
                error={error}
                refetch={refetch}
                rawData={data?.getAllServiceCatalogItem}
              />
            )}
            {activeTab === 'ancillary' && (
              <Content
                data={serviceData}
                activeTab={activeTab}
                loading={loading}
                error={error}
                refetch={refetch}
                rawData={data?.getAllServiceCatalogItem}
              />
            )}
          </TabView>
        </ErrorBoundary>
      </CardWrapper>
      {!!context && <DetailsDrawer onExit={handleDrawerExit} updateQuery={_updateQuery} />}
    </Dashboard>
  );
};

export default Container;
