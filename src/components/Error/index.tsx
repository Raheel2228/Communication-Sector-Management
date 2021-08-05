import React from 'react';
import { Wrapper, Title, Subtitle, UpdateErrorMsg } from './styled.components';

export const LoadingError: React.FC = () => {
  return (
    <Wrapper>
      <Title>Error :(</Title>
      <Subtitle>An error occurred while fetching the data, please try again.</Subtitle>
    </Wrapper>
  );
};
interface Props {
  error: $TSFixMe;
}
export const UpdateError: React.FC<Props> = ({ error }) => {
  return (
    <Wrapper>
      <UpdateErrorMsg>{error ? error : 'An error occurred while updating the data, please try again.'}</UpdateErrorMsg>
    </Wrapper>
  );
};
