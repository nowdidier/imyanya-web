import {
  collection,
  setDoc,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from 'firebase/firestore';
import db, { serverTimestamp } from '../configs/firebase-config';

const requireDb = () => {
  if (!db) {
    throw new Error(
      'Firebase is not configured (missing REACT_APP_FIREBASE_* env vars at build time).'
    );
  }
  return db;
};

export const addDocument = async (collectionName, data) => {
  const firestore = requireDb();
  const collectionRef = collection(firestore, collectionName);

  const docRef = await addDoc(collectionRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const updateChatRoomByPartnerId = async (partnerId, chatRoomId) => {
  if (!partnerId || !chatRoomId) {
    return false;
  }

  const chatRoomDocRef = doc(requireDb(), 'chatRooms', `${chatRoomId}`);

  try {
    await updateDoc(chatRoomDocRef, {
      recipientId: `${partnerId}`,
      unreadCount: increment(1),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const checkExists = async (collectionName, docId) => {
  const documentRef = doc(requireDb(), collectionName, `${docId}`);

  const documentSnapshot = await getDoc(documentRef);

  return documentSnapshot.exists();
};

export const createUser = async (collectionName, userData, userId) => {
  try {
    const userRef = doc(requireDb(), collectionName, `${userId}`);

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const checkChatRoomExists = async (collectionName, member1, member2) => {
  const chatRoomsRef = collection(requireDb(), collectionName);

  const q = query(
    chatRoomsRef,
    where('membersString', 'array-contains', `${member1}-${member2}`)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const roomId = querySnapshot.docs[0].id;
    return roomId;
  }

  return null;
};

export const getChatRoomById = async (chatRoomId, currentUserId) => {
  const chatRoomRef = doc(requireDb(), 'chatRooms', `${chatRoomId}`);
  const docSnap = await getDoc(chatRoomRef);

  if (docSnap.exists()) {
    let partnerId = '';
    const chatRoomData = docSnap.data();

    if (chatRoomData?.members[0] === `${currentUserId}`) {
      partnerId = chatRoomData?.members[1];
    } else {
      partnerId = chatRoomData?.members[0];
    }

    const userAccount = await getUserAccount('accounts', `${partnerId}`);
    return {
      ...chatRoomData,
      id: docSnap.id,
      user: userAccount,
    };
  } else {
    return {};
  }
};

export const getUserAccount = async (collectionName, userId) => {
  const userRef = doc(requireDb(), collectionName, `${userId}`);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// create keywords for displayName, used for search
export const generateKeywords = (displayName) => {
  // list all permutations. Example: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * initialize the flag array with false values
   * mark whether the value
   * at this position has been used
   * yet
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] =true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
