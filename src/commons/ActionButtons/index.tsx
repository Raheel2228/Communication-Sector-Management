import React from 'react';
import { Button } from 'components';
import { Wrapper } from './styled.components';
import { v4 as uuidv4 } from 'uuid';
import { camelCase } from 'lodash';

export interface Action {
  label: string;
  onClick: (id: string) => void;
}
interface Props {
  actions: Array<Action> | undefined;
}

const ActionButton: React.FC<Props> = ({ actions }) => {
  return (
    <Wrapper>
      {actions &&
        actions.map(item => (
          <Button
            key={uuidv4()}
            label={item.label}
            variant="round"
            onClick={() => item.onClick(camelCase(item.label))}
          />
        ))}
    </Wrapper>
  );
};

export default ActionButton;
