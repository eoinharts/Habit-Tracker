const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'momentum-data-connect',
  location: 'europe-west2'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const addFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}
addFriendRef.operationName = 'AddFriend';
exports.addFriendRef = addFriendRef;

exports.addFriend = function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
};

const deleteFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFriend', inputVars);
}
deleteFriendRef.operationName = 'DeleteFriend';
exports.deleteFriendRef = deleteFriendRef;

exports.deleteFriend = function deleteFriend(dcOrVars, vars) {
  return executeMutation(deleteFriendRef(dcOrVars, vars));
};

const removeReverseFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveReverseFriend', inputVars);
}
removeReverseFriendRef.operationName = 'RemoveReverseFriend';
exports.removeReverseFriendRef = removeReverseFriendRef;

exports.removeReverseFriend = function removeReverseFriend(dcOrVars, vars) {
  return executeMutation(removeReverseFriendRef(dcOrVars, vars));
};

const acceptFriendRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}
acceptFriendRequestRef.operationName = 'AcceptFriendRequest';
exports.acceptFriendRequestRef = acceptFriendRequestRef;

exports.acceptFriendRequest = function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
};

const declineFriendRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineFriendRequest', inputVars);
}
declineFriendRequestRef.operationName = 'DeclineFriendRequest';
exports.declineFriendRequestRef = declineFriendRequestRef;

exports.declineFriendRequest = function declineFriendRequest(dcOrVars, vars) {
  return executeMutation(declineFriendRequestRef(dcOrVars, vars));
};

const addReverseFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReverseFriend', inputVars);
}
addReverseFriendRef.operationName = 'AddReverseFriend';
exports.addReverseFriendRef = addReverseFriendRef;

exports.addReverseFriend = function addReverseFriend(dcOrVars, vars) {
  return executeMutation(addReverseFriendRef(dcOrVars, vars));
};

const createHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHabit', inputVars);
}
createHabitRef.operationName = 'CreateHabit';
exports.createHabitRef = createHabitRef;

exports.createHabit = function createHabit(dcOrVars, vars) {
  return executeMutation(createHabitRef(dcOrVars, vars));
};

const updateHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}
updateHabitRef.operationName = 'UpdateHabit';
exports.updateHabitRef = updateHabitRef;

exports.updateHabit = function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
};

const deleteHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteHabit', inputVars);
}
deleteHabitRef.operationName = 'DeleteHabit';
exports.deleteHabitRef = deleteHabitRef;

exports.deleteHabit = function deleteHabit(dcOrVars, vars) {
  return executeMutation(deleteHabitRef(dcOrVars, vars));
};

const updateHabitStreakRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabitStreak', inputVars);
}
updateHabitStreakRef.operationName = 'UpdateHabitStreak';
exports.updateHabitStreakRef = updateHabitStreakRef;

exports.updateHabitStreak = function updateHabitStreak(dcOrVars, vars) {
  return executeMutation(updateHabitStreakRef(dcOrVars, vars));
};

const updatePointsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updatePoints', inputVars);
}
updatePointsRef.operationName = 'updatePoints';
exports.updatePointsRef = updatePointsRef;

exports.updatePoints = function updatePoints(dcOrVars, vars) {
  return executeMutation(updatePointsRef(dcOrVars, vars));
};

const deleteUserHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUserHabit', inputVars);
}
deleteUserHabitRef.operationName = 'DeleteUserHabit';
exports.deleteUserHabitRef = deleteUserHabitRef;

exports.deleteUserHabit = function deleteUserHabit(dcOrVars, vars) {
  return executeMutation(deleteUserHabitRef(dcOrVars, vars));
};

const unlockAchievementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnlockAchievement', inputVars);
}
unlockAchievementRef.operationName = 'UnlockAchievement';
exports.unlockAchievementRef = unlockAchievementRef;

exports.unlockAchievement = function unlockAchievement(dcOrVars, vars) {
  return executeMutation(unlockAchievementRef(dcOrVars, vars));
};

const createAchievementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAchievement', inputVars);
}
createAchievementRef.operationName = 'CreateAchievement';
exports.createAchievementRef = createAchievementRef;

exports.createAchievement = function createAchievement(dcOrVars, vars) {
  return executeMutation(createAchievementRef(dcOrVars, vars));
};

const getUserDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDetails', inputVars);
}
getUserDetailsRef.operationName = 'GetUserDetails';
exports.getUserDetailsRef = getUserDetailsRef;

exports.getUserDetails = function getUserDetails(dcOrVars, vars) {
  return executeQuery(getUserDetailsRef(dcOrVars, vars));
};

const getAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
getAllUsersRef.operationName = 'GetAllUsers';
exports.getAllUsersRef = getAllUsersRef;

exports.getAllUsers = function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
};

const listFriendsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFriends', inputVars);
}
listFriendsRef.operationName = 'ListFriends';
exports.listFriendsRef = listFriendsRef;

exports.listFriends = function listFriends(dcOrVars, vars) {
  return executeQuery(listFriendsRef(dcOrVars, vars));
};

const listIncomingRequestsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListIncomingRequests');
}
listIncomingRequestsRef.operationName = 'ListIncomingRequests';
exports.listIncomingRequestsRef = listIncomingRequestsRef;

exports.listIncomingRequests = function listIncomingRequests(dc) {
  return executeQuery(listIncomingRequestsRef(dc));
};

const getUserHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserHabit', inputVars);
}
getUserHabitRef.operationName = 'GetUserHabit';
exports.getUserHabitRef = getUserHabitRef;

exports.getUserHabit = function getUserHabit(dcOrVars, vars) {
  return executeQuery(getUserHabitRef(dcOrVars, vars));
};

const getHabitsWithUserDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsWithUserDetails', inputVars);
}
getHabitsWithUserDetailsRef.operationName = 'GetHabitsWithUserDetails';
exports.getHabitsWithUserDetailsRef = getHabitsWithUserDetailsRef;

exports.getHabitsWithUserDetails = function getHabitsWithUserDetails(dcOrVars, vars) {
  return executeQuery(getHabitsWithUserDetailsRef(dcOrVars, vars));
};

const getHabitByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitById', inputVars);
}
getHabitByIdRef.operationName = 'GetHabitById';
exports.getHabitByIdRef = getHabitByIdRef;

exports.getHabitById = function getHabitById(dcOrVars, vars) {
  return executeQuery(getHabitByIdRef(dcOrVars, vars));
};

const listAchievementsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAchievements');
}
listAchievementsRef.operationName = 'ListAchievements';
exports.listAchievementsRef = listAchievementsRef;

exports.listAchievements = function listAchievements(dc) {
  return executeQuery(listAchievementsRef(dc));
};

const listUserAchievementsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserAchievements', inputVars);
}
listUserAchievementsRef.operationName = 'ListUserAchievements';
exports.listUserAchievementsRef = listUserAchievementsRef;

exports.listUserAchievements = function listUserAchievements(dcOrVars, vars) {
  return executeQuery(listUserAchievementsRef(dcOrVars, vars));
};

const debugFriendshipsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DebugFriendships');
}
debugFriendshipsRef.operationName = 'DebugFriendships';
exports.debugFriendshipsRef = debugFriendshipsRef;

exports.debugFriendships = function debugFriendships(dc) {
  return executeQuery(debugFriendshipsRef(dc));
};
