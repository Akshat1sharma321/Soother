import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import BreathingExercise from "../../components/BreathingExercise/BreathingExercise";

const Meditation: React.FC = () => {
  const theme = useTheme();
  const meditationBenefits = [
    "Reduces stress and anxiety",
    "Improves emotional health",
    "Enhances self-awareness",
    "Increases attention span",
    "May reduce age-related memory loss",
    "Can generate kindness",
    "Helps control pain",
    "Can decrease blood pressure",
    "Accessible anywhere",
    "Improves sleep quality",
  ];

  const guidedMeditations = [
    {
      title: "Morning Calm",
      duration: "5 minutes",
      description: "Start your day with clarity and purpose",
      image:
        "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Stress Relief",
      duration: "10 minutes",
      description: "Let go of tension and find your center",
      image:
        "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Bedtime Relaxation",
      duration: "15 minutes",
      description: "Prepare your mind and body for restful sleep",
      image:
        "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Self-Compassion",
      duration: "8 minutes",
      description: "Practice kindness toward yourself during difficult times",
      image:
        "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
          py: 6,
          mb: 6,
          borderRadius: { xs: 0, sm: "0 0 50px 50px" },
          opacity: theme.palette.mode === "dark" ? 0.9 : 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="white"
          >
            Meditation & Breathing
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Find peace within yourself through guided breathing exercises and
            meditation techniques.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Breathing Exercise
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Take a moment to focus on your breathing. This simple exercise can
            help reduce stress, anxiety, and bring a sense of calm during
            difficult times.
          </Typography>

          <BreathingExercise />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Why Meditation Helps
            </Typography>
            <Typography variant="body1" paragraph>
              Meditation is a powerful tool for managing mental health,
              especially during periods of heightened anxiety or depressed mood.
              Regular practice can lead to significant improvements in your
              well-being.
            </Typography>

            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(186, 104, 200, 0.1)"
                    : "#f9f4ff",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.secondary.light
                      : theme.palette.secondary.dark,
                }}
              >
                <FavoriteIcon color="secondary" sx={{ mr: 1 }} /> Benefits of
                Regular Meditation
              </Typography>
              <List>
                {meditationBenefits.map((benefit, index) => (
                  <ListItem key={index} dense>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon
                        color="primary"
                        fontSize="small"
                      />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Meditation peaceful scene"
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 1 }}>
            <SelfImprovementIcon sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
            Guided Meditations
          </Typography>
          <Typography variant="body1" paragraph>
            These guided sessions can help you achieve a state of calm and
            relaxation. Choose one that resonates with your current needs:
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {guidedMeditations.map((meditation, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={160}
                    image={meditation.image}
                    alt={meditation.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {meditation.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Duration: {meditation.duration}
                    </Typography>
                    <Typography variant="body2">
                      {meditation.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(3, 169, 244, 0.1)"
                : "#f0f7ff",
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "#81d4fa"
                  : theme.palette.primary.dark,
            }}
          >
            Remember
          </Typography>
          <Typography variant="body1">
            Meditation is a practice. Don't worry if your mind wanders or if you
            find it difficult at first. The benefits come with consistency, not
            perfection. Be kind to yourself through the process.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Meditation;
