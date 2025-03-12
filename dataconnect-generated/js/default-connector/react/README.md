# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserDetails*](#getuserdetails)
  - [*ListFriends*](#listfriends)
  - [*GetUserHabits*](#getuserhabits)
  - [*GetHabitById*](#gethabitbyid)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*AddFriend*](#addfriend)
  - [*RemoveFriend*](#removefriend)
  - [*CreateHabit*](#createhabit)
  - [*UpdateHabit*](#updatehabit)
  - [*DeleteHabit*](#deletehabit)
  - [*UpdateHabitStreak*](#updatehabitstreak)

# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#install_tanstack_query_firebase_packages), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react).

```javascript
import { connectDataConnectEmulator, getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries). To learn how to make "lazy loading" Queries, you can also read [this post](https://stackoverflow.com/a/70516680/21417394) by [TkDodo](https://tkdodo.eu/blog/) (Dominik Dorfmeister), a maintainer of TanStack React Query.

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no arguments, the Query hook function does not require arguments.
- If the Query accepts any arguments (including optional arguments), the Query hook function will require at least one argument: an object that contains all the required variables (and the optional variables) for the Query.
  - If all of the Query's arguments are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks also accept an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## GetUserDetails
You can execute the `GetUserDetails` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):
```javascript
useGetUserDetails(options?: useDataConnectQueryOptions<GetUserDetailsData>): UseQueryResult<FlattenedQueryResult<GetUserDetailsData, undefined>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserDetails(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseQueryResult<FlattenedQueryResult<GetUserDetailsData, undefined>, FirebaseError>;
```

### Variables
The `GetUserDetails` Query has no variables.
### Return Type
Recall that calling the `GetUserDetails` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserDetails` Query is of type `GetUserDetailsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserDetailsData {
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    totalStreak: number;
  } & User_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserDetails`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetUserDetails } from '@firebasegen/default-connector/react'

export default function GetUserDetailsComponent() {

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserDetails();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserDetails(dataConnect);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListFriends
You can execute the `ListFriends` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):
```javascript
useListFriends(options?: useDataConnectQueryOptions<ListFriendsData>): UseQueryResult<FlattenedQueryResult<ListFriendsData, undefined>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListFriends(dc: DataConnect, options?: useDataConnectQueryOptions<ListFriendsData>): UseQueryResult<FlattenedQueryResult<ListFriendsData, undefined>, FirebaseError>;
```

### Variables
The `ListFriends` Query has no variables.
### Return Type
Recall that calling the `ListFriends` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListFriends` Query is of type `ListFriendsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListFriends`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListFriends } from '@firebasegen/default-connector/react'

export default function ListFriendsComponent() {

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListFriends();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListFriends(dataConnect);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.friendships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserHabits
You can execute the `GetUserHabits` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):
```javascript
useGetUserHabits(options?: useDataConnectQueryOptions<GetUserHabitsData>): UseQueryResult<FlattenedQueryResult<GetUserHabitsData, undefined>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserHabits(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserHabitsData>): UseQueryResult<FlattenedQueryResult<GetUserHabitsData, undefined>, FirebaseError>;
```

### Variables
The `GetUserHabits` Query has no variables.
### Return Type
Recall that calling the `GetUserHabits` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserHabits` Query is of type `GetUserHabitsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserHabitsData {
  habits: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    category?: string | null;
    streakGoal: number;
  } & Habit_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserHabits`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetUserHabits } from '@firebasegen/default-connector/react'

export default function GetUserHabitsComponent() {

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserHabits();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserHabits(dataConnect);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.habits);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetHabitById
You can execute the `GetHabitById` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):
```javascript
useGetHabitById(vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseQueryResult<FlattenedQueryResult<GetHabitByIdData, GetHabitByIdVariables>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetHabitById(dc: DataConnect, vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseQueryResult<FlattenedQueryResult<GetHabitByIdData, GetHabitByIdVariables>, FirebaseError>;
```

### Variables
The `GetHabitById` Query requires an argument of type `GetHabitByIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetHabitByIdVariables {
  habitId: UUIDString;
}
```
### Return Type
Recall that calling the `GetHabitById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetHabitById` Query is of type `GetHabitByIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetHabitById`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, GetHabitByIdVariables } from '@firebasegen/default-connector';
import { useGetHabitById } from '@firebasegen/default-connector/react'

export default function GetHabitByIdComponent() {
  // The `useGetHabitById` Query hook requires an argument of type `GetHabitByIdVariables`:
  const getHabitByIdVars: GetHabitByIdVariables = {
    habitId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetHabitById(getHabitByIdVars);
  // Variables can be defined inline as well.
  const query = useGetHabitById({ habitId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetHabitById(dataConnect, getHabitByIdVars);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.habit);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no arguments, the `mutate()` function does not require arguments.
- If the Mutation accepts any arguments (including optional arguments), the `mutate()` function will require at least one argument: an object that contains all the required variables (and the optional variables) for the Mutation.
  - If all of the Mutation's arguments are optional, the `mutate()` function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments, and you want to pass options to `UseMutationResult.mutate()`, you must pass `undefined` as the first argument (where you would normally pass the Mutation's arguments) to `UseMutationResult.mutate()`, and then the options as the second argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## CreateUser
You can execute the `CreateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseMutationResult<FlattenedMutationResult<CreateUserData, CreateUserVariables>, FirebaseError, CreateUserVariables | void>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseMutationResult<FlattenedMutationResult<CreateUserData, CreateUserVariables>, FirebaseError, CreateUserVariables | void>;
```

### Variables
The `CreateUser` Mutation requires an argument of type `CreateUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateUserVariables {
  username?: string;
  email?: string;
}
```
### Return Type
Recall that calling the `CreateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateUser` Mutation is of type `CreateUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUserData {
  user_insert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateUser`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateUserVariables } from '@firebasegen/default-connector';
import { useCreateUser } from '@firebasegen/default-connector/react'

export default function CreateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateUser();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateUser(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateUser` Mutation requires an argument of type `CreateUserVariables`:
  const createUserVars: CreateUserVariables = {
    username: ..., // optional
    email: ..., // optional
  };
  mutation.mutate(createUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ username: ..., email: ..., });
  // Since all variables are optional for this Mutation, you can omit the `CreateUserVariables` argument.
  mutation.mutate();

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddFriend
You can execute the `AddFriend` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAddFriend(options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseMutationResult<FlattenedMutationResult<AddFriendData, AddFriendVariables>, FirebaseError, AddFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseMutationResult<FlattenedMutationResult<AddFriendData, AddFriendVariables>, FirebaseError, AddFriendVariables>;
```

### Variables
The `AddFriend` Mutation requires an argument of type `AddFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that calling the `AddFriend` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddFriend` Mutation is of type `AddFriendData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddFriendData {
  friendship_insert: Friendship_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddFriend`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, AddFriendVariables } from '@firebasegen/default-connector';
import { useAddFriend } from '@firebasegen/default-connector/react'

export default function AddFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddFriend();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddFriend(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddFriend` Mutation requires an argument of type `AddFriendVariables`:
  const addFriendVars: AddFriendVariables = {
    friendId: ..., 
  };
  mutation.mutate(addFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ friendId: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.friendship_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveFriend
You can execute the `RemoveFriend` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveFriend(options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseMutationResult<FlattenedMutationResult<RemoveFriendData, RemoveFriendVariables>, FirebaseError, RemoveFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveFriend(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveFriendData, FirebaseError, RemoveFriendVariables>): UseMutationResult<FlattenedMutationResult<RemoveFriendData, RemoveFriendVariables>, FirebaseError, RemoveFriendVariables>;
```

### Variables
The `RemoveFriend` Mutation requires an argument of type `RemoveFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that calling the `RemoveFriend` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveFriend` Mutation is of type `RemoveFriendData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveFriendData {
  friendship_delete?: Friendship_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveFriend`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveFriendVariables } from '@firebasegen/default-connector';
import { useRemoveFriend } from '@firebasegen/default-connector/react'

export default function RemoveFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveFriend();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveFriend(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveFriend` Mutation requires an argument of type `RemoveFriendVariables`:
  const removeFriendVars: RemoveFriendVariables = {
    friendId: ..., 
  };
  mutation.mutate(removeFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ friendId: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.friendship_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateHabit
You can execute the `CreateHabit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateHabit(options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseMutationResult<FlattenedMutationResult<CreateHabitData, CreateHabitVariables>, FirebaseError, CreateHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseMutationResult<FlattenedMutationResult<CreateHabitData, CreateHabitVariables>, FirebaseError, CreateHabitVariables>;
```

### Variables
The `CreateHabit` Mutation requires an argument of type `CreateHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateHabitVariables {
  title: string;
  description: string;
  category: string;
  streakGoal: number;
}
```
### Return Type
Recall that calling the `CreateHabit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateHabit` Mutation is of type `CreateHabitData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateHabitData {
  habit_insert: Habit_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateHabit`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateHabitVariables } from '@firebasegen/default-connector';
import { useCreateHabit } from '@firebasegen/default-connector/react'

export default function CreateHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateHabit();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateHabit(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateHabit` Mutation requires an argument of type `CreateHabitVariables`:
  const createHabitVars: CreateHabitVariables = {
    title: ..., 
    description: ..., 
    category: ..., 
    streakGoal: ..., 
  };
  mutation.mutate(createHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ title: ..., description: ..., category: ..., streakGoal: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.habit_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateHabit
You can execute the `UpdateHabit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateHabit(options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitData, UpdateHabitVariables>, FirebaseError, UpdateHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitData, UpdateHabitVariables>, FirebaseError, UpdateHabitVariables>;
```

### Variables
The `UpdateHabit` Mutation requires an argument of type `UpdateHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateHabitVariables {
  habitId: UUIDString;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  streakGoal?: number | null;
}
```
### Return Type
Recall that calling the `UpdateHabit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateHabit` Mutation is of type `UpdateHabitData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateHabit`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateHabitVariables } from '@firebasegen/default-connector';
import { useUpdateHabit } from '@firebasegen/default-connector/react'

export default function UpdateHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateHabit();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateHabit(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateHabit` Mutation requires an argument of type `UpdateHabitVariables`:
  const updateHabitVars: UpdateHabitVariables = {
    habitId: ..., 
    title: ..., // optional
    description: ..., // optional
    category: ..., // optional
    streakGoal: ..., // optional
  };
  mutation.mutate(updateHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., title: ..., description: ..., category: ..., streakGoal: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.habit_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteHabit
You can execute the `DeleteHabit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteHabit(options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseMutationResult<FlattenedMutationResult<DeleteHabitData, DeleteHabitVariables>, FirebaseError, DeleteHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseMutationResult<FlattenedMutationResult<DeleteHabitData, DeleteHabitVariables>, FirebaseError, DeleteHabitVariables>;
```

### Variables
The `DeleteHabit` Mutation requires an argument of type `DeleteHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteHabitVariables {
  habitId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteHabit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteHabit` Mutation is of type `DeleteHabitData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteHabit`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteHabitVariables } from '@firebasegen/default-connector';
import { useDeleteHabit } from '@firebasegen/default-connector/react'

export default function DeleteHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteHabit();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteHabit(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteHabit` Mutation requires an argument of type `DeleteHabitVariables`:
  const deleteHabitVars: DeleteHabitVariables = {
    habitId: ..., 
  };
  mutation.mutate(deleteHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.habit_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateHabitStreak
You can execute the `UpdateHabitStreak` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateHabitStreak(options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>, FirebaseError, UpdateHabitStreakVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateHabitStreak(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseMutationResult<FlattenedMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>, FirebaseError, UpdateHabitStreakVariables>;
```

### Variables
The `UpdateHabitStreak` Mutation requires an argument of type `UpdateHabitStreakVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateHabitStreakVariables {
  habitId: UUIDString;
  currentStreak: number;
  longestStreak: number;
  lastTrackedDate: TimestampString;
}
```
### Return Type
Recall that calling the `UpdateHabitStreak` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateHabitStreak` Mutation is of type `UpdateHabitStreakData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateHabitStreakData {
  userHabit_upsert: UserHabit_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateHabitStreak`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateHabitStreakVariables } from '@firebasegen/default-connector';
import { useUpdateHabitStreak } from '@firebasegen/default-connector/react'

export default function UpdateHabitStreakComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateHabitStreak();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateHabitStreak(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateHabitStreak` Mutation requires an argument of type `UpdateHabitStreakVariables`:
  const updateHabitStreakVars: UpdateHabitStreakVariables = {
    habitId: ..., 
    currentStreak: ..., 
    longestStreak: ..., 
    lastTrackedDate: ..., 
  };
  mutation.mutate(updateHabitStreakVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., currentStreak: ..., longestStreak: ..., lastTrackedDate: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userHabit_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

