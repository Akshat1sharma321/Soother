import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  getUserLocation,
  reverseGeocode,
  fetchNearbySupport,
  SupportPlace,
} from "../../services/supportService";

type SearchStatus = "idle" | "searching" | "done" | "error";

const NearbySupport: React.FC = () => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [places, setPlaces] = useState<SupportPlace[]>([]);
  const [city, setCity] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    setStatus("searching");
    setErrorMessage("");
    try {
      const location = await getUserLocation();
      // City name and nearby places are independent — fetch them together.
      const [cityName, nearby] = await Promise.all([
        reverseGeocode(location.lat, location.lon),
        fetchNearbySupport(location.lat, location.lon),
      ]);
      setCity(cityName);
      setPlaces(nearby);
      setStatus("done");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while searching. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Find Support Near You
      </Typography>
      <Typography variant="body1" paragraph>
        Discover real counselling centres, social support facilities, and
        community centres close to you, powered by OpenStreetMap. Your location
        is only used for this search and is never stored.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={
          status === "searching" ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <MyLocationIcon />
          )
        }
        onClick={handleSearch}
        disabled={status === "searching"}
        sx={{ mb: 4 }}
      >
        {status === "searching" ? "Searching..." : "Use My Location"}
      </Button>

      {status === "error" && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          {errorMessage}
        </Alert>
      )}

      {status === "done" && (
        <>
          <Typography variant="h6" gutterBottom>
            {places.length > 0
              ? `Support options within 10 km${city ? ` of ${city}` : ""}:`
              : `No listed support facilities found within 10 km${
                  city ? ` of ${city}` : ""
                }.`}
          </Typography>
          {places.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              OpenStreetMap coverage varies by area. The online communities
              below are always available, and helplines like Tele-MANAS (14416
              in India) work from anywhere.
            </Alert>
          )}
          <Grid container spacing={3}>
            {places.map((place) => (
              <Grid item xs={12} sm={6} md={4} key={place.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {place.name}
                    </Typography>
                    <Chip
                      label={place.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1.5 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {place.distanceKm.toFixed(1)} km away
                    </Typography>
                    {place.address && (
                      <Typography variant="body2" color="text.secondary">
                        {place.address}
                      </Typography>
                    )}
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      startIcon={<DirectionsIcon />}
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Directions
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          {places.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Listings come from community-maintained OpenStreetMap data —
                please verify services and hours before visiting.
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default NearbySupport;
