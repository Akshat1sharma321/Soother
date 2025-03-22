import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Soother",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/about" },
        { name: "Privacy Policy", path: "/about" },
      ],
    },
    {
      title: "Features",
      links: [
        { name: "Music", path: "/music" },
        { name: "Meditation", path: "/meditation" },
        { name: "Memes", path: "/memes" },
        { name: "Community", path: "/meet" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", path: "/about" },
        { name: "Mental Health Resources", path: "/about" },
        { name: "Crisis Support", path: "/about" },
        { name: "Feedback", path: "/about" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com" },
    { icon: <TwitterIcon />, url: "https://twitter.com" },
    { icon: <InstagramIcon />, url: "https://instagram.com" },
    { icon: <LinkedInIcon />, url: "https://linkedin.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(66, 66, 66, 0.5)"
            : "rgba(230, 230, 250, 0.3)",
        py: 6,
        borderTop: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.05)"
        }`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} key={section.title}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                  fontWeight: "medium",
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, listStyle: "none" }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <MuiLink
                      component={Link}
                      to={link.path}
                      underline="hover"
                      color="inherit"
                      sx={{
                        transition: "all 0.2s",
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {link.name}
                    </MuiLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, opacity: 0.2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Soother. Made with{" "}
              <FavoriteIcon
                fontSize="small"
                sx={{
                  color: theme.palette.secondary.main,
                  verticalAlign: "middle",
                  fontSize: "1rem",
                }}
              />{" "}
              for your well-being.
            </Typography>
          </Box>

          <Box>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our social media ${index + 1}`}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  transition: "color 0.2s",
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
