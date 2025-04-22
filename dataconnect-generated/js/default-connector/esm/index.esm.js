import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'momentum-data-connect',
  location: 'europe-west2'
};

export const getUserDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDetails', inputVars);
}
getUserDetailsRef.operationName = 'GetUserDetails';

export function getUserDetails(dcOrVars, vars) {
  return executeQuery(getUserDetailsRef(dcOrVars, vars));
}

export const getAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
getAllUsersRef.operationName = 'GetAllUsers';

export function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
}

export const listFriendsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFriends', inputVars);
}
listFriendsRef.operationName = 'ListFriends';

export function listFriends(dcOrVars, vars) {
  return executeQuery(listFriendsRef(dcOrVars, vars));
}

export const listIncomingRequestsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListIncomingRequests');
}
listIncomingRequestsRef.operationName = 'ListIncomingRequests';

export function listIncomingRequests(dc) {
  return executeQuery(listIncomingRequestsRef(dc));
}

export const getUserHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserHabit', inputVars);
}
getUserHabitRef.operationName = 'GetUserHabit';

export function getUserHabit(dcOrVars, vars) {
  return executeQuery(getUserHabitRef(dcOrVars, vars));
}

export const getHabitsWithUserDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsWithUserDetails', inputVars);
}
getHabitsWithUserDetailsRef.operationName = 'GetHabitsWithUserDetails';

export function getHabitsWithUserDetails(dcOrVars, vars) {
  return executeQuery(getHabitsWithUserDetailsRef(dcOrVars, vars));
}

export const getHabitByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitById', inputVars);
}
getHabitByIdRef.operationName = 'GetHabitById';

export function getHabitById(dcOrVars, vars) {
  return executeQuery(getHabitByIdRef(dcOrVars, vars));
}

export const listAchievementsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAchievements');
}
listAchievementsRef.operationName = 'ListAchievements';

export function listAchievements(dc) {
  return executeQuery(listAchievementsRef(dc));
}

export const listUserAchievementsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserAchievements', inputVars);
}
listUserAchievementsRef.operationName = 'ListUserAchievements';

export function listUserAchievements(dcOrVars, vars) {
  return executeQuery(listUserAchievementsRef(dcOrVars, vars));
}

export const debugFriendshipsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DebugFriendships');
}
debugFriendshipsRef.operationName = 'DebugFriendships';

export function debugFriendships(dc) {
  return executeQuery(debugFriendshipsRef(dc));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const addFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}
addFriendRef.operationName = 'AddFriend';

export function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
}

export const deleteFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFriend', inputVars);
}
deleteFriendRef.operationName = 'DeleteFriend';

export function deleteFriend(dcOrVars, vars) {
  return executeMutation(deleteFriendRef(dcOrVars, vars));
}

export const removeReverseFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveReverseFriend', inputVars);
}
removeReverseFriendRef.operationName = 'RemoveReverseFriend';

export function removeReverseFriend(dcOrVars, vars) {
  return executeMutation(removeReverseFriendRef(dcOrVars, vars));
}

export const acceptFriendRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}
acceptFriendRequestRef.operationName = 'AcceptFriendRequest';

export function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
}

export const declineFriendRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineFriendRequest', inputVars);
}
declineFriendRequestRef.operationName = 'DeclineFriendRequest';

export function declineFriendRequest(dcOrVars, vars) {
  return executeMutation(declineFriendRequestRef(dcOrVars, vars));
}

export const addReverseFriendRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReverseFriend', inputVars);
}
addReverseFriendRef.operationName = 'AddReverseFriend';

export function addReverseFriend(dcOrVars, vars) {
  return executeMutation(addReverseFriendRef(dcOrVars, vars));
}

export const createHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHabit', inputVars);
}
createHabitRef.operationName = 'CreateHabit';

export function createHabit(dcOrVars, vars) {
  return executeMutation(createHabitRef(dcOrVars, vars));
}

export const updateHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}
updateHabitRef.operationName = 'UpdateHabit';

export function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
}

export const deleteHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteHabit', inputVars);
}
deleteHabitRef.operationName = 'DeleteHabit';

export function deleteHabit(dcOrVars, vars) {
  return executeMutation(deleteHabitRef(dcOrVars, vars));
}

export const updateHabitStreakRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabitStreak', inputVars);
}
updateHabitStreakRef.operationName = 'UpdateHabitStreak';

export function updateHabitStreak(dcOrVars, vars) {
  return executeMutation(updateHabitStreakRef(dcOrVars, vars));
}

export const updatePointsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updatePoints', inputVars);
}
updatePointsRef.operationName = 'updatePoints';

export function updatePoints(dcOrVars, vars) {
  return executeMutation(updatePointsRef(dcOrVars, vars));
}

export const deleteUserHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUserHabit', inputVars);
}
deleteUserHabitRef.operationName = 'DeleteUserHabit';

export function deleteUserHabit(dcOrVars, vars) {
  return executeMutation(deleteUserHabitRef(dcOrVars, vars));
}

export const unlockAchievementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnlockAchievement', inputVars);
}
unlockAchievementRef.operationName = 'UnlockAchievement';

export function unlockAchievement(dcOrVars, vars) {
  return executeMutation(unlockAchievementRef(dcOrVars, vars));
}

export const createAchievementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAchievement', inputVars);
}
createAchievementRef.operationName = 'CreateAchievement';

export function createAchievement(dcOrVars, vars) {
  return executeMutation(createAchievementRef(dcOrVars, vars));
}

