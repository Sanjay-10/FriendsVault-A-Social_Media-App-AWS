import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes = {},
  comments = [],
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://3.136.250.119:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentToggle = () => {
    setIsComments(!isComments);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://3.136.250.119:3001/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`https://3.136.250.119:3001/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      dispatch(removePost({ postId }));
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        loggedInUserId={loggedInUserId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleCommentToggle}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <Box>
          {postUserId === loggedInUserId && (
            <IconButton
              onClick={handleDeleteClick}
              sx={{
                '&:hover': {
                  color: 'red',
                },
              }}
            >
              <DeleteOutline />
            </IconButton>
          )}

          <Dialog
            open={openDialog}
            onClose={handleCancelDelete}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          <Box mt="0.5rem" sx={{ display: 'flex', gap: '0.5rem' }}>
            <TextField
              label="Add a comment"
              variant="outlined"
              value={newComment}
              onChange={handleCommentChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
              Send
            </Button>
          </Box>
          {comments.slice(0).reverse().map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
