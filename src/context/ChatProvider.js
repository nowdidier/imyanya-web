import React from 'react';
import { useSelector } from 'react-redux';

import { ROLES_NAME } from '../configs/constants';
import {
  checkExists,
  createUser,
  getUserAccount,
} from '../services/firebaseService';

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.id;
  const [selectedRoomId, setSelectedRoomId] = React.useState('');
  const [currentUserChat, setCurrentUserChat] = React.useState(null);

  React.useEffect(() => {
    let isActive = true;

    const createUserChat = async () => {
      if (!userId) {
        setCurrentUserChat(null);
        return;
      }

      const isExists = await checkExists('accounts', userId);

      if (!isExists) {
        const isJobSeeker = currentUser?.roleName === ROLES_NAME.JOB_SEEKER;
        const userData = isJobSeeker
          ? {
              userId,
              name: currentUser?.fullName,
              email: currentUser?.email,
              avatarUrl: currentUser?.avatarUrl,
              company: null,
            }
          : {
              userId,
              name: currentUser?.fullName,
              email: currentUser?.email,
              avatarUrl: currentUser?.company?.imageUrl,
              company: {
                companyId: currentUser?.company?.id,
                slug: currentUser?.company?.slug,
                companyName: currentUser?.company?.companyName,
                imageUrl: currentUser?.company?.imageUrl,
              },
            };

        const createResult = await createUser('accounts', userData, userId);
        if (!createResult) {
          throw new Error('Unable to create the chat profile.');
        }
      }

      const userChat = await getUserAccount('accounts', userId);
      if (isActive) {
        setCurrentUserChat(userChat);
      }
    };

    createUserChat().catch((error) => {
      if (isActive) {
        setCurrentUserChat(null);
      }
      console.error('Failed to load chat account:', error);
    });

    return () => {
      isActive = false;
    };
  }, [currentUser, userId]);

  return (
    <ChatContext.Provider
      value={{
        currentUserChat,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
