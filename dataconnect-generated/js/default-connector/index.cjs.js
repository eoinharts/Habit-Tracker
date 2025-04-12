const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'momentum-data-connect',
  location: 'europe-west2'
};
exports.connectorConfig = connectorConfig;

function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

function addFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}
exports.addFriendRef = addFriendRef;

exports.addFriend = function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
};

function deleteFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFriend', inputVars);
}
exports.deleteFriendRef = deleteFriendRef;

exports.deleteFriend = function deleteFriend(dcOrVars, vars) {
  return executeMutation(deleteFriendRef(dcOrVars, vars));
};

function removeReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveReverseFriend', inputVars);
}
exports.removeReverseFriendRef = removeReverseFriendRef;

exports.removeReverseFriend = function removeReverseFriend(dcOrVars, vars) {
  return executeMutation(removeReverseFriendRef(dcOrVars, vars));
};

function acceptFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}
exports.acceptFriendRequestRef = acceptFriendRequestRef;

exports.acceptFriendRequest = function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
};

function declineFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineFriendRequest', inputVars);
}
exports.declineFriendRequestRef = declineFriendRequestRef;

exports.declineFriendRequest = function declineFriendRequest(dcOrVars, vars) {
  return executeMutation(declineFriendRequestRef(dcOrVars, vars));
};

function addReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReverseFriend', inputVars);
}
exports.addReverseFriendRef = addReverseFriendRef;

exports.addReverseFriend = function addReverseFriend(dcOrVars, vars) {
  return executeMutation(addReverseFriendRef(dcOrVars, vars));
};

function createHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHabit', inputVars);
}
exports.createHabitRef = createHabitRef;

exports.createHabit = function createHabit(dcOrVars, vars) {
  return executeMutation(createHabitRef(dcOrVars, vars));
};

function updateHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}
exports.updateHabitRef = updateHabitRef;

exports.updateHabit = function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
};

function deleteHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteHabit', inputVars);
}
exports.deleteHabitRef = deleteHabitRef;

exports.deleteHabit = function deleteHabit(dcOrVars, vars) {
  return executeMutation(deleteHabitRef(dcOrVars, vars));
};

function updateHabitStreakRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabitStreak', inputVars);
}
exports.updateHabitStreakRef = updateHabitStreakRef;

exports.updateHabitStreak = function updateHabitStreak(dcOrVars, vars) {
  return executeMutation(updateHabitStreakRef(dcOrVars, vars));
};

function updatePointsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updatePoints', inputVars);
}
exports.updatePointsRef = updatePointsRef;

exports.updatePoints = function updatePoints(dcOrVars, vars) {
  return executeMutation(updatePointsRef(dcOrVars, vars));
};

function deleteUserHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUserHabit', inputVars);
}
exports.deleteUserHabitRef = deleteUserHabitRef;

exports.deleteUserHabit = function deleteUserHabit(dcOrVars, vars) {
  return executeMutation(deleteUserHabitRef(dcOrVars, vars));
};

function unlockAchievementRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnlockAchievement', inputVars);
}
exports.unlockAchievementRef = unlockAchievementRef;

exports.unlockAchievement = function unlockAchievement(dcOrVars, vars) {
  return executeMutation(unlockAchievementRef(dcOrVars, vars));
};

function createAchievementRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAchievement', inputVars);
}
exports.createAchievementRef = createAchievementRef;

exports.createAchievement = function createAchievement(dcOrVars, vars) {
  return executeMutation(createAchievementRef(dcOrVars, vars));
};

function getUserDetailsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDetails', inputVars);
}
exports.getUserDetailsRef = getUserDetailsRef;

exports.getUserDetails = function getUserDetails(dcOrVars, vars) {
  return executeQuery(getUserDetailsRef(dcOrVars, vars));
};

function getAllUsersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
exports.getAllUsersRef = getAllUsersRef;

exports.getAllUsers = function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
};

function listFriendsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFriends', inputVars);
}
exports.listFriendsRef = listFriendsRef;

exports.listFriends = function listFriends(dcOrVars, vars) {
  return executeQuery(listFriendsRef(dcOrVars, vars));
};

function listIncomingRequestsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListIncomingRequests');
}
exports.listIncomingRequestsRef = listIncomingRequestsRef;

exports.listIncomingRequests = function listIncomingRequests(dc) {
  return executeQuery(listIncomingRequestsRef(dc));
};

function getUserHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserHabit', inputVars);
}
exports.getUserHabitRef = getUserHabitRef;

exports.getUserHabit = function getUserHabit(dcOrVars, vars) {
  return executeQuery(getUserHabitRef(dcOrVars, vars));
};

function getHabitsWithUserDetailsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsWithUserDetails', inputVars);
}
exports.getHabitsWithUserDetailsRef = getHabitsWithUserDetailsRef;

exports.getHabitsWithUserDetails = function getHabitsWithUserDetails(dcOrVars, vars) {
  return executeQuery(getHabitsWithUserDetailsRef(dcOrVars, vars));
};

function getHabitByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitById', inputVars);
}
exports.getHabitByIdRef = getHabitByIdRef;

exports.getHabitById = function getHabitById(dcOrVars, vars) {
  return executeQuery(getHabitByIdRef(dcOrVars, vars));
};

function listAchievementsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAchievements');
}
exports.listAchievementsRef = listAchievementsRef;

exports.listAchievements = function listAchievements(dc) {
  return executeQuery(listAchievementsRef(dc));
};

function listUserAchievementsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserAchievements', inputVars);
}
exports.listUserAchievementsRef = listUserAchievementsRef;

exports.listUserAchievements = function listUserAchievements(dcOrVars, vars) {
  return executeQuery(listUserAchievementsRef(dcOrVars, vars));
};

function debugFriendshipsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DebugFriendships');
}
exports.debugFriendshipsRef = debugFriendshipsRef;

exports.debugFriendships = function debugFriendships(dc) {
  return executeQuery(debugFriendshipsRef(dc));
};
