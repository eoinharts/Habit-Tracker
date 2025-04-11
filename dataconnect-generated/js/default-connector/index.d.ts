import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AcceptFriendRequestData {
  friendship_update?: Friendship_Key | null;
}

export interface AcceptFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}

export interface Achievement_Key {
  id: UUIDString;
  __typename?: 'Achievement_Key';
}

export interface AddFriendData {
  friendship_insert: Friendship_Key;
}

export interface AddFriendVariables {
  friendId: string;
  currentUserId: string;
}

export interface AddReverseFriendData {
  friendship_insert: Friendship_Key;
}

export interface AddReverseFriendVariables {
  friendId: string;
}

export interface CreateHabitData {
  habit_insert: Habit_Key;
}

export interface CreateHabitVariables {
  uid: string;
  title: string;
  description: string;
  category: string;
  streakGoal: number;
  emoji: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  id?: string;
  name?: string;
  email?: string;
}

export interface DebugFriendshipsData {
  friendships: ({
    user1Id: string;
    user2Id: string;
    status: string;
  } & Friendship_Key)[];
}

export interface DeclineFriendRequestData {
  friendship_delete?: Friendship_Key | null;
}

export interface DeclineFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}

export interface DeleteFriendData {
  first?: Friendship_Key | null;
  second?: Friendship_Key | null;
}

export interface DeleteFriendVariables {
  currentUserId: string;
  friendId: string;
}

export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}

export interface DeleteHabitVariables {
  habitId: UUIDString;
}

export interface DeleteUserHabitData {
  userHabit_delete?: UserHabit_Key | null;
}

export interface DeleteUserHabitVariables {
  habitId: UUIDString;
  userId: string;
}

export interface Friendship_Key {
  user1Id: string;
  user2Id: string;
  __typename?: 'Friendship_Key';
}

export interface GetAllUsersData {
  users: ({
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    totalStreak: number;
  } & User_Key)[];
}

export interface GetHabitByIdData {
  habit?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    category?: string | null;
    streakGoal: number;
    userHabitData: ({
      currentStreak: number;
      longestStreak: number;
      lastTrackedDate?: TimestampString | null;
    })[];
  } & Habit_Key;
}

export interface GetHabitByIdVariables {
  habitId: UUIDString;
}

export interface GetHabitsWithUserDetailsData {
  user?: {
    id: string;
    name: string;
    userHabits_on_user: ({
      currentStreak: number;
      longestStreak: number;
      lastTrackedDate?: TimestampString | null;
      habit: {
        id: UUIDString;
        title: string;
        description?: string | null;
        category?: string | null;
        streakGoal: number;
        emoji?: string | null;
      } & Habit_Key;
    })[];
  } & User_Key;
}

export interface GetHabitsWithUserDetailsVariables {
  userId: string;
}

export interface GetUserDetailsData {
  users: ({
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    totalStreak: number;
    totalPoints: number;
    lastUpdatedStreakDate?: TimestampString | null;
  } & User_Key)[];
}

export interface GetUserDetailsVariables {
  userId: string;
}

export interface GetUserHabitData {
  habits: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    category?: string | null;
    streakGoal: number;
    emoji?: string | null;
    userHabitData: ({
      currentStreak: number;
      longestStreak: number;
      lastTrackedDate?: TimestampString | null;
    })[];
  } & Habit_Key)[];
}

export interface GetUserHabitVariables {
  uid: string;
}

export interface Habit_Key {
  id: UUIDString;
  __typename?: 'Habit_Key';
}

export interface ListFriendsData {
  friendships: ({
    user1: {
      id: string;
      name: string;
    } & User_Key;
      user2: {
        id: string;
        name: string;
      } & User_Key;
        status: string;
  })[];
}

export interface ListFriendsVariables {
  uid: string;
}

export interface ListIncomingRequestsData {
  friendships: ({
    user1: {
      id: string;
      name: string;
      email: string;
    } & User_Key;
      user2: {
        id: string;
      } & User_Key;
        status: string;
  })[];
}

export interface RemoveReverseFriendData {
  friendship_delete?: Friendship_Key | null;
}

export interface RemoveReverseFriendVariables {
  friendId: string;
}

export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}

export interface UpdateHabitStreakData {
  userHabit_upsert: UserHabit_Key;
}

export interface UpdateHabitStreakVariables {
  habitId: UUIDString;
  currentStreak: number;
  longestStreak: number;
  lastTrackedDate: TimestampString;
  userId?: string | null;
  points?: number | null;
}

export interface UpdateHabitVariables {
  habitId: UUIDString;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  streakGoal?: number | null;
  emoji: string;
}

export interface UpdatePointsData {
  user_update?: User_Key | null;
}

export interface UpdatePointsVariables {
  userId: string;
  points: number;
  totalStreak: number;
  newDate: TimestampString;
}

export interface UserAchievement_Key {
  userId: string;
  achievementId: UUIDString;
  __typename?: 'UserAchievement_Key';
}

export interface UserHabit_Key {
  habitId: UUIDString;
  userId: string;
  __typename?: 'UserHabit_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

/* Allow users to create refs without passing in DataConnect */
export function getUserDetailsRef(vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserDetailsRef(dc: DataConnect, vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;

export function getUserDetails(vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;
export function getUserDetails(dc: DataConnect, vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getAllUsersRef(): QueryRef<GetAllUsersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getAllUsersRef(dc: DataConnect): QueryRef<GetAllUsersData, undefined>;

export function getAllUsers(): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function listFriendsRef(vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listFriendsRef(dc: DataConnect, vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;

export function listFriends(vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;
export function listFriends(dc: DataConnect, vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function listIncomingRequestsRef(): QueryRef<ListIncomingRequestsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listIncomingRequestsRef(dc: DataConnect): QueryRef<ListIncomingRequestsData, undefined>;

export function listIncomingRequests(): QueryPromise<ListIncomingRequestsData, undefined>;
export function listIncomingRequests(dc: DataConnect): QueryPromise<ListIncomingRequestsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getUserHabitRef(vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserHabitRef(dc: DataConnect, vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;

export function getUserHabit(vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;
export function getUserHabit(dc: DataConnect, vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getHabitsWithUserDetailsRef(vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getHabitsWithUserDetailsRef(dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;

export function getHabitsWithUserDetails(vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
export function getHabitsWithUserDetails(dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getHabitByIdRef(vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getHabitByIdRef(dc: DataConnect, vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;

export function getHabitById(vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;
export function getHabitById(dc: DataConnect, vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;

/* Allow users to create refs without passing in DataConnect */
export function debugFriendshipsRef(): QueryRef<DebugFriendshipsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function debugFriendshipsRef(dc: DataConnect): QueryRef<DebugFriendshipsData, undefined>;

export function debugFriendships(): QueryPromise<DebugFriendshipsData, undefined>;
export function debugFriendships(dc: DataConnect): QueryPromise<DebugFriendshipsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function createUserRef(vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createUserRef(dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;

export function createUser(vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

/* Allow users to create refs without passing in DataConnect */
export function addFriendRef(vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addFriendRef(dc: DataConnect, vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;

export function addFriend(vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;
export function addFriend(dc: DataConnect, vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;

/* Allow users to create refs without passing in DataConnect */
export function deleteFriendRef(vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteFriendRef(dc: DataConnect, vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;

export function deleteFriend(vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;
export function deleteFriend(dc: DataConnect, vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;

/* Allow users to create refs without passing in DataConnect */
export function removeReverseFriendRef(vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function removeReverseFriendRef(dc: DataConnect, vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;

export function removeReverseFriend(vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;
export function removeReverseFriend(dc: DataConnect, vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;

/* Allow users to create refs without passing in DataConnect */
export function acceptFriendRequestRef(vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
/* Allow users to pass in custom DataConnect instances */
export function acceptFriendRequestRef(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;

export function acceptFriendRequest(vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;
export function acceptFriendRequest(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;

/* Allow users to create refs without passing in DataConnect */
export function declineFriendRequestRef(vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;
/* Allow users to pass in custom DataConnect instances */
export function declineFriendRequestRef(dc: DataConnect, vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;

export function declineFriendRequest(vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;
export function declineFriendRequest(dc: DataConnect, vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;

/* Allow users to create refs without passing in DataConnect */
export function addReverseFriendRef(vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addReverseFriendRef(dc: DataConnect, vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;

export function addReverseFriend(vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;
export function addReverseFriend(dc: DataConnect, vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createHabitRef(vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createHabitRef(dc: DataConnect, vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;

export function createHabit(vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;
export function createHabit(dc: DataConnect, vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateHabitRef(vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateHabitRef(dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;

export function updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;
export function updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

/* Allow users to create refs without passing in DataConnect */
export function deleteHabitRef(vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteHabitRef(dc: DataConnect, vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;

export function deleteHabit(vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;
export function deleteHabit(dc: DataConnect, vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateHabitStreakRef(vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateHabitStreakRef(dc: DataConnect, vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;

export function updateHabitStreak(vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;
export function updateHabitStreak(dc: DataConnect, vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updatePointsRef(vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updatePointsRef(dc: DataConnect, vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;

export function updatePoints(vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;
export function updatePoints(dc: DataConnect, vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function deleteUserHabitRef(vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteUserHabitRef(dc: DataConnect, vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;

export function deleteUserHabit(vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;
export function deleteUserHabit(dc: DataConnect, vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;

