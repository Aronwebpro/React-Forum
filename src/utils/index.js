/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToDateString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()}`;
};

/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToTimeString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

/**
 * Function to Convert Unix Time to Readable Date and Time String
 * @param unixTime
 * @returns String
 */
const formatToDateAndTimeString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

/**
 * Get cached User from Session Storage
 * @param id -> String
 * @returns {User}
 */
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

/**
 * Cache User object to Session Storage
 * @param data
 */
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
    formatToDateAndTimeString,
}