import React from 'react';
import { Chart, Title } from './styled.components';
import { ResponsiveBar } from '@nivo/bar';

interface DataSet {
  x: string | number;
  y: string | number;
}

interface Props {
  title: string;
  color: string;
  data: $TSFixMe;
}

const VerticalBar2: React.FC<Props> = ({ title, data }) => {
  return (
    <Chart>
      <Title>{title} </Title>
      <ResponsiveBar
        data={data}
        keys={['Odb', 'Ports', 'Reserved Ports', 'Available Ports']}
        indexBy="Area"
        margin={{ right: 130, bottom: 90, left: 60 }}
        padding={0.3}
        colors={['#FA7921', '#FFC759', '#9BC53D', '#5BC0EB', '#FA7921']}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 4,
          tickPadding: 5,
          tickRotation: -60,
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        enableLabel={false}
        motionStiffness={90}
        motionDamping={15}
      />
    </Chart>
  );
};

export default VerticalBar2;
