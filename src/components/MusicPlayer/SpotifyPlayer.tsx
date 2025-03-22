import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface SpotifyPlayerProps {
  playlistId: string;
  title: string;
  description?: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistId,
  title,
  description,
}) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        <iframe
          title={`spotify-playlist-${playlistId}`}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: "12px" }}
        />
      </Box>
    </Paper>
  );
};

export default SpotifyPlayer;
