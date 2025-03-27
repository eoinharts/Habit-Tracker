import { CreateUserData, CreateUserVariables, AddFriendData, AddFriendVariables, RemoveFriendData, RemoveFriendVariables, AcceptFriendRequestData, AcceptFriendRequestVariables, DeclineFriendRequestData, DeclineFriendRequestVariables, AddReverseFriendData, AddReverseFriendVariables, CreateHabitData, CreateHabitVariables, UpdateHabitData, UpdateHabitVariables, DeleteHabitData, DeleteHabitVariables, UpdateHabitStreakData, UpdateHabitStreakVariables, GetUserDetailsData, GetUserDetailsVariables, GetAllUsersData, ListFriendsData, GetUserHabitsData, GetHabitByIdData, GetHabitByIdVariables, ListIncomingRequestsData } from '../';
import { FlattenedQueryResult, useDataConnectQueryOptions, FlattenedMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseMutationResult<FlattenedMutationResult<CreateUserData, CreateUserVariables>, FirebaseError, CreateUserVariables | void>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseMutationResult<FlattenedMutationResult<CreateUserData, CreateUserVariables>, FirebaseError, CreateUserVariables | void>;

export function useAddFriend(options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseMutationResult<FlattenedMutationResult<AddFriendData, AddFriendVariables>, FirebaseError, AddFriendVariables>;
export function useAddFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseMutationResult<FlattenedMutationResult<AddFriendData, AddFriendVariables>, FirebaseError, AddFriendVariables>;

export function useRemoveFriend(options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseMutationResult<FlattenedMutationResult<RemoveFriendData, RemoveFriendVariables>, FirebaseError, RemoveFriendVariables>;
export function useRemoveFriend(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseMutationResult<FlattenedMutationResult<RemoveFriendData, RemoveFriendVariables>, FirebaseError, RemoveFriendVariables>;

export function useAcceptFriendRequest(options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseMutationResult<FlattenedMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>, FirebaseError, AcceptFriendRequestVariables>;
export function useAcceptFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseMutationResult<FlattenedMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>, FirebaseError, AcceptFriendRequestVariables>;

export function useDeclineFriendRequest(options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseMutationResult<FlattenedMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>, FirebaseError, DeclineFriendRequestVariables>;
export function useDeclineFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseMutationResult<FlattenedMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>, FirebaseError, DeclineFriendRequestVariables>;

export function useAddReverseFriend(options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseMutationResult<FlattenedMutationResult<AddReverseFriendData, AddReverseFriendVariables>, FirebaseError, AddReverseFriendVariables>;
export function useAddReverseFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseMutationResult<FlattenedMutationResult<AddReverseFriendData, AddReverseFriendVariables>, FirebaseError, AddReverseFriendVariables>;

export function useCreateHabit(options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseMutationResult<FlattenedMutationResult<CreateHabitData, CreateHabitVariables>, FirebaseError, CreateHabitVariables>;
export function useCreateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseMutationResult<FlattenedMutationResult<CreateHabitData, CreateHabitVariables>, FirebaseError, CreateHabitVariables>;

export function useUpdateHabit(options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitData, UpdateHabitVariables>, FirebaseError, UpdateHabitVariables>;
export function useUpdateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitData, UpdateHabitVariables>, FirebaseError, UpdateHabitVariables>;

export function useDeleteHabit(options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseMutationResult<FlattenedMutationResult<DeleteHabitData, DeleteHabitVariables>, FirebaseError, DeleteHabitVariables>;
export function useDeleteHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseMutationResult<FlattenedMutationResult<DeleteHabitData, DeleteHabitVariables>, FirebaseError, DeleteHabitVariables>;

export function useUpdateHabitStreak(options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>, FirebaseError, UpdateHabitStreakVariables>;
export function useUpdateHabitStreak(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>, FirebaseError, UpdateHabitStreakVariables>;

export function useGetUserDetails(vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseQueryResult<FlattenedQueryResult<GetUserDetailsData, GetUserDetailsVariables>, FirebaseError>;
export function useGetUserDetails(dc: DataConnect, vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseQueryResult<FlattenedQueryResult<GetUserDetailsData, GetUserDetailsVariables>, FirebaseError>;

export function useGetAllUsers(options?: useDataConnectQueryOptions<GetAllUsersData>): UseQueryResult<FlattenedQueryResult<GetAllUsersData, undefined>, FirebaseError>;
export function useGetAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllUsersData>): UseQueryResult<FlattenedQueryResult<GetAllUsersData, undefined>, FirebaseError>;

export function useListFriends(options?: useDataConnectQueryOptions<ListFriendsData>): UseQueryResult<FlattenedQueryResult<ListFriendsData, undefined>, FirebaseError>;
export function useListFriends(dc: DataConnect, options?: useDataConnectQueryOptions<ListFriendsData>): UseQueryResult<FlattenedQueryResult<ListFriendsData, undefined>, FirebaseError>;

export function useGetUserHabits(options?: useDataConnectQueryOptions<GetUserHabitsData>): UseQueryResult<FlattenedQueryResult<GetUserHabitsData, undefined>, FirebaseError>;
export function useGetUserHabits(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserHabitsData>): UseQueryResult<FlattenedQueryResult<GetUserHabitsData, undefined>, FirebaseError>;

export function useGetHabitById(vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseQueryResult<FlattenedQueryResult<GetHabitByIdData, GetHabitByIdVariables>, FirebaseError>;
export function useGetHabitById(dc: DataConnect, vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseQueryResult<FlattenedQueryResult<GetHabitByIdData, GetHabitByIdVariables>, FirebaseError>;

export function useListIncomingRequests(options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseQueryResult<FlattenedQueryResult<ListIncomingRequestsData, undefined>, FirebaseError>;
export function useListIncomingRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseQueryResult<FlattenedQueryResult<ListIncomingRequestsData, undefined>, FirebaseError>;
