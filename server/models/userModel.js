export const createNewUser = (id, firstName, lastName, email, password, username, userChats) => ({
    user_id: id,
    firstName,
    lastName,
    username,
    email,
    password,
    userChats,
});
