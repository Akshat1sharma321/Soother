import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import styled from "@emotion/styled";
import { memeImages } from "../../pages/Memes/meme-images";
import { useTheme } from "@mui/material/styles";

interface MemeCardProps {
  title: string;
  imageUrl: string;
  altText: string;
  description?: string;
}

const ExpandMore = styled(IconButton)<{ expand: boolean }>(
  ({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: "transform 0.3s",
  })
);

// Fallback image URL - guaranteed to work
const FALLBACK_IMAGE = memeImages.fallback;

const MemeCard: React.FC<MemeCardProps> = ({
  title,
  imageUrl,
  altText,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleImageError = () => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImageError(true);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mb: 4,
        borderRadius: 3,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 20px rgba(255, 255, 255, 0.1)"
              : 4,
        },
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="auto"
          image={imageError ? FALLBACK_IMAGE : imageUrl}
          alt={altText}
          loading="lazy"
          onError={handleImageError}
          sx={{
            borderRadius: "12px 12px 0 0",
            maxHeight: 500,
            minHeight: 200,
          }}
        />
        {imageError && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#666",
              textAlign: "center",
              width: "100%",
            }}
          >
            <ImageIcon sx={{ fontSize: 40 }} />
            <Typography variant="caption" display="block">
              Original image failed to load
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {description && !expanded && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {description}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikeClick}
          color={liked ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {description && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>

      {description && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default MemeCard;
