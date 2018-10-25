import db from '../firebase.js';
import {getUsersFromStorage, saveUsersToStorage} from '../utils'

/**
 * Get PostDetail List from FireStore DB
 * @param limit -> Number[optional]
 * @returns {Promise} -> Array of Posts
 */
const getPosts = async (limit = 10) => {
    const postsRef = db.collection('posts');
    const postsDoc = await postsRef.orderBy('created', 'desc').limit(limit + 1).get();
    const postsData = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    });

    const posts = await Promise.all(postsData.map(async (post) => {
        const [user, lastUser] = await Promise.all([
            await getUserProfile(post.userId),
            await getUserProfile(post.lastUserId)
        ]);
        post.user = user;
        post.lastUser = lastUser;
        return post;
    }));

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
    const postsData = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    }).sort((a, b) => a.created > b.created ? 1 : -1);

    const posts = await Promise.all(postsData.map(async (post) => {
        const [user, lastUser] = await Promise.all([
            await getUserProfile(post.userId),
            await getUserProfile(post.lastUserId)
        ]);
        post.user = user;
        post.lastUser = lastUser;
        return post;
    }));

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
 * Get User Data from FireStore DB and cache to Session Storage
 * @param userId -> String
 * @returns Object of User's User
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
//TODO:
const getUserInfo = async (userId) => {

};
/**
 * Get Posts belonging to User
 * @param userId -> String
 * @param limit -> number
 * @returns Array of Posts
 */
const getPostBelongingToUser = async (userId, limit=10) => {
    const postsRef = db.collection('posts').where('userId', '==', userId);
    const postsDoc = await postsRef.orderBy('created', 'desc').limit(limit + 1).get();
    const postsData = postsDoc.docs.map(postDoc => {
        return {postId: postDoc.id, ...postDoc.data()}
    });

    const posts = await Promise.all(postsData.map(async (post) => {
        const [user, lastUser] = await Promise.all([
            await getUserProfile(post.userId),
            await getUserProfile(post.lastUserId)
        ]);
        post.user = user;
        post.lastUser = lastUser;
        return post;
    }));

    if (posts.length > limit) {
        const {postId} = posts.pop();
        return {posts, nextPostId: postId}
    } else {
        return {posts};
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
/**
 * Get Post for PostDetails Page
 * @param postId
 * @returns Object -> of Post
 */
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

const getCategories = async () => {
    const categoriesDocRef = db.collection('categories');
    const categoriesDoc = await categoriesDocRef.get();
    return categoriesDoc.docs.map((categoryDoc) => {
        return {categoryId: categoryDoc.id, ...categoryDoc.data()}
    })
};

export {
    getPosts,
    getPostByCategory,
    getSinglePost,
    getUserProfile,
    getPostDataForPostPage,
    getCommentsBelongingToPost,
    getCategories,
    getPostBelongingToUser,
}
