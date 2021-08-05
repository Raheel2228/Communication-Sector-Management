import styled from 'styled-components';
import { palette } from 'components/assets';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${palette.grey};
`;

export const Subtitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  color: ${palette.darkGrey};
`;

export const UpdateErrorMsg = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  color: ${palette.red};
`;
