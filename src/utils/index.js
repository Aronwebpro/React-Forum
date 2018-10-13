/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToDateString = (unixtime) => {
    const date = new Date(unixtime);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()}`;
};
/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToTimeString = (unixtime) => {
    const date = new Date(unixtime);
    return `${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

const getUsersFromStorage = (id) => {
    const local = sessionStorage.getItem(id);
    if (local) {
        try {
            return JSON.parse(local);
        }catch(e) {
            console.log(e);
            return {};
        }
    } else {
        return {};
    }
};

const saveUsersToStorage = (data) => {
      try {
          sessionStorage.setItem('postsUsers', JSON.stringify(data));
      }catch (e) {
          console.log(e);
      }
};

export {
    formatToDateString,
    formatToTimeString,
    getUsersFromStorage,
    saveUsersToStorage,
}