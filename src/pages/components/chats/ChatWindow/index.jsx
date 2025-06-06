import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import db from '../../../../configs/firebase-config';
import { ChatContext } from '../../../../context/ChatProvider';
import Message from '../Message';
import { ROLES_NAME } from '../../../../configs/constants';
import {
  addDocument,
  getChatRoomById,
  updateChatRoomByPartnerId,
} from '../../../../services/firebaseService';
import ChatInfo from '../../../../components/chats/ChatInfo';
import { Empty } from 'antd';

const LIMIT = 20;
const messageCollectionRef = collection(db, 'messages');

const ChatWindow = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentUserChat, selectedRoomId } = React.useContext(ChatContext);
  const inputRef = React.useRef(null);
  const messageListRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [partnerId, setPartnerId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  // cap nhat unreadCount
  React.useEffect(() => {
    if (selectedRoomId && currentUserChat) {
      const chatRoomDocRef = doc(db, 'chatRooms', `${selectedRoomId}`);

      const unsub = onSnapshot(chatRoomDocRef, (doc) => {
        const { recipientId, unreadCount } = doc.data();

        if (recipientId === `${currentUserChat.userId}` && unreadCount > 0) {
          updateDoc(chatRoomDocRef, {
            unreadCount: 0,
          })
            .then(() => {
              console.log('update chatRoom success -> unreadCount=0');
            })
            .catch((error) => {
              console.log(
                'update chatRoom failed: -> unreadCount: Notchange',
                error
              );
            });
        }
      });

      return () => unsub();
    }
  }, [currentUserChat, selectedRoomId]);

  // lay thong tin partner
  React.useEffect(() => {
    const getChatRoom = async (selectedRoomId, userId) => {
      const selectRoom = await getChatRoomById(selectedRoomId, userId);

      setSelectedRoom(selectRoom);
      setPartnerId(selectRoom?.user?.userId);
    };
    if (selectedRoomId && currentUserChat) {
      getChatRoom(selectedRoomId, currentUserChat.userId);
    }
  }, [selectedRoomId, currentUserChat]);

  // lang nghe tong message
  React.useEffect(() => {
    if (selectedRoomId) {
      const q = query(
        messageCollectionRef,
        where('roomId', '==', `${selectedRoomId}`)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        setCount(querySnapshot?.size || 0);
      });

      return () => {
        unsubscribe();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  // danh sach messages
  React.useEffect(() => {
    setIsLoading(true);

    let q = query(
      messageCollectionRef,
      where('roomId', '==', `${selectedRoomId}`),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      setMessages(messagesData);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    });

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId]);

  // tai them du lieu
  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const q = query(
          messageCollectionRef,
          where('roomId', '==', `${selectedRoomId}`),
          orderBy('createdAt', 'desc'),
          startAfter(lastDocument),
          limit(LIMIT)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        const messagesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages([...messages, ...messagesData]);
      }
    };

    if (Math.ceil(count / LIMIT) > page) {
      setPage(page + 1);
      getMoreData();
    } else {
      setHasMore(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      // them message
      addDocument('messages', {
        text: inputValue,
        userId: `${currentUserChat?.userId}`,
        roomId: selectedRoomId,
      });

      // cap nhat chat room
      updateChatRoomByPartnerId(partnerId, selectedRoomId);

      setInputValue('');

      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleOnSubmit(event);
    }
  };

  React.useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      {selectedRoomId && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Stack>
            {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
              <ChatInfo.HeaderChatInfo
                avatarUrl={selectedRoom?.user?.avatarUrl}
                title={selectedRoom?.user?.name}
                subTitle={selectedRoom?.user?.company?.companyName}
              />
            ) : (
              <ChatInfo.HeaderChatInfo
                avatarUrl={selectedRoom?.user?.avatarUrl}
                title={selectedRoom?.user?.name}
                subTitle={selectedRoom?.user?.email}
              />
            )}
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          mt: selectedRoomId ? '72px' : 0, // Chiều cao của header chat
          mb: '80px', // Chiều cao của khung nhập tin nhắn
        }}
      >
        {selectedRoomId ? (
          <Stack sx={{ height: '100%' }}>
            <Box
              sx={{
                height: '100%',
                position: 'relative',
              }}
            >
              {isLoading ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CircularProgress color="primary" />
                </Stack>
              ) : messages.length === 0 ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  p={2}
                >
                  {currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                    <ChatInfo
                      avatarUrl={selectedRoom?.user?.avatarUrl}
                      title={selectedRoom?.user?.name}
                      subTitle={selectedRoom?.user?.company?.companyName}
                      description={
                        selectedRoom?.createdBy !== `${currentUserChat?.userId}`
                          ? `${selectedRoom?.user?.company?.companyName} đã kết nối với bạn.`
                          : `Bạn đã kết nối đến ${selectedRoom?.user?.company?.companyName}`
                      }
                    />
                  ) : (
                    <ChatInfo
                      avatarUrl={selectedRoom?.user?.avatarUrl}
                      title={selectedRoom?.user?.name}
                      subTitle={selectedRoom?.user?.email}
                      description={
                        selectedRoom?.createdBy !== `${currentUserChat?.userId}`
                          ? `${selectedRoom?.user?.name} đã kết nối với bạn.`
                          : `Bạn đã kết nối đến ${selectedRoom?.user?.name}`
                      }
                    />
                  )}
                </Stack>
              ) : (
                <div
                  ref={messageListRef}
                  id="scrollableDiv"
                  style={{
                    height: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    padding: '16px',
                  }}
                >
                  <InfiniteScroll
                    style={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                    }}
                    scrollableTarget="scrollableDiv"
                    dataLength={messages.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    inverse={true}
                    loader={
                      <Stack sx={{ py: 2 }} justifyContent="center">
                        <CircularProgress
                          color="primary"
                          size={30}
                          sx={{ margin: '0 auto' }}
                        />
                      </Stack>
                    }
                  >
                    {messages.map((value) => (
                      <Message
                        key={value.id}
                        userId={value?.userId}
                        text={value?.text}
                        avatarUrl={
                          `${currentUserChat?.userId}` === `${value?.userId}`
                            ? currentUserChat?.avatarUrl
                            : selectedRoom?.user?.avatarUrl
                        }
                        createdAt={value?.createdAt}
                      />
                    ))}
                  </InfiniteScroll>
                </div>
              )}
            </Box>
          </Stack>
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            height="100%"
            spacing={2}
            p={2}
          >
            <Empty
              description={
                <Typography color="text.secondary">
                  Bạn chưa chọn cuộc trò chuyện nào ...
                </Typography>
              }
            />
          </Stack>
        )}
      </Box>

      {selectedRoomId && (
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            zIndex: 10,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-end">
            <TextField
              inputRef={inputRef}
              fullWidth
              placeholder="Type your message here ..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              multiline
              maxRows={5}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  '&:hover': {
                    '& > fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              type="submit"
              sx={{
                height: 54,
                px: 3,
                background: (theme) => theme.palette.primary.gradient,
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default ChatWindow;
