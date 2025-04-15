export const generateRandomColor = (): string => {
    const colors = [
        '#1DB954', // Spotify green
        '#FF5733', // Coral
        '#3498DB', // Blue
        '#9B59B6', // Purple
        '#F1C40F', // Yellow
        '#E74C3C', // Red
        '#1ABC9C', // Turquoise
        '#D35400', // Orange
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

export const getPlaceholderImage = (size: number = 300): string => {
    return `https://via.placeholder.com/${size}x${size}?text=Music`;
};

export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        if (timeout) {
            clearTimeout(timeout);
        }

        return new Promise(resolve => {
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
    };
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};