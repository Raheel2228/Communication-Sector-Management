import React from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Wrapper, Amount, Label } from './styled.components';

const MainCard = styled(Card)`
  & .MuiPaper-rounded {
    border-radius: 12px !important;
  }
  & .MuiCardContent-root:last-child {
    padding-bottom: 17px;
  }
`;

const MainCardContent = styled(CardContent)`
  & . MuiCardContent-root {
    flex-direction: column;
    display: flex;
  }
`;

const IconWrapper = styled.div<{ color?: string }>`
  padding-top: 12px;
  & * {
    fill: ${props => props.color}!important;
  }
`;

interface Props {
  color: string;
  amount: string;
  label: string;
  icon: $TSFixMe;
}

const Component: React.FC<Props> = ({ amount, label, color, icon }) => {
  return (
    <Wrapper>
      <MainCard>
        <MainCardContent>
          <Amount color={color}>
            <IconWrapper color={color}>
              <SvgIcon fontSize="large" htmlColor={color} component={icon} />
            </IconWrapper>
            {amount}
          </Amount>
          <Label>{label}</Label>
        </MainCardContent>
      </MainCard>
    </Wrapper>
  );
};

export default Component;
