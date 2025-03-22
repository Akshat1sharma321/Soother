import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Slider,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type BreathState = "inhale" | "hold1" | "exhale" | "hold2" | "idle";

interface BreathingExerciseProps {
  defaultInhaleTime?: number;
  defaultHoldTime?: number;
  defaultExhaleTime?: number;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  defaultInhaleTime = 4,
  defaultHoldTime = 7,
  defaultExhaleTime = 8,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);

  const [inhaleTime, setInhaleTime] = useState(defaultInhaleTime);
  const [holdTime, setHoldTime] = useState(defaultHoldTime);
  const [exhaleTime, setExhaleTime] = useState(defaultExhaleTime);

  const [message, setMessage] = useState("Press play to start");
  const [scale, setScale] = useState(1);

  const timerRef = useRef<number | null>(null);
  const totalCycleTime = inhaleTime + holdTime + exhaleTime + holdTime;

  const theme = useTheme();

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;

          // Calculate current position in breathing cycle
          const cyclePosition = newSeconds % totalCycleTime;

          // Update current cycle count
          const newCycle = Math.floor(newSeconds / totalCycleTime) + 1;
          if (newCycle !== currentCycle) {
            setCurrentCycle(newCycle);
          }

          // Determine breath state based on cycle position
          if (cyclePosition < inhaleTime) {
            if (breathState !== "inhale") {
              setBreathState("inhale");
              setMessage("Breathe in...");
              setScale(1.5); // Expand
            }
          } else if (cyclePosition < inhaleTime + holdTime) {
            if (breathState !== "hold1") {
              setBreathState("hold1");
              setMessage("Hold...");
            }
          } else if (cyclePosition < inhaleTime + holdTime + exhaleTime) {
            if (breathState !== "exhale") {
              setBreathState("exhale");
              setMessage("Breathe out...");
              setScale(1); // Contract
            }
          } else {
            if (breathState !== "hold2") {
              setBreathState("hold2");
              setMessage("Hold...");
            }
          }

          return newSeconds;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isActive,
    inhaleTime,
    holdTime,
    exhaleTime,
    totalCycleTime,
    breathState,
    currentCycle,
  ]);

  const toggleTimer = () => {
    if (!isActive) {
      setSeconds(0);
      setCurrentCycle(1);
      setBreathState("inhale");
      setMessage("Breathe in...");
      setScale(1.5);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setCurrentCycle(0);
    setBreathState("idle");
    setMessage("Press play to start");
    setScale(1);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}
    >
      <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
        Breathing Exercise
      </Typography>

      {/* Circle animation */}
      <Box className="breathing-container" sx={{ my: 4 }}>
        <Box
          className="breathe-circle"
          sx={{
            transform: `scale(${scale})`,
            boxShadow: `0 0 50px ${
              theme.palette.mode === "dark"
                ? "rgba(106, 90, 205, 0.3)"
                : "rgba(106, 90, 205, 0.5)"
            }`,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              color: "white",
              p: 2,
            }}
          >
            {message}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, color: "text.secondary" }}>
          Time: {formatTime(seconds)} | Cycle: {currentCycle}/
          {totalCycles > 0 ? totalCycles : "∞"}
        </Typography>
      </Box>

      {/* Controls */}
      <Box sx={{ my: 4 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={toggleTimer}
            startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
            size="large"
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            variant="outlined"
            onClick={resetTimer}
            startIcon={<RestartAltIcon />}
            size="large"
          >
            Reset
          </Button>
        </Stack>

        {!isActive && (
          <Box sx={{ px: 3 }}>
            <Typography gutterBottom>
              Inhale Duration: {inhaleTime} seconds
            </Typography>
            <Slider
              value={inhaleTime}
              min={2}
              max={10}
              step={1}
              onChange={(_, value) => setInhaleTime(value as number)}
              valueLabelDisplay="auto"
              disabled={isActive}
            />

            <Typography gutterBottom sx={{ mt: 2 }}>
              Hold Duration: {holdTime} seconds
            </Typography>
            <Slider
              value={holdTime}
              min={0}
              max={10}
              step={1}
              onChange={(_, value) => setHoldTime(value as number)}
              valueLabelDisplay="auto"
              disabled={isActive}
            />

            <Typography gutterBottom sx={{ mt: 2 }}>
              Exhale Duration: {exhaleTime} seconds
            </Typography>
            <Slider
              value={exhaleTime}
              min={2}
              max={12}
              step={1}
              onChange={(_, value) => setExhaleTime(value as number)}
              valueLabelDisplay="auto"
              disabled={isActive}
            />

            <Typography gutterBottom sx={{ mt: 2 }}>
              Number of Cycles (0 for infinite):
            </Typography>
            <Slider
              value={totalCycles}
              min={0}
              max={20}
              step={1}
              onChange={(_, value) => setTotalCycles(value as number)}
              valueLabelDisplay="auto"
              disabled={isActive}
              marks={[
                { value: 0, label: "∞" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
              ]}
            />
          </Box>
        )}
      </Box>

      {/* Technique info */}
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 3 }}
      >
        This breathing exercise uses the 4-7-8 technique (or your custom
        settings). It can help reduce anxiety, manage stress, and help you relax
        during difficult times.
      </Typography>
    </Paper>
  );
};

export default BreathingExercise;
