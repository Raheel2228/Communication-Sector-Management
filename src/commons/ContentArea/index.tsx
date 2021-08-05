import React from 'react';
import { ContentWrapper } from './styled.components';

const Content: React.FC = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
