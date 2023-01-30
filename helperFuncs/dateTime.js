export const convertTimeStamp =  (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleDateString('en-US');
}


export const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    if (now.toDateString() === date.toDateString()) {
        const hoursSincePosted = (now - date) / 1000 / 60 / 60;
        if(hoursSincePosted < 1) {
            return 'Just Now'
        }
        return `${Math.round(hoursSincePosted)} hours ago`;
    } else {
        return date.toLocaleDateString();
    }
}
