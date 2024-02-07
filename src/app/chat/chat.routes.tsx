import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const ChatListPage = React.lazy(() => import('app/chat/chatList.page'));
const ChatPage = React.lazy(() => import('app/chat/chat.page'));

const ChatRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/chatList" element={<Suspended element={ChatListPage} />} />
      <Route path="/chat/:roomId" element={<Suspended element={ChatPage} />} />
      

    </Routes>
  );
};

export default ChatRoutes;
