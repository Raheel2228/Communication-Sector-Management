import React from 'react';
import { FlatButton, RoundButton } from './styled.components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  variant?: 'round' | 'flat';
  onClick?: (event: React.MouseEvent) => void;
  size?: 'large' | 'medium';
  className?: string;
  style?: $TSFixMe;
}

const Button: React.FC<Props> = ({ label, active, variant, size, onClick, className, type, style }) => {
  if (variant === 'flat') {
    return (
      <FlatButton
        className={`${className} ${active ? 'active' : ''}`}
        color="primary"
        variant="contained"
        size={size ? size : 'small'}
        onClick={onClick}
        type={type}
        style={style}
      >
        {label}
      </FlatButton>
    );
  } else if (variant === 'round') {
    return (
      <RoundButton
        variant="outlined"
        size={size ? size : 'small'}
        onClick={onClick}
        className={`${className} ${active ? 'active' : ''}`}
        type={type}
        style={style}
      >
        {label}
      </RoundButton>
    );
  }
  return (
    <RoundButton variant="text" onClick={onClick}>
      {label}
    </RoundButton>
  );
};

export default Button;
