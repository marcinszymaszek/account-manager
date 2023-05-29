import { Fragment, useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Box } from "@mui/material";
import Table from "./components/Table";
import ErrorPage from "./components/ErrorPage";
import { GridColDef } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import { ENTRYPOINT } from "./config/entrypoint";

const AccountsList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = ENTRYPOINT;
  const token = "5d9f48133cbe87164d4bb12c";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await axios(`/rest/accounts`, {
          headers: {
            "x-apikey": `${token}`,
          },
        });
        const accountTypes = await axios(`/rest/accounttypes`, {
          headers: {
            "x-apikey": `${token}`,
          },
        });
        const newData = accounts.data.map((account: any) => {
          accountTypes.data.find((accountType: any) => {
            if (accountType.id === account.accountType) {
              account.title = accountType.title;
            }
          });
          return account;
        });
        setData(newData);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "profitLoss",
      headerName: "Profit & Loss",
      width: 150,
      valueGetter: (params) => {
        return `${params.row.currency} ${params.row.profitLoss}`;
      },
    },
    {
      field: "title",
      headerName: "Account Type",
      width: 200,
    },
  ];

  return (
    <Fragment>
      {loading && <Loader />}
      {error && <ErrorPage />}
      {!loading && !error && data && (
        <Box>
          <Table data={data} columns={columns} />
        </Box>
      )}
    </Fragment>
  );
};

export default AccountsList;
