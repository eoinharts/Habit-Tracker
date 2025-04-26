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

export interface CreateAchievementData {
  achievement_insert: Achievement_Key;
}

export interface CreateAchievementVariables {
  title: string;
  description?: string | null;
  criteria?: string | null;
  icon?: string | null;
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

export interface ListAchievementsData {
  achievements: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    criteria?: string | null;
    icon?: string | null;
  } & Achievement_Key)[];
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

export interface ListUserAchievementsData {
  userAchievements: ({
    achievement: {
      id: UUIDString;
      title: string;
      description?: string | null;
      criteria?: string | null;
      icon?: string | null;
    } & Achievement_Key;
      unlockedAt: TimestampString;
  })[];
}

export interface ListUserAchievementsVariables {
  userId: string;
}

export interface RemoveReverseFriendData {
  friendship_delete?: Friendship_Key | null;
}

export interface RemoveReverseFriendVariables {
  friendId: string;
}

export interface UnlockAchievementData {
  userAchievement_insert: UserAchievement_Key;
}

export interface UnlockAchievementVariables {
  userId: string;
  achievementId: UUIDString;
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

interface GetUserDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;
  operationName: string;
}
export const getUserDetailsRef: GetUserDetailsRef;

export function getUserDetails(vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;
export function getUserDetails(dc: DataConnect, vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;

interface GetAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
  operationName: string;
}
export const getAllUsersRef: GetAllUsersRef;

export function getAllUsers(): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData, undefined>;

interface ListFriendsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;
  operationName: string;
}
export const listFriendsRef: ListFriendsRef;

export function listFriends(vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;
export function listFriends(dc: DataConnect, vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;

interface ListIncomingRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListIncomingRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListIncomingRequestsData, undefined>;
  operationName: string;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;

export function listIncomingRequests(): QueryPromise<ListIncomingRequestsData, undefined>;
export function listIncomingRequests(dc: DataConnect): QueryPromise<ListIncomingRequestsData, undefined>;

interface GetUserHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;
  operationName: string;
}
export const getUserHabitRef: GetUserHabitRef;

export function getUserHabit(vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;
export function getUserHabit(dc: DataConnect, vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;

interface GetHabitsWithUserDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
  operationName: string;
}
export const getHabitsWithUserDetailsRef: GetHabitsWithUserDetailsRef;

export function getHabitsWithUserDetails(vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
export function getHabitsWithUserDetails(dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;

interface GetHabitByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
  operationName: string;
}
export const getHabitByIdRef: GetHabitByIdRef;

export function getHabitById(vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;
export function getHabitById(dc: DataConnect, vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;

interface ListAchievementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAchievementsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAchievementsData, undefined>;
  operationName: string;
}
export const listAchievementsRef: ListAchievementsRef;

export function listAchievements(): QueryPromise<ListAchievementsData, undefined>;
export function listAchievements(dc: DataConnect): QueryPromise<ListAchievementsData, undefined>;

interface ListUserAchievementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserAchievementsVariables): QueryRef<ListUserAchievementsData, ListUserAchievementsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserAchievementsVariables): QueryRef<ListUserAchievementsData, ListUserAchievementsVariables>;
  operationName: string;
}
export const listUserAchievementsRef: ListUserAchievementsRef;

export function listUserAchievements(vars: ListUserAchievementsVariables): QueryPromise<ListUserAchievementsData, ListUserAchievementsVariables>;
export function listUserAchievements(dc: DataConnect, vars: ListUserAchievementsVariables): QueryPromise<ListUserAchievementsData, ListUserAchievementsVariables>;

interface DebugFriendshipsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<DebugFriendshipsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<DebugFriendshipsData, undefined>;
  operationName: string;
}
export const debugFriendshipsRef: DebugFriendshipsRef;

export function debugFriendships(): QueryPromise<DebugFriendshipsData, undefined>;
export function debugFriendships(dc: DataConnect): QueryPromise<DebugFriendshipsData, undefined>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface AddFriendRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
  operationName: string;
}
export const addFriendRef: AddFriendRef;

export function addFriend(vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;
export function addFriend(dc: DataConnect, vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;

interface DeleteFriendRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;
  operationName: string;
}
export const deleteFriendRef: DeleteFriendRef;

export function deleteFriend(vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;
export function deleteFriend(dc: DataConnect, vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;

interface RemoveReverseFriendRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;
  operationName: string;
}
export const removeReverseFriendRef: RemoveReverseFriendRef;

export function removeReverseFriend(vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;
export function removeReverseFriend(dc: DataConnect, vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;

interface AcceptFriendRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
  operationName: string;
}
export const acceptFriendRequestRef: AcceptFriendRequestRef;

export function acceptFriendRequest(vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;
export function acceptFriendRequest(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;

interface DeclineFriendRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;
  operationName: string;
}
export const declineFriendRequestRef: DeclineFriendRequestRef;

export function declineFriendRequest(vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;
export function declineFriendRequest(dc: DataConnect, vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;

interface AddReverseFriendRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;
  operationName: string;
}
export const addReverseFriendRef: AddReverseFriendRef;

export function addReverseFriend(vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;
export function addReverseFriend(dc: DataConnect, vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;

interface CreateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
  operationName: string;
}
export const createHabitRef: CreateHabitRef;

export function createHabit(vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;
export function createHabit(dc: DataConnect, vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface UpdateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  operationName: string;
}
export const updateHabitRef: UpdateHabitRef;

export function updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;
export function updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface DeleteHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
  operationName: string;
}
export const deleteHabitRef: DeleteHabitRef;

export function deleteHabit(vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;
export function deleteHabit(dc: DataConnect, vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

interface UpdateHabitStreakRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;
  operationName: string;
}
export const updateHabitStreakRef: UpdateHabitStreakRef;

export function updateHabitStreak(vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;
export function updateHabitStreak(dc: DataConnect, vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;

interface UpdatePointsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;
  operationName: string;
}
export const updatePointsRef: UpdatePointsRef;

export function updatePoints(vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;
export function updatePoints(dc: DataConnect, vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;

interface DeleteUserHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;
  operationName: string;
}
export const deleteUserHabitRef: DeleteUserHabitRef;

export function deleteUserHabit(vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;
export function deleteUserHabit(dc: DataConnect, vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;

interface UnlockAchievementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnlockAchievementVariables): MutationRef<UnlockAchievementData, UnlockAchievementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UnlockAchievementVariables): MutationRef<UnlockAchievementData, UnlockAchievementVariables>;
  operationName: string;
}
export const unlockAchievementRef: UnlockAchievementRef;

export function unlockAchievement(vars: UnlockAchievementVariables): MutationPromise<UnlockAchievementData, UnlockAchievementVariables>;
export function unlockAchievement(dc: DataConnect, vars: UnlockAchievementVariables): MutationPromise<UnlockAchievementData, UnlockAchievementVariables>;

interface CreateAchievementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
  operationName: string;
}
export const createAchievementRef: CreateAchievementRef;

export function createAchievement(vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;
export function createAchievement(dc: DataConnect, vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;

