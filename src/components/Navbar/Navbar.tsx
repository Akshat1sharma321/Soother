import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SpaIcon from "@mui/icons-material/Spa";
import InfoIcon from "@mui/icons-material/Info";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import SupportIcon from "@mui/icons-material/Support";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../App";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Music", path: "/music", icon: <MusicNoteIcon /> },
    { name: "Meditation", path: "/meditation", icon: <SpaIcon /> },
    { name: "Chat", path: "/chat", icon: <SupportIcon /> },
    { name: "Memes", path: "/memes", icon: <EmojiEmotionsIcon /> },
    { name: "Meet", path: "/meet", icon: <PeopleIcon /> },
    { name: "About Us", path: "/about", icon: <InfoIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{
          my: 2,
          fontWeight: "bold",
          color: theme.palette.primary.main,
          transition: "all 0.3s ease",
          display: "inline-block",
          textDecoration: "none",
          position: "relative",
          paddingX: 2,
          paddingY: 1,
          "&:hover": {
            textShadow: "0 0 10px rgba(106, 90, 205, 0.7)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(106, 90, 205, 0.0)",
            borderRadius: "15px",
            zIndex: -1,
            transition: "all 0.3s ease",
          },
          "&:hover::before": {
            background: "rgba(106, 90, 205, 0.15)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SpaIcon
            sx={{
              mr: 1,
              transition: "all 0.3s ease",
              "$:hover &": {
                transform: "rotate(20deg) scale(1.1)",
                color: theme.palette.secondary.main,
              },
            }}
          />
          Soother
        </Box>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Tooltip
          title={
            colorMode.mode === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {colorMode.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            sx={{
              color:
                location.pathname === item.path
                  ? theme.palette.primary.main
                  : "inherit",
              textDecoration: "none",
              "&.Mui-selected": {
                backgroundColor: "rgba(106, 90, 205, 0.1)",
              },
            }}
          >
            <Box
              component={Link}
              to={item.path}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.name} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                textDecoration: "none",
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  right: "-5px",
                  bottom: "-5px",
                  background: "rgba(106, 90, 205, 0.0)",
                  borderRadius: "15px",
                  zIndex: -1,
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  "&::before": {
                    background: "rgba(106, 90, 205, 0.15)",
                    backdropFilter: "blur(5px)",
                  },
                  textShadow: "0 0 10px rgba(106, 90, 205, 0.8)",
                  "& svg": {
                    transform: "rotate(20deg) scale(1.1)",
                    color: theme.palette.secondary.main,
                  },
                },
                padding: "5px 10px",
                transition: "all 0.3s ease",
                "& svg": {
                  transition: "all 0.3s ease",
                },
              }}
            >
              <SpaIcon sx={{ mr: 1 }} /> Soother
            </Typography>

            <Tooltip
              title={
                colorMode.mode === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                sx={{ mr: 1 }}
              >
                {colorMode.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color:
                        location.pathname === item.path
                          ? theme.palette.primary.main
                          : "inherit",
                      fontWeight:
                        location.pathname === item.path ? "bold" : "regular",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(106, 90, 205, 0.1)",
                        "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                          transform: "scale(1.2)",
                        },
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                      },
                      "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                        transition: "transform 0.3s ease",
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
