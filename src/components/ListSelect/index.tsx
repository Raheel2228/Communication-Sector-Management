import React from 'react';
import { CheckBoxOutlineBlank, CheckBox, Close } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import { Empty } from 'antd';
import { ListItem, Label, Icon } from './styled.components';

interface Props {
  data: $TSFixMe;
  identifier: string;
  listFlag: number;
  selectedItems: $TSFixMe;
  toggleSelect?: (id: string) => void;
}
const Component: React.FC<Props> = ({ data, identifier, listFlag, selectedItems, toggleSelect }) => {
  const ListItemsCollection =
    data.length === 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      data.map(item => (
        <ListItem key={item[identifier]} onClick={() => toggleSelect && toggleSelect(item[identifier])}>
          <Label>
            {Object.values(item)
              .join(' | ')
              .replace('| [object Object]', '')
              .substr(0, 80) + '...'}
          </Label>
          <Icon>
            {listFlag == 1 ? (
              <Close style={{ fontSize: 15 }} />
            ) : selectedItems?.includes(item[identifier]) ? (
              <CheckBox style={{ fontSize: 15 }} />
            ) : (
              <CheckBoxOutlineBlank style={{ fontSize: 15 }} />
            )}
          </Icon>
        </ListItem>
      ))
    );

  return <>{ListItemsCollection}</>;
};

export default Component;
