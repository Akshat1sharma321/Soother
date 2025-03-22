import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SpaIcon from "@mui/icons-material/Spa";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleIcon from "@mui/icons-material/People";

const Home: React.FC = () => {
  const theme = useTheme();
  const features = [
    {
      title: "Music Therapy",
      description:
        "Discover playlists specially curated to uplift your mood and help you feel better.",
      icon: <MusicNoteIcon fontSize="large" />,
      path: "/music",
      color: "#6a5acd",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Meditation & Breathing",
      description:
        "Follow guided breathing exercises to reduce stress and anxiety.",
      icon: <SpaIcon fontSize="large" />,
      path: "/meditation",
      color: "#f06292",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Mood-Lifting Memes",
      description:
        "Laugh your way through a collection of memes that are sure to bring a smile.",
      icon: <EmojiEmotionsIcon fontSize="large" />,
      path: "/memes",
      color: "#ffb74d",
      image:
        "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Community Support",
      description:
        "Connect with others going through similar experiences. You are not alone.",
      icon: <PeopleIcon fontSize="large" />,
      path: "/meet",
      color: "#4fc3f7",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          px: 3,
          borderRadius: 0,
          opacity: theme.palette.mode === "dark" ? 0.9 : 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "60%" },
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Welcome to Soother
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Your Companion Through Difficult Times
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
              Feeling down? We're here to help uplift your mood with specially
              curated music, meditation exercises, mood-boosting memes, and a
              supportive community.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/music"
              size="large"
              sx={{
                mr: 2,
                mb: { xs: 2, sm: 0 },
                backgroundColor: "white",
                color: "#764ba2",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Explore Music
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/meditation"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Start Breathing
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          What We Offer
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Soother provides several tools to help improve your mood when you're
          feeling down. Explore our features designed to soothe and uplift.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: 5,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      sx={{ ml: 1 }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={feature.path}
                    sx={{ color: feature.color }}
                  >
                    Explore
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: 6 }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h5" component="h3" gutterBottom>
              Start Your Healing Journey Today
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Take a step towards feeling better with Soother's mood-lifting
              features.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/meditation"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Begin Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
