import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { Search, DarkMode, LightMode, Menu, Close, WidthFull } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from "state";
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const token = useSelector((state) => state.token);

  const getUsers = async () => {
    if (searchQuery !== "") {
      const response = await fetch(
        `http://localhost:3001/users/all/search`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ searchQuery })
        }
      );
      const data = await response.json();
      setUsers(data);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchQuery]);

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            FriendsVault
          </Typography>
          {isNonMobileScreens && (
            <Box position="relative">
              <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                <InputBase 
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder='Search...'
                />
                <IconButton>
                  <Search />
                </IconButton>
              </FlexBetween>
              {showDropdown && users.length > 0 && (
                <Paper elevation={3}  sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
                  <List >
                    {users.map((user) => (
                      <ListItem sx={{cursor:"pointer", ":hover":{backgroundColor:alt} }}  key={user.id}  onClick={() => {
                        navigate(`/profile/${user._id}`);
                        navigate(0);
                        
                      }} >
                         <img
            src={user.picturePath}
            alt="User Profile"
            style={{
              width: '40px',               
              height: '40px',              
              borderRadius: '50%',         
              objectFit: 'cover',         
              margin: '0px 30px 0px 10px',          
            }}
            
          />
                        <ListItemText  primary={`${user.firstName} ${user.lastName}`} />
                    
                        </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <InfoIcon cursor="Pointer" onClick={() => navigate("/about-us")} sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Menu />
          </IconButton>
        )}
      </FlexBetween>
    </>
  );
};

export default Navbar;
