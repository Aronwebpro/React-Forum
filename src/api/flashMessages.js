export const flash = {
    createFlashMessage: (status=true, msg, msgStatus, redirect=false, url='/', back='/') => {
        const data = {status:status, msg:msg, msgStatus:msgStatus, redirect: redirect, redirectUrl: url, back:back}
        localStorage.setItem('flash', JSON.stringify(data));
    },
    getFlashMessage: () => {
        return JSON.parse(localStorage.getItem('flash'));
    },
    updateFlashMessage: (update={}) => {
        localStorage.setItem('flash', JSON.stringify(update));
    },
    resetFlashMessage: () => {
        const data = {status:false, msg:'', msgStatus:'', redirect:false, redirectUrl:''}
        localStorage.setItem('flash', JSON.stringify(data));
    }
}