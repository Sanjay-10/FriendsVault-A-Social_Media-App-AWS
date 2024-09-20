import { Box, Typography, Avatar, Button, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Navbar from 'scenes/navbar';

function Info() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box
        width="100%"
        padding="4rem 6%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
        bgcolor={background}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="2rem"
          mt={isNonMobileScreens ? 0 : "2rem"}
          flexBasis={isNonMobileScreens ? "40%" : "100%"}
        >
        
          <Avatar
            alt="Creator"
            src="https://friendsvault.s3.us-east-2.amazonaws.com/Owner/Sanjay_1.jpg" 
            sx={{ width: isNonMobileScreens ? 220 : 150, height: isNonMobileScreens ? 220 : 150 }}
          />
        </Box>

        {/* Text Content */}
        <Box flexBasis={isNonMobileScreens ? "50%" : "100%"} textAlign={isNonMobileScreens ? "left" : "center"}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" color="textSecondary" mb="2rem">
          I’m Sanjay Suthar, a software developer with a passion for full-stack development. I enjoy working on projects that challenge me to solve real-world problems and make users' lives easier. I'm always eager to learn new technologies and improve my skills, ensuring that I stay up-to-date with the latest trends in web development.
          </Typography>
          <Box display="flex" justifyContent={isNonMobileScreens ? "flex-start" : "center"} gap="1rem">
            <Button variant="outlined" onClick={()=> window.open('https://sanjay-10.github.io/Portfolio/', '_blank', 'noopener,noreferrer')}  color="primary" sx={{ borderRadius: "20px" }}>
              Portfolio
            </Button>
            <Button variant="outlined" onClick={()=> window.open('https://github.com/Sanjay-10', '_blank', 'noopener,noreferrer')}  color="primary" sx={{ borderRadius: "20px" }}>
              Github
            </Button>
            <Button variant="outlined" onClick={()=> window.open('https://www.linkedin.com/in/sanjays10/', '_blank', 'noopener,noreferrer')}  color="primary" sx={{ borderRadius: "20px" }}>
            linkedin
            </Button>
          </Box>
        </Box>

        
      </Box>

      {/* About Us Section */}
      <Box
        width="100%"
        padding="4rem 6%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        bgcolor={primaryLight}
        textAlign={isNonMobileScreens ? "left" : "center"}
      >
        <Box flexBasis={isNonMobileScreens ? "50%" : "100%"} mb={isNonMobileScreens ? 0 : "2rem"}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About FriendsVault
          </Typography>
          <Typography variant="body1" color="textSecondary">
          FriendsVault is a social media site I developed where users can create an account, log in, share photos or text, make friends, and view profiles. I used popular tools like React, Node.js, and AWS to ensure the app runs smoothly and can handle growth. Features like storing images on AWS, managing data with Redux, and secure logins using JWT make the platform easy to use and safe for users.
          </Typography>
        </Box>

        <Box flexBasis={isNonMobileScreens ? "50%" : "100%"} textAlign="center">
          <img
            src="https://friendsvault.s3.us-east-2.amazonaws.com/Owner/FriendsVault_logo_SVG+(2).svg" // Add the correct path for the image
            alt="Lawn Mower"
            style={{
              width: isNonMobileScreens ? "50%" : "70%",
              borderRadius: "10px",
              
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Info;
