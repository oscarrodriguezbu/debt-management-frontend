export const toLocalDateString = (date: Date) => {
    return new Date(date).toLocaleString("en-CA", { hour12: false })
}