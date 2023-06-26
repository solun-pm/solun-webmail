export function formatEmailContent(emailContent: any) {
    function linkify(text: any) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url: any) => `<a href="${url}" target="_blank">${url}</a>`);
    }

    function formatReplies(text: any) {
        const lines = text.split('\n');
        return lines.map((line: any) => {
            if (line.startsWith('>')) {
                return `<span style="color: blue">${line}</span>`;
            } else {
                return line;
            }
        }).join('\n');
    }

    let formattedContent = emailContent;

    formattedContent = linkify(formattedContent);

    formattedContent = formatReplies(formattedContent);

    return formattedContent;
}