import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'momentum-data-connect',
  location: 'europe-west2'
};

export function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export function addFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}

export function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
}

export function deleteFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFriend', inputVars);
}

export function deleteFriend(dcOrVars, vars) {
  return executeMutation(deleteFriendRef(dcOrVars, vars));
}

export function removeReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveReverseFriend', inputVars);
}

export function removeReverseFriend(dcOrVars, vars) {
  return executeMutation(removeReverseFriendRef(dcOrVars, vars));
}

export function acceptFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}

export function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
}

export function declineFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineFriendRequest', inputVars);
}

export function declineFriendRequest(dcOrVars, vars) {
  return executeMutation(declineFriendRequestRef(dcOrVars, vars));
}

export function addReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReverseFriend', inputVars);
}

export function addReverseFriend(dcOrVars, vars) {
  return executeMutation(addReverseFriendRef(dcOrVars, vars));
}

export function createHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHabit', inputVars);
}

export function createHabit(dcOrVars, vars) {
  return executeMutation(createHabitRef(dcOrVars, vars));
}

export function updateHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}

export function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
}

export function deleteHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteHabit', inputVars);
}

export function deleteHabit(dcOrVars, vars) {
  return executeMutation(deleteHabitRef(dcOrVars, vars));
}

export function updateHabitStreakRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabitStreak', inputVars);
}

export function updateHabitStreak(dcOrVars, vars) {
  return executeMutation(updateHabitStreakRef(dcOrVars, vars));
}

export function deleteUserHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUserHabit', inputVars);
}

export function deleteUserHabit(dcOrVars, vars) {
  return executeMutation(deleteUserHabitRef(dcOrVars, vars));
}

export function getUserDetailsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDetails', inputVars);
}

export function getUserDetails(dcOrVars, vars) {
  return executeQuery(getUserDetailsRef(dcOrVars, vars));
}

export function getAllUsersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}

export function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
}

export function listFriendsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFriends', inputVars);
}

export function listFriends(dcOrVars, vars) {
  return executeQuery(listFriendsRef(dcOrVars, vars));
}

export function listIncomingRequestsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListIncomingRequests');
}

export function listIncomingRequests(dc) {
  return executeQuery(listIncomingRequestsRef(dc));
}

export function getUserHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserHabit', inputVars);
}

export function getUserHabit(dcOrVars, vars) {
  return executeQuery(getUserHabitRef(dcOrVars, vars));
}

export function getHabitsWithUserDetailsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsWithUserDetails', inputVars);
}

export function getHabitsWithUserDetails(dcOrVars, vars) {
  return executeQuery(getHabitsWithUserDetailsRef(dcOrVars, vars));
}

export function getHabitByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitById', inputVars);
}

export function getHabitById(dcOrVars, vars) {
  return executeQuery(getHabitByIdRef(dcOrVars, vars));
}

export function debugFriendshipsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DebugFriendships');
}

export function debugFriendships(dc) {
  return executeQuery(debugFriendshipsRef(dc));
}

