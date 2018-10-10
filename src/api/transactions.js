import {auth} from 'firebase';

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
    //TODO: Update to Firestore
    // await firebaseApp.database().ref('users').update(userObj);

    return {status: 'success', msg: 'User Created Successfully!'}
};

const updateUser = async ({uid, data}) => {

};

const TransactionWrapper = async (func, {...args}) => {
    try {
        return await func({...args});
    } catch (e) {
        //console.log(e.message);
        return {status: 'error', msg: e.message};
    }
};

const API = {
    createUser: TransactionWrapper.bind(this, createUser),
    updateUser: TransactionWrapper.bind(this, updateUser),
}

export default API;