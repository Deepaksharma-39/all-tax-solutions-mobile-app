import {
  Alert,
  Snackbar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
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
import { useState } from "react";
import { RiDeleteBin2Line, RiExpandRightFill } from "react-icons/ri";
import axios from "axios";

const token = window.localStorage.getItem("Token");
const domain = process.env.REACT_APP_API_DOMAIN;

export const BorderTable = (props) => {
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
  const [editedOffice, setEditedOffice] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditClick = (customer) => {
    setEditedOffice({ ...customer });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedOffice((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      if (!editedOffice) {
        throw new Error("No file selected");
      }

      const formData = {
        state: editedOffice.state,
        perDayCharge41: editedOffice.perDayCharge41,
        perDayCharge61: editedOffice.perDayCharge61,
        perDayCharge71: editedOffice.perDayCharge71,
        area: editedOffice.area
      };

      const response = await axios.put(
        `${domain}/venue/${editedOffice.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        setFailure(true);
        setSuccessMsg(response.data.message);
        throw new Error("Failed to update PDF file");
      }

      // Handle successful upload
      setSuccess(true);

      setSuccessMsg("Edit Successfull");
      //   wait 2 sec beforererender
      setTimeout(() => {
        handleKeyChange(); // Trigger re-render
      }, 2000);

      setEditOpen(false);
    } catch (error) {
      setFailure(true);
      setSuccessMsg(error.response.data.message);
      console.error("Error uploading PDF file:", error.message);
    }
  };

  const handleDelete = async (officeId) => {
    try {
      const response = await axios.delete(`${domain}/venue/${officeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        setFailure(true);
        setSuccessMsg(response.data.message);
        throw new Error("Failed to delete PDF file");
      }

      // Handle successful delete
      setSuccess(true);
      setSuccessMsg(response.data.message);

      //   wait 2 sec beforererender
      setTimeout(() => {
        handleKeyChange(); // Trigger re-render
      }, 2000);
    } catch (error) {
      setFailure(true);
      setSuccessMsg(error.response.data.message);
      console.error("Error deleting PDF file:", error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
    setSuccess(false);
  };

  return (
    <Card key={key}>
      <Scrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>State</TableCell>
                <TableCell>Per Day Charge (4+1)</TableCell>
                <TableCell>Per Day Charge (6+1)</TableCell>
                <TableCell>Per Day Charge (7+1)</TableCell>
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
                          {customer.state}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.perDayCharge41}</TableCell>
                    <TableCell>{customer.perDayCharge61}</TableCell>
                    <TableCell>{customer.perDayCharge71}</TableCell>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      spacing={2}
                    >
                      <TableCell>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                backgroundColor: "#e8f5e9", // Light green background on hover
                              },
                            }}
                            onClick={() => {
                              handleEditClick(customer);
                            }}
                          >
                            <RiExpandRightFill />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            sx={{
                              "&:hover": {
                                backgroundColor: "#ffebee", // Light red background on hover
                              },
                            }}
                            onClick={() => {
                              handleDelete(customer.id);
                            }}
                          >
                            <RiDeleteBin2Line />
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
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Border Price</DialogTitle>
        <Grid container spacing={2}>
          <Grid item xl={12} md={6}>
            <TextField
              label="State*"
              name="state"
              value={editedOffice.state}
              fullWidth
            />
          </Grid>
          <Grid item xl={12} md={6}>
            <TextField
              label="PER DAY CHARGE (4+1)*"
              name="perDayCharge41"
              onChange={handleInputChange}
              defaultValue={editedOffice.perDayCharge41}
              fullWidth
            />
          </Grid>
          <Grid item xl={12} md={6}>
            <TextField
              label="PER DAY CHARGE (6+1)*"
              name="perDayCharge61"
              onChange={handleInputChange}
              defaultValue={editedOffice.perDayCharge61}
              fullWidth
            />
          </Grid>
          <Grid item xl={12} md={6}>
            <TextField
              label="PER DAY CHARGE (7+1)*"
              name="perDayCharge71"
              onChange={handleInputChange}
              defaultValue={editedOffice.perDayCharge71}
              fullWidth
            />
          </Grid>
          <Grid item xl={12} md={6}>
            <TextField
              label="Area"
              name="area"
              onChange={handleInputChange}
              defaultValue={editedOffice.area}
              fullWidth
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdate();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={failure} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </Card>
  );
};
