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

export {
    formatToDateString,
    formatToTimeString
}