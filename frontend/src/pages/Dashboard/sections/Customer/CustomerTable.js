import {
    Box,
    Card,
    Dialog,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
  } from "@mui/material";
  import { Scrollbar } from "../../components/Scrollbar";
  import { useState } from "react";
import { History } from "@mui/icons-material";
import { EnquiryTable } from "./EnquiryTable";
  
  export const CustomerTable = (props) => {
    const {
      count = 0,
      items = [],
      onPageChange = () => {},
      onRowsPerPageChange,
      page = 0,
      rowsPerPage = 0,
      handleKeyChange = () => {},
      key = 0,
    } = props;
  
    const [isEditOpen, setEditOpen] = useState(false);
    const [customerId, setCustomerId] = useState(false);

  
    const handleEditClose = () => {
      setEditOpen(false);
    };
 
    const handleHistoryClick=(customer)=>{
        setEditOpen(true);
        setCustomerId(customer.id)

    }
 
    return (
      <Card key={key}>
        <Scrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Role</TableCell>
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
              <TableBody>
                {items.map((customer) => {
                  return (
                    <TableRow hover key={customer.id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {customer.id}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.fullname}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.mobile}</TableCell>
                      <TableCell>{customer.role}</TableCell>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <TableCell>
                          <Tooltip title="View History" arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  backgroundColor: "#e8f5e9", // Light green background on hover
                                },
                              }}
                              onClick={() => {
                                handleHistoryClick(customer)
                              }}
                            >
                              <History/>
                            </IconButton>
                          </Tooltip>
                          
                        </TableCell>
                      </Stack>
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
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Dialog open={isEditOpen} onClose={handleEditClose} maxWidth="xl">
          <DialogTitle>User History</DialogTitle>
        <EnquiryTable  id={customerId}/>
        </Dialog>
      </Card>
    );
  };
  