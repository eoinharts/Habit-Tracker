import { collection, addDoc, deleteDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

/**
 * Add a like to a habit
 * @param {string} habitId - ID of the habit being liked
 * @param {string} userId - ID of the user who owns the habit
 * @param {string} likedByUserId - ID of the user who is liking the habit
 */
export const addLike = async (habitId, userId, likedByUserId) => {
  try {
    const likesRef = collection(db, 'likes');
    await addDoc(likesRef, {
      habitId,
      userId,
      likedByUserId,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

/**
 * Remove a like from a habit
 * @param {string} habitId - ID of the habit
 * @param {string} likedByUserId - ID of the user who liked the habit
 */
export const removeLike = async (habitId, likedByUserId) => {
  try {
    const likesRef = collection(db, 'likes');
    const q = query(likesRef, 
      where('habitId', '==', habitId),
      where('likedByUserId', '==', likedByUserId)
    );
    
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error removing like:', error);
    throw error;
  }
};

/**
 * Check if a user has liked a habit
 * @param {string} habitId - ID of the habit
 * @param {string} userId - ID of the user
 * @returns {Promise<boolean>} - Whether the user has liked the habit
 */
export const checkIfLiked = async (habitId, userId) => {
  try {
    const likesRef = collection(db, 'likes');
    const q = query(likesRef,
      where('habitId', '==', habitId),
      where('likedByUserId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking like status:', error);
    throw error;
  }
};

/**
 * Get all likes for multiple habits
 * @param {string[]} habitIds - Array of habit IDs
 * @param {string} userId - ID of the user checking the likes
 * @returns {Promise<Object>} - Object mapping habit IDs to like status
 */
export const getLikesForHabits = async (habitIds, userId) => {
  try {
    const likesRef = collection(db, 'likes');
    const likeStatus = {};
    habitIds.forEach(id => likeStatus[id] = false);

    // Firestore 'in' queries are limited to 10 items
    // So we need to split the habitIds into chunks
    const chunkSize = 10;
    for (let i = 0; i < habitIds.length; i += chunkSize) {
      const chunk = habitIds.slice(i, i + chunkSize);
      const q = query(likesRef,
        where('habitId', 'in', chunk),
        where('likedByUserId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const data = doc.data();
        likeStatus[data.habitId] = true;
      });
    }
    
    return likeStatus;
  } catch (error) {
    console.error('Error getting likes for habits:', error);
    throw error;
  }
};
