import React from 'react';
import { Dashboard, TabView } from 'layouts';
import Content from './components/Content';
import { ErrorBoundary } from 'components';
import { tabs, tabsToServiceTypeMap, tabsToServiceCategoryMap } from './configurations';
import { DetailsDrawer } from 'commons';
import { useHistory, useLocation } from 'react-router-dom';
import { CardWrapper } from './styled.component';
import { GET_ALL_SERVICE_SUBSCRIPTIONS } from 'gql';
import { useQuery } from '@apollo/react-hooks';

interface B2BCatalogSubscriptionData {
  getAllServiceSubscriptionForRsp: B2BSubscriptions[];
}

interface B2BCatalogSubscriptionVars {
  rspId: string;
}

const Container: React.FC = () => {
  const { error, loading, data, refetch, client } = useQuery<B2BCatalogSubscriptionData, B2BCatalogSubscriptionVars>(
    GET_ALL_SERVICE_SUBSCRIPTIONS,
    {
      variables: {
        rspId: '1',
      },
    },
  );

  const history = useHistory();
  const location = useLocation();
  const activeRoute = location.pathname.replace(/\\|\//g, '');

  const urlParams = new URLSearchParams(window.location.search);
  const context = urlParams.get('context');
  const currentTab = urlParams.get('activeTab');

  const [activeTab, setActiveTab] = React.useState(currentTab || 'interconnect');
  const [serviceData, setServiceData] = React.useState<B2BSubscriptions[] | undefined | null>();

  React.useEffect(() => {
    if (data?.getAllServiceSubscriptionForRsp) {
      const filtered = data?.getAllServiceSubscriptionForRsp.filter(item => {
        let categoryFilter = true;
        if (activeTab === 'residential' || activeTab === 'business') {
          categoryFilter = item.serviceDetails?.serviceCategory === activeTab;
        }
        return item.serviceDetails?.serviceType === tabsToServiceTypeMap[activeTab] && categoryFilter;
      });
      setServiceData(filtered);
    }
  }, [data, activeTab]);

  const handleDrawerExit = () => {
    history.push(`/${activeRoute}?activeTab=${activeTab}`);
  };
  const _updateQuery = updatedSubscription => {
    client.writeQuery({
      query: GET_ALL_SERVICE_SUBSCRIPTIONS,
      data: { getAllServiceSubscriptionForRsp: updatedSubscription },
    });
  };

  React.useEffect(() => {
    document.title = `B2B Subscription`;

    if (activeTab) {
      history.push(`/${activeRoute}?activeTab=${activeTab}`);
    } else if (!activeTab) {
      history.push(`/${activeRoute}`);
    }
  }, [activeRoute, activeTab, history]);

  return (
    <Dashboard>
      <CardWrapper>
        <ErrorBoundary>
          <TabView tabs={tabs} route={activeTab} onClick={(tab: string) => setActiveTab(tab)}>
            <Content
              data={serviceData}
              rawData={data?.getAllServiceSubscriptionForRsp}
              activeTab={activeTab}
              loading={loading}
              error={error}
              refetch={refetch}
            />
          </TabView>
        </ErrorBoundary>
      </CardWrapper>
      {!!context && <DetailsDrawer onExit={handleDrawerExit} updateQuery={_updateQuery} />}
    </Dashboard>
  );
};

export default Container;
