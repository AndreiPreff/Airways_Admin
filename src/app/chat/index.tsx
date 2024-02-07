import Header from "Airways_Common/components/header";
import { FC } from "react";
import ChatRoutes from "./chat.routes";


const ChatPage: FC = () => {
  return (
    <><Header  isAdmin={true} />
      <ChatRoutes />
    </>
  );
};

export default ChatPage;
