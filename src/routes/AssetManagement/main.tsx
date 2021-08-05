import React from 'react';
import { BackToParenButton, CardWrapper } from './styled.components';
import {
  GET_ALL_DATA_CENTERS,
  GET_ALL_CORE_SWITCHES,
  GET_ALL_CORE_SWITCH_SLOTS,
  GET_ALL_CORE_SWITCH_PORTS,
  GET_ALL_OLT,
  GET_ALL_FDT,
  GET_ALL_FDT_SPLITTER,
  GET_ALL_FDT_ODB,
  GET_ALL_CPE,
  GET_ALL_OLT_SLOTS,
  GET_ALL_OLT_PORTS,
} from 'gql';
import { Dashboard, TabView } from 'layouts';
import Content from './components/Content';
import TreeView from './components/TreeView';
import { tabs } from './configurations';
import { KeyboardBackspace } from '@material-ui/icons';
import { tabsToTitleMap } from './configurations';
import { ErrorBoundary } from 'components';
import { DetailsDrawer } from 'commons';
import { useHistory, useLocation } from 'react-router-dom';

const childTabs = [''];

const Container: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const activeRoute = location.pathname.replace(/\\|\//g, '');

  const urlParams = new URLSearchParams(window.location.search);
  const context = urlParams.get('context');
  const currentTab = urlParams.get('activeTab');
  const [activeTab, setActiveTab] = React.useState(currentTab || 'dc');
  const [parentId, setParentId] = React.useState('');
  const [treeView, setTreeView] = React.useState(false);

  const renderChildTab = (tab: string, data: $TSFixMe) => {
    let _parentId = '';

    if (tab === 'coreSwitchSlots') {
      _parentId = data.data?.swId;
    } else if (tab === 'coreSwitchPorts') {
      _parentId = data.data?.swSlotId;
    } else if (tab === 'oltSlots') {
      _parentId = data.data?.oltId;
    } else if (tab === 'oltPorts') {
      _parentId = data.data?.oltSlotId;
    }
    setParentId(_parentId);
    setActiveTab(tab);
  };

  const handleDrawerExit = () => {
    history.push(`/${activeRoute}?activeTab=${activeTab}`);
  };
  const updateQuery = (updatedService, client, _query, query_variable) => {
    client.writeQuery({
      query: _query,
      data: { [query_variable]: updatedService },
    });
  };

  const renderParentTab = (tab: string) => {
    setParentId('');
    setActiveTab(tab);
  };

  let parentTabName;
  if (activeTab === 'coreSwitchSlots') {
    parentTabName = 'coreSwitches';
  } else if (activeTab === 'coreSwitchPorts') {
    parentTabName = 'coreSwitchSlots';
  } else if (activeTab === 'oltSlots') {
    parentTabName = 'olt';
  } else if (activeTab === 'oltPorts') {
    parentTabName = 'oltSlots';
  }

  React.useEffect(() => {
    document.title = 'Asset Management';

    if (activeTab && !childTabs.includes(activeTab)) {
      history.push(`/${activeRoute}?activeTab=${activeTab}`);
    } else if (!activeTab) {
      history.push(`/${activeRoute}?activeTab=dc`);
    }
  }, [activeTab]);
  if (treeView) {
    return (
      <Dashboard>
        <CardWrapper>
          <ErrorBoundary>
            <TabView
              tabs={[]}
              route={activeTab}
              onClick={(tab: string) => setActiveTab(tab)}
              treeViewTrigger={() => setTreeView(false)}
            >
              <TreeView query={GET_ALL_DATA_CENTERS} activeTab={activeTab} />
            </TabView>
          </ErrorBoundary>
        </CardWrapper>
      </Dashboard>
    );
  }
  return (
    <Dashboard>
      <CardWrapper>
        <ErrorBoundary>
          <TabView
            tabs={tabs}
            route={activeTab}
            onClick={(tab: string) => setActiveTab(tab)}
            treeViewTrigger={() => setTreeView(true)}
          >
            {parentTabName && setActiveTab && (
              <BackToParenButton onClick={() => renderParentTab(parentTabName)}>
                <KeyboardBackspace /> {tabsToTitleMap[parentTabName]}
              </BackToParenButton>
            )}
            {activeTab === 'dc' && <Content query={GET_ALL_DATA_CENTERS} activeTab={activeTab} />}
            {activeTab === 'coreSwitches' && (
              <Content
                query={GET_ALL_CORE_SWITCHES}
                activeTab={activeTab}
                childTab={{ name: 'coreSwitchSlots', callback: renderChildTab }}
              />
            )}
            {activeTab === 'coreSwitchSlots' && (
              <Content
                query={GET_ALL_CORE_SWITCH_SLOTS}
                activeTab={activeTab}
                parentId={parentId}
                childTab={{ name: 'coreSwitchPorts', callback: renderChildTab }}
              />
            )}
            {activeTab === 'coreSwitchPorts' && (
              <Content query={GET_ALL_CORE_SWITCH_PORTS} activeTab={activeTab} parentId={parentId} />
            )}
            {activeTab === 'olt' && (
              <Content
                query={GET_ALL_OLT}
                activeTab={activeTab}
                parentId={parentId}
                childTab={{ name: 'oltSlots', callback: renderChildTab }}
              />
            )}
            {activeTab === 'oltSlots' && (
              <Content
                query={GET_ALL_OLT_SLOTS}
                activeTab={activeTab}
                parentId={parentId}
                childTab={{ name: 'oltPorts', callback: renderChildTab }}
              />
            )}
            {activeTab === 'oltPorts' && (
              <Content query={GET_ALL_OLT_PORTS} activeTab={activeTab} parentId={parentId} />
            )}
            {activeTab === 'fdt' && <Content query={GET_ALL_FDT} activeTab={activeTab} />}
            {activeTab === 'fdtSplitter' && <Content query={GET_ALL_FDT_SPLITTER} activeTab={activeTab} />}
            {activeTab === 'odb' && <Content query={GET_ALL_FDT_ODB} activeTab={activeTab} />}
            {activeTab === 'odbSdu' && <Content query={GET_ALL_FDT_ODB} activeTab={activeTab} />}
            {activeTab === 'odbMdu' && <Content query={GET_ALL_FDT_ODB} activeTab={activeTab} />}
            {activeTab === 'cpe' && <Content query={GET_ALL_CPE} activeTab={activeTab} />}
          </TabView>
        </ErrorBoundary>
      </CardWrapper>
      {!!context && <DetailsDrawer onExit={handleDrawerExit} updateQuery={updateQuery} />}
    </Dashboard>
  );
};

export default Container;
