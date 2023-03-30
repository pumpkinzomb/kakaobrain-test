export const delay = (time: number) => new Promise((response) => setTimeout(response, time));
export const random = (min: number, max: number) => min + Math.random() * (max - min);
