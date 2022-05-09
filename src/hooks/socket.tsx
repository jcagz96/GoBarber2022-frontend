import React, { createContext, useCallback, useState, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextData {
  socket: Socket;
  connectSocket(): void;
  disconnectSocket(): void;
  reconnectSocket(): void;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(
    io(`${process.env.REACT_APP_URL}`, {
      transports: ['websocket'],
    }),
  );

  const reconnectSocket = useCallback(() => {
    setSocket(
      io(`${process.env.REACT_APP_URL}`, {
        transports: ['websocket'],
      }),
    );
  }, [socket]);

  const connectSocket = useCallback(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
  }, [socket]);

  const disconnectSocket = useCallback(() => {
    socket.close();
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, connectSocket, disconnectSocket, reconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): SocketContextData {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within an SocketProvider');
  }
  return context;
}
