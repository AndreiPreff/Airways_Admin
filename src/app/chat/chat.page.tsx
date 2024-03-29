import {
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { fetchHistory } from "./store/chat.actions";
import {
  selectChatMessages,
  userProfileSelector,
} from "./store/chat.selectors";

interface Message {
  senderId: string;
  content: string;
}

const Chat: React.FC = () => {
  const messages1 = useSelector(selectChatMessages);
  const user = useSelector(userProfileSelector);
  const [messages, setMessages] = useState<Message[]>(messages1 || []);
  const [newMessage, setNewMessage] = useState("");
  const room = useParams<{ roomId: string }>();
  const roomId = room.roomId as string;
  const userId = user?.id;
  const socket = io("http://localhost:5001", {
    transports: ["websocket"],
    query: {
      userId: roomId,
      isManager: true,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchHistory(roomId));
  }, [roomId, dispatch, user]);

  useEffect(() => {
    socket.on(
      "message",
      ({ senderId, content }: { senderId: string; content: string }) => {
        setMessages((prevMessages) => [...prevMessages, { senderId, content }]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const listRef = useRef<HTMLUListElement>(null);

  const handleSendMessage = () => {
    socket.emit("message", {
      senderId: userId,
      content: newMessage,
      roomId: roomId,
    });
    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (listRef.current && listRef.current.lastElementChild) {
      listRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        CHAT
      </Typography>

      <Paper
        style={{
          height: 500,
          width: 400,
          overflowY: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        elevation={3}
      >
        <List ref={listRef} style={{ width: "100%" }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              style={{
                marginBottom: 2,
                alignSelf:
                  message.senderId === userId ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              <Paper style={{ width: "100%", padding: "10px" }}>
                <Typography
                  style={{
                    textAlign: message.senderId === userId ? "right" : "left",
                    color: message.senderId === userId ? "blue" : "green",
                  }}
                >
                  {message.senderId === userId ? "You:" : "User:"}{" "}
                  {message.content}
                </Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      <TextField
        style={{ width: "400px", marginTop: "10px" }}
        fullWidth
        variant="outlined"
        label="Enter your message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button
        style={{ width: "400px", marginTop: "10px", padding: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Container>
  );
};

export default Chat;
