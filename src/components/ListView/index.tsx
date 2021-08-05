import React from 'react';
import { CustomThemeWrapper, List, FilterAndIconsRow } from './styled.components';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { StatusCellRenderer, TextCellRenderer } from './renderers';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { IconButtonsRow, FiltersRow, IconButtonType, FilterType } from './components';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { ApolloError } from 'apollo-client';
import { FullPageLoader, LoadingError } from 'components';

const renderersMap = { StatusCellRenderer, TextCellRenderer };

interface Props extends AgGridReactProps {
  columnDefs?: (ColDef | ColGroupDef)[];
  data?: Array<$TSFixMe>;
  iconButtons?: Array<IconButtonType>;
  filtersRow?: Array<FilterType>;
  loading?: boolean;
  error?: ApolloError | undefined;
}

const ListView: React.FC<Props> = ({
  columnDefs,
  data,
  onGridReady,
  iconButtons,
  filtersRow,
  onRowSelected,
  loading,
  error,
}) => {
  if (loading) return <FullPageLoader />;
  if (error) return <LoadingError />;
  return (
    <div style={{ overflowY: 'scroll' }}>
      <FilterAndIconsRow>
        {filtersRow && filtersRow.length > 0 && <FiltersRow filters={filtersRow} />}
        {iconButtons && iconButtons.length > 0 && <IconButtonsRow iconButtons={iconButtons} />}
      </FilterAndIconsRow>
      <List>
        <CustomThemeWrapper className="ag-theme-material">
          <AgGridReact
            columnDefs={columnDefs}
            onRowSelected={onRowSelected}
            rowData={data}
            rowSelection="multiple"
            suppressCellSelection={true}
            frameworkComponents={renderersMap}
            suppressMenuHide={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </CustomThemeWrapper>
      </List>
    </div>
  );
};

export default ListView;
