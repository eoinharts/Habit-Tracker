import { CreateUserData, CreateUserVariables, AddFriendData, AddFriendVariables, RemoveFriendData, RemoveFriendVariables, AcceptFriendRequestData, AcceptFriendRequestVariables, DeclineFriendRequestData, DeclineFriendRequestVariables, AddReverseFriendData, AddReverseFriendVariables, CreateHabitData, CreateHabitVariables, UpdateHabitData, UpdateHabitVariables, DeleteHabitData, DeleteHabitVariables, UpdateHabitStreakData, UpdateHabitStreakVariables, GetUserDetailsData, GetUserDetailsVariables, GetAllUsersData, ListFriendsData, ListIncomingRequestsData, GetUserHabitsData, GetHabitByIdData, GetHabitByIdVariables, DebugFriendshipsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useAddFriend(options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseDataConnectMutationResult<AddFriendData, AddFriendVariables>;
export function useAddFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseDataConnectMutationResult<AddFriendData, AddFriendVariables>;

export function useRemoveFriend(options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseDataConnectMutationResult<RemoveFriendData, RemoveFriendVariables>;
export function useRemoveFriend(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseDataConnectMutationResult<RemoveFriendData, RemoveFriendVariables>;

export function useAcceptFriendRequest(options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseDataConnectMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>;
export function useAcceptFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseDataConnectMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>;

export function useDeclineFriendRequest(options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseDataConnectMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>;
export function useDeclineFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseDataConnectMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>;

export function useAddReverseFriend(options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseDataConnectMutationResult<AddReverseFriendData, AddReverseFriendVariables>;
export function useAddReverseFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseDataConnectMutationResult<AddReverseFriendData, AddReverseFriendVariables>;

export function useCreateHabit(options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseDataConnectMutationResult<CreateHabitData, CreateHabitVariables>;
export function useCreateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseDataConnectMutationResult<CreateHabitData, CreateHabitVariables>;

export function useUpdateHabit(options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;
export function useUpdateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;

export function useDeleteHabit(options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;
export function useDeleteHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;

export function useUpdateHabitStreak(options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseDataConnectMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>;
export function useUpdateHabitStreak(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseDataConnectMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>;

export function useGetUserDetails(vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseDataConnectQueryResult<GetUserDetailsData, GetUserDetailsVariables>;
export function useGetUserDetails(dc: DataConnect, vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseDataConnectQueryResult<GetUserDetailsData, GetUserDetailsVariables>;

export function useGetAllUsers(options?: useDataConnectQueryOptions<GetAllUsersData>): UseDataConnectQueryResult<GetAllUsersData, undefined>;
export function useGetAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllUsersData>): UseDataConnectQueryResult<GetAllUsersData, undefined>;

export function useListFriends(options?: useDataConnectQueryOptions<ListFriendsData>): UseDataConnectQueryResult<ListFriendsData, undefined>;
export function useListFriends(dc: DataConnect, options?: useDataConnectQueryOptions<ListFriendsData>): UseDataConnectQueryResult<ListFriendsData, undefined>;

export function useListIncomingRequests(options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;
export function useListIncomingRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;

export function useGetUserHabits(options?: useDataConnectQueryOptions<GetUserHabitsData>): UseDataConnectQueryResult<GetUserHabitsData, undefined>;
export function useGetUserHabits(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserHabitsData>): UseDataConnectQueryResult<GetUserHabitsData, undefined>;

export function useGetHabitById(vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseDataConnectQueryResult<GetHabitByIdData, GetHabitByIdVariables>;
export function useGetHabitById(dc: DataConnect, vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseDataConnectQueryResult<GetHabitByIdData, GetHabitByIdVariables>;

export function useDebugFriendships(options?: useDataConnectQueryOptions<DebugFriendshipsData>): UseDataConnectQueryResult<DebugFriendshipsData, undefined>;
export function useDebugFriendships(dc: DataConnect, options?: useDataConnectQueryOptions<DebugFriendshipsData>): UseDataConnectQueryResult<DebugFriendshipsData, undefined>;
