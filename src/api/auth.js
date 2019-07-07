import { auth } from 'firebase/app';

/**
 * Sign with FireBase SDK
 * @param email -> String
 * @param password -> String
 * @returns {Promise} Object Of User
 */
const signIn = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
};
/**
 * SignOut with FireBase SDK
 * @returns {Promise}
 */
const signOut = () => {
    return auth().signOut();
};

export {
    signIn,
    signOut,
};