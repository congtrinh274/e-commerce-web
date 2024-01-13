const replaceImageUrl = (imageUrl, apiBaseUrl) => {
    // Replace backslashes with forward slashes
    const normalizedUrl = imageUrl.replace(/\\/g, '/');

    // Check if the URL is already absolute (starts with http or https)
    if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
        return normalizedUrl;
    }

    // Combine the base URL and the normalized image URL
    return `${apiBaseUrl}/${normalizedUrl}`;
};

export default replaceImageUrl;
