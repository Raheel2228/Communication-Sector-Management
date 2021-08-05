import { palette } from 'components/assets';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0px;
`;

export const CheckboxWrapper = styled.span<{ color?: string }>`
  display: flex;
  flex-direction: row;
  margin-right: 20px;

  & .myCheckbox {
    padding: 0px;
    margin-right: 5px;
    ${props => props.color && `color: ${palette[props.color]}`}
  }
  & .myCheckbox svg {
    width: 17px;
    height: 17px;
  }
  & .myCheckboxLabel {
    font-size: 14px;
    font-weight: 400;
    color: ${palette.dark};
  }
`;
