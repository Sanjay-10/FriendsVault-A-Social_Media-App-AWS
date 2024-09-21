import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    LinearProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required").min(5),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    picture: yup.mixed().required("Required"), // picture validation
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: null,  // Initialize picture as null
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [imagePreview, setImagePreview] = useState(null); // For image preview
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState("error");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [pageType, setPageType] = useState("login");
    const [loading, setLoading] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        setLoading(true);
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        try {
            const savedUserResponse = await fetch(
                "http://3.132.138.14:3001/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const savedUser = await savedUserResponse.json();
            if (savedUser.error) {
                setMessage("Registration failed. Please try again.");
                setOpen(true);
                setSeverity("error");
            } else {
                onSubmitProps.resetForm();
                setPageType("login");
                setMessage("Registration successful! Please log in.");
                setOpen(true);
                setSeverity("success");
            }
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
            setMessage("Registration failed. Please try again.");
            setOpen(true);
        }
    };

    const login = async (values, onSubmitProps) => {
        setLoading(true);
        try {
            const loggedInResponse = await fetch(
                "http://3.132.138.14:3001/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );

            const loggedIn = await loggedInResponse.json();
            setLoading(false);
            onSubmitProps.resetForm();

            if (loggedIn.msg) {
                setMessage("Login failed. Please check your credentials.");
                setSeverity("error");
                setOpen(true);
            } else {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setMessage("Login failed. Please try again.");
            setSeverity("error");
            setOpen(true);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleDrop = (acceptedFiles, setFieldValue) => {
        const validTypes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/heic',
            'image/gif'
        ];
        const file = acceptedFiles[0];
        if (file && validTypes.includes(file.type)) {
            setFieldValue("picture", file);  // Set the file in Formik
            setImagePreview(URL.createObjectURL(file));  // Generate image preview
        } else {
            setSnackbarOpen(true);  // Show Snackbar for invalid file type
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        accept="image/jpeg, image/png, image/gif"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles, setFieldValue)}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <Box mt={2} textAlign="center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        disabled={loading}
                        type="submit"
                        sx={{
                            m: "2rem 0 0 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { fontWeight:"bold",
                                backgroundColor: "#04AA6D",

                             },
                        }}
                    >
                        {isLogin ? "LOGIN" : "REGISTER"}
                    </Button>
                    {loading && <LinearProgress color="success" />}

                    <Typography
                    m="2rem 0 0 0"
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                        }}
                    >
                        
                        {isLogin 
                            ? "Don't have an account? Sign Up here."
                            : "Already have an account? Login here."}
                    </Typography>

                    {/* Snackbar for notifications */}
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert onClose={handleClose} severity={severity} sx={{fontSize:"15px", width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>

                    {/* Snackbar for file type validation */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ fontSize:"15px", width: '100%' }}>
                            Invalid file type! Please select a valid image file.
                        </Alert>
                    </Snackbar>
                </form>
            )}
        </Formik>
    );
};

export default Form;
