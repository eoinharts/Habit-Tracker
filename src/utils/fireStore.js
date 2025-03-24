import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export const addDocuments = async (collectionName, data) => {
  try {
    console.log(`📌 Attempting to add document to ${collectionName} with data:`, data);
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("✅ Document added with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error adding document: ", error);
  }
};

// Function to fetch all documents from a collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

// Function to delete a document by ID
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted from Firestore!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Friends Management
export const getUserFriends = async (userId) => {
  try {
    console.log('Fetching friends for user:', userId);
    const friendsQuery = query(collection(db, "users", userId, "friends"));
    const querySnapshot = await getDocs(friendsQuery);
    
    // Get each friend's full user data to get their points
    const friendsPromises = querySnapshot.docs.map(async (friendDoc) => {
      const friendData = friendDoc.data();
      console.log('Friend data from friends collection:', friendData);
      
      const friendRef = doc(db, "users", friendData.uid);
      const friendUserDoc = await getDoc(friendRef);
      const friendUserData = friendUserDoc.data();
      console.log('Friend user data from users collection:', friendUserData);
      
      const friend = {
        id: friendDoc.id,
        ...friendData,
        points: friendUserData?.points || 0
      };
      console.log('Final friend object:', friend);
      return friend;
    });
    
    const friends = await Promise.all(friendsPromises);
    console.log('All friends with points:', friends);
    return friends;
  } catch (error) {
    console.error("Error fetching user's friends:", error);
    throw error;
  }
};

export const addFriend = async (userId, friendData) => {
  try {
    console.log('Adding friend for user:', userId, 'Friend data:', friendData);
    if (!userId) throw new Error('userId is required');
    if (!friendData.email) throw new Error('friend email is required');
    
    // Get friend's current points from their user document
    const friendRef = doc(db, "users", friendData.uid);
    const friendDoc = await getDoc(friendRef);
    const friendPoints = friendDoc.exists() ? (friendDoc.data()?.points || 0) : 0;
    
    // Create a new document with auto-generated ID in the friends subcollection
    const friendsCollection = collection(db, "users", userId, "friends");
    const docRef = await addDoc(friendsCollection, {
      ...friendData,
      points: friendPoints,
      addedAt: new Date()
    });
    
    console.log('Friend added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const removeFriend = async (friendId) => {
  try {
    await deleteDoc(doc(db, "friends", friendId));
    console.log("Friend removed successfully!");
  } catch (error) {
    console.error("Error removing friend: ", error);
  }
};

// Get all available friends in the system
export const getAllFriends = async () => {
  try {
    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return users.map(user => ({
      id: user.id,
      name: user.displayName || user.email,
      email: user.email,
      points: 0
    }));
  } catch (error) {
    console.error("Error fetching all friends: ", error);
    return [];
  }
};

// Get friend details
export const getFriendDetails = async (friendId) => {
  try {
    console.log('Getting friend details for:', friendId);
    const friendDoc = await getDoc(doc(db, "users", friendId));
    if (!friendDoc.exists()) {
      throw new Error('Friend not found');
    }
    return {
      id: friendDoc.id,
      ...friendDoc.data()
    };
  } catch (error) {
    console.error("Error getting friend details:", error);
    throw error;
  }
};

// Get friend's achievements
export const getFriendAchievements = async (friendId) => {
  try {
    console.log('Getting achievements for friend:', friendId);
    const achievementsQuery = query(
      collection(db, "achievements"),
      where("userId", "==", friendId)
    );
    const querySnapshot = await getDocs(achievementsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting friend achievements:", error);
    throw error;
  }
};

// Update friend's points
export const updateFriendPoints = async (friendId, pointsToAdd) => {
  try {
    console.log('Updating points for friend:', friendId, 'Adding points:', pointsToAdd);
    
    // Get all users who have this person as a friend
    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);
    
    // Update points in the user's document
    const friendRef = doc(db, "users", friendId);
    const friendDoc = await getDoc(friendRef);
    if (!friendDoc.exists()) {
      throw new Error('Friend not found');
    }
    const currentPoints = friendDoc.data()?.points || 0;
    const newPoints = currentPoints + pointsToAdd;
    
    // Update points in the user's document
    await updateDoc(friendRef, {
      points: newPoints,
      lastUpdated: new Date()
    });
    
    // Update points in all friend subcollections that reference this user
    const updatePromises = usersSnapshot.docs.map(async (userDoc) => {
      const friendsRef = collection(db, "users", userDoc.id, "friends");
      const friendQuery = query(friendsRef, where("uid", "==", friendId));
      const friendSnapshot = await getDocs(friendQuery);
      
      friendSnapshot.docs.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          points: newPoints,
          lastUpdated: new Date()
        });
      });
    });
    
    await Promise.all(updatePromises);
    console.log('Points updated successfully in all locations. New total:', newPoints);
  } catch (error) {
    console.error("Error updating friend points:", error);
    throw error;
  }
};

// Achievements Management
export const getUserAchievements = async (userId) => {
  try {
    // First get achievements without ordering
    const achievementsQuery = query(
      collection(db, "achievements"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(achievementsQuery);
    const achievements = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    // Then sort them in memory
    return achievements.sort((a, b) => {
      const dateA = a.createdAt?.toDate() || new Date(0);
      const dateB = b.createdAt?.toDate() || new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching achievements: ", error);
    return [];
  }
};

export const addAchievement = async (userId, achievementData) => {
  try {
    const data = {
      userId,
      title: achievementData.title,
      icon: '🥉', // Bronze by default
      tier: 'bronze',
      createdAt: new Date()
    };
    
    // Add the achievement
    const achievementRef = await addDoc(collection(db, "achievements"), data);
    console.log("Achievement added successfully!");
    return achievementRef.id;
  } catch (error) {
    console.error("Error adding achievement: ", error);
    throw error;
  }
};

export const upgradeAchievement = async (userId, achievementId, targetTier) => {
  try {
    // Get user's current points
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const currentPoints = userDoc.data()?.points || 0;
    
    // Get achievement details
    const achievementRef = doc(db, "achievements", achievementId);
    const achievementDoc = await getDoc(achievementRef);
    
    if (!achievementDoc.exists()) {
      throw new Error('Achievement not found');
    }

    // If tier is not set, assume it's bronze (for backward compatibility)
    const currentTier = achievementDoc.data()?.tier || 'bronze';
    
    // Define upgrade costs and icons
    const upgrades = {
      bronze: { next: 'silver', cost: 50, icon: '🥈' },
      silver: { next: 'gold', cost: 100, icon: '🥇' }
    };
    
    // Validate upgrade
    if (!upgrades[currentTier]) {
      throw new Error(`Invalid current tier: ${currentTier}`);
    }
    
    if (upgrades[currentTier].next !== targetTier) {
      throw new Error(`Invalid upgrade path from ${currentTier} to ${targetTier}`);
    }
    
    const upgradeCost = upgrades[currentTier].cost;
    if (currentPoints < upgradeCost) {
      throw new Error(`Not enough points. Need ${upgradeCost} points to upgrade.`);
    }
    
    // Update achievement tier and icon
    await updateDoc(achievementRef, {
      tier: targetTier,
      icon: upgrades[currentTier].icon,
      lastUpgraded: new Date()
    });
    
    // Deduct points from user
    await updateDoc(userRef, {
      points: currentPoints - upgradeCost,
      lastUpdated: new Date()
    });
    
    return {
      newTier: targetTier,
      remainingPoints: currentPoints - upgradeCost
    };
  } catch (error) {
    console.error("Error upgrading achievement:", error);
    throw error;
  }
};

export const removeAchievement = async (achievementId) => {
  try {
    await deleteDoc(doc(db, "achievements", achievementId));
    console.log("Achievement removed successfully!");
  } catch (error) {
    console.error("Error removing achievement: ", error);
  }
};

// Get all available achievements in the system
export const getAllAchievements = async () => {
  try {
    // First get all achievements without ordering
    const achievementsQuery = query(collection(db, "achievements"));
    const querySnapshot = await getDocs(achievementsQuery);
    const achievements = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    // Then sort them in memory
    return achievements.sort((a, b) => {
      const dateA = a.createdAt?.toDate() || new Date(0);
      const dateB = b.createdAt?.toDate() || new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching all achievements: ", error);
    return [];
  }
};

// User Management
export const saveUserToFirestore = async (user) => {
  try {
    if (!user) return;
    
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Only set initial data if user doesn't exist
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || user.email,
        points: 0,
        createdAt: new Date()
      });
      console.log('New user saved to Firestore');
    }
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    throw error;
  }
};

// Get all available users in the system
export const getAllUsers = async () => {
  try {
    const usersQuery = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersQuery);
    return querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
      points: doc.data().points || 0
    }));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

// Get user's points
export const getUserPoints = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    return userDoc.data()?.points || 0;
  } catch (error) {
    console.error("Error getting user points:", error);
    throw error;
  }
};
