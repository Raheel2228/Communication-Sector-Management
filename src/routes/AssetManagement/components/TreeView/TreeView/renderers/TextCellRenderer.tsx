import React from 'react';
import { Text } from './styled.components';

interface Props {
  value?: string;
}
const TextCellRenderer: React.FC<Props> = ({ value: text }) => {
  return <Text>{text}</Text>;
};

export default TextCellRenderer;
