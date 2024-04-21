import { ThemeProvider } from "@emotion/react";
import { createTheme } from "../../../theme";
import Layout from "../layout/Layout";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { applyPagination } from "../utils/apply-pagination";
import { CustomerTable } from "../sections/Customer/CustomerTable";


const useCarriers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

function Customer() {
  const theme = createTheme();
  const token = window.localStorage.getItem("Token");
  const domain = process.env.REACT_APP_API_DOMAIN;
  
  const [isEditOpen, setEditOpen] = useState(false);
  const [data, setData] = useState({});
  const [fetchData, setFetchData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failure, setFailure] = useState(false);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginationData = useCarriers(fetchData, page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleKeyChange = () => {
    setKey((prevKey) => prevKey + 1);
  };
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
    setSuccess(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {
      if (!data) {
        throw new Error("No data found");
      }

      const formData = {
        state: data.state,
        perDayCharge41: data.perDayCharge41,
        perDayCharge61: data.perDayCharge61,
        perDayCharge71: data.perDayCharge71,
        area: data.area
      };

      console.log(formData);
      const response = await axios.post(`${domain}/venue`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        setSuccessMsg(response.data.message);
        setFailure(true);
        throw new Error("Failed to add file");
      }

      // Handle successful upload
      setSuccess(true);
      setSuccessMsg(response.data.message);
      setEditOpen(false);
      handleKeyChange();
    } catch (error) {
      console.log(error);
      setFailure(true);
      setSuccessMsg(error.response.data.message);
      console.error("Error uploading data:", error.message);
    }
  };


  useEffect(() => {
    // Function to fetch data
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${domain}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        const sortedData = response.data
        .slice()
        .sort((a, b) => a.fullname.localeCompare(b.fullname));


        setFetchData(sortedData); // Set the fetched data into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    // Call the fetch data function
    fetchData();
  }, [key]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              <Container maxWidth="xl">
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                  >
                    <Stack spacing={1}>
                      <Typography variant="h4">User Details</Typography>
                    </Stack>
                  
                  </Stack> 
                  <Stack> 
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <CustomerTable
                      count={fetchData.length}
                      items={paginationData}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      handleKeyChange={handleKeyChange}
                      key={key}
                    />
                  )}
                  </Stack> 
                </Stack>
              </Container>
            </Box>
          </>
          <Dialog
            open={isEditOpen}
            onClose={() => {
              setEditOpen(false);
            }}
          >
            <DialogTitle>Add Border Price</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xl={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={data?.state || ""}
                      label="State"
                      name="state"
                      onChange={handleInputChange}
                    >
                      {/* {states.map((state, index) => (
                        <MenuItem key={index} value={state}>
                          {state}
                        </MenuItem>
                      ))}{" "} */}
                    </Select>
                  </FormControl>
                </Grid>


                <Grid item xl={12} md={6}>
                  <TextField
                    label="Per Day Price(4+1)"
                    name="perDayCharge41"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xl={12} md={6}>
                  <TextField
                    label="Per Day Price(6+1)"
                    name="perDayCharge61"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xl={12} md={6}>
                  <TextField
                    label="Per Day Price(7+1)"
                    name="perDayCharge71"
                    type="number"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xl={12} md={6}>
                  <TextField
                    label="Area"
                    name="area"
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setEditOpen(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={()=>handleSave()} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={failure}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </Alert>
          </Snackbar>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default Customer;
