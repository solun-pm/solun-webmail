export function formatEmailContent(emailContent: any) {
    function linkify(text: any) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url: any) => `<a href="${url}" target="_blank">${url}</a>`);
    }

    function formatReplies(text: any) {
        const lines = text.split('\n');
        let replies = [];
        let currentReply = [] as any;

        lines.forEach((line: any) => {
            if (line.startsWith('>')) {
                currentReply.push(`<span style="color: #888888">${line.substring(1)}</span>`);
            } else {
                if (currentReply.length > 0) {
                    replies.push(currentReply.join('<br/>'));
                    currentReply = [];
                }
                replies.push(line);
            }
        });

        if (currentReply.length > 0) {
            replies.push(currentReply.join('<br/>'));
        }

        return replies.join('<br/><br/>');
    }

    let formattedContent = emailContent;

    formattedContent = linkify(formattedContent);

    formattedContent = formatReplies(formattedContent);

    return formattedContent;
}