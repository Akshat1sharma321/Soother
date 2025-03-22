// I'm going to add dark mode styling to the SpotifyPlayer component

import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface SpotifyPlayerProps {
  playlistId: string;
  title: string;
  description: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistId,
  title,
  description,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 4,
        overflow: "hidden",
        borderRadius: 3,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 20px rgba(255, 255, 255, 0.1)"
              : 3,
        },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 200 },
          height: { xs: 200, sm: "auto" },
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(106, 90, 205, 0.2)"
              : "rgba(106, 90, 205, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          position: "relative",
        }}
      >
        <PlayArrowIcon
          sx={{
            fontSize: 60,
            color: theme.palette.primary.main,
            opacity: 0.8,
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>

        <Box
          sx={{
            pt: 2,
            height: 80,
            overflow: "hidden",
          }}
        >
          <iframe
            title={`Spotify playlist: ${title}`}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${
              theme.palette.mode === "dark" ? "1" : "0"
            }`}
            width="100%"
            height="80"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              borderRadius: "12px",
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default SpotifyPlayer;
