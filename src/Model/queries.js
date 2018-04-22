import firebaseApp from '../firebase.js';

export const getPosts = (limit=10) => {
    return  firebaseApp.database()
                .ref('topics')
                .limitToLast(limit)
                .orderByKey().once('value'); 
              	
}

export const getPostByCategory = (category, limit) => {
    return 	firebaseApp.database()
                .ref('topics')
                .orderByChild('categoryUrl')
                .equalTo(category)
                .limitToLast(limit)
                .once('value');
}

export const signIn = (email, password) => {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
}

