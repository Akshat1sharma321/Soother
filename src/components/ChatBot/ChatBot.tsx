import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  useTheme,
  Chip,
  Collapse,
  Grow,
  Tooltip,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FaceIcon from "@mui/icons-material/Face";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const moodSwingResponses = {
  greetings: [
    "Hello! I'm here to support you during difficult moments. How are you feeling today?",
    "Hi there! I'm your mood companion. What's on your mind?",
    "Welcome to Soother. I'm here to chat whenever you need support.",
  ],

  sad: [
    "I'm sorry you're feeling down. Remember that it's okay to not be okay sometimes. Would you like some music suggestions to help lift your mood?",
    "When we feel sad, it can help to practice gentle self-compassion. Would you like to try a short breathing exercise?",
    "Sadness is a natural emotion. Sometimes it helps to express what you're feeling - would you like to tell me more about what's going on?",
  ],

  anxious: [
    "Feeling anxious is challenging. Let's take a deep breath together. In through your nose for 4 counts, hold for 4, and out through your mouth for 6.",
    "Anxiety can feel overwhelming. Grounding exercises can help - try noticing 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "When anxiety rises, remember it's temporary. Would you like to explore some calming techniques?",
  ],

  angry: [
    "It's normal to feel angry sometimes. Taking a moment to pause before reacting can be helpful. Would you like some suggestions for channeling that energy?",
    "Anger often masks other emotions like hurt or fear. When you're ready, it might help to explore what's beneath that feeling.",
    "When feeling angry, physical movement can help release tension. Even a short walk or stretching can make a difference.",
  ],

  overwhelmed: [
    "When everything feels too much, breaking tasks down into smaller steps can help. What's one small thing you could focus on right now?",
    "Feeling overwhelmed is a sign to slow down. Could you give yourself permission to take a break?",
    "It's okay to feel overwhelmed. Sometimes writing down what's on your mind can help clear mental space. Would you like to try that?",
  ],

  tired: [
    "Feeling tired can affect our mood significantly. Is there a way you could give yourself some extra rest today?",
    "Sometimes our bodies need extra care. Gentle movement, hydration, and nutrition can help with fatigue. Have you taken care of these basics today?",
    "Rest is essential for our well-being. Could you give yourself permission to rest without guilt?",
  ],

  positive: [
    "It's wonderful that you're feeling good! Noticing and savoring positive moments helps strengthen them.",
    "That's great to hear! What's something you're looking forward to or enjoying today?",
    "Positive moments are worth celebrating. Is there a way you could extend this good feeling?",
  ],

  default: [
    "I'm here to listen and support you. Would you like to explore some resources that might help?",
    "Thank you for sharing. Sometimes just expressing our feelings can help. Is there something specific you'd like support with?",
    "I appreciate you opening up. Would you like to try some mood-lifting activities?",
  ],

  confused: [
    "I'm not sure I understand. Could you tell me more about how you're feeling?",
    "I want to help, but I'm having trouble understanding. Could you rephrase that?",
    "I apologize, but I'm not sure how to respond to that. Would you like to explore some mood support resources instead?",
  ],

  help: [
    "I'm here to provide support during mood changes. You can tell me how you're feeling, ask for music or meditation recommendations, or just chat. What would help you right now?",
    "I can offer supportive responses, suggest coping strategies, or direct you to resources. What are you looking for today?",
    "You can ask me about managing mood swings, coping with difficult emotions, or finding ways to lift your spirits. How can I help you specifically?",
  ],

  resources: [
    "For immediate support, the Crisis Text Line (text HOME to 741741) is available 24/7. The National Suicide Prevention Lifeline (1-800-273-8255) is also always available.",
    "The Soother app offers meditation exercises, calming music playlists, and mood-lifting memes that might help right now.",
    "Sometimes professional support is helpful. Would you like information about finding a therapist or counselor?",
  ],
};

// Helper function to determine response category based on user input
const getCategoryFromInput = (
  input: string
): keyof typeof moodSwingResponses => {
  input = input.toLowerCase();

  if (
    input.includes("hello") ||
    input.includes("hi") ||
    input.includes("hey")
  ) {
    return "greetings";
  } else if (
    input.includes("sad") ||
    input.includes("down") ||
    input.includes("unhappy") ||
    input.includes("depressed")
  ) {
    return "sad";
  } else if (
    input.includes("anxious") ||
    input.includes("nervous") ||
    input.includes("worry") ||
    input.includes("stress")
  ) {
    return "anxious";
  } else if (
    input.includes("angry") ||
    input.includes("mad") ||
    input.includes("frustrated")
  ) {
    return "angry";
  } else if (
    input.includes("overwhelm") ||
    input.includes("too much") ||
    input.includes("can't handle")
  ) {
    return "overwhelmed";
  } else if (
    input.includes("tired") ||
    input.includes("exhausted") ||
    input.includes("fatigue") ||
    input.includes("no energy")
  ) {
    return "tired";
  } else if (
    input.includes("happy") ||
    input.includes("good") ||
    input.includes("great") ||
    input.includes("better")
  ) {
    return "positive";
  } else if (
    input.includes("help") ||
    input.includes("what can you do") ||
    input.includes("how do you work")
  ) {
    return "help";
  } else if (
    input.includes("resource") ||
    input.includes("crisis") ||
    input.includes("emergency") ||
    input.includes("suicide") ||
    input.includes("therapist")
  ) {
    return "resources";
  } else if (input.length < 5 || input.split(" ").length < 2) {
    return "confused";
  } else {
    return "default";
  }
};

// Get a random response from the appropriate category
const getResponse = (category: keyof typeof moodSwingResponses): string => {
  const responses = moodSwingResponses[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

const quickSuggestions = [
  "I'm feeling sad",
  "I'm anxious today",
  "I feel overwhelmed",
  "I need help",
  "How can you help me?",
  "I'm feeling better",
];

const ChatBot: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm Soother's mood support bot. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Show bot is typing
    setIsTyping(true);

    // Determine response category
    const category = getCategoryFromInput(inputValue);

    // Simulate bot typing with random delay between 1-2 seconds
    setTimeout(() => {
      const botMessage: Message = {
        text: getResponse(category),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    // Focus on input after selecting suggestion
    const inputElement = document.getElementById(
      "chat-input"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Chat history cleared. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(66, 66, 66, 0.3)"
            : "rgba(255, 255, 255, 0.9)",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(103, 58, 183, 0.1)"
              : "rgba(103, 58, 183, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 36,
              height: 36,
              mr: 1,
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
          <Typography variant="h6">Mood Support Bot</Typography>
        </Box>
        <Tooltip title="Clear chat history">
          <IconButton onClick={clearChat} size="small">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          p: 2,
          overflowY: "auto",
          flexGrow: 1,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(18, 18, 18, 0.4)"
              : "rgba(248, 248, 255, 0.7)",
        }}
      >
        <List sx={{ width: "100%" }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: "column",
                alignItems:
                  message.sender === "user" ? "flex-end" : "flex-start",
                p: 0,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  maxWidth: "80%",
                }}
              >
                {message.sender === "bot" && (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      width: 32,
                      height: 32,
                      mr: 1,
                      mt: 0.5,
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor:
                      message.sender === "user"
                        ? theme.palette.mode === "dark"
                          ? "rgba(103, 58, 183, 0.2)"
                          : "rgba(103, 58, 183, 0.1)"
                        : theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.9)",
                    color:
                      message.sender === "user"
                        ? theme.palette.mode === "dark"
                          ? theme.palette.primary.light
                          : theme.palette.primary.dark
                        : "inherit",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      mt: 0.5,
                      display: "block",
                      textAlign: "right",
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Paper>
                {message.sender === "user" && (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 32,
                      height: 32,
                      ml: 1,
                      mt: 0.5,
                    }}
                  >
                    <FaceIcon fontSize="small" />
                  </Avatar>
                )}
              </Box>
            </ListItem>
          ))}
          {isTyping && (
            <ListItem
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                p: 0,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                >
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <Typography variant="body2">
                    <span className="typing-animation">Typing</span>
                  </Typography>
                </Paper>
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
            Try these suggestions:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {quickSuggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                size="small"
                onClick={() => handleQuickSuggestion(suggestion)}
                sx={{
                  cursor: "pointer",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(103, 58, 183, 0.15)"
                      : "rgba(103, 58, 183, 0.1)",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(103, 58, 183, 0.3)"
                        : "rgba(103, 58, 183, 0.2)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="chat-input"
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      <style>{`
        @keyframes typing {
          0% { content: ""; }
          25% { content: "."; }
          50% { content: ".."; }
          75% { content: "..."; }
        }
        
        .typing-animation::after {
          content: "";
          animation: typing 1.5s infinite;
        }
      `}</style>
    </Paper>
  );
};

export default ChatBot;
