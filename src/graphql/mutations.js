/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
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
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
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
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
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
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
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
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
export const createBlock = /* GraphQL */ `
  mutation CreateBlock(
    $input: CreateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    createBlock(input: $input, condition: $condition) {
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
export const updateBlock = /* GraphQL */ `
  mutation UpdateBlock(
    $input: UpdateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    updateBlock(input: $input, condition: $condition) {
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
export const deleteBlock = /* GraphQL */ `
  mutation DeleteBlock(
    $input: DeleteBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    deleteBlock(input: $input, condition: $condition) {
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
