import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
      const response = await fetch(`https://3.136.250.119:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'image/svg+xml',
      'image/tiff',
      'image/x-icon', 
      'image/heic'
    ];    
    const file = acceptedFiles[0];
    if (file && validTypes.includes(file.type)) {
      setImage(file);
    } else {
      setSnackbarOpen(true); // Open Snackbar when an invalid file type is selected
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.bmp,.gif,.webp,.svg,.tiff,.ico,.heic"
            multiple={false}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image or GIF Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>


                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ padding: "2.5%", marginLeft:"1rem"}}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}

                
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Media
          </Typography>
        </FlexBetween>



        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: !post ? palette.grey[400] : palette.background.alt, 
            backgroundColor: !post ? "#A3A3A3" : palette.primary.main, 
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            borderRadius: '10px',
            padding: '16px', 
            fontSize: '1.1rem', 
            minWidth: '300px', 
          },
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{
          marginTop: "5rem",
          borderRadius: '10px',
          padding: '16px', 
          fontSize: '1.1rem', 
        }}>
          Add Images or GIF only!
        </Alert>
      </Snackbar>

    </WidgetWrapper>
  );
};

export default MyPostWidget;