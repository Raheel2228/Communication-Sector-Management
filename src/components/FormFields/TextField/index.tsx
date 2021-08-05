import React from 'react';
import { Field } from './styled.components';
import { Input } from 'antd';

interface Props {
  label?: string;
  value?: string;
  type?: 'text' | 'number';
  disabled?: boolean;
  alternative?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  mode?: 'text' | 'password' | 'textarea';
  autoSize?: boolean | object;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: ((event: React.FormEvent<HTMLTextAreaElement>) => void) | undefined;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  invalid?: boolean;
}

const TextField: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  label,
  value,
  disabled = false,
  alternative = false,
  placeholder,
  style = {},
  type = 'text',
  mode = 'text',
  autoSize = false,
  onChange,
  onChangeTextArea,
  onBlur,
  invalid,
}) => {
  return (
    <Field className={`${invalid ? 'invalid' : ''} ${alternative ? 'alternative' : ''}`} style={style}>
      {label && <label>{label}</label>}
      {mode === 'text' && (
        <Input
          placeholder={placeholder}
          value={value || ''}
          type={type}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {mode === 'password' && (
        <Input.Password
          placeholder={placeholder}
          value={value || ''}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {mode === 'textarea' && (
        <Input.TextArea
          placeholder={'Write your message here'}
          value={value || ''}
          disabled={disabled}
          allowClear={true}
          autoSize={autoSize}
          onChange={onChangeTextArea}
        />
      )}
    </Field>
  );
};

export default TextField;
