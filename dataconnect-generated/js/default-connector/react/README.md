# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserDetails*](#getuserdetails)
  - [*GetAllUsers*](#getallusers)
  - [*ListFriends*](#listfriends)
  - [*ListIncomingRequests*](#listincomingrequests)
  - [*GetUserHabit*](#getuserhabit)
  - [*GetHabitsWithUserDetails*](#gethabitswithuserdetails)
  - [*GetHabitById*](#gethabitbyid)
  - [*ListAchievements*](#listachievements)
  - [*ListMyAchievements*](#listmyachievements)
  - [*ListUserAchievements*](#listuserachievements)
  - [*DebugFriendships*](#debugfriendships)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*AddFriend*](#addfriend)
  - [*DeleteFriend*](#deletefriend)
  - [*RemoveReverseFriend*](#removereversefriend)
  - [*AcceptFriendRequest*](#acceptfriendrequest)
  - [*DeclineFriendRequest*](#declinefriendrequest)
  - [*AddReverseFriend*](#addreversefriend)
  - [*CreateHabit*](#createhabit)
  - [*UpdateHabit*](#updatehabit)
  - [*DeleteHabit*](#deletehabit)
  - [*UpdateHabitStreak*](#updatehabitstreak)
  - [*updatePoints*](#updatepoints)
  - [*DeleteUserHabit*](#deleteuserhabit)
  - [*UnlockAchievement*](#unlockachievement)
  - [*CreateAchievement*](#createachievement)

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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## GetUserDetails
You can execute the `GetUserDetails` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetUserDetails(dc: DataConnect, vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseDataConnectQueryResult<GetUserDetailsData, GetUserDetailsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserDetails(vars: GetUserDetailsVariables, options?: useDataConnectQueryOptions<GetUserDetailsData>): UseDataConnectQueryResult<GetUserDetailsData, GetUserDetailsVariables>;
```

### Variables
The `GetUserDetails` Query requires an argument of type `GetUserDetailsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserDetailsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetUserDetails` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserDetails` Query is of type `GetUserDetailsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserDetails`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserDetailsVariables } from '@firebasegen/default-connector';
import { useGetUserDetails } from '@firebasegen/default-connector/react'

export default function GetUserDetailsComponent() {

  // The `useGetUserDetails` Query hook requires an argument of type `GetUserDetailsVariables`:
  const getUserDetailsVars: GetUserDetailsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserDetails(getUserDetailsVars);
  // Variables can be defined inline as well.
  const query = useGetUserDetails({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserDetails(dataConnect, getUserDetailsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserDetails(getUserDetailsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserDetails(dataConnect, getUserDetailsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllUsers
You can execute the `GetAllUsers` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllUsersData>): UseDataConnectQueryResult<GetAllUsersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllUsers(options?: useDataConnectQueryOptions<GetAllUsersData>): UseDataConnectQueryResult<GetAllUsersData, undefined>;
```

### Variables
The `GetAllUsers` Query has no variables.
### Return Type
Recall that calling the `GetAllUsers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllUsers` Query is of type `GetAllUsersData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetAllUsersData {
  users: ({
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    totalStreak: number;
  } & User_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllUsers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetAllUsers } from '@firebasegen/default-connector/react'

export default function GetAllUsersComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllUsers();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllUsers(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllUsers(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllUsers(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListFriends
You can execute the `ListFriends` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListFriends(dc: DataConnect, vars: ListFriendsVariables, options?: useDataConnectQueryOptions<ListFriendsData>): UseDataConnectQueryResult<ListFriendsData, ListFriendsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListFriends(vars: ListFriendsVariables, options?: useDataConnectQueryOptions<ListFriendsData>): UseDataConnectQueryResult<ListFriendsData, ListFriendsVariables>;
```

### Variables
The `ListFriends` Query requires an argument of type `ListFriendsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListFriendsVariables {
  uid: string;
}
```
### Return Type
Recall that calling the `ListFriends` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListFriends` Query is of type `ListFriendsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListFriends`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListFriendsVariables } from '@firebasegen/default-connector';
import { useListFriends } from '@firebasegen/default-connector/react'

export default function ListFriendsComponent() {

  // The `useListFriends` Query hook requires an argument of type `ListFriendsVariables`:
  const listFriendsVars: ListFriendsVariables = {
    uid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListFriends(listFriendsVars);
  // Variables can be defined inline as well.
  const query = useListFriends({ uid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListFriends(dataConnect, listFriendsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListFriends(listFriendsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListFriends(dataConnect, listFriendsVars, options);

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

## ListIncomingRequests
You can execute the `ListIncomingRequests` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListIncomingRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListIncomingRequests(options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;
```

### Variables
The `ListIncomingRequests` Query has no variables.
### Return Type
Recall that calling the `ListIncomingRequests` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListIncomingRequests` Query is of type `ListIncomingRequestsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListIncomingRequests`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListIncomingRequests } from '@firebasegen/default-connector/react'

export default function ListIncomingRequestsComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListIncomingRequests();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListIncomingRequests(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListIncomingRequests(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListIncomingRequests(dataConnect, options);

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

## GetUserHabit
You can execute the `GetUserHabit` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetUserHabit(dc: DataConnect, vars: GetUserHabitVariables, options?: useDataConnectQueryOptions<GetUserHabitData>): UseDataConnectQueryResult<GetUserHabitData, GetUserHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserHabit(vars: GetUserHabitVariables, options?: useDataConnectQueryOptions<GetUserHabitData>): UseDataConnectQueryResult<GetUserHabitData, GetUserHabitVariables>;
```

### Variables
The `GetUserHabit` Query requires an argument of type `GetUserHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserHabitVariables {
  uid: string;
}
```
### Return Type
Recall that calling the `GetUserHabit` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserHabit` Query is of type `GetUserHabitData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserHabit`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserHabitVariables } from '@firebasegen/default-connector';
import { useGetUserHabit } from '@firebasegen/default-connector/react'

export default function GetUserHabitComponent() {

  // The `useGetUserHabit` Query hook requires an argument of type `GetUserHabitVariables`:
  const getUserHabitVars: GetUserHabitVariables = {
    uid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserHabit(getUserHabitVars);
  // Variables can be defined inline as well.
  const query = useGetUserHabit({ uid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserHabit(dataConnect, getUserHabitVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserHabit(getUserHabitVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserHabit(dataConnect, getUserHabitVars, options);

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

## GetHabitsWithUserDetails
You can execute the `GetHabitsWithUserDetails` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetHabitsWithUserDetails(dc: DataConnect, vars: GetHabitsWithUserDetailsVariables, options?: useDataConnectQueryOptions<GetHabitsWithUserDetailsData>): UseDataConnectQueryResult<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetHabitsWithUserDetails(vars: GetHabitsWithUserDetailsVariables, options?: useDataConnectQueryOptions<GetHabitsWithUserDetailsData>): UseDataConnectQueryResult<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
```

### Variables
The `GetHabitsWithUserDetails` Query requires an argument of type `GetHabitsWithUserDetailsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetHabitsWithUserDetailsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetHabitsWithUserDetails` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetHabitsWithUserDetails` Query is of type `GetHabitsWithUserDetailsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetHabitsWithUserDetails`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetHabitsWithUserDetailsVariables } from '@firebasegen/default-connector';
import { useGetHabitsWithUserDetails } from '@firebasegen/default-connector/react'

export default function GetHabitsWithUserDetailsComponent() {

  // The `useGetHabitsWithUserDetails` Query hook requires an argument of type `GetHabitsWithUserDetailsVariables`:
  const getHabitsWithUserDetailsVars: GetHabitsWithUserDetailsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetHabitsWithUserDetails(getHabitsWithUserDetailsVars);
  // Variables can be defined inline as well.
  const query = useGetHabitsWithUserDetails({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetHabitsWithUserDetails(dataConnect, getHabitsWithUserDetailsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetHabitsWithUserDetails(getHabitsWithUserDetailsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetHabitsWithUserDetails(dataConnect, getHabitsWithUserDetailsVars, options);

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

## GetHabitById
You can execute the `GetHabitById` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetHabitById(dc: DataConnect, vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseDataConnectQueryResult<GetHabitByIdData, GetHabitByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetHabitById(vars: GetHabitByIdVariables, options?: useDataConnectQueryOptions<GetHabitByIdData>): UseDataConnectQueryResult<GetHabitByIdData, GetHabitByIdVariables>;
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
import { getDataConnect } from 'firebase/data-connect';
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

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetHabitById(getHabitByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetHabitById(dataConnect, getHabitByIdVars, options);

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

## ListAchievements
You can execute the `ListAchievements` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListAchievements(dc: DataConnect, options?: useDataConnectQueryOptions<ListAchievementsData>): UseDataConnectQueryResult<ListAchievementsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAchievements(options?: useDataConnectQueryOptions<ListAchievementsData>): UseDataConnectQueryResult<ListAchievementsData, undefined>;
```

### Variables
The `ListAchievements` Query has no variables.
### Return Type
Recall that calling the `ListAchievements` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAchievements` Query is of type `ListAchievementsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListAchievementsData {
  achievements: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    criteria?: string | null;
    icon?: string | null;
  } & Achievement_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListAchievements`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListAchievements } from '@firebasegen/default-connector/react'

export default function ListAchievementsComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAchievements();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAchievements(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAchievements(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAchievements(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.achievements);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListMyAchievements
You can execute the `ListMyAchievements` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListMyAchievements(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyAchievementsData>): UseDataConnectQueryResult<ListMyAchievementsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListMyAchievements(options?: useDataConnectQueryOptions<ListMyAchievementsData>): UseDataConnectQueryResult<ListMyAchievementsData, undefined>;
```

### Variables
The `ListMyAchievements` Query has no variables.
### Return Type
Recall that calling the `ListMyAchievements` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListMyAchievements` Query is of type `ListMyAchievementsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListMyAchievementsData {
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListMyAchievements`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListMyAchievements } from '@firebasegen/default-connector/react'

export default function ListMyAchievementsComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListMyAchievements();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListMyAchievements(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAchievements(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListMyAchievements(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.userAchievements);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListUserAchievements
You can execute the `ListUserAchievements` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListUserAchievements(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserAchievementsData>): UseDataConnectQueryResult<ListUserAchievementsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUserAchievements(options?: useDataConnectQueryOptions<ListUserAchievementsData>): UseDataConnectQueryResult<ListUserAchievementsData, undefined>;
```

### Variables
The `ListUserAchievements` Query has no variables.
### Return Type
Recall that calling the `ListUserAchievements` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUserAchievements` Query is of type `ListUserAchievementsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUserAchievements`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListUserAchievements } from '@firebasegen/default-connector/react'

export default function ListUserAchievementsComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUserAchievements();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUserAchievements(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUserAchievements(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUserAchievements(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.userAchievements);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DebugFriendships
You can execute the `DebugFriendships` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useDebugFriendships(dc: DataConnect, options?: useDataConnectQueryOptions<DebugFriendshipsData>): UseDataConnectQueryResult<DebugFriendshipsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useDebugFriendships(options?: useDataConnectQueryOptions<DebugFriendshipsData>): UseDataConnectQueryResult<DebugFriendshipsData, undefined>;
```

### Variables
The `DebugFriendships` Query has no variables.
### Return Type
Recall that calling the `DebugFriendships` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `DebugFriendships` Query is of type `DebugFriendshipsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DebugFriendshipsData {
  friendships: ({
    user1Id: string;
    user2Id: string;
    status: string;
  } & Friendship_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `DebugFriendships`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useDebugFriendships } from '@firebasegen/default-connector/react'

export default function DebugFriendshipsComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useDebugFriendships();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useDebugFriendships(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useDebugFriendships(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useDebugFriendships(dataConnect, options);

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

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## CreateUser
You can execute the `CreateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables | void>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```

### Variables
The `CreateUser` Mutation has an optional argument of type `CreateUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateUserVariables {
  id?: string;
  name?: string;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateUserVariables } from '@firebasegen/default-connector';
import { useCreateUser } from '@firebasegen/default-connector/react'

export default function CreateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateUser` Mutation has an optional argument of type `CreateUserVariables`:
  const createUserVars: CreateUserVariables = {
    id: ..., // optional
    name: ..., // optional
    email: ..., // optional
  };
  mutation.mutate(createUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., email: ..., });
  // Since all variables are optional for this Mutation, you can omit the `CreateUserVariables` argument.
  mutation.mutate();

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  // Since all variables are optional for this Mutation, you can provide options without providing any variables.
  // To do so, you must pass `undefined` where you would normally pass the variables.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createUserVars /** or undefined */, options);

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
useAddFriend(options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseDataConnectMutationResult<AddFriendData, AddFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddFriendData, FirebaseError, AddFriendVariables>): UseDataConnectMutationResult<AddFriendData, AddFriendVariables>;
```

### Variables
The `AddFriend` Mutation requires an argument of type `AddFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddFriendVariables {
  friendId: string;
  currentUserId: string;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddFriendVariables } from '@firebasegen/default-connector';
import { useAddFriend } from '@firebasegen/default-connector/react'

export default function AddFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddFriend();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddFriend(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddFriend(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddFriend(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddFriend` Mutation requires an argument of type `AddFriendVariables`:
  const addFriendVars: AddFriendVariables = {
    friendId: ..., 
    currentUserId: ..., 
  };
  mutation.mutate(addFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ friendId: ..., currentUserId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addFriendVars, options);

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

## DeleteFriend
You can execute the `DeleteFriend` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteFriend(options?: useDataConnectMutationOptions<DeleteFriendData, FirebaseError, DeleteFriendVariables>): UseDataConnectMutationResult<DeleteFriendData, DeleteFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteFriend(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFriendData, FirebaseError, DeleteFriendVariables>): UseDataConnectMutationResult<DeleteFriendData, DeleteFriendVariables>;
```

### Variables
The `DeleteFriend` Mutation requires an argument of type `DeleteFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteFriendVariables {
  currentUserId: string;
  friendId: string;
}
```
### Return Type
Recall that calling the `DeleteFriend` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteFriend` Mutation is of type `DeleteFriendData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteFriendData {
  first?: Friendship_Key | null;
  second?: Friendship_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteFriend`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteFriendVariables } from '@firebasegen/default-connector';
import { useDeleteFriend } from '@firebasegen/default-connector/react'

export default function DeleteFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteFriend();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteFriend(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteFriend(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteFriend(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteFriend` Mutation requires an argument of type `DeleteFriendVariables`:
  const deleteFriendVars: DeleteFriendVariables = {
    currentUserId: ..., 
    friendId: ..., 
  };
  mutation.mutate(deleteFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ currentUserId: ..., friendId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteFriendVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.first);
    console.log(mutation.data.second);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveReverseFriend
You can execute the `RemoveReverseFriend` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveReverseFriend(options?: useDataConnectMutationOptions<RemoveReverseFriendData, FirebaseError, RemoveReverseFriendVariables>): UseDataConnectMutationResult<RemoveReverseFriendData, RemoveReverseFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveReverseFriend(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveReverseFriendData, FirebaseError, RemoveReverseFriendVariables>): UseDataConnectMutationResult<RemoveReverseFriendData, RemoveReverseFriendVariables>;
```

### Variables
The `RemoveReverseFriend` Mutation requires an argument of type `RemoveReverseFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveReverseFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that calling the `RemoveReverseFriend` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveReverseFriend` Mutation is of type `RemoveReverseFriendData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveReverseFriendData {
  friendship_delete?: Friendship_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveReverseFriend`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveReverseFriendVariables } from '@firebasegen/default-connector';
import { useRemoveReverseFriend } from '@firebasegen/default-connector/react'

export default function RemoveReverseFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveReverseFriend();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveReverseFriend(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveReverseFriend(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveReverseFriend(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveReverseFriend` Mutation requires an argument of type `RemoveReverseFriendVariables`:
  const removeReverseFriendVars: RemoveReverseFriendVariables = {
    friendId: ..., 
  };
  mutation.mutate(removeReverseFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ friendId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeReverseFriendVars, options);

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

## AcceptFriendRequest
You can execute the `AcceptFriendRequest` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAcceptFriendRequest(options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseDataConnectMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAcceptFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<AcceptFriendRequestData, FirebaseError, AcceptFriendRequestVariables>): UseDataConnectMutationResult<AcceptFriendRequestData, AcceptFriendRequestVariables>;
```

### Variables
The `AcceptFriendRequest` Mutation requires an argument of type `AcceptFriendRequestVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AcceptFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}
```
### Return Type
Recall that calling the `AcceptFriendRequest` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AcceptFriendRequest` Mutation is of type `AcceptFriendRequestData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AcceptFriendRequestData {
  friendship_update?: Friendship_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AcceptFriendRequest`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AcceptFriendRequestVariables } from '@firebasegen/default-connector';
import { useAcceptFriendRequest } from '@firebasegen/default-connector/react'

export default function AcceptFriendRequestComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAcceptFriendRequest();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAcceptFriendRequest(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAcceptFriendRequest(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAcceptFriendRequest(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAcceptFriendRequest` Mutation requires an argument of type `AcceptFriendRequestVariables`:
  const acceptFriendRequestVars: AcceptFriendRequestVariables = {
    user1Id: ..., 
    user2Id: ..., 
  };
  mutation.mutate(acceptFriendRequestVars);
  // Variables can be defined inline as well.
  mutation.mutate({ user1Id: ..., user2Id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(acceptFriendRequestVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.friendship_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeclineFriendRequest
You can execute the `DeclineFriendRequest` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeclineFriendRequest(options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseDataConnectMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeclineFriendRequest(dc: DataConnect, options?: useDataConnectMutationOptions<DeclineFriendRequestData, FirebaseError, DeclineFriendRequestVariables>): UseDataConnectMutationResult<DeclineFriendRequestData, DeclineFriendRequestVariables>;
```

### Variables
The `DeclineFriendRequest` Mutation requires an argument of type `DeclineFriendRequestVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeclineFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}
```
### Return Type
Recall that calling the `DeclineFriendRequest` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeclineFriendRequest` Mutation is of type `DeclineFriendRequestData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeclineFriendRequestData {
  friendship_delete?: Friendship_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeclineFriendRequest`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeclineFriendRequestVariables } from '@firebasegen/default-connector';
import { useDeclineFriendRequest } from '@firebasegen/default-connector/react'

export default function DeclineFriendRequestComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeclineFriendRequest();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeclineFriendRequest(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeclineFriendRequest(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeclineFriendRequest(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeclineFriendRequest` Mutation requires an argument of type `DeclineFriendRequestVariables`:
  const declineFriendRequestVars: DeclineFriendRequestVariables = {
    user1Id: ..., 
    user2Id: ..., 
  };
  mutation.mutate(declineFriendRequestVars);
  // Variables can be defined inline as well.
  mutation.mutate({ user1Id: ..., user2Id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(declineFriendRequestVars, options);

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

## AddReverseFriend
You can execute the `AddReverseFriend` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAddReverseFriend(options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseDataConnectMutationResult<AddReverseFriendData, AddReverseFriendVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddReverseFriend(dc: DataConnect, options?: useDataConnectMutationOptions<AddReverseFriendData, FirebaseError, AddReverseFriendVariables>): UseDataConnectMutationResult<AddReverseFriendData, AddReverseFriendVariables>;
```

### Variables
The `AddReverseFriend` Mutation requires an argument of type `AddReverseFriendVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddReverseFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that calling the `AddReverseFriend` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddReverseFriend` Mutation is of type `AddReverseFriendData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddReverseFriendData {
  friendship_insert: Friendship_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddReverseFriend`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddReverseFriendVariables } from '@firebasegen/default-connector';
import { useAddReverseFriend } from '@firebasegen/default-connector/react'

export default function AddReverseFriendComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddReverseFriend();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddReverseFriend(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddReverseFriend(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddReverseFriend(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddReverseFriend` Mutation requires an argument of type `AddReverseFriendVariables`:
  const addReverseFriendVars: AddReverseFriendVariables = {
    friendId: ..., 
  };
  mutation.mutate(addReverseFriendVars);
  // Variables can be defined inline as well.
  mutation.mutate({ friendId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addReverseFriendVars, options);

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

## CreateHabit
You can execute the `CreateHabit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateHabit(options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseDataConnectMutationResult<CreateHabitData, CreateHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, CreateHabitVariables>): UseDataConnectMutationResult<CreateHabitData, CreateHabitVariables>;
```

### Variables
The `CreateHabit` Mutation requires an argument of type `CreateHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateHabitVariables {
  uid: string;
  title: string;
  description: string;
  category: string;
  streakGoal: number;
  emoji: string;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateHabitVariables } from '@firebasegen/default-connector';
import { useCreateHabit } from '@firebasegen/default-connector/react'

export default function CreateHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateHabit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateHabit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateHabit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateHabit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateHabit` Mutation requires an argument of type `CreateHabitVariables`:
  const createHabitVars: CreateHabitVariables = {
    uid: ..., 
    title: ..., 
    description: ..., 
    category: ..., 
    streakGoal: ..., 
    emoji: ..., 
  };
  mutation.mutate(createHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ uid: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createHabitVars, options);

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
useUpdateHabit(options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;
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
  emoji: string;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateHabitVariables } from '@firebasegen/default-connector';
import { useUpdateHabit } from '@firebasegen/default-connector/react'

export default function UpdateHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateHabit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateHabit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateHabit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateHabit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateHabit` Mutation requires an argument of type `UpdateHabitVariables`:
  const updateHabitVars: UpdateHabitVariables = {
    habitId: ..., 
    title: ..., // optional
    description: ..., // optional
    category: ..., // optional
    streakGoal: ..., // optional
    emoji: ..., 
  };
  mutation.mutate(updateHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateHabitVars, options);

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
useDeleteHabit(options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteHabitVariables } from '@firebasegen/default-connector';
import { useDeleteHabit } from '@firebasegen/default-connector/react'

export default function DeleteHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteHabit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteHabit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteHabit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteHabit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteHabit` Mutation requires an argument of type `DeleteHabitVariables`:
  const deleteHabitVars: DeleteHabitVariables = {
    habitId: ..., 
  };
  mutation.mutate(deleteHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteHabitVars, options);

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
useUpdateHabitStreak(options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseDataConnectMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateHabitStreak(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitStreakData, FirebaseError, UpdateHabitStreakVariables>): UseDataConnectMutationResult<UpdateHabitStreakData, UpdateHabitStreakVariables>;
```

### Variables
The `UpdateHabitStreak` Mutation requires an argument of type `UpdateHabitStreakVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateHabitStreakVariables {
  habitId: UUIDString;
  currentStreak: number;
  longestStreak: number;
  lastTrackedDate: TimestampString;
  userId?: string | null;
  points?: number | null;
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
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateHabitStreakVariables } from '@firebasegen/default-connector';
import { useUpdateHabitStreak } from '@firebasegen/default-connector/react'

export default function UpdateHabitStreakComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateHabitStreak();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateHabitStreak(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateHabitStreak(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateHabitStreak(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateHabitStreak` Mutation requires an argument of type `UpdateHabitStreakVariables`:
  const updateHabitStreakVars: UpdateHabitStreakVariables = {
    habitId: ..., 
    currentStreak: ..., 
    longestStreak: ..., 
    lastTrackedDate: ..., 
    userId: ..., // optional
    points: ..., // optional
  };
  mutation.mutate(updateHabitStreakVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., currentStreak: ..., longestStreak: ..., lastTrackedDate: ..., userId: ..., points: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateHabitStreakVars, options);

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

## updatePoints
You can execute the `updatePoints` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdatePoints(options?: useDataConnectMutationOptions<UpdatePointsData, FirebaseError, UpdatePointsVariables>): UseDataConnectMutationResult<UpdatePointsData, UpdatePointsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdatePoints(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePointsData, FirebaseError, UpdatePointsVariables>): UseDataConnectMutationResult<UpdatePointsData, UpdatePointsVariables>;
```

### Variables
The `updatePoints` Mutation requires an argument of type `UpdatePointsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdatePointsVariables {
  userId: string;
  points: number;
  totalStreak: number;
  newDate: TimestampString;
}
```
### Return Type
Recall that calling the `updatePoints` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `updatePoints` Mutation is of type `UpdatePointsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdatePointsData {
  user_update?: User_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `updatePoints`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdatePointsVariables } from '@firebasegen/default-connector';
import { useUpdatePoints } from '@firebasegen/default-connector/react'

export default function UpdatePointsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdatePoints();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdatePoints(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePoints(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePoints(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdatePoints` Mutation requires an argument of type `UpdatePointsVariables`:
  const updatePointsVars: UpdatePointsVariables = {
    userId: ..., 
    points: ..., 
    totalStreak: ..., 
    newDate: ..., 
  };
  mutation.mutate(updatePointsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., points: ..., totalStreak: ..., newDate: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updatePointsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteUserHabit
You can execute the `DeleteUserHabit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteUserHabit(options?: useDataConnectMutationOptions<DeleteUserHabitData, FirebaseError, DeleteUserHabitVariables>): UseDataConnectMutationResult<DeleteUserHabitData, DeleteUserHabitVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteUserHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserHabitData, FirebaseError, DeleteUserHabitVariables>): UseDataConnectMutationResult<DeleteUserHabitData, DeleteUserHabitVariables>;
```

### Variables
The `DeleteUserHabit` Mutation requires an argument of type `DeleteUserHabitVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteUserHabitVariables {
  habitId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that calling the `DeleteUserHabit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteUserHabit` Mutation is of type `DeleteUserHabitData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteUserHabitData {
  userHabit_delete?: UserHabit_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteUserHabit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteUserHabitVariables } from '@firebasegen/default-connector';
import { useDeleteUserHabit } from '@firebasegen/default-connector/react'

export default function DeleteUserHabitComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteUserHabit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteUserHabit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUserHabit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUserHabit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteUserHabit` Mutation requires an argument of type `DeleteUserHabitVariables`:
  const deleteUserHabitVars: DeleteUserHabitVariables = {
    habitId: ..., 
    userId: ..., 
  };
  mutation.mutate(deleteUserHabitVars);
  // Variables can be defined inline as well.
  mutation.mutate({ habitId: ..., userId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteUserHabitVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userHabit_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UnlockAchievement
You can execute the `UnlockAchievement` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUnlockAchievement(options?: useDataConnectMutationOptions<UnlockAchievementData, FirebaseError, UnlockAchievementVariables>): UseDataConnectMutationResult<UnlockAchievementData, UnlockAchievementVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUnlockAchievement(dc: DataConnect, options?: useDataConnectMutationOptions<UnlockAchievementData, FirebaseError, UnlockAchievementVariables>): UseDataConnectMutationResult<UnlockAchievementData, UnlockAchievementVariables>;
```

### Variables
The `UnlockAchievement` Mutation requires an argument of type `UnlockAchievementVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UnlockAchievementVariables {
  userId: string;
  achievementId: UUIDString;
}
```
### Return Type
Recall that calling the `UnlockAchievement` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UnlockAchievement` Mutation is of type `UnlockAchievementData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UnlockAchievementData {
  userAchievement_insert: UserAchievement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UnlockAchievement`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UnlockAchievementVariables } from '@firebasegen/default-connector';
import { useUnlockAchievement } from '@firebasegen/default-connector/react'

export default function UnlockAchievementComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUnlockAchievement();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUnlockAchievement(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUnlockAchievement(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUnlockAchievement(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUnlockAchievement` Mutation requires an argument of type `UnlockAchievementVariables`:
  const unlockAchievementVars: UnlockAchievementVariables = {
    userId: ..., 
    achievementId: ..., 
  };
  mutation.mutate(unlockAchievementVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., achievementId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(unlockAchievementVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userAchievement_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAchievement
You can execute the `CreateAchievement` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAchievement(options?: useDataConnectMutationOptions<CreateAchievementData, FirebaseError, CreateAchievementVariables>): UseDataConnectMutationResult<CreateAchievementData, CreateAchievementVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAchievement(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAchievementData, FirebaseError, CreateAchievementVariables>): UseDataConnectMutationResult<CreateAchievementData, CreateAchievementVariables>;
```

### Variables
The `CreateAchievement` Mutation requires an argument of type `CreateAchievementVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAchievementVariables {
  title: string;
  description?: string | null;
  criteria?: string | null;
  icon?: string | null;
}
```
### Return Type
Recall that calling the `CreateAchievement` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAchievement` Mutation is of type `CreateAchievementData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAchievementData {
  achievement_insert: Achievement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAchievement`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAchievementVariables } from '@firebasegen/default-connector';
import { useCreateAchievement } from '@firebasegen/default-connector/react'

export default function CreateAchievementComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAchievement();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAchievement(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAchievement(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAchievement(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAchievement` Mutation requires an argument of type `CreateAchievementVariables`:
  const createAchievementVars: CreateAchievementVariables = {
    title: ..., 
    description: ..., // optional
    criteria: ..., // optional
    icon: ..., // optional
  };
  mutation.mutate(createAchievementVars);
  // Variables can be defined inline as well.
  mutation.mutate({ title: ..., description: ..., criteria: ..., icon: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAchievementVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.achievement_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

