/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
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
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
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
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch {
    onCreateMatch {
      id
      requesterID
      requesteeID
      requester {
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
      requestee {
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
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMatch = /* GraphQL */ `
  subscription OnUpdateMatch {
    onUpdateMatch {
      id
      requesterID
      requesteeID
      requester {
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
      requestee {
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
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMatch = /* GraphQL */ `
  subscription OnDeleteMatch {
    onDeleteMatch {
      id
      requesterID
      requesteeID
      requester {
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
      requestee {
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
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBlock = /* GraphQL */ `
  subscription OnCreateBlock {
    onCreateBlock {
      id
      blockerID
      blockedUserID
      blocker {
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
      blockedUser {
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
export const onUpdateBlock = /* GraphQL */ `
  subscription OnUpdateBlock {
    onUpdateBlock {
      id
      blockerID
      blockedUserID
      blocker {
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
      blockedUser {
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
export const onDeleteBlock = /* GraphQL */ `
  subscription OnDeleteBlock {
    onDeleteBlock {
      id
      blockerID
      blockedUserID
      blocker {
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
      blockedUser {
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
