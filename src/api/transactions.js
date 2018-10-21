import {auth} from 'firebase';
import db from '../firebase.js';

/**
 * Transaction Wrapper to catch Errors
 * @param func
 * @param args
 * @returns {Promise<*>}
 * @constructor
 */
const TransactionWrapper = async (func, {...args}) => {
    try {
        const result = await func({...args});
        return {result};
    } catch (e) {
        //console.log(e.message);
        return {error: {msg: e.message}};
    }
};

/**
 * Create New User in FireStore DB
 * @param email
 * @param password
 * @param avatar
 * @param nickname
 * @returns {Promise<{status: string, msg: string}>}
 */
const createUser = async ({email, password, avatar, nickname}) => {
    //Create New User in Firebase Auth and instantly Login
    await auth().createUserWithEmailAndPassword(email, password);

    //Get current logged in user
    const user = await auth().currentUser;

    //Update User User in Firebase Auth
    await user.updateProfile({
        displayName: nickname,
        photoURL: avatar
    });

    //Build User Object	
    const userObj = {};
    userObj[user.uid] = {
        authorAvatar: avatar,
        authorName: nickname,
        uid: user.uid,
        memberSince: Date.now(),
        topics: '0',
        answers: '0',
    };

    //Save new user Object to Users Collection
    await db.collection('users').doc(user.uid).set(userObj);

    console.log('User created!');

    return {status: 'success', msg: 'User Created Successfully!'}
};

const updateUser = async ({uid, data}) => {

};
/**
 * Create PostDetail in FireStore DB
 * @param post -> Object
 * @returns Object -> shapeOf({postId: String})
 */
const createPost = async ({post}) => {
    //Update Categories Counter
    const categoryDocRef = db.collection('categories').doc(post.categoryId);
    const categoryDoc = await categoryDocRef.get();
    const category = categoryDoc.data();
    await categoryDocRef.update({count: category.count + 1});

    //Create PostDetail
    const postDocRef = await db.collection('posts').add(post);

    return {postId: postDocRef.id}
};

const createComment = async ({postId, comment, userId}) => {
    const commentDocRef = await db.collection('posts').doc(postId).collection('comments').add(comment);
    const commentDoc = await commentDocRef.get();
    const postDocRef = await db.collection('posts').doc(postId);
    const postDoc = await postDocRef.get();
    const post = postDoc.data();
    postDocRef.update({lastUserId: userId, repliesCount: post.repliesCount + 1});
    return commentDoc.data();
};


const API = {
    createUser: TransactionWrapper.bind(this, createUser),
    updateUser: TransactionWrapper.bind(this, updateUser),
    createPost: TransactionWrapper.bind(this, createPost),
    createComment: TransactionWrapper.bind(this, createComment),
}

export default API;