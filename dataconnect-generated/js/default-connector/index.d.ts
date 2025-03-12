import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddFriendData {
  friendship_insert: Friendship_Key;
}

export interface AddFriendVariables {
  friendId: string;
}

export interface CreateHabitData {
  habit_insert: Habit_Key;
}

export interface CreateHabitVariables {
  title: string;
  description: string;
  category: string;
  streakGoal: number;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username?: string;
  email?: string;
}

export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}

export interface DeleteHabitVariables {
  habitId: UUIDString;
}

export interface Friendship_Key {
  user1Id: string;
  user2Id: string;
  __typename?: 'Friendship_Key';
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

export interface GetUserDetailsData {
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    totalStreak: number;
  } & User_Key;
}

export interface GetUserHabitsData {
  habits: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    category?: string | null;
    streakGoal: number;
  } & Habit_Key)[];
}

export interface Habit_Key {
  id: UUIDString;
  __typename?: 'Habit_Key';
}

export interface ListFriendsData {
  friendships: ({
    user2Id: string;
    status: string;
    friendDetails: {
      id: string;
      name: string;
    } & User_Key;
  })[];
}

export interface RemoveFriendData {
  friendship_delete?: Friendship_Key | null;
}

export interface RemoveFriendVariables {
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
}

export interface UpdateHabitVariables {
  habitId: UUIDString;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  streakGoal?: number | null;
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
export function removeFriendRef(vars: RemoveFriendVariables): MutationRef<RemoveFriendData, RemoveFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function removeFriendRef(dc: DataConnect, vars: RemoveFriendVariables): MutationRef<RemoveFriendData, RemoveFriendVariables>;

export function removeFriend(vars: RemoveFriendVariables): MutationPromise<RemoveFriendData, RemoveFriendVariables>;
export function removeFriend(dc: DataConnect, vars: RemoveFriendVariables): MutationPromise<RemoveFriendData, RemoveFriendVariables>;

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
export function getUserDetailsRef(): QueryRef<GetUserDetailsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getUserDetailsRef(dc: DataConnect): QueryRef<GetUserDetailsData, undefined>;

export function getUserDetails(): QueryPromise<GetUserDetailsData, undefined>;
export function getUserDetails(dc: DataConnect): QueryPromise<GetUserDetailsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function listFriendsRef(): QueryRef<ListFriendsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listFriendsRef(dc: DataConnect): QueryRef<ListFriendsData, undefined>;

export function listFriends(): QueryPromise<ListFriendsData, undefined>;
export function listFriends(dc: DataConnect): QueryPromise<ListFriendsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getUserHabitsRef(): QueryRef<GetUserHabitsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getUserHabitsRef(dc: DataConnect): QueryRef<GetUserHabitsData, undefined>;

export function getUserHabits(): QueryPromise<GetUserHabitsData, undefined>;
export function getUserHabits(dc: DataConnect): QueryPromise<GetUserHabitsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getHabitByIdRef(vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getHabitByIdRef(dc: DataConnect, vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;

export function getHabitById(vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;
export function getHabitById(dc: DataConnect, vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;

