export function capitalizeFirstLetterOfEachWord(sentence) {
    if (!sentence) return sentence;

    // Split the sentence into an array of words
    const words = sentence.split(/\s+/);

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
        // Check if the word is not empty
        if (words[i].length > 0) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
    }

    // Join the words back into a sentence and return
    return words.join(' ');
}