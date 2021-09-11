/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      profilePic
      birthday
      settings
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      notifications {
        items {
          id
          content
          userID
          otherUserID
          seen
          clicked
          createdAt
          updatedAt
        }
        nextToken
      }
      requestedMatches {
        items {
          id
          requesterID
          requesteeID
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      receivedMatchRequests {
        items {
          id
          requesterID
          requesteeID
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      blockedUsers {
        items {
          id
          blockerID
          blockedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      blockedByUsers {
        items {
          id
          blockerID
          blockedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        profilePic
        birthday
        settings
        chatRoomUser {
          nextToken
        }
        notifications {
          nextToken
        }
        requestedMatches {
          nextToken
        }
        receivedMatchRequests {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        blockedByUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
      id
      userID
      chatRoomID
      user {
        id
        name
        email
        profilePic
        birthday
        settings
        chatRoomUser {
          nextToken
        }
        notifications {
          nextToken
        }
        requestedMatches {
          nextToken
        }
        receivedMatchRequests {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        blockedByUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatRoomID
        user {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        name
        email
        profilePic
        birthday
        settings
        chatRoomUser {
          nextToken
        }
        notifications {
          nextToken
        }
        requestedMatches {
          nextToken
        }
        receivedMatchRequests {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        blockedByUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      content
      userID
      otherUserID
      seen
      clicked
      user {
        id
        name
        email
        profilePic
        birthday
        settings
        chatRoomUser {
          nextToken
        }
        notifications {
          nextToken
        }
        requestedMatches {
          nextToken
        }
        receivedMatchRequests {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        blockedByUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      otherUser {
        id
        name
        email
        profilePic
        birthday
        settings
        chatRoomUser {
          nextToken
        }
        notifications {
          nextToken
        }
        requestedMatches {
          nextToken
        }
        receivedMatchRequests {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        blockedByUsers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        userID
        otherUserID
        seen
        clicked
        user {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        otherUser {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          name
          email
          profilePic
          birthday
          settings
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
