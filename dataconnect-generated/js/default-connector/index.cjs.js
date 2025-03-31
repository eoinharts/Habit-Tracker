const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'momentum-data-connect',
  location: 'europe-west2'
};
exports.connectorConfig = connectorConfig;

exports.getUserDetailsRef = function getUserDetailsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDetails', inputVars);
}

exports.getUserDetails = function getUserDetails(dcOrVars, vars) {
  return executeQuery(getUserDetailsRef(dcOrVars, vars));
};

exports.getAllUsersRef = function getAllUsersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}

exports.getAllUsers = function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
};

exports.listFriendsRef = function listFriendsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFriends', inputVars);
}

exports.listFriends = function listFriends(dcOrVars, vars) {
  return executeQuery(listFriendsRef(dcOrVars, vars));
};

exports.listIncomingRequestsRef = function listIncomingRequestsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListIncomingRequests');
}

exports.listIncomingRequests = function listIncomingRequests(dc) {
  return executeQuery(listIncomingRequestsRef(dc));
};

exports.getUserHabitsRef = function getUserHabitsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserHabits');
}

exports.getUserHabits = function getUserHabits(dc) {
  return executeQuery(getUserHabitsRef(dc));
};

exports.getHabitByIdRef = function getHabitByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitById', inputVars);
}

exports.getHabitById = function getHabitById(dcOrVars, vars) {
  return executeQuery(getHabitByIdRef(dcOrVars, vars));
};

exports.debugFriendshipsRef = function debugFriendshipsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DebugFriendships');
}

exports.debugFriendships = function debugFriendships(dc) {
  return executeQuery(debugFriendshipsRef(dc));
};

exports.createUserRef = function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

exports.addFriendRef = function addFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}

exports.addFriend = function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
};

exports.deleteFriendRef = function deleteFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFriend', inputVars);
}

exports.deleteFriend = function deleteFriend(dcOrVars, vars) {
  return executeMutation(deleteFriendRef(dcOrVars, vars));
};

exports.removeReverseFriendRef = function removeReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveReverseFriend', inputVars);
}

exports.removeReverseFriend = function removeReverseFriend(dcOrVars, vars) {
  return executeMutation(removeReverseFriendRef(dcOrVars, vars));
};

exports.acceptFriendRequestRef = function acceptFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}

exports.acceptFriendRequest = function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
};

exports.declineFriendRequestRef = function declineFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineFriendRequest', inputVars);
}

exports.declineFriendRequest = function declineFriendRequest(dcOrVars, vars) {
  return executeMutation(declineFriendRequestRef(dcOrVars, vars));
};

exports.addReverseFriendRef = function addReverseFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReverseFriend', inputVars);
}

exports.addReverseFriend = function addReverseFriend(dcOrVars, vars) {
  return executeMutation(addReverseFriendRef(dcOrVars, vars));
};

exports.createHabitRef = function createHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHabit', inputVars);
}

exports.createHabit = function createHabit(dcOrVars, vars) {
  return executeMutation(createHabitRef(dcOrVars, vars));
};

exports.updateHabitRef = function updateHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}

exports.updateHabit = function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
};

exports.deleteHabitRef = function deleteHabitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteHabit', inputVars);
}

exports.deleteHabit = function deleteHabit(dcOrVars, vars) {
  return executeMutation(deleteHabitRef(dcOrVars, vars));
};

exports.updateHabitStreakRef = function updateHabitStreakRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabitStreak', inputVars);
}

exports.updateHabitStreak = function updateHabitStreak(dcOrVars, vars) {
  return executeMutation(updateHabitStreakRef(dcOrVars, vars));
};
