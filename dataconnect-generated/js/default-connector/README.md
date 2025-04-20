# Table of Contents
- [**Overview**](#generated-javascript-readme)
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

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserDetails
You can execute the `GetUserDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getUserDetails(vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;

interface GetUserDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;
}
export const getUserDetailsRef: GetUserDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserDetails(dc: DataConnect, vars: GetUserDetailsVariables): QueryPromise<GetUserDetailsData, GetUserDetailsVariables>;

interface GetUserDetailsRef {
  ...
  (dc: DataConnect, vars: GetUserDetailsVariables): QueryRef<GetUserDetailsData, GetUserDetailsVariables>;
}
export const getUserDetailsRef: GetUserDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserDetailsRef:
```typescript
const name = getUserDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetUserDetails` query requires an argument of type `GetUserDetailsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserDetailsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserDetailsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetUserDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserDetails, GetUserDetailsVariables } from '@firebasegen/default-connector';

// The `GetUserDetails` query requires an argument of type `GetUserDetailsVariables`:
const getUserDetailsVars: GetUserDetailsVariables = {
  userId: ..., 
};

// Call the `getUserDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserDetails(getUserDetailsVars);
// Variables can be defined inline as well.
const { data } = await getUserDetails({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserDetails(dataConnect, getUserDetailsVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserDetails(getUserDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserDetailsRef, GetUserDetailsVariables } from '@firebasegen/default-connector';

// The `GetUserDetails` query requires an argument of type `GetUserDetailsVariables`:
const getUserDetailsVars: GetUserDetailsVariables = {
  userId: ..., 
};

// Call the `getUserDetailsRef()` function to get a reference to the query.
const ref = getUserDetailsRef(getUserDetailsVars);
// Variables can be defined inline as well.
const ref = getUserDetailsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserDetailsRef(dataConnect, getUserDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetAllUsers
You can execute the `GetAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getAllUsers(): QueryPromise<GetAllUsersData, undefined>;

interface GetAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
}
export const getAllUsersRef: GetAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData, undefined>;

interface GetAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
}
export const getAllUsersRef: GetAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllUsersRef:
```typescript
const name = getAllUsersRef.operationName;
console.log(name);
```

### Variables
The `GetAllUsers` query has no variables.
### Return Type
Recall that executing the `GetAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllUsersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllUsers } from '@firebasegen/default-connector';


// Call the `getAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllUsersRef } from '@firebasegen/default-connector';


// Call the `getAllUsersRef()` function to get a reference to the query.
const ref = getAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListFriends
You can execute the `ListFriends` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listFriends(vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;

interface ListFriendsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;
}
export const listFriendsRef: ListFriendsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFriends(dc: DataConnect, vars: ListFriendsVariables): QueryPromise<ListFriendsData, ListFriendsVariables>;

interface ListFriendsRef {
  ...
  (dc: DataConnect, vars: ListFriendsVariables): QueryRef<ListFriendsData, ListFriendsVariables>;
}
export const listFriendsRef: ListFriendsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFriendsRef:
```typescript
const name = listFriendsRef.operationName;
console.log(name);
```

### Variables
The `ListFriends` query requires an argument of type `ListFriendsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFriendsVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `ListFriends` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFriendsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListFriends`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFriends, ListFriendsVariables } from '@firebasegen/default-connector';

// The `ListFriends` query requires an argument of type `ListFriendsVariables`:
const listFriendsVars: ListFriendsVariables = {
  uid: ..., 
};

// Call the `listFriends()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFriends(listFriendsVars);
// Variables can be defined inline as well.
const { data } = await listFriends({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFriends(dataConnect, listFriendsVars);

console.log(data.friendships);

// Or, you can use the `Promise` API.
listFriends(listFriendsVars).then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

### Using `ListFriends`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFriendsRef, ListFriendsVariables } from '@firebasegen/default-connector';

// The `ListFriends` query requires an argument of type `ListFriendsVariables`:
const listFriendsVars: ListFriendsVariables = {
  uid: ..., 
};

// Call the `listFriendsRef()` function to get a reference to the query.
const ref = listFriendsRef(listFriendsVars);
// Variables can be defined inline as well.
const ref = listFriendsRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFriendsRef(dataConnect, listFriendsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.friendships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

## ListIncomingRequests
You can execute the `ListIncomingRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listIncomingRequests(): QueryPromise<ListIncomingRequestsData, undefined>;

interface ListIncomingRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListIncomingRequestsData, undefined>;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listIncomingRequests(dc: DataConnect): QueryPromise<ListIncomingRequestsData, undefined>;

interface ListIncomingRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListIncomingRequestsData, undefined>;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listIncomingRequestsRef:
```typescript
const name = listIncomingRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListIncomingRequests` query has no variables.
### Return Type
Recall that executing the `ListIncomingRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListIncomingRequestsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListIncomingRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listIncomingRequests } from '@firebasegen/default-connector';


// Call the `listIncomingRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listIncomingRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listIncomingRequests(dataConnect);

console.log(data.friendships);

// Or, you can use the `Promise` API.
listIncomingRequests().then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

### Using `ListIncomingRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listIncomingRequestsRef } from '@firebasegen/default-connector';


// Call the `listIncomingRequestsRef()` function to get a reference to the query.
const ref = listIncomingRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listIncomingRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.friendships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

## GetUserHabit
You can execute the `GetUserHabit` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getUserHabit(vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;

interface GetUserHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;
}
export const getUserHabitRef: GetUserHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserHabit(dc: DataConnect, vars: GetUserHabitVariables): QueryPromise<GetUserHabitData, GetUserHabitVariables>;

interface GetUserHabitRef {
  ...
  (dc: DataConnect, vars: GetUserHabitVariables): QueryRef<GetUserHabitData, GetUserHabitVariables>;
}
export const getUserHabitRef: GetUserHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserHabitRef:
```typescript
const name = getUserHabitRef.operationName;
console.log(name);
```

### Variables
The `GetUserHabit` query requires an argument of type `GetUserHabitVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserHabitVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetUserHabit` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserHabitData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetUserHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserHabit, GetUserHabitVariables } from '@firebasegen/default-connector';

// The `GetUserHabit` query requires an argument of type `GetUserHabitVariables`:
const getUserHabitVars: GetUserHabitVariables = {
  uid: ..., 
};

// Call the `getUserHabit()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserHabit(getUserHabitVars);
// Variables can be defined inline as well.
const { data } = await getUserHabit({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserHabit(dataConnect, getUserHabitVars);

console.log(data.habits);

// Or, you can use the `Promise` API.
getUserHabit(getUserHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

### Using `GetUserHabit`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserHabitRef, GetUserHabitVariables } from '@firebasegen/default-connector';

// The `GetUserHabit` query requires an argument of type `GetUserHabitVariables`:
const getUserHabitVars: GetUserHabitVariables = {
  uid: ..., 
};

// Call the `getUserHabitRef()` function to get a reference to the query.
const ref = getUserHabitRef(getUserHabitVars);
// Variables can be defined inline as well.
const ref = getUserHabitRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserHabitRef(dataConnect, getUserHabitVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.habits);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

## GetHabitsWithUserDetails
You can execute the `GetHabitsWithUserDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getHabitsWithUserDetails(vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;

interface GetHabitsWithUserDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
}
export const getHabitsWithUserDetailsRef: GetHabitsWithUserDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHabitsWithUserDetails(dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryPromise<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;

interface GetHabitsWithUserDetailsRef {
  ...
  (dc: DataConnect, vars: GetHabitsWithUserDetailsVariables): QueryRef<GetHabitsWithUserDetailsData, GetHabitsWithUserDetailsVariables>;
}
export const getHabitsWithUserDetailsRef: GetHabitsWithUserDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHabitsWithUserDetailsRef:
```typescript
const name = getHabitsWithUserDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetHabitsWithUserDetails` query requires an argument of type `GetHabitsWithUserDetailsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHabitsWithUserDetailsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetHabitsWithUserDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHabitsWithUserDetailsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetHabitsWithUserDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHabitsWithUserDetails, GetHabitsWithUserDetailsVariables } from '@firebasegen/default-connector';

// The `GetHabitsWithUserDetails` query requires an argument of type `GetHabitsWithUserDetailsVariables`:
const getHabitsWithUserDetailsVars: GetHabitsWithUserDetailsVariables = {
  userId: ..., 
};

// Call the `getHabitsWithUserDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHabitsWithUserDetails(getHabitsWithUserDetailsVars);
// Variables can be defined inline as well.
const { data } = await getHabitsWithUserDetails({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHabitsWithUserDetails(dataConnect, getHabitsWithUserDetailsVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getHabitsWithUserDetails(getHabitsWithUserDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetHabitsWithUserDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHabitsWithUserDetailsRef, GetHabitsWithUserDetailsVariables } from '@firebasegen/default-connector';

// The `GetHabitsWithUserDetails` query requires an argument of type `GetHabitsWithUserDetailsVariables`:
const getHabitsWithUserDetailsVars: GetHabitsWithUserDetailsVariables = {
  userId: ..., 
};

// Call the `getHabitsWithUserDetailsRef()` function to get a reference to the query.
const ref = getHabitsWithUserDetailsRef(getHabitsWithUserDetailsVars);
// Variables can be defined inline as well.
const ref = getHabitsWithUserDetailsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHabitsWithUserDetailsRef(dataConnect, getHabitsWithUserDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetHabitById
You can execute the `GetHabitById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getHabitById(vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;

interface GetHabitByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
}
export const getHabitByIdRef: GetHabitByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHabitById(dc: DataConnect, vars: GetHabitByIdVariables): QueryPromise<GetHabitByIdData, GetHabitByIdVariables>;

interface GetHabitByIdRef {
  ...
  (dc: DataConnect, vars: GetHabitByIdVariables): QueryRef<GetHabitByIdData, GetHabitByIdVariables>;
}
export const getHabitByIdRef: GetHabitByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHabitByIdRef:
```typescript
const name = getHabitByIdRef.operationName;
console.log(name);
```

### Variables
The `GetHabitById` query requires an argument of type `GetHabitByIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHabitByIdVariables {
  habitId: UUIDString;
}
```
### Return Type
Recall that executing the `GetHabitById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHabitByIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetHabitById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHabitById, GetHabitByIdVariables } from '@firebasegen/default-connector';

// The `GetHabitById` query requires an argument of type `GetHabitByIdVariables`:
const getHabitByIdVars: GetHabitByIdVariables = {
  habitId: ..., 
};

// Call the `getHabitById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHabitById(getHabitByIdVars);
// Variables can be defined inline as well.
const { data } = await getHabitById({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHabitById(dataConnect, getHabitByIdVars);

console.log(data.habit);

// Or, you can use the `Promise` API.
getHabitById(getHabitByIdVars).then((response) => {
  const data = response.data;
  console.log(data.habit);
});
```

### Using `GetHabitById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHabitByIdRef, GetHabitByIdVariables } from '@firebasegen/default-connector';

// The `GetHabitById` query requires an argument of type `GetHabitByIdVariables`:
const getHabitByIdVars: GetHabitByIdVariables = {
  habitId: ..., 
};

// Call the `getHabitByIdRef()` function to get a reference to the query.
const ref = getHabitByIdRef(getHabitByIdVars);
// Variables can be defined inline as well.
const ref = getHabitByIdRef({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHabitByIdRef(dataConnect, getHabitByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.habit);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.habit);
});
```

## ListAchievements
You can execute the `ListAchievements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listAchievements(): QueryPromise<ListAchievementsData, undefined>;

interface ListAchievementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAchievementsData, undefined>;
}
export const listAchievementsRef: ListAchievementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAchievements(dc: DataConnect): QueryPromise<ListAchievementsData, undefined>;

interface ListAchievementsRef {
  ...
  (dc: DataConnect): QueryRef<ListAchievementsData, undefined>;
}
export const listAchievementsRef: ListAchievementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAchievementsRef:
```typescript
const name = listAchievementsRef.operationName;
console.log(name);
```

### Variables
The `ListAchievements` query has no variables.
### Return Type
Recall that executing the `ListAchievements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAchievementsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListAchievements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAchievements } from '@firebasegen/default-connector';


// Call the `listAchievements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAchievements();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAchievements(dataConnect);

console.log(data.achievements);

// Or, you can use the `Promise` API.
listAchievements().then((response) => {
  const data = response.data;
  console.log(data.achievements);
});
```

### Using `ListAchievements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAchievementsRef } from '@firebasegen/default-connector';


// Call the `listAchievementsRef()` function to get a reference to the query.
const ref = listAchievementsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAchievementsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.achievements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.achievements);
});
```

## ListUserAchievements
You can execute the `ListUserAchievements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listUserAchievements(vars: ListUserAchievementsVariables): QueryPromise<ListUserAchievementsData, ListUserAchievementsVariables>;

interface ListUserAchievementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserAchievementsVariables): QueryRef<ListUserAchievementsData, ListUserAchievementsVariables>;
}
export const listUserAchievementsRef: ListUserAchievementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserAchievements(dc: DataConnect, vars: ListUserAchievementsVariables): QueryPromise<ListUserAchievementsData, ListUserAchievementsVariables>;

interface ListUserAchievementsRef {
  ...
  (dc: DataConnect, vars: ListUserAchievementsVariables): QueryRef<ListUserAchievementsData, ListUserAchievementsVariables>;
}
export const listUserAchievementsRef: ListUserAchievementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserAchievementsRef:
```typescript
const name = listUserAchievementsRef.operationName;
console.log(name);
```

### Variables
The `ListUserAchievements` query requires an argument of type `ListUserAchievementsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserAchievementsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `ListUserAchievements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserAchievementsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListUserAchievements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserAchievements, ListUserAchievementsVariables } from '@firebasegen/default-connector';

// The `ListUserAchievements` query requires an argument of type `ListUserAchievementsVariables`:
const listUserAchievementsVars: ListUserAchievementsVariables = {
  userId: ..., 
};

// Call the `listUserAchievements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserAchievements(listUserAchievementsVars);
// Variables can be defined inline as well.
const { data } = await listUserAchievements({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserAchievements(dataConnect, listUserAchievementsVars);

console.log(data.userAchievements);

// Or, you can use the `Promise` API.
listUserAchievements(listUserAchievementsVars).then((response) => {
  const data = response.data;
  console.log(data.userAchievements);
});
```

### Using `ListUserAchievements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserAchievementsRef, ListUserAchievementsVariables } from '@firebasegen/default-connector';

// The `ListUserAchievements` query requires an argument of type `ListUserAchievementsVariables`:
const listUserAchievementsVars: ListUserAchievementsVariables = {
  userId: ..., 
};

// Call the `listUserAchievementsRef()` function to get a reference to the query.
const ref = listUserAchievementsRef(listUserAchievementsVars);
// Variables can be defined inline as well.
const ref = listUserAchievementsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserAchievementsRef(dataConnect, listUserAchievementsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userAchievements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userAchievements);
});
```

## DebugFriendships
You can execute the `DebugFriendships` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
debugFriendships(): QueryPromise<DebugFriendshipsData, undefined>;

interface DebugFriendshipsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<DebugFriendshipsData, undefined>;
}
export const debugFriendshipsRef: DebugFriendshipsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
debugFriendships(dc: DataConnect): QueryPromise<DebugFriendshipsData, undefined>;

interface DebugFriendshipsRef {
  ...
  (dc: DataConnect): QueryRef<DebugFriendshipsData, undefined>;
}
export const debugFriendshipsRef: DebugFriendshipsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the debugFriendshipsRef:
```typescript
const name = debugFriendshipsRef.operationName;
console.log(name);
```

### Variables
The `DebugFriendships` query has no variables.
### Return Type
Recall that executing the `DebugFriendships` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DebugFriendshipsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DebugFriendshipsData {
  friendships: ({
    user1Id: string;
    user2Id: string;
    status: string;
  } & Friendship_Key)[];
}
```
### Using `DebugFriendships`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, debugFriendships } from '@firebasegen/default-connector';


// Call the `debugFriendships()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await debugFriendships();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await debugFriendships(dataConnect);

console.log(data.friendships);

// Or, you can use the `Promise` API.
debugFriendships().then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

### Using `DebugFriendships`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, debugFriendshipsRef } from '@firebasegen/default-connector';


// Call the `debugFriendshipsRef()` function to get a reference to the query.
const ref = debugFriendshipsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = debugFriendshipsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.friendships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.friendships);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createUser(vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has an optional argument of type `CreateUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  id?: string;
  name?: string;
  email?: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation has an optional argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., // optional
  name: ..., // optional
  email: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ id: ..., name: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `CreateUserVariables` argument.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation has an optional argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., // optional
  name: ..., // optional
  email: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ id: ..., name: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `CreateUserVariables` argument.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## AddFriend
You can execute the `AddFriend` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
addFriend(vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;

interface AddFriendRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
}
export const addFriendRef: AddFriendRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addFriend(dc: DataConnect, vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;

interface AddFriendRef {
  ...
  (dc: DataConnect, vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
}
export const addFriendRef: AddFriendRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addFriendRef:
```typescript
const name = addFriendRef.operationName;
console.log(name);
```

### Variables
The `AddFriend` mutation requires an argument of type `AddFriendVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddFriendVariables {
  friendId: string;
  currentUserId: string;
}
```
### Return Type
Recall that executing the `AddFriend` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddFriendData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddFriendData {
  friendship_insert: Friendship_Key;
}
```
### Using `AddFriend`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addFriend, AddFriendVariables } from '@firebasegen/default-connector';

// The `AddFriend` mutation requires an argument of type `AddFriendVariables`:
const addFriendVars: AddFriendVariables = {
  friendId: ..., 
  currentUserId: ..., 
};

// Call the `addFriend()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addFriend(addFriendVars);
// Variables can be defined inline as well.
const { data } = await addFriend({ friendId: ..., currentUserId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addFriend(dataConnect, addFriendVars);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
addFriend(addFriendVars).then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

### Using `AddFriend`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addFriendRef, AddFriendVariables } from '@firebasegen/default-connector';

// The `AddFriend` mutation requires an argument of type `AddFriendVariables`:
const addFriendVars: AddFriendVariables = {
  friendId: ..., 
  currentUserId: ..., 
};

// Call the `addFriendRef()` function to get a reference to the mutation.
const ref = addFriendRef(addFriendVars);
// Variables can be defined inline as well.
const ref = addFriendRef({ friendId: ..., currentUserId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addFriendRef(dataConnect, addFriendVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

## DeleteFriend
You can execute the `DeleteFriend` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteFriend(vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;

interface DeleteFriendRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;
}
export const deleteFriendRef: DeleteFriendRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFriend(dc: DataConnect, vars: DeleteFriendVariables): MutationPromise<DeleteFriendData, DeleteFriendVariables>;

interface DeleteFriendRef {
  ...
  (dc: DataConnect, vars: DeleteFriendVariables): MutationRef<DeleteFriendData, DeleteFriendVariables>;
}
export const deleteFriendRef: DeleteFriendRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFriendRef:
```typescript
const name = deleteFriendRef.operationName;
console.log(name);
```

### Variables
The `DeleteFriend` mutation requires an argument of type `DeleteFriendVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFriendVariables {
  currentUserId: string;
  friendId: string;
}
```
### Return Type
Recall that executing the `DeleteFriend` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFriendData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFriendData {
  first?: Friendship_Key | null;
  second?: Friendship_Key | null;
}
```
### Using `DeleteFriend`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFriend, DeleteFriendVariables } from '@firebasegen/default-connector';

// The `DeleteFriend` mutation requires an argument of type `DeleteFriendVariables`:
const deleteFriendVars: DeleteFriendVariables = {
  currentUserId: ..., 
  friendId: ..., 
};

// Call the `deleteFriend()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFriend(deleteFriendVars);
// Variables can be defined inline as well.
const { data } = await deleteFriend({ currentUserId: ..., friendId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFriend(dataConnect, deleteFriendVars);

console.log(data.first);
console.log(data.second);

// Or, you can use the `Promise` API.
deleteFriend(deleteFriendVars).then((response) => {
  const data = response.data;
  console.log(data.first);
  console.log(data.second);
});
```

### Using `DeleteFriend`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFriendRef, DeleteFriendVariables } from '@firebasegen/default-connector';

// The `DeleteFriend` mutation requires an argument of type `DeleteFriendVariables`:
const deleteFriendVars: DeleteFriendVariables = {
  currentUserId: ..., 
  friendId: ..., 
};

// Call the `deleteFriendRef()` function to get a reference to the mutation.
const ref = deleteFriendRef(deleteFriendVars);
// Variables can be defined inline as well.
const ref = deleteFriendRef({ currentUserId: ..., friendId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFriendRef(dataConnect, deleteFriendVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.first);
console.log(data.second);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.first);
  console.log(data.second);
});
```

## RemoveReverseFriend
You can execute the `RemoveReverseFriend` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
removeReverseFriend(vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;

interface RemoveReverseFriendRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;
}
export const removeReverseFriendRef: RemoveReverseFriendRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeReverseFriend(dc: DataConnect, vars: RemoveReverseFriendVariables): MutationPromise<RemoveReverseFriendData, RemoveReverseFriendVariables>;

interface RemoveReverseFriendRef {
  ...
  (dc: DataConnect, vars: RemoveReverseFriendVariables): MutationRef<RemoveReverseFriendData, RemoveReverseFriendVariables>;
}
export const removeReverseFriendRef: RemoveReverseFriendRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeReverseFriendRef:
```typescript
const name = removeReverseFriendRef.operationName;
console.log(name);
```

### Variables
The `RemoveReverseFriend` mutation requires an argument of type `RemoveReverseFriendVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveReverseFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that executing the `RemoveReverseFriend` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveReverseFriendData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveReverseFriendData {
  friendship_delete?: Friendship_Key | null;
}
```
### Using `RemoveReverseFriend`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeReverseFriend, RemoveReverseFriendVariables } from '@firebasegen/default-connector';

// The `RemoveReverseFriend` mutation requires an argument of type `RemoveReverseFriendVariables`:
const removeReverseFriendVars: RemoveReverseFriendVariables = {
  friendId: ..., 
};

// Call the `removeReverseFriend()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeReverseFriend(removeReverseFriendVars);
// Variables can be defined inline as well.
const { data } = await removeReverseFriend({ friendId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeReverseFriend(dataConnect, removeReverseFriendVars);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
removeReverseFriend(removeReverseFriendVars).then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

### Using `RemoveReverseFriend`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeReverseFriendRef, RemoveReverseFriendVariables } from '@firebasegen/default-connector';

// The `RemoveReverseFriend` mutation requires an argument of type `RemoveReverseFriendVariables`:
const removeReverseFriendVars: RemoveReverseFriendVariables = {
  friendId: ..., 
};

// Call the `removeReverseFriendRef()` function to get a reference to the mutation.
const ref = removeReverseFriendRef(removeReverseFriendVars);
// Variables can be defined inline as well.
const ref = removeReverseFriendRef({ friendId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeReverseFriendRef(dataConnect, removeReverseFriendVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

## AcceptFriendRequest
You can execute the `AcceptFriendRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
acceptFriendRequest(vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;

interface AcceptFriendRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
}
export const acceptFriendRequestRef: AcceptFriendRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
acceptFriendRequest(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;

interface AcceptFriendRequestRef {
  ...
  (dc: DataConnect, vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
}
export const acceptFriendRequestRef: AcceptFriendRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the acceptFriendRequestRef:
```typescript
const name = acceptFriendRequestRef.operationName;
console.log(name);
```

### Variables
The `AcceptFriendRequest` mutation requires an argument of type `AcceptFriendRequestVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AcceptFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}
```
### Return Type
Recall that executing the `AcceptFriendRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AcceptFriendRequestData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AcceptFriendRequestData {
  friendship_update?: Friendship_Key | null;
}
```
### Using `AcceptFriendRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, acceptFriendRequest, AcceptFriendRequestVariables } from '@firebasegen/default-connector';

// The `AcceptFriendRequest` mutation requires an argument of type `AcceptFriendRequestVariables`:
const acceptFriendRequestVars: AcceptFriendRequestVariables = {
  user1Id: ..., 
  user2Id: ..., 
};

// Call the `acceptFriendRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await acceptFriendRequest(acceptFriendRequestVars);
// Variables can be defined inline as well.
const { data } = await acceptFriendRequest({ user1Id: ..., user2Id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await acceptFriendRequest(dataConnect, acceptFriendRequestVars);

console.log(data.friendship_update);

// Or, you can use the `Promise` API.
acceptFriendRequest(acceptFriendRequestVars).then((response) => {
  const data = response.data;
  console.log(data.friendship_update);
});
```

### Using `AcceptFriendRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, acceptFriendRequestRef, AcceptFriendRequestVariables } from '@firebasegen/default-connector';

// The `AcceptFriendRequest` mutation requires an argument of type `AcceptFriendRequestVariables`:
const acceptFriendRequestVars: AcceptFriendRequestVariables = {
  user1Id: ..., 
  user2Id: ..., 
};

// Call the `acceptFriendRequestRef()` function to get a reference to the mutation.
const ref = acceptFriendRequestRef(acceptFriendRequestVars);
// Variables can be defined inline as well.
const ref = acceptFriendRequestRef({ user1Id: ..., user2Id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = acceptFriendRequestRef(dataConnect, acceptFriendRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_update);
});
```

## DeclineFriendRequest
You can execute the `DeclineFriendRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
declineFriendRequest(vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;

interface DeclineFriendRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;
}
export const declineFriendRequestRef: DeclineFriendRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
declineFriendRequest(dc: DataConnect, vars: DeclineFriendRequestVariables): MutationPromise<DeclineFriendRequestData, DeclineFriendRequestVariables>;

interface DeclineFriendRequestRef {
  ...
  (dc: DataConnect, vars: DeclineFriendRequestVariables): MutationRef<DeclineFriendRequestData, DeclineFriendRequestVariables>;
}
export const declineFriendRequestRef: DeclineFriendRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the declineFriendRequestRef:
```typescript
const name = declineFriendRequestRef.operationName;
console.log(name);
```

### Variables
The `DeclineFriendRequest` mutation requires an argument of type `DeclineFriendRequestVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeclineFriendRequestVariables {
  user1Id: string;
  user2Id: string;
}
```
### Return Type
Recall that executing the `DeclineFriendRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeclineFriendRequestData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeclineFriendRequestData {
  friendship_delete?: Friendship_Key | null;
}
```
### Using `DeclineFriendRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, declineFriendRequest, DeclineFriendRequestVariables } from '@firebasegen/default-connector';

// The `DeclineFriendRequest` mutation requires an argument of type `DeclineFriendRequestVariables`:
const declineFriendRequestVars: DeclineFriendRequestVariables = {
  user1Id: ..., 
  user2Id: ..., 
};

// Call the `declineFriendRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await declineFriendRequest(declineFriendRequestVars);
// Variables can be defined inline as well.
const { data } = await declineFriendRequest({ user1Id: ..., user2Id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await declineFriendRequest(dataConnect, declineFriendRequestVars);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
declineFriendRequest(declineFriendRequestVars).then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

### Using `DeclineFriendRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, declineFriendRequestRef, DeclineFriendRequestVariables } from '@firebasegen/default-connector';

// The `DeclineFriendRequest` mutation requires an argument of type `DeclineFriendRequestVariables`:
const declineFriendRequestVars: DeclineFriendRequestVariables = {
  user1Id: ..., 
  user2Id: ..., 
};

// Call the `declineFriendRequestRef()` function to get a reference to the mutation.
const ref = declineFriendRequestRef(declineFriendRequestVars);
// Variables can be defined inline as well.
const ref = declineFriendRequestRef({ user1Id: ..., user2Id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = declineFriendRequestRef(dataConnect, declineFriendRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_delete);
});
```

## AddReverseFriend
You can execute the `AddReverseFriend` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
addReverseFriend(vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;

interface AddReverseFriendRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;
}
export const addReverseFriendRef: AddReverseFriendRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addReverseFriend(dc: DataConnect, vars: AddReverseFriendVariables): MutationPromise<AddReverseFriendData, AddReverseFriendVariables>;

interface AddReverseFriendRef {
  ...
  (dc: DataConnect, vars: AddReverseFriendVariables): MutationRef<AddReverseFriendData, AddReverseFriendVariables>;
}
export const addReverseFriendRef: AddReverseFriendRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addReverseFriendRef:
```typescript
const name = addReverseFriendRef.operationName;
console.log(name);
```

### Variables
The `AddReverseFriend` mutation requires an argument of type `AddReverseFriendVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddReverseFriendVariables {
  friendId: string;
}
```
### Return Type
Recall that executing the `AddReverseFriend` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddReverseFriendData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddReverseFriendData {
  friendship_insert: Friendship_Key;
}
```
### Using `AddReverseFriend`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addReverseFriend, AddReverseFriendVariables } from '@firebasegen/default-connector';

// The `AddReverseFriend` mutation requires an argument of type `AddReverseFriendVariables`:
const addReverseFriendVars: AddReverseFriendVariables = {
  friendId: ..., 
};

// Call the `addReverseFriend()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReverseFriend(addReverseFriendVars);
// Variables can be defined inline as well.
const { data } = await addReverseFriend({ friendId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addReverseFriend(dataConnect, addReverseFriendVars);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
addReverseFriend(addReverseFriendVars).then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

### Using `AddReverseFriend`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReverseFriendRef, AddReverseFriendVariables } from '@firebasegen/default-connector';

// The `AddReverseFriend` mutation requires an argument of type `AddReverseFriendVariables`:
const addReverseFriendVars: AddReverseFriendVariables = {
  friendId: ..., 
};

// Call the `addReverseFriendRef()` function to get a reference to the mutation.
const ref = addReverseFriendRef(addReverseFriendVars);
// Variables can be defined inline as well.
const ref = addReverseFriendRef({ friendId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addReverseFriendRef(dataConnect, addReverseFriendVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.friendship_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.friendship_insert);
});
```

## CreateHabit
You can execute the `CreateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createHabit(vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface CreateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
}
export const createHabitRef: CreateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHabit(dc: DataConnect, vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface CreateHabitRef {
  ...
  (dc: DataConnect, vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
}
export const createHabitRef: CreateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHabitRef:
```typescript
const name = createHabitRef.operationName;
console.log(name);
```

### Variables
The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHabitData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHabitData {
  habit_insert: Habit_Key;
}
```
### Using `CreateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHabit, CreateHabitVariables } from '@firebasegen/default-connector';

// The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`:
const createHabitVars: CreateHabitVariables = {
  uid: ..., 
  title: ..., 
  description: ..., 
  category: ..., 
  streakGoal: ..., 
  emoji: ..., 
};

// Call the `createHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHabit(createHabitVars);
// Variables can be defined inline as well.
const { data } = await createHabit({ uid: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHabit(dataConnect, createHabitVars);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
createHabit(createHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

### Using `CreateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHabitRef, CreateHabitVariables } from '@firebasegen/default-connector';

// The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`:
const createHabitVars: CreateHabitVariables = {
  uid: ..., 
  title: ..., 
  description: ..., 
  category: ..., 
  streakGoal: ..., 
  emoji: ..., 
};

// Call the `createHabitRef()` function to get a reference to the mutation.
const ref = createHabitRef(createHabitVars);
// Variables can be defined inline as well.
const ref = createHabitRef({ uid: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHabitRef(dataConnect, createHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

## UpdateHabit
You can execute the `UpdateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHabitRef:
```typescript
const name = updateHabitRef.operationName;
console.log(name);
```

### Variables
The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHabitData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}
```
### Using `UpdateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHabit, UpdateHabitVariables } from '@firebasegen/default-connector';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  habitId: ..., 
  title: ..., // optional
  description: ..., // optional
  category: ..., // optional
  streakGoal: ..., // optional
  emoji: ..., 
};

// Call the `updateHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHabit(updateHabitVars);
// Variables can be defined inline as well.
const { data } = await updateHabit({ habitId: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHabit(dataConnect, updateHabitVars);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
updateHabit(updateHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

### Using `UpdateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHabitRef, UpdateHabitVariables } from '@firebasegen/default-connector';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  habitId: ..., 
  title: ..., // optional
  description: ..., // optional
  category: ..., // optional
  streakGoal: ..., // optional
  emoji: ..., 
};

// Call the `updateHabitRef()` function to get a reference to the mutation.
const ref = updateHabitRef(updateHabitVars);
// Variables can be defined inline as well.
const ref = updateHabitRef({ habitId: ..., title: ..., description: ..., category: ..., streakGoal: ..., emoji: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHabitRef(dataConnect, updateHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

## DeleteHabit
You can execute the `DeleteHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteHabit(vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

interface DeleteHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
}
export const deleteHabitRef: DeleteHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteHabit(dc: DataConnect, vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

interface DeleteHabitRef {
  ...
  (dc: DataConnect, vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
}
export const deleteHabitRef: DeleteHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteHabitRef:
```typescript
const name = deleteHabitRef.operationName;
console.log(name);
```

### Variables
The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteHabitVariables {
  habitId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteHabitData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}
```
### Using `DeleteHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteHabit, DeleteHabitVariables } from '@firebasegen/default-connector';

// The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`:
const deleteHabitVars: DeleteHabitVariables = {
  habitId: ..., 
};

// Call the `deleteHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteHabit(deleteHabitVars);
// Variables can be defined inline as well.
const { data } = await deleteHabit({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteHabit(dataConnect, deleteHabitVars);

console.log(data.habit_delete);

// Or, you can use the `Promise` API.
deleteHabit(deleteHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_delete);
});
```

### Using `DeleteHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteHabitRef, DeleteHabitVariables } from '@firebasegen/default-connector';

// The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`:
const deleteHabitVars: DeleteHabitVariables = {
  habitId: ..., 
};

// Call the `deleteHabitRef()` function to get a reference to the mutation.
const ref = deleteHabitRef(deleteHabitVars);
// Variables can be defined inline as well.
const ref = deleteHabitRef({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteHabitRef(dataConnect, deleteHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_delete);
});
```

## UpdateHabitStreak
You can execute the `UpdateHabitStreak` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateHabitStreak(vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;

interface UpdateHabitStreakRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;
}
export const updateHabitStreakRef: UpdateHabitStreakRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHabitStreak(dc: DataConnect, vars: UpdateHabitStreakVariables): MutationPromise<UpdateHabitStreakData, UpdateHabitStreakVariables>;

interface UpdateHabitStreakRef {
  ...
  (dc: DataConnect, vars: UpdateHabitStreakVariables): MutationRef<UpdateHabitStreakData, UpdateHabitStreakVariables>;
}
export const updateHabitStreakRef: UpdateHabitStreakRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHabitStreakRef:
```typescript
const name = updateHabitStreakRef.operationName;
console.log(name);
```

### Variables
The `UpdateHabitStreak` mutation requires an argument of type `UpdateHabitStreakVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateHabitStreak` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHabitStreakData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHabitStreakData {
  userHabit_upsert: UserHabit_Key;
}
```
### Using `UpdateHabitStreak`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHabitStreak, UpdateHabitStreakVariables } from '@firebasegen/default-connector';

// The `UpdateHabitStreak` mutation requires an argument of type `UpdateHabitStreakVariables`:
const updateHabitStreakVars: UpdateHabitStreakVariables = {
  habitId: ..., 
  currentStreak: ..., 
  longestStreak: ..., 
  lastTrackedDate: ..., 
  userId: ..., // optional
  points: ..., // optional
};

// Call the `updateHabitStreak()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHabitStreak(updateHabitStreakVars);
// Variables can be defined inline as well.
const { data } = await updateHabitStreak({ habitId: ..., currentStreak: ..., longestStreak: ..., lastTrackedDate: ..., userId: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHabitStreak(dataConnect, updateHabitStreakVars);

console.log(data.userHabit_upsert);

// Or, you can use the `Promise` API.
updateHabitStreak(updateHabitStreakVars).then((response) => {
  const data = response.data;
  console.log(data.userHabit_upsert);
});
```

### Using `UpdateHabitStreak`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHabitStreakRef, UpdateHabitStreakVariables } from '@firebasegen/default-connector';

// The `UpdateHabitStreak` mutation requires an argument of type `UpdateHabitStreakVariables`:
const updateHabitStreakVars: UpdateHabitStreakVariables = {
  habitId: ..., 
  currentStreak: ..., 
  longestStreak: ..., 
  lastTrackedDate: ..., 
  userId: ..., // optional
  points: ..., // optional
};

// Call the `updateHabitStreakRef()` function to get a reference to the mutation.
const ref = updateHabitStreakRef(updateHabitStreakVars);
// Variables can be defined inline as well.
const ref = updateHabitStreakRef({ habitId: ..., currentStreak: ..., longestStreak: ..., lastTrackedDate: ..., userId: ..., points: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHabitStreakRef(dataConnect, updateHabitStreakVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userHabit_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userHabit_upsert);
});
```

## updatePoints
You can execute the `updatePoints` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updatePoints(vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;

interface UpdatePointsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;
}
export const updatePointsRef: UpdatePointsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePoints(dc: DataConnect, vars: UpdatePointsVariables): MutationPromise<UpdatePointsData, UpdatePointsVariables>;

interface UpdatePointsRef {
  ...
  (dc: DataConnect, vars: UpdatePointsVariables): MutationRef<UpdatePointsData, UpdatePointsVariables>;
}
export const updatePointsRef: UpdatePointsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePointsRef:
```typescript
const name = updatePointsRef.operationName;
console.log(name);
```

### Variables
The `updatePoints` mutation requires an argument of type `UpdatePointsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePointsVariables {
  userId: string;
  points: number;
  totalStreak: number;
  newDate: TimestampString;
}
```
### Return Type
Recall that executing the `updatePoints` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePointsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePointsData {
  user_update?: User_Key | null;
}
```
### Using `updatePoints`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePoints, UpdatePointsVariables } from '@firebasegen/default-connector';

// The `updatePoints` mutation requires an argument of type `UpdatePointsVariables`:
const updatePointsVars: UpdatePointsVariables = {
  userId: ..., 
  points: ..., 
  totalStreak: ..., 
  newDate: ..., 
};

// Call the `updatePoints()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePoints(updatePointsVars);
// Variables can be defined inline as well.
const { data } = await updatePoints({ userId: ..., points: ..., totalStreak: ..., newDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePoints(dataConnect, updatePointsVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updatePoints(updatePointsVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `updatePoints`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePointsRef, UpdatePointsVariables } from '@firebasegen/default-connector';

// The `updatePoints` mutation requires an argument of type `UpdatePointsVariables`:
const updatePointsVars: UpdatePointsVariables = {
  userId: ..., 
  points: ..., 
  totalStreak: ..., 
  newDate: ..., 
};

// Call the `updatePointsRef()` function to get a reference to the mutation.
const ref = updatePointsRef(updatePointsVars);
// Variables can be defined inline as well.
const ref = updatePointsRef({ userId: ..., points: ..., totalStreak: ..., newDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePointsRef(dataConnect, updatePointsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUserHabit
You can execute the `DeleteUserHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteUserHabit(vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;

interface DeleteUserHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;
}
export const deleteUserHabitRef: DeleteUserHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUserHabit(dc: DataConnect, vars: DeleteUserHabitVariables): MutationPromise<DeleteUserHabitData, DeleteUserHabitVariables>;

interface DeleteUserHabitRef {
  ...
  (dc: DataConnect, vars: DeleteUserHabitVariables): MutationRef<DeleteUserHabitData, DeleteUserHabitVariables>;
}
export const deleteUserHabitRef: DeleteUserHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserHabitRef:
```typescript
const name = deleteUserHabitRef.operationName;
console.log(name);
```

### Variables
The `DeleteUserHabit` mutation requires an argument of type `DeleteUserHabitVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteUserHabitVariables {
  habitId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `DeleteUserHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserHabitData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserHabitData {
  userHabit_delete?: UserHabit_Key | null;
}
```
### Using `DeleteUserHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUserHabit, DeleteUserHabitVariables } from '@firebasegen/default-connector';

// The `DeleteUserHabit` mutation requires an argument of type `DeleteUserHabitVariables`:
const deleteUserHabitVars: DeleteUserHabitVariables = {
  habitId: ..., 
  userId: ..., 
};

// Call the `deleteUserHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUserHabit(deleteUserHabitVars);
// Variables can be defined inline as well.
const { data } = await deleteUserHabit({ habitId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUserHabit(dataConnect, deleteUserHabitVars);

console.log(data.userHabit_delete);

// Or, you can use the `Promise` API.
deleteUserHabit(deleteUserHabitVars).then((response) => {
  const data = response.data;
  console.log(data.userHabit_delete);
});
```

### Using `DeleteUserHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserHabitRef, DeleteUserHabitVariables } from '@firebasegen/default-connector';

// The `DeleteUserHabit` mutation requires an argument of type `DeleteUserHabitVariables`:
const deleteUserHabitVars: DeleteUserHabitVariables = {
  habitId: ..., 
  userId: ..., 
};

// Call the `deleteUserHabitRef()` function to get a reference to the mutation.
const ref = deleteUserHabitRef(deleteUserHabitVars);
// Variables can be defined inline as well.
const ref = deleteUserHabitRef({ habitId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserHabitRef(dataConnect, deleteUserHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userHabit_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userHabit_delete);
});
```

## UnlockAchievement
You can execute the `UnlockAchievement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
unlockAchievement(vars: UnlockAchievementVariables): MutationPromise<UnlockAchievementData, UnlockAchievementVariables>;

interface UnlockAchievementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnlockAchievementVariables): MutationRef<UnlockAchievementData, UnlockAchievementVariables>;
}
export const unlockAchievementRef: UnlockAchievementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
unlockAchievement(dc: DataConnect, vars: UnlockAchievementVariables): MutationPromise<UnlockAchievementData, UnlockAchievementVariables>;

interface UnlockAchievementRef {
  ...
  (dc: DataConnect, vars: UnlockAchievementVariables): MutationRef<UnlockAchievementData, UnlockAchievementVariables>;
}
export const unlockAchievementRef: UnlockAchievementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the unlockAchievementRef:
```typescript
const name = unlockAchievementRef.operationName;
console.log(name);
```

### Variables
The `UnlockAchievement` mutation requires an argument of type `UnlockAchievementVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UnlockAchievementVariables {
  userId: string;
  achievementId: UUIDString;
}
```
### Return Type
Recall that executing the `UnlockAchievement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UnlockAchievementData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UnlockAchievementData {
  userAchievement_insert: UserAchievement_Key;
}
```
### Using `UnlockAchievement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, unlockAchievement, UnlockAchievementVariables } from '@firebasegen/default-connector';

// The `UnlockAchievement` mutation requires an argument of type `UnlockAchievementVariables`:
const unlockAchievementVars: UnlockAchievementVariables = {
  userId: ..., 
  achievementId: ..., 
};

// Call the `unlockAchievement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await unlockAchievement(unlockAchievementVars);
// Variables can be defined inline as well.
const { data } = await unlockAchievement({ userId: ..., achievementId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await unlockAchievement(dataConnect, unlockAchievementVars);

console.log(data.userAchievement_insert);

// Or, you can use the `Promise` API.
unlockAchievement(unlockAchievementVars).then((response) => {
  const data = response.data;
  console.log(data.userAchievement_insert);
});
```

### Using `UnlockAchievement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, unlockAchievementRef, UnlockAchievementVariables } from '@firebasegen/default-connector';

// The `UnlockAchievement` mutation requires an argument of type `UnlockAchievementVariables`:
const unlockAchievementVars: UnlockAchievementVariables = {
  userId: ..., 
  achievementId: ..., 
};

// Call the `unlockAchievementRef()` function to get a reference to the mutation.
const ref = unlockAchievementRef(unlockAchievementVars);
// Variables can be defined inline as well.
const ref = unlockAchievementRef({ userId: ..., achievementId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = unlockAchievementRef(dataConnect, unlockAchievementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userAchievement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userAchievement_insert);
});
```

## CreateAchievement
You can execute the `CreateAchievement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createAchievement(vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;

interface CreateAchievementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
}
export const createAchievementRef: CreateAchievementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAchievement(dc: DataConnect, vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;

interface CreateAchievementRef {
  ...
  (dc: DataConnect, vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
}
export const createAchievementRef: CreateAchievementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAchievementRef:
```typescript
const name = createAchievementRef.operationName;
console.log(name);
```

### Variables
The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAchievementVariables {
  title: string;
  description?: string | null;
  criteria?: string | null;
  icon?: string | null;
}
```
### Return Type
Recall that executing the `CreateAchievement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAchievementData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAchievementData {
  achievement_insert: Achievement_Key;
}
```
### Using `CreateAchievement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAchievement, CreateAchievementVariables } from '@firebasegen/default-connector';

// The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`:
const createAchievementVars: CreateAchievementVariables = {
  title: ..., 
  description: ..., // optional
  criteria: ..., // optional
  icon: ..., // optional
};

// Call the `createAchievement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAchievement(createAchievementVars);
// Variables can be defined inline as well.
const { data } = await createAchievement({ title: ..., description: ..., criteria: ..., icon: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAchievement(dataConnect, createAchievementVars);

console.log(data.achievement_insert);

// Or, you can use the `Promise` API.
createAchievement(createAchievementVars).then((response) => {
  const data = response.data;
  console.log(data.achievement_insert);
});
```

### Using `CreateAchievement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAchievementRef, CreateAchievementVariables } from '@firebasegen/default-connector';

// The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`:
const createAchievementVars: CreateAchievementVariables = {
  title: ..., 
  description: ..., // optional
  criteria: ..., // optional
  icon: ..., // optional
};

// Call the `createAchievementRef()` function to get a reference to the mutation.
const ref = createAchievementRef(createAchievementVars);
// Variables can be defined inline as well.
const ref = createAchievementRef({ title: ..., description: ..., criteria: ..., icon: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAchievementRef(dataConnect, createAchievementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.achievement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.achievement_insert);
});
```

