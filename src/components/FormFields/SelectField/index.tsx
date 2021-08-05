import React from 'react';
import { Select } from 'antd';
import { Field } from './styled.components';

const { Option } = Select;

interface Props {
  style?: React.CSSProperties;
  options: Array<{ id?: string; value: string; label: string }>;
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  open?: boolean;
  value?: string;
  alternative?: boolean;
}

const SelectField: React.FC<Props> = ({
  style,
  options,
  multiple,
  label,
  placeholder,
  open,
  onChange,
  disabled = false,
  invalid,
  value,
  alternative,
}) => {
  const attrs = {
    placeholder: placeholder,
  };

  if (value) {
    // eslint-disable-next-line
    // @ts-ignore
    attrs.value = value;
  }

  return (
    <Field style={style} className={`${invalid ? 'invalid' : ''} ${alternative ? 'alternative' : ''}`}>
      {label && <label>{label}</label>}
      <Select
        style={{ width: '100%' }}
        mode={multiple ? 'multiple' : undefined}
        onChange={onChange}
        disabled={disabled}
        open={open}
        {...attrs}
      >
        {options &&
          options.map(({ id, value, label }) => (
            <Option key={id ? id : value} value={id ? id : value}>
              {label}
            </Option>
          ))}
      </Select>
    </Field>
  );
};

export default SelectField;
