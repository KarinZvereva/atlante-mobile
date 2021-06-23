export const nameof = <T> (name: keyof T) => name;
export const namesof = <T> (obj: T) => (Object.keys(obj));