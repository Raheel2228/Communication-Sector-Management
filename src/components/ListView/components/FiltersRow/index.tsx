import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Wrapper, CheckboxWrapper } from './styled.components';
import Checkbox from '@material-ui/core/Checkbox';
import { camelCase } from 'lodash';

export interface Filter {
  label: string;
  color: string;
  checked: boolean;
  onChange?: (name: string) => void;
}

interface Props {
  filters: Array<Filter>;
}

const FiltersRow: React.FC<Props> = ({ filters }) => {
  return (
    <Wrapper>
      {filters &&
        filters.map(item => {
          return (
            <CheckboxWrapper color={item.color} key={uuidv4()}>
              <Checkbox
                checked={item.checked}
                value={camelCase(item.label)}
                onChange={() => {
                  item.onChange && item.onChange(camelCase(item.label));
                }}
                className="myCheckbox"
              />
              <span className="myCheckboxLabel">{item.label}</span>
            </CheckboxWrapper>
          );
        })}
    </Wrapper>
  );
};

export default FiltersRow;
