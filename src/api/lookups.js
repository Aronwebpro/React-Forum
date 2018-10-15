import db from '../firebase.js';
import {getUsersFromStorage, saveUsersToStorage} from '../utils'

/**
 * Get PostDetail List from FireStore DB
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
 * Get PostDetail List by Category from FireStore DB
 * @param categoryId -> String
 * @param limit -> Number
 * @returns {Promise} -> Array of Posts
 */
const getPostByCategory = async (categoryId, limit = 10) => {
    const postsRef = db.collection('posts').where('categoryId', '==', categoryId);
    const postsDoc = await postsRef.limit(limit).get();
    const posts = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    }).sort((a, b) => a.created > b.created ? 1 : -1);

    if (posts.length > limit) {
        const {postId} = posts.pop();
        return {posts, nextPostId: postId}
    } else {
        return {posts};
    }
};

/**
 * Get Single PostDetail from FireStore DB
 * @param postID -> String
 * @returns {Promise} -> Object of PostDetail
 */
const getSinglePost = async (postID) => {
    const postDocRef = db.collection('posts').doc(postID);
    const postDoc = await postDocRef.get();
    if (!postDoc.exists) {
        return undefined;
    }
    return {postId: postDoc.id, ...postDoc.data()};
};

/**
 * Get User Data from FireStore DB
 * @param userId -> String
 * @returns Object of User's Profile
 */

const getUserProfile = async (userId) => {
    const users = getUsersFromStorage();
    if (users[userId]) {
        return users[userId];
    } else {
        const userDocRef = db.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            return undefined;
        } else {
            const user = userDoc.data()[userId];
            users[userId] = user;
            saveUsersToStorage(users);
            return user;
        }
    }
};
/**
 * Get All Comments Belonging to Post
 * @param postID
 * @returns Array -> of Objects
 */
const getCommentsBelongingToPost = async (postID) => {
    const commentsDocRef = db.collection('posts').doc(postID).collection('comments');
    const commentsDoc = await commentsDocRef.orderBy('created', 'desc').get();
    const comments = await commentsDoc.docs.map(commentDoc => {
        return {commentId: commentsDoc.id, ...commentDoc.data()}
    });
    const commentWithUser = await Promise.all(comments.map(async (comment) => {
        comment.user = comment.userId && await getUserProfile(comment.userId);
        return comment;
    }));
    return commentWithUser;//.sort((a, b) => a.created > b.created ? 1 : -1);
};

//TODO: Api
const getPostDataForPostPage = async (postId) => {
    const post = await getSinglePost(postId);
    if (post && post.userId) {
        const postUser = await getUserProfile(post.userId);
        if (postUser) {
            return {postUser, post}
        } else {
            return {}
        }
    } else {
        return {}
    }
};

export {
    getPosts,
    getPostByCategory,
    getSinglePost,
    getUserProfile,
    getPostDataForPostPage,
    getCommentsBelongingToPost,
}
