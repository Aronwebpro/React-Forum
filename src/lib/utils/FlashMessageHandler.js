/**
 * Manage Flash Message in Local Storage
 */
const FlashMessageHandler = {
    create: (msg, status, redirect=false, redirectUrl='/', back='/') => {
        const data = {msg, status, redirect, redirectUrl, back}
        localStorage.setItem('flashMessage', JSON.stringify(data));
    },
    fetch: () => {
        return JSON.parse(localStorage.getItem('flashMessage')) || {};
    },
    update: (update={}) => {
        const data = {msg: '', status: '', redirect: false, redirectUrl: '', back: ''};
        Object.keys(update).forEach((e) => update[e] !== undefined ?  data[e] = update[e] : '');
        localStorage.setItem('flashMessage', JSON.stringify(data));
    },
    reset: () => {
        const data = {msg:'', status:'', redirect:false, redirectUrl:'', back: ''}
        localStorage.setItem('flashMessage', JSON.stringify(data));
    }
};

export {
    FlashMessageHandler
}