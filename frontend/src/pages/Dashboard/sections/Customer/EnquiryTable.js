import {
    Box,
    Card,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from "@mui/material";
  import { Scrollbar } from "../../components/Scrollbar";
  import { useCallback, useEffect, useState } from "react";
  import axios from "axios";
import { History } from "@mui/icons-material";
  
  const token = window.localStorage.getItem("Token");
  const domain = process.env.REACT_APP_API_DOMAIN;
  
  export const EnquiryTable = ({id}) => {
  
    const[items,setItems]=useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count,setCount]=useState(0);
    const [loading, setLoading] = useState(true);
  

    const handlePageChange = useCallback((event, value) => {
        setPage(value);
      }, []);

      const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
      }, []);


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
            const sortedData = response.data
            .slice()
            .sort((a, b) => a.state.localeCompare(b.state));
    
    console.log(response.data)
            setItems(sortedData); // Set the fetched data into state
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true);
          }
        };
    
        // Call the fetch data function
        fetchData(id);
      }, []);
 
  
    return (
      <Card >
        <Scrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>Vehicle Numer</TableCell>
                  <TableCell>Seating Capacity</TableCell>
                  <TableCell>Border Entry</TableCell>
                  <TableCell>Tax Mode</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  return (
                    <TableRow hover key={customer.id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {customer.state}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.vehicleNumber}</TableCell>
                      <TableCell>{customer.seatingCapacity}</TableCell>
                      <TableCell>{customer.borderEntry}</TableCell>
                      <TableCell>{customer.taxMode}</TableCell>
                      <TableCell>{customer.fromDate}</TableCell>
                      <TableCell>{customer.toDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    );
  };
  