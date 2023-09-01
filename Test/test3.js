function getContrastingButtonColors(backgroundHexColor) {
    // Convert the hexadecimal background color to RGB
    const r = parseInt(backgroundHexColor.slice(1, 3), 16);
    const g = parseInt(backgroundHexColor.slice(3, 5), 16);
    const b = parseInt(backgroundHexColor.slice(5, 7), 16);

    // Calculate the relative luminance (perceived brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Determine the text colors for the buttons
    const textColors = [];

    // For the first button, choose black or white text
    textColors.push(luminance > 0.5 ? "#000000" : "#FFFFFF");

    // For the second button, choose a different text color
    textColors.push(luminance > 0.5 ? "#FFFFFF" : "#000000");

    return textColors;
}

const backgroundColor = "#d7deea";
const [buttonColor1, buttonColor2] = getContrastingButtonColors(backgroundColor);

console.log("Background Color:", backgroundColor);
console.log("Button Color 1:", buttonColor1);
console.log("Button Color 2:", buttonColor2);
