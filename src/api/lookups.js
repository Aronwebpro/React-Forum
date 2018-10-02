import firebaseApp from '../firebase.js';

/**
 * Get Post List from FireBase DB
 * @param limit -> Number[optional]
 * @returns {Promise} -> Array of Posts
 */
const getPosts = (limit = 10) => {
    return firebaseApp.database()
        .ref('topics')
        .limitToLast(limit)
        .orderByKey().once('value');
};
/**
 * Get Post List by Category from FireBase DB
 * @param category -> String
 * @param limit -> Number
 * @returns {Promise} -> Array of Posts
 */
const getPostByCategory = (category, limit) => {
    return firebaseApp.database()
        .ref('topics')
        .orderByChild('categoryUrl')
        .equalTo(category)
        .limitToLast(limit)
        .once('value');
};
/**
 * Get Single Post from FireBase DB
 * @param postID -> String
 * @returns {Promise} -> Object of Post
 */
const getSinglePost = async (postID) => {
    const snapshot = await  firebaseApp.database()
        .ref('/topics/' + postID)
        .once('value');
    return snapshot.val();
};

export {
    getPosts,
    getPostByCategory,
    getSinglePost,
}
