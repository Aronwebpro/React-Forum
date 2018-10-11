import {auth} from 'firebase';
import db from '../firebase.js';

const createUser = async ({email, password, avatar, nickname}) => {
    //Create New User in Firebase Auth and instantly login
    await auth().createUserWithEmailAndPassword(email, password);

    //Get current logged in user
    const user = await auth().currentUser;

    //Update User Profile in Firebase Auth
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
    db.collection('users').doc(user.uid).set(userObj);

    return {status: 'success', msg: 'User Created Successfully!'}
};

const updateUser = async ({uid, data}) => {

};

const createPost = async (post) => {
    //Update Categories Counter
    const categoryDocRef = db.collection('categories').doc(post.categoryId);
    const categoryDoc = await categoryDocRef.get();
    const category = categoryDoc.data();
    await categoryDocRef.update({count: category.count + 1});

    //Create Post
    const postDocRef = await db.collection('posts').add(post);
    
    return {postId: postDocRef.id}
};


const TransactionWrapper = async (func, {...args}) => {
    try {
        const result = await func({...args});
        return {result};
    } catch (e) {
        //console.log(e.message);
        return {error: {msg: e.message}};
    }
};

const API = {
    createUser: TransactionWrapper.bind(this, createUser),
    updateUser: TransactionWrapper.bind(this, updateUser),
    createPost: TransactionWrapper.bind(this, createPost),
}

export default API;