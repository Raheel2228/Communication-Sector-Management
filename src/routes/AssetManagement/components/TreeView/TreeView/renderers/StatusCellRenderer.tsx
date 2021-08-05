import React from 'react';
import { DateAndStatusWrapper, SubMenuIcon } from './styled.components';
import { Icons } from 'components/assets';
import { Menu } from '@material-ui/icons';

interface Props {
  data: { data: { creationDate?: string; status?: string } };
  childTab?: ChildTabProps;
}

const StatusCellRenderer: React.FC<Props> = ({
  data: rowData,
  data: {
    data: { creationDate = '', status },
  },
  childTab,
}) => {
  return (
    <DateAndStatusWrapper>
      {childTab && (
        <SubMenuIcon onClick={() => childTab.callback(childTab.name, rowData)}>
          <Menu style={{ height: '15px' }} />
        </SubMenuIcon>
      )}
      <span>{creationDate}</span>
      <Icons
        name={status === 'active' ? 'activeStatus' : 'inactiveStatus'}
        style={{ fontSize: '35px' }}
        viewBox={'0 -9 25 25'}
      />
    </DateAndStatusWrapper>
  );
};

export default StatusCellRenderer;
