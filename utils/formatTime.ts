function getFormattedDate(dateString: string): string {
    const date = new Date(dateString); // Convert string to Date
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = diffMs / 1000;
    const diffMin = diffSec / 60;
    const diffHours = diffMin / 60;

    if (diffMin < 1) {
        return 'Just now';
    } else if (diffMin < 60) {
        return `${Math.floor(diffMin)} minutes ago`;
    } else if (diffHours < 24) {
        return `${Math.floor(diffHours)} hours ago`;
    } else {
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months start from 0
        const year = date.getUTCFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }
}


export default getFormattedDate;