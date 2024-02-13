export const createError = (name: string, message: string): Error => {
    return { name, message };
};