import React from 'react';
import { Button } from 'components';
import { Card, CardContent, CardTitle, Navigation, Icon } from './styled.components';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Assessment from '@material-ui/icons/Assessment';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
interface Props {
  tabs: Array<Tab>;
  onClick?: (name: string) => void;
  route?: string | null;
  treeViewTrigger?: () => void;
}

const TabView: React.FC<Props> = ({ route, tabs, onClick, children, treeViewTrigger }) => {
  const histroy = useHistory();
  const [activeTab, setActiveTab] = React.useState(tabs.findIndex(i => i.name === route));
  const handleClick = (index: number, _name: string): void => {
    onClick && onClick(_name);
    setActiveTab(index);
  };

  React.useEffect(() => {
    setActiveTab(tabs.findIndex(i => i.name === route));
  }, [route]);

  return (
    <React.Fragment>
      <Navigation>
        {tabs &&
          tabs.length > 0 &&
          tabs.map((tab, index) => {
            if (!tab.isNested) {
              return (
                <Button
                  key={tab.name}
                  active={activeTab === index}
                  variant="flat"
                  onClick={() => handleClick(index, tab?.name)}
                  label={tab?.title}
                  style={{ marginBottom: '10px', minWidth: '150px' }}
                />
              );
            }
          })}
        {treeViewTrigger && tabs[activeTab] && (
          <Icon>
            <a>
              <AccountTreeIcon
                style={{ fontSize: 40 }}
                onClick={() => {
                  handleClick(0, 'dc');
                  treeViewTrigger();
                }}
              />
            </a>
          </Icon>
        )}
        <Icon>
          <a>
            <Assessment style={{ fontSize: 40 }} onClick={() => histroy.push('/asset_management/dashboard')} />
          </a>
        </Icon>
      </Navigation>
      <Card>
        {!tabs[activeTab] && treeViewTrigger && (
          <Icon>
            <a>
              <Close
                style={{ fontSize: 30 }}
                onClick={() => {
                  handleClick(0, 'dc');
                  treeViewTrigger();
                }}
              />
            </a>
          </Icon>
        )}
        <CardTitle>
          {tabs[activeTab] ? tabs[activeTab].title : 'Data Tree'}
          <span></span>
        </CardTitle>

        <CardContent>{children}</CardContent>
      </Card>
    </React.Fragment>
  );
};

export default TabView;
