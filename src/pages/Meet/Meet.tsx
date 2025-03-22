import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  Stack,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ForumIcon from "@mui/icons-material/Forum";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { styled } from "@mui/material/styles";

const supportGroups = [
  {
    id: 1,
    title: "Mood Support Circle",
    description:
      "A safe space to talk about feelings of sadness and find support from others who understand.",
    members: 128,
    lastActive: "2 hours ago",
    tags: ["support", "depression", "anxiety"],
  },
  {
    id: 2,
    title: "Mindfulness Together",
    description:
      "Practice mindfulness meditation with others and share your experiences and techniques.",
    members: 95,
    lastActive: "1 day ago",
    tags: ["mindfulness", "meditation", "peace"],
  },
  {
    id: 3,
    title: "Creative Healing",
    description:
      "Express yourself through art, writing, and music as a way to process emotions and heal.",
    members: 73,
    lastActive: "5 hours ago",
    tags: ["creativity", "expression", "healing"],
  },
  {
    id: 4,
    title: "Period & Mood Support",
    description:
      "A community focused on dealing with mood changes related to menstrual cycles and supporting each other.",
    members: 247,
    lastActive: "12 minutes ago",
    tags: ["periods", "pms", "mood-swings", "support"],
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Support Group Meeting",
    date: "May 15, 2023 • 7:00 PM",
    attendees: 18,
    description:
      "Join our bi-weekly support group session where we discuss coping strategies and share experiences.",
  },
  {
    id: 2,
    title: "Mood-Lifting Meditation Session",
    date: "May 18, 2023 • 6:30 PM",
    attendees: 25,
    description:
      "A guided meditation session specifically designed to help lift your mood and reduce anxiety.",
  },
  {
    id: 3,
    title: "Guest Speaker: Managing Depression Naturally",
    date: "May 23, 2023 • 5:00 PM",
    attendees: 42,
    description:
      "Dr. Sarah Johnson will discuss natural approaches to managing depression alongside traditional treatments.",
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
  borderRadius: theme.shape.borderRadius * 2,
}));

const Meet: React.FC = () => {
  const theme = useTheme();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [supportType, setSupportType] = useState("");

  const handleTopicChange = (event: SelectChangeEvent) => {
    setTopic(event.target.value as string);
  };

  const handleSupportTypeChange = (event: SelectChangeEvent) => {
    setSupportType(event.target.value as string);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    // This would typically connect to a backend service
    alert("Feature coming soon! Your message has been recorded.");
    setMessage("");
  };

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
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
            <PeopleIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
            Meet & Connect
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="white"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Connect with others who understand what you&apos;re going through.
            You&apos;re not alone in your journey to better mental health.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            <GroupsIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Support Groups
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join a support group to connect with others who understand what
            you&apos;re experiencing. Share your journey, learn from others, and
            find comfort in community.
          </Typography>

          <Grid container spacing={4}>
            {supportGroups.map((group) => (
              <Grid item xs={12} md={6} key={group.id}>
                <StyledCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {group.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {group.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="body2">
                        <strong>{group.members}</strong> members
                      </Typography>
                      <Typography variant="body2">
                        Active: {group.lastActive}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", gap: 1 }}
                    >
                      {group.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ textTransform: "capitalize" }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<ForumIcon />}
                    >
                      Join Group
                    </Button>
                  </Box>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" size="large">
              See All Support Groups
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            <DateRangeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Upcoming Events
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Participate in virtual events designed to provide support,
            education, and connection. All events are free and open to anyone
            seeking help or understanding.
          </Typography>

          <Grid container spacing={4}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} md={4} key={event.id}>
                <StyledCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ mb: 2, fontWeight: "medium" }}
                    >
                      {event.date}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.attendees} people attending
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button variant="outlined" fullWidth>
                      RSVP
                    </Button>
                  </Box>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" size="large">
              View All Events
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                <ChatIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Get Support Now
              </Typography>
              <Typography variant="body1" paragraph>
                Need to talk to someone right away? Fill out this form, and one
                of our community support volunteers will reach out to you as
                soon as possible.
              </Typography>

              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="topic-label">
                      What&apos;s on your mind?
                    </InputLabel>
                    <Select
                      labelId="topic-label"
                      id="topic-select"
                      value={topic}
                      label="What's on your mind?"
                      onChange={handleTopicChange}
                    >
                      <MenuItem value="depression">Feeling depressed</MenuItem>
                      <MenuItem value="anxiety">Anxiety</MenuItem>
                      <MenuItem value="periods">
                        Period-related mood changes
                      </MenuItem>
                      <MenuItem value="loneliness">Loneliness</MenuItem>
                      <MenuItem value="stress">Stress</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="support-type-label">
                      Type of support needed
                    </InputLabel>
                    <Select
                      labelId="support-type-label"
                      id="support-type-select"
                      value={supportType}
                      label="Type of support needed"
                      onChange={handleSupportTypeChange}
                    >
                      <MenuItem value="talk">Just need to talk</MenuItem>
                      <MenuItem value="advice">Seeking advice</MenuItem>
                      <MenuItem value="resources">
                        Looking for resources
                      </MenuItem>
                      <MenuItem value="emergency">Urgent support</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    id="message"
                    label="Your message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={!topic || !supportType || !message}
                  >
                    Request Support
                  </Button>
                </form>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                <VolunteerActivismIcon
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Become a Volunteer
              </Typography>
              <Typography variant="body1" paragraph>
                Your experiences and compassion can help others who are going
                through similar challenges. Consider becoming a community
                support volunteer.
              </Typography>

              <Card sx={{ mb: 4, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Why Volunteer?
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Helping others can be a rewarding experience that benefits
                    your own mental health while making a difference in someone
                    else&apos;s life.
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Share your experiences and provide hope to others
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Develop supportive relationships and build community
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Learn new skills and gain valuable experience
                    </Typography>
                    <Typography component="li" variant="body2">
                      Make a meaningful difference in someone&apos;s life
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Apply to Volunteer
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "#e3f2fd",
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Remember, You&apos;re Not Alone
          </Typography>
          <Typography variant="body1">
            Millions of people experience mood changes and depression,
            especially related to their periods. Reaching out for support is a
            sign of strength, not weakness. Our community is here for you
            whenever you need us.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Meet;
