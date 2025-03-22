import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import ChatBot from "../../components/ChatBot/ChatBot";
import SupportIcon from "@mui/icons-material/Support";

const ChatBotPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #9575cd 0%, #4527a0 100%)",
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
            <SupportIcon
              sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }}
            />
            Mood Support Chat
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Chat with our supportive bot designed to help you navigate through
            mood changes and emotional challenges.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                How It Works
              </Typography>
              <Typography variant="body1" paragraph>
                Our Mood Support Chat is designed to provide immediate emotional
                support during challenging moments. Simply share how you're
                feeling, and our bot will respond with empathetic guidance,
                coping strategies, and helpful resources.
              </Typography>
              <Typography variant="body1">
                While our chatbot is supportive, remember it's not a replacement
                for professional help. If you're experiencing a crisis, please
                contact mental health services or a healthcare provider.
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(103, 58, 183, 0.1)"
                    : "rgba(103, 58, 183, 0.05)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tips for Using the Chat
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Be specific about how you're feeling for the most relevant
                    support
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Try the quick suggestions if you're not sure where to start
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Ask about specific techniques for managing anxiety, sadness,
                    or stress
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Type "help" if you need information about available
                    resources
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ height: 600 }}>
              <ChatBot />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChatBotPage;
