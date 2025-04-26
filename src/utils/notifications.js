import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

/**
 * Create a new notification when a user likes a habit
 * @param {string} userId - ID of the user who will receive the notification
 * @param {string} fromUserId - ID of the user who liked the habit
 * @param {string} fromUserName - Name of the user who liked the habit
 * @param {string} habitId - ID of the habit that was liked
 * @param {string} habitTitle - Title of the habit that was liked
 */
export const createLikeNotification = async (userId, fromUserId, fromUserName, habitId, habitTitle) => {
  try {
    const notificationsRef = collection(db, 'notifications');
    await addDoc(notificationsRef, {
      userId,
      type: 'HABIT_LIKE',
      message: `${fromUserName} liked your habit "${habitTitle}"`,
      createdAt: serverTimestamp(),
      read: false,
      fromUserId,
      habitId,
      metadata: {
        fromUserName,
        habitTitle
      }
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};
