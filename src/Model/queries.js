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

export const flash = {
    getFlashMessage: () => {
        return firebaseApp.database().ref('flash').once('value');
    },
    createFlashMessage: (status=true, msg, msgStatus, redirect=false, url='/', back='/') => {
        return firebaseApp.database().ref('flash').update({status:status, msg:msg, msgStatus:msgStatus, redirect: redirect, redirectUrl: url, back:back});
    },
    updateFlashMessage: (update) => {
        return firebaseApp.database().ref('flash').update(update);
    },
    resetFlashMessage: () => {
        return firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'', redirect:false, redirectUrl:''});

    }
}
