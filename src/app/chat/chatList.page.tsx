import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

interface Chat {
  roomId: string;
  status: string;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  "&.active": {
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
}));

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const socket = io("http://localhost:5001");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();

    socket.on("chatActivated", async (data) => {
      await fetchChats();
    });

    socket.on("chatDeactivated", async (data) => {
      await fetchChats();
    });

    return () => {
      socket.off("chatActivated");
      socket.off("chatDeactivated");
    };
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/chat`);
      const chatData = response.data;

      const chatsArray: Chat[] = Object.keys(chatData).map((roomId) => ({
        roomId,
        status: chatData[roomId],
      }));

      chatsArray.sort((a, b) =>
        a.status === "active" ? -1 : b.status === "active" ? 1 : 0
      );

      setChats(chatsArray);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  const handleChatButtonClick = (roomId: string) => {
    navigate(`/chats/chat/${roomId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Room ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chats.map((chat) => (
            <StyledTableRow
              key={chat.roomId}
              className={chat.status === "active" ? "active" : ""}
            >
              <TableCell>{chat.roomId}</TableCell>
              <TableCell>{chat.status}</TableCell>
              <TableCell>
                <StyledButton
                  onClick={() => handleChatButtonClick(chat.roomId)}
                  className={chat.status === "active" ? "active" : ""}
                >
                  Open Chat
                </StyledButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChatList;
