import firebaseApp from "../firebase";

/**
 * Sign with FireBase SDK
 * @param email -> String
 * @param password -> String
 * @returns {Promise} Object Of User
 */
const signIn = (email, password) => {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};
/**
 * SignOut with FireBase SDK
 * @returns {Promise}
 */
const signOut = () => {
    return firebaseApp.auth().signOut();
};

export {
    signIn,
    signOut,
}