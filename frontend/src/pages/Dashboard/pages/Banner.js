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
    FormGroup,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    SvgIcon,
    TextField,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { applyPagination } from "../utils/apply-pagination";
import { BannerTable } from "../sections/Banner/BannerTable";


const useCarriers = (data, page, rowsPerPage) => {
    return useMemo(() => {
        return applyPagination(data, page, rowsPerPage);
    }, [data, page, rowsPerPage]);
};

function Office() {
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
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState(null);
    const [filename, setFilename] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const paginationData = useCarriers(fetchData, page, rowsPerPage);


    const handleFileChange = async (event) => {
        setLoading(true);
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
      
            setFilename(response.data.filename)

            // Handle success if needed
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


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
                alert("try again");
            }

            const formData = {
                filename: filename,
                description: data.description,
              };
            console.log(filename,data.description);
            const response = await axios.post(`${domain}/banners`, formData, {
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
                const response = await axios.get(`${domain}/banners`);
                setFetchData(response.data); // Set the fetched data into state
                console.log(response.data)
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
                                py: 8,
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
                                            <Typography variant="h4">Banner Images</Typography>
                                        </Stack>
                                        <div>
                                            <Button
                                                startIcon={
                                                    <SvgIcon fontSize="small">
                                                        <PlusIcon />
                                                    </SvgIcon>
                                                }
                                                variant="contained"
                                                onClick={() => {
                                                    setEditOpen(true);
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>

                                    </Stack>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <BannerTable
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
                            </Container>
                        </Box>
                    </>
                    <Dialog
                        open={isEditOpen}
                        onClose={() => {
                            setEditOpen(false);
                        }}
                    >
                        <DialogTitle>Add new image</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>



                                <Grid item xl={12} md={12}>
                                    <TextField
                                        label="Description"
                                        name="description"
                                        type="text"
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormGroup>
                                        <Input
                                            id="inputEmpGroupFile"
                                            name="file"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </FormGroup>
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
                            <Button onClick={() => handleSave()} color="primary">
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

export default Office;
