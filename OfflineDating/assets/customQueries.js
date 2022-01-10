/* eslint-disable */

export const customGetUser = /* GraphQL */ `
	query getOtherUser($id: ID!) {
		getUser(id: $id) {
			id
			email
			profilePic
		}
	}
`;

export const customUpdateUser = /* GraphQL */ `
	mutation customUpdateUser($id: ID!, $profilePic: String) {
		updateUser(input: { id: $id, profilePic: $profilePic }) {
			id
			profilePic
		}
	}
`;
