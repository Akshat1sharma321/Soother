import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  Paper,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import SpotifyPlayer from "../../components/MusicPlayer/SpotifyPlayer";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SpaIcon from "@mui/icons-material/Spa";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

// These are sample Spotify playlist IDs that focus on different moods
// In a real app, you might fetch these from an API
const playlists = {
  uplifting: [
    {
      id: "37i9dQZF1DX9XIFQuFvzM4",
      title: "Mood Booster",
      description:
        "Get happy with this positivity-packed playlist full of upbeat songs!",
    },
    {
      id: "37i9dQZF1DX3rxVfibe1L0",
      title: "Feeling Good",
      description: "Feel-good songs that will make your day better!",
    },
    {
      id: "37i9dQZF1DX9u7XXOp0l5L",
      title: "Happy Dance",
      description:
        "Dance like nobody's watching. Songs to make you move and feel happy.",
    },
  ],
  calm: [
    {
      id: "37i9dQZF1DWZqd5JICZI0u",
      title: "Peaceful Piano",
      description: "Peaceful piano to help you slow down, breathe, and relax.",
    },
    {
      id: "37i9dQZF1DX0jgyAiPl8Af",
      title: "Lo-Fi Beats",
      description: "Beats to relax, study, and focus.",
    },
    {
      id: "37i9dQZF1DX5trt9i14X7j",
      title: "Relaxing Ambient",
      description:
        "Minimal ambient music for relaxation, meditation, and sleep.",
    },
  ],
  energetic: [
    {
      id: "37i9dQZF1DX76Wlfdnj7AP",
      title: "Beast Mode",
      description:
        "Push yourself with your favorite hard-hitting workout tracks.",
    },
    {
      id: "37i9dQZF1DX32NsLKyzScr",
      title: "Power Hour",
      description:
        "Uptempo dance pop to power your workout or brighten your day.",
    },
    {
      id: "37i9dQZF1DX70RN3TfWWJh",
      title: "Workout Beats",
      description: "Upbeat dance tracks to get your heart pumping.",
    },
  ],
  sleep: [
    {
      id: "37i9dQZF1DWZd79rJ6a7lp",
      title: "Sleep",
      description:
        "Gentle ambient tracks to help you fall into a deep slumber.",
    },
    {
      id: "37i9dQZF1DX8Uebhn9wzrS",
      title: "Chill Tracks",
      description: "Softer electronic beats perfect for unwinding.",
    },
    {
      id: "37i9dQZF1DXcCnTAt8CfNe",
      title: "White Noise & Nature Sounds",
      description: "Calming nature sounds and ambient noise to help you sleep.",
    },
  ],
};

const Music: React.FC = () => {
  const theme = useTheme();
  const [currentMood, setCurrentMood] = useState<
    "uplifting" | "calm" | "energetic" | "sleep"
  >("uplifting");
  const [genre, setGenre] = useState("");

  const handleMoodChange = (
    _: React.SyntheticEvent,
    newValue: "uplifting" | "calm" | "energetic" | "sleep"
  ) => {
    setCurrentMood(newValue);
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "uplifting":
        return <SentimentSatisfiedAltIcon />;
      case "calm":
        return <SpaIcon />;
      case "energetic":
        return <EmojiEmotionsIcon />;
      case "sleep":
        return <NightlightIcon />;
      default:
        return <MusicNoteIcon />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
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
            <HeadphonesIcon
              sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }}
            />
            Music Therapy
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Music has the power to change your mood and lift your spirits.
            Explore our curated playlists designed to help you feel better.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{ mb: 6, borderRadius: 3, overflow: "hidden" }}
        >
          <Tabs
            value={currentMood}
            onChange={handleMoodChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              bgcolor: "background.paper",
              "& .MuiTab-root": { py: 2 },
            }}
          >
            <Tab
              value="uplifting"
              label="Uplifting"
              icon={<SentimentSatisfiedAltIcon />}
              iconPosition="start"
            />
            <Tab
              value="calm"
              label="Calm & Relaxing"
              icon={<SpaIcon />}
              iconPosition="start"
            />
            <Tab
              value="energetic"
              label="Energetic"
              icon={<EmojiEmotionsIcon />}
              iconPosition="start"
            />
            <Tab
              value="sleep"
              label="Sleep & Rest"
              icon={<NightlightIcon />}
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ p: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              {getMoodIcon(currentMood)}
              <Box component="span" sx={{ ml: 1 }}>
                {currentMood === "uplifting" && "Uplifting Playlists"}
                {currentMood === "calm" && "Calm & Relaxing Playlists"}
                {currentMood === "energetic" && "Energetic Playlists"}
                {currentMood === "sleep" && "Sleep & Rest Playlists"}
              </Box>
            </Typography>

            <Typography variant="body1" paragraph color="text.secondary">
              {currentMood === "uplifting" &&
                "These playlists are designed to boost your mood and help you feel more positive."}
              {currentMood === "calm" &&
                "Find peace and tranquility with these calming selections to reduce anxiety and stress."}
              {currentMood === "energetic" &&
                "Get moving and boost your energy with these upbeat, motivational tracks."}
              {currentMood === "sleep" &&
                "Gentle sounds to help you unwind, relax, and drift off to sleep."}
            </Typography>

            <Box sx={{ mt: 4 }}>
              {playlists[currentMood].map((playlist) => (
                <SpotifyPlayer
                  key={playlist.id}
                  playlistId={playlist.id}
                  title={playlist.title}
                  description={playlist.description}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        <Divider sx={{ my: 6 }} />

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              How Music Affects Your Mood
            </Typography>
            <Typography variant="body1" paragraph>
              Research has shown that music can have a profound effect on our
              mental state. It can reduce stress, elevate mood, boost
              motivation, and even alleviate symptoms of depression.
            </Typography>
            <Typography variant="body1" paragraph>
              The emotional impact of music comes from its ability to:
            </Typography>
            <ul>
              <Typography variant="body1" component="li">
                Trigger the release of dopamine, the "feel good" hormone
              </Typography>
              <Typography variant="body1" component="li">
                Reduce cortisol levels, helping to lower stress
              </Typography>
              <Typography variant="body1" component="li">
                Create a sense of community and connection
              </Typography>
              <Typography variant="body1" component="li">
                Provide a healthy emotional outlet
              </Typography>
              <Typography variant="body1" component="li">
                Enhance focus and productivity
              </Typography>
            </ul>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Find Your Perfect Playlist
              </Typography>
              <Typography variant="body1" paragraph>
                Looking for something specific? Try our customized
                recommendations:
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="genre-select-label">Genre</InputLabel>
                  <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={genre}
                    label="Genre"
                    onChange={handleGenreChange}
                  >
                    <MenuItem value="pop">Pop</MenuItem>
                    <MenuItem value="rock">Rock</MenuItem>
                    <MenuItem value="jazz">Jazz</MenuItem>
                    <MenuItem value="classical">Classical</MenuItem>
                    <MenuItem value="electronic">Electronic</MenuItem>
                    <MenuItem value="ambient">Ambient</MenuItem>
                    <MenuItem value="hiphop">Hip Hop</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" fullWidth disabled={!genre}>
                    Get Recommendations
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1, textAlign: "center" }}
                  >
                    This feature will be available soon!
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(3, 169, 244, 0.1)"
                : "#f0f7ff",
            p: 4,
            borderRadius: 3,
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Your Own Healing Playlist
          </Typography>
          <Typography variant="body1" paragraph>
            Think about songs that have made you feel better in the past.
            Consider creating your own playlist with those tracks, or explore
            similar music that resonates with you during difficult times.
          </Typography>
          <Button
            variant="outlined"
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Spotify
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Music;
