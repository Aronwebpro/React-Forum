import firebaseApp from '../firebase.js';

const getAllPosts = (amount=10) => {
    return  firebaseApp.database()
                .ref('topics')
                .limitToLast(amount)
                .orderByKey().once('value'); 
              	
}