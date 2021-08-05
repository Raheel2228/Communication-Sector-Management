import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import { Wrapper } from './styled.components';

export type IconButton = {
  icon: $TSFixMe;
  onclick?: () => void;
  active: boolean;
};

interface Props {
  iconButtons: Array<IconButton>;
}

const IconButtonsRow: React.FC<Props> = ({ iconButtons }) => {
  return (
    <Wrapper>
      {iconButtons &&
        iconButtons.map(item => {
          const Icon = item.icon;
          return (
            <IconButton
              key={uuidv4()}
              className={item.active ? 'active' : ''}
              onClick={item.onclick}
              disabled={!item.active}
            >
              <Icon style={{ fontSize: 17 }} />
            </IconButton>
          );
        })}
    </Wrapper>
  );
};

export default IconButtonsRow;
