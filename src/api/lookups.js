import {db} from '../firebase.js';

/**
 * Get Post List from FireBase DB
 * @param limit -> Number[optional]
 * @returns {Promise} -> Array of Posts
 */
const getPosts = async (limit = 10) => {
    const postsRef = db.collection('posts');
    const postsDoc = await postsRef.orderBy('created').limit(limit + 1).get();
    const posts = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    });

    if (posts.length > limit) {
        const {postId} = posts.pop();
        return {posts, nextPostId: postId}
    } else {
        return {posts};
    }
};

/**
 * Get Post List by Category from FireBase DB
 * @param categoryId -> String
 * @param limit -> Number
 * @returns {Promise} -> Array of Posts
 */
const getPostByCategory = async (categoryId, limit = 10) => {
    const postsRef = db.collection('posts').where('categoryId', '==', categoryId);
    const postsDoc = await postsRef.limit(limit).get();
    const posts = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    }).sort((a, b) => a.created > b.created ? 1 : -1 );

    if (posts.length > limit) {
        const {postId} = posts.pop();
        return {posts, nextPostId: postId}
    } else {
        return {posts};
    }
};

/**
 * Get Single Post from FireBase DB
 * @param postID -> String
 * @returns {Promise} -> Object of Post
 */
const getSinglePost = async (postID) => {
    const postDocRef = db.collection('posts').doc(postID);
    const postDoc = await postDocRef.get();
    if (!postDoc.exists) {
        return undefined;
    }
    return { postID: postDoc.id, ...postDoc.data() };
};

export {
    getPosts,
    getPostByCategory,
    getSinglePost,
}
