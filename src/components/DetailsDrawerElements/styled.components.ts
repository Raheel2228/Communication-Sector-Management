import styled from 'styled-components';
import { palette } from 'components/assets';

export const Wrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h2 {
    color: ${palette.ui001};
    font-size: 16px;
    font-weight: 600;
  }
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const ToggleSection = styled.span`
  cursor: pointer;
  & > svg {
    color: ${palette.ui001};
  }
`;
