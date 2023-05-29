import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: GridColDef<T>[];
}

const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  return (
    <Box sx={{ height: 400, width: "70%", marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        rows={data}
        columns={columns}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
};

export default Table;
