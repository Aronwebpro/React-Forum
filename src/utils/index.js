/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToDateString = (firestoreObj) => {
    const date = new Date(firestoreObj.toDate());
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()}`;
};
/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToTimeString = (firestoreObj) => {
    const date = new Date(firestoreObj.toDate());
    return `${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

export {
    formatToDateString,
    formatToTimeString
}