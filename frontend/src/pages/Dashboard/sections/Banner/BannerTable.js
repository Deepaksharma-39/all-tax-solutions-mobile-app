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
    FormGroup,
    Input,
} from "@mui/material";
import { Scrollbar } from "../../components/Scrollbar";
import { useState } from "react";
import { RiDeleteBin2Line, RiExpandRightFill } from "react-icons/ri";
import axios from "axios";

const token = window.localStorage.getItem("Token");
const domain = process.env.REACT_APP_API_DOMAIN;

export const BannerTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        handleKeyChange = () => { },
        key = 0,
    } = props;

    const [isEditOpen, setEditOpen] = useState(false);
    const [editedOffice, setEditedOffice] = useState({});
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [file, setFile] = useState(null);
    const [filename,setFilename]=useState(null);
    const [description,setDescription]=useState(null);
    const handleEditClick = (customer) => {
        setEditedOffice({ ...customer });
        setEditOpen(true);
    };

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        try {
            const response = await axios.post(
                `${domain}/banner`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error("File upload failed");
            }
            console.log(response.data)

            // Handle success if needed
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed. Please try again.");
        }
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
                filename: editedOffice.filename,
                description: editedOffice.description
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
            
            const response = await axios.delete(`${domain}/banners/${officeId}`, {
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
            
            console.error("Error deleting file:", error.message);
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
                                <TableCell>File</TableCell>
                                <TableCell>Description</TableCell>
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
                                                    {customer.filename}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{customer.description}</TableCell>
                                       
                                            <TableCell>
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
                <DialogTitle>Edit Banner pics</DialogTitle>
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
                
                    <Grid item xs={12} md={12}>
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
