import React from 'react';
import { Chart, Title } from './styled.components';
import { XYPlot, VerticalGridLines, XAxis, YAxis, HorizontalBarSeries } from 'react-vis';
import { AutoSizer } from 'react-virtualized';

interface DataSet {
  x: string | number;
  y: string | number;
}

interface Props {
  title: string;
  color: string;
  data: DataSet[];
}

const VerticalBars: React.FC<Props> = ({ title, color, data }) => {
  return (
    <Chart>
      <Title>{title} </Title>
      <AutoSizer>
        {({ height, width }) => (
          <XYPlot margin={{ bottom: 70 }} yType="ordinal" width={width} height={height - 15}>
            <VerticalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <HorizontalBarSeries barWidth={0.5} data={data} color={color} />
          </XYPlot>
        )}
      </AutoSizer>
    </Chart>
  );
};

export default VerticalBars;
