import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../components/Scrollbar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Upload } from "@mui/icons-material";
import { applyPagination } from "../../utils/apply-pagination";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";





const useCarriers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

export const EnquiryTable = ({ id }) => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const data = useCarriers(items, page, rowsPerPage)
  const [file, setFile] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [enquiry, setEnquiry] = useState({});
  const [key, setkey] = useState(1);
  const token = window.localStorage.getItem("Token");
  const domain = process.env.REACT_APP_API_DOMAIN;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${domain}/upload/${enquiry.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Ensure proper content type
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to upload PDF file");
      }

      console.log(response.data.srcPath)
      const filename = response.data.filename;

      try {
        if (!filename) {
          throw new Error("No file selected");
        }

        const response = await axios.put(
          `${domain}/enquiry/${enquiry.id}`,
          { receiptPath: filename },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'multipart/form-data' // Ensure proper content type
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to upload file path");
        }

        console.log("path updated successfully");
        setIsEditDialogOpen(false);
        setkey(() => key + 1);
        // Additional actions upon successful upload, if needed
      } catch (error) {
        console.error("Error uploading file path:", error.message);
        // Additional error handling, if needed
      }


      // Handle successful upload
      console.log("file uploaded successfully");
      // Additional actions upon successful upload, if needed
    } catch (error) {
      console.error("Error uploading file:", error.message);
      // Additional error handling, if needed
    }
  };



  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  useEffect(() => {
    // Function to fetch data
    setLoading(true);
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`${domain}/enquiry/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setItems(sortedData); // Set the fetched data into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    // Call the fetch data function
    fetchData(id);
  }, [key]);



  return (
    <Card >
      <Scrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Vehicle Numer</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Receipt Status</TableCell>
                <TableCell>Receipt Link</TableCell>
                <TableCell>Payment Status</TableCell>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                  spacing={2}
                >
                  <TableCell>Action</TableCell>
                </Stack>
              </TableRow>
            </TableHead>
            {!data ? (
              <Stack alignItems="center" direction="row" spacing={2}>
                <Typography variant="subtitle2">
                  {"This User has no history available"}
                </Typography>
              </Stack>
            ) : (
              <TableBody>
                {data && data.map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      {customer.id}
                    </TableCell>
                    <TableCell>
                      {customer.state}
                    </TableCell>
                    <TableCell>{customer.vehicleNumber}</TableCell>
                    <TableCell>{customer.seatingCapacity}</TableCell>
                    <TableCell>{formatDate(customer.fromDate)}</TableCell>
                    <TableCell>{formatDate(customer.toDate)}</TableCell>
                    <TableCell>₹{customer.amount}.00</TableCell>
                    <TableCell>
                      {customer.receiptPath ? (
                        <Typography sx={{ color: 'green' }}>Delivered</Typography>
                      ) : (
                        <Typography sx={{ color: 'red' }}>Not Delivered</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.receiptPath ? (
                        <Typography sx={{ color: 'green' }}> <Link to={`${domain}/upload/${customer.receiptPath}`} target="blank" > Available</Link> </Typography>
                      ) : (
                        <Typography sx={{ color: 'red' }}>Unavailable</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.payment_done ? (
                        <Typography sx={{ color: 'green' }}>Done</Typography>
                      ) : (
                        <Typography sx={{ color: 'red' }}>Pending</Typography>
                      )}
                    </TableCell>

                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      spacing={2}
                    >
                      <TableCell>
                        <Tooltip title="Upload Receipt" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                backgroundColor: "#e8f5e9", // Light green background on hover
                              },
                            }}
                            onClick={() => {
                              setEnquiry(customer);
                              setIsEditDialogOpen(true)
                            }}

                          >
                            <Upload />
                          </IconButton>
                        </Tooltip>

                      </TableCell>
                    </Stack>

                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={items.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>File</Typography>
              <FormGroup>
                <Input
                  id="inputEmpGroupFile"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
              </FormGroup>
            </Grid>

          </Grid>

          <Button onClick={() => { setIsEditDialogOpen(false) }}>Close</Button>
          <Button onClick={() => {
            handleUpload();
          }}>Upload File</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
