import React from 'react';
import { Wrapper, SectionTitle, ToggleSection } from './styled.components';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

interface Props {
  title?: $TSFixMe;
  collapse?: boolean;
  toggleCollapse?(key: string | undefined): void;
  collapseId?: string;
  style?: React.CSSProperties;
}

const Section: React.FC<Props> = ({ title, collapse, toggleCollapse, collapseId, children, style = {} }) => {
  return (
    <Wrapper style={style}>
      <SectionTitle>
        {typeof title === 'string' ? <h2>{title}</h2> : title}
        {toggleCollapse && collapseId && (
          <ToggleSection onClick={() => toggleCollapse(collapseId)}>
            {collapse ? <ExpandMore /> : <ExpandLess />}
          </ToggleSection>
        )}
      </SectionTitle>
      {!collapse && <React.Fragment>{children}</React.Fragment>}
    </Wrapper>
  );
};

export default Section;
