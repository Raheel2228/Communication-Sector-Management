import React from 'react';
import Icon from './icon.png';
import TextLogo from './logo.png';
import { ReactComponent as AltLogo } from './logo-blue.svg';

interface Props {
  type?: 'icon' | 'text' | 'alt';
  className?: string;
  width?: number;
  height?: number;
}
const Logo: React.FC<Props> = ({ type, width, height, className }) => {
  switch (type) {
    case 'icon':
      return <img src={Icon} className={className} style={{ width: width || '', height: height || '' }} />;
    case 'text':
      return <img src={TextLogo} className={className} style={{ width: width || '', height: height || '' }} />;
    case 'alt':
      return <AltLogo width={width} height={height} />;
    default:
      break;
  }

  return <img src={Icon} style={{ width: width || '', height: height || '' }} />;
};

export default Logo;
