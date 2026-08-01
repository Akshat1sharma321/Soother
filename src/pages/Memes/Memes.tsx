import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import RefreshIcon from "@mui/icons-material/Refresh";
import MemeCard from "../../components/MemeCard/MemeCard";
import { memeImages } from "./meme-images";
import { fetchMemes, RedditMeme } from "../../services/memeService";

// Local memes shown only if the live meme API is unreachable.
const fallbackMemes = [
  {
    id: 1,
    title: "When the sun finally comes out after a week of rain",
    imageUrl: memeImages.dog,
    altText: "Happy dog in sunlight",
    description:
      "That feeling when you finally see sunshine after what feels like forever!",
  },
  {
    id: 2,
    title: "Me trying to explain my job to my parents",
    imageUrl: memeImages.confused,
    altText: "Confused person with whiteboard",
    description:
      'No matter how many times I explain, they still think I "do something with computers".',
  },
  {
    id: 3,
    title: "When someone compliments my cooking",
    imageUrl: memeImages.cat,
    altText: "Proud cat",
    description:
      "I may have just heated up a frozen meal, but I'll take the praise!",
  },
  {
    id: 4,
    title: "5-minute break turning into 2 hours",
    imageUrl: memeImages.sunset,
    altText: "Sunset signifying time passing",
    description: "Time is an illusion when you're procrastinating.",
  },
  {
    id: 5,
    title: "When your friend says they'll be ready in 5 minutes",
    imageUrl: memeImages.waiting,
    altText: "Person waiting",
    description: "And then you end up waiting for 45 minutes...",
  },
  {
    id: 6,
    title: "Plants when I water them vs when I don't",
    imageUrl: memeImages.plant,
    altText: "Drooping plant",
    description: "They go from thriving to dramatic in 0.2 seconds.",
  },
];

// Each category maps to a subreddit the live API pulls from.
const categories = [
  { key: "wholesome", label: "Wholesome", subreddit: "wholesomememes" },
  { key: "relatable", label: "Relatable", subreddit: "memes" },
  { key: "animals", label: "Animals", subreddit: "AnimalsBeingDerps" },
  { key: "programming", label: "Programming", subreddit: "ProgrammerHumor" },
];

const itemsPerPage = 6;

const Memes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [memes, setMemes] = useState<RedditMeme[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const loadMemes = useCallback(async (subreddit: string) => {
    setLoading(true);
    setApiFailed(false);
    setPage(1);
    try {
      const fresh = await fetchMemes(subreddit, 12);
      if (fresh.length === 0) {
        throw new Error("No memes returned");
      }
      setMemes(fresh);
    } catch (error) {
      console.error("Failed to fetch live memes:", error);
      setApiFailed(true);
      setMemes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMemes(selectedCategory.subreddit);
  }, [selectedCategory, loadMemes]);

  const liveMode = !apiFailed;
  const totalItems = liveMode ? memes.length : fallbackMemes.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: document.getElementById("memes-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
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
            <EmojiEmotionsIcon
              sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }}
            />
            Mood-Lifting Memes
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Laughter is the best medicine. Fresh memes pulled live from Reddit,
            sure to bring a smile to your face.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 6,
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Did you know?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto" }}>
            Laughter and humor have been shown to reduce stress hormones,
            increase endorphins, and strengthen your immune system. Even a smile
            can start to improve your mood!
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Browse Categories
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={() => loadMemes(selectedCategory.subreddit)}
              disabled={loading}
            >
              Fresh Memes
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}
          >
            {categories.map((category) => (
              <Chip
                key={category.key}
                label={category.label}
                onClick={() => setSelectedCategory(category)}
                color={
                  selectedCategory.key === category.key ? "primary" : "default"
                }
                variant={
                  selectedCategory.key === category.key ? "filled" : "outlined"
                }
                disabled={loading}
              />
            ))}
          </Stack>
        </Box>

        <Box id="memes-section">
          {apiFailed && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Couldn&apos;t reach the live meme service right now — showing our
              offline collection instead. Hit &quot;Fresh Memes&quot; to retry.
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {liveMode
                ? memes
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((meme) => (
                      <Grid item xs={12} md={4} key={meme.postLink}>
                        <MemeCard
                          title={meme.title}
                          imageUrl={meme.url}
                          altText={meme.title}
                          description={`From r/${
                            meme.subreddit
                          } • ${meme.ups.toLocaleString()} upvotes`}
                        />
                      </Grid>
                    ))
                : fallbackMemes
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((meme) => (
                      <Grid item xs={12} md={4} key={meme.id}>
                        <MemeCard
                          title={meme.title}
                          imageUrl={meme.imageUrl}
                          altText={meme.altText}
                          description={meme.description}
                        />
                      </Grid>
                    ))}
            </Grid>
          )}

          {!loading && pageCount > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 6 }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            bgcolor: "#fff9c4",
            p: 4,
            borderRadius: 3,
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Share Your Own Memes
          </Typography>
          <Typography variant="body1" paragraph>
            Got a funny meme that helped you through a tough time? Share it with
            our community! Your humor could brighten someone else&apos;s day.
          </Typography>
          <Button variant="contained" color="secondary" disabled>
            Upload Meme (Coming Soon)
          </Button>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            The Science of Laughter
          </Typography>
          <Typography variant="body1" paragraph>
            Research has shown that laughter provides both short-term and
            long-term benefits:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Short-term Benefits
                </Typography>
                <ul>
                  <Typography component="li" variant="body1">
                    Stimulates organs with oxygen-rich air
                  </Typography>
                  <Typography component="li" variant="body1">
                    Increases endorphins released by your brain
                  </Typography>
                  <Typography component="li" variant="body1">
                    Activates and relieves your stress response
                  </Typography>
                  <Typography component="li" variant="body1">
                    Soothes tension by increasing circulation
                  </Typography>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Long-term Benefits
                </Typography>
                <ul>
                  <Typography component="li" variant="body1">
                    Improves your immune system
                  </Typography>
                  <Typography component="li" variant="body1">
                    Relieves pain by producing natural painkillers
                  </Typography>
                  <Typography component="li" variant="body1">
                    Increases personal satisfaction
                  </Typography>
                  <Typography component="li" variant="body1">
                    Improves mood and helps combat depression
                  </Typography>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Memes;
