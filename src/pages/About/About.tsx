import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoodIcon from "@mui/icons-material/Mood";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PsychologyIcon from "@mui/icons-material/Psychology";
import akshatPhoto from "../../assets/20240912_110914.jpg";

const About: React.FC = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: "Akshat Sharma",
      role: "Founder & Developer",
      bio: "Software engineer passionate about creating technology that makes mental health support more accessible to everyone.",
      avatar: akshatPhoto,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            <InfoIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
            About Soother
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Our mission is to provide support, resources, and community to help
            you navigate through difficult emotional periods.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Soother was born from a personal experience with depression and
              the recognition that many people, especially those dealing with
              hormonal fluctuations during their periods, often struggle with
              mood changes that can significantly impact their quality of life.
            </Typography>
            <Typography variant="body1" paragraph>
              We noticed that while there were many resources available for
              general mental health support, there weren't many that
              specifically addressed the unique challenges that come with
              period-related mood changes and depression.
            </Typography>
            <Typography variant="body1">
              Our platform combines evidence-based approaches to mood management
              with a supportive community, creating a holistic environment for
              healing and growth. We believe in the power of music, meditation,
              connection, and even humor to help lift your spirits during
              difficult times.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://media.istockphoto.com/id/2166309172/photo/happy-senior-couple-enjoying-coffee-together-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=vz14NBs9dNH7vF6RCwde0uSHVa7NSh9umZbW3Z6Qrfg="
              alt="People supporting each other"
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

        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            p: 4,
            borderRadius: 3,
            mb: 8,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }}
          >
            <MoodIcon
              sx={{
                verticalAlign: "middle",
                mr: 1,
                color: theme.palette.primary.main,
              }}
            />
            Our Approach
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(123, 31, 162, 0.15)"
                      : "#f3e5f5",
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#ce93d8" : "#7b1fa2",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FavoriteIcon sx={{ mr: 1 }} /> Compassion
                </Typography>
                <Typography variant="body2">
                  We approach every interaction with empathy and understanding.
                  We recognize that each person's experience is unique, and we
                  provide support without judgment.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(0, 137, 123, 0.15)"
                      : "#e0f2f1",
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#80cbc4" : "#00796b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalHospitalIcon sx={{ mr: 1 }} /> Evidence-Based
                </Typography>
                <Typography variant="body2">
                  We use scientifically-proven techniques and resources. Our
                  recommendations are grounded in research on mental health,
                  mood disorders, and recovery.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(121, 85, 72, 0.15)"
                      : "#efebe9",
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#a1887f" : "#4e342e",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PsychologyIcon sx={{ mr: 1 }} /> Holistic Approach
                </Typography>
                <Typography variant="body2">
                  We believe in addressing the whole person—offering tools for
                  mental, emotional, and social well-being to create a complete
                  support system.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }}
          >
            How Soother Can Help
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Music Therapy"
                    secondary="Discover curated playlists designed to boost your mood and provide emotional relief during difficult times."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Meditation & Breathing"
                    secondary="Practice guided breathing exercises that can help reduce anxiety and promote a sense of calm and balance."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Community Support"
                    secondary="Connect with others who understand what you're going through in a safe, supportive environment."
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mood-Lifting Content"
                    secondary="Enjoy memes and positive content specifically chosen to bring a smile to your face when you need it most."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Resources & Education"
                    secondary="Access information about mood management, period-related emotional changes, and strategies for better mental health."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Regular Check-ins"
                    secondary="Track your mood over time and receive personalized recommendations based on your experiences."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Meet Our Team
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 3,
                    },
                    borderRadius: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={member.avatar}
                    alt={member.name}
                    sx={{ objectPosition: "top" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                      fontWeight="medium"
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
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
                ? "rgba(255, 193, 7, 0.1)"
                : "#fff8e1",
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.mode === "dark" ? "#ffecb3" : "inherit",
            }}
          >
            A Note from Our Founder
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "inherit",
            }}
          >
            "We created Soother because I believe everyone deserves support
            during their darkest moments. Having experienced the challenges of
            depression firsthand, I know how isolating it can feel. My hope is
            that Soother becomes a trusted companion for anyone navigating
            difficult emotional terrain, especially those experiencing mood
            changes related to their menstrual cycle."
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: theme.palette.mode === "dark" ? "#ffecb3" : "inherit",
            }}
          >
            — Akshat Sharma, Founder
          </Typography>
        </Paper>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Vision
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "inherit",
            }}
          >
            We envision a world where everyone has access to the support and
            resources they need to manage their mental health effectively. We're
            committed to breaking down stigmas around mental health and creating
            a community where people feel safe, understood, and empowered on
            their journey toward emotional well-being.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
