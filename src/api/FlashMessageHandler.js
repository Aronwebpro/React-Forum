export const FlashMessageHandler = {
    create: (msg, status, redirect=false, redirectUrl='/', back='/') => {
        const data = {msg, status, redirect, redirectUrl, back}
        localStorage.setItem('flash', JSON.stringify(data));
    },
    update: (update={}) => {
        const data = {msg: '', status: '', redirect: false, redirectUrl: '', back: ''};
        Object.keys(update).forEach((e) => update[e] !== undefined ?  data[e] = update[e] : '');
        localStorage.setItem('flash', JSON.stringify(data));
    },
    reset: () => {
        const data = {msg:'', status:'', redirect:false, redirectUrl:'', back: ''}
        localStorage.setItem('flash', JSON.stringify(data));
    }
}