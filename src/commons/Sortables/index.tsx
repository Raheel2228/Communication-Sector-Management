import React from 'react';
import { Wrapper } from './styled.components';
import { v4 as uuidv4 } from 'uuid';
import { camelCase } from 'lodash';

interface Props {
  sortables: Array<string> | undefined;
  onClick?(id: string): void;
}

const SortSearchAndActions: React.FC<Props> = ({ sortables, onClick }) => {
  const [activeSortable, setActiveSortable] = React.useState(0);

  const handleClick = (index: number, name: string): void => {
    onClick && onClick(camelCase(name));
    setActiveSortable(index);
  };
  return (
    <Wrapper>
      {sortables &&
        sortables.map((name, index) => (
          <span
            key={uuidv4()}
            className={activeSortable === index ? 'active' : ''}
            onClick={() => handleClick(index, name)}
          >
            By {name}
          </span>
        ))}
    </Wrapper>
  );
};

export default SortSearchAndActions;
