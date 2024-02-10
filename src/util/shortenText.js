export const ShortenText = (text, len, isAll) => {
    if (text?.length < len) {
        return { isShortened: true, text: text };
    } else if (!isAll) {
        return { isShortened: false, text: `${text?.slice(0, len)}...` };
    } else {
        return { isShortened: false, text: text };
    }
};
