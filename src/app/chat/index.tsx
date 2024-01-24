import Header from "Airways_Common/components/header";
import { FC } from "react";
import ChatRoutes from "./chat.routes";


const ChatPage: FC = () => {
  return (
    <><Header pages={['chatList', 'chatList/chat']} isAdmin={false} />
      <ChatRoutes />
    </>
  );
};

export default ChatPage;
