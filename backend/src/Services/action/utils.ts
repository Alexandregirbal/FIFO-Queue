export const calculateMaxCredits = (credits: number, min: number, max: number): number => {
    const randomRate = Math.random() * (max - min) + min
    const newCredits = Math.floor(credits * randomRate)
    return newCredits
}
