import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import db from '../../configs/firebase-config';
import { ROLES_NAME, ROUTES } from '../../configs/constants';

const ChatCard = () => {
  const { currentUser  } = useSelector((state) => state.user);
  const currentUserId = currentUser?.id;
  const nav = useNavigate();
  const [count, setCount] = React.useState(0);

  const isEmployer = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.EMPLOYER;
  }, [currentUser]);

  React.useEffect(() => {
    if (!db || !currentUserId) {
      return undefined;
    }

    const chatRoomCollectionRef = collection(db, 'chatRooms');
    const q = query(
      where('recipientId', '==', `${currentUserId}`),
      where('unreadCount', '>', 0)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        
        const documentData = doc.data();
        const unreadCount = documentData.unreadCount || 0;

        total += unreadCount;
      });

      setCount(total);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  if (!currentUserId) {
    return null;
  }

  const handleRedirect = () => {
    if (isEmployer) {
      nav(`/${ROUTES.EMPLOYER.CHAT}`);
    } else {
      nav(`/${ROUTES.JOB_SEEKER.CHAT}`);
    }
  };

  return (
    <IconButton
      onClick={handleRedirect}
      size="large"
      aria-label="show new notifications"
      color="inherit"
    >
      <Badge badgeContent={count} color="error">
        <ForumIcon />
      </Badge>
    </IconButton>
  );
};

export default ChatCard;
