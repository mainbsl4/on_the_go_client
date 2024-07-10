import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface DataGridTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const DataGridTable: React.FC<DataGridTableProps> = ({ rows, columns }) => {
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataGridTable;
