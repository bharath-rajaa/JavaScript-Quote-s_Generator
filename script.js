const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteImage = document.getElementById('quote-image');
const newQuoteButton = document.getElementById('new-quote');

//Theme Change

var theme = document.querySelector("#Dark");
var lightTheme = document.querySelector("#Light");
var body = document.getElementById("body");

// Apply the saved theme from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});

// Function to apply the theme
function applyTheme(theme) {
    if (theme === "dark") {
        body.style.backgroundColor = "black";
        body.style.color = "white";
    } else if (theme === "light") {
        body.style.backgroundColor = "white";
        body.style.color = "black";
    }
    localStorage.setItem("theme", theme); // Save the theme to localStorage
}

// Event listeners for theme buttons
theme.addEventListener("click", () => {
    applyTheme("dark");
});

lightTheme.addEventListener("click", () => {
    applyTheme("light");
});

// Fetch a random quote from the API and update the DOM
async function fetchQuote() {
    try {
        const response = await fetch('https://mimic-server-api.vercel.app/quotes');
        const quotes = await response.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        quoteText.innerText = randomQuote.quote;
        quoteAuthor.innerText = `- ${randomQuote.author}`;
        quoteImage.src = `https://via.placeholder.com/100?text=${encodeURIComponent(randomQuote.author)}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

newQuoteButton.addEventListener('click', fetchQuote);

// Fetch a quote when the page loads
// fetchQuote();

// Function to get a random image from the array

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}


// Update the fetchQuote function to use a random image
async function fetchQuote() {
    try {
        const response = await fetch('https://mimic-server-api.vercel.app/quotes');
        const quotes = await response.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteText.innerText = randomQuote.quote;
        quoteAuthor.innerText = `- ${randomQuote.author}`;
        const authorImages = {
            "A.P.J. Abdul Kalam": "./apj.jpeg",
            "Steve Jobs": "./steve.jpeg",
            "Nelson Mandela": "./Nelson_Mandela.webp",
            "Mahatma Gandhi": "./Gandhi.jpeg",
            "Walt Disney": "./Disny.jpeg",
            "Rabindranath Tagore": "./Rabindranath.jpeg",
            "Swami Vivekananda": "./Swami_Vivekananda.jpg",
            "Dr. B.R. Ambedkar": "./ambed.jpeg",
            "Kalpana Chawla": "./kalpana.jpeg",
            "Indira Gandhi": "./indira.jpeg",
            "Albert Einstein": "./instin.jpeg",
            "Henry Ford": "./Ford.jpeg",
            "Eleanor Roosevelt": "./Eleanor.jpeg",
            "Confucius": "./Confucius.jpeg",
            "Martin Luther King Jr.": "./Martin_Luther_King.jpeg",
            "Ralph Waldo Emerson": "./Ralph.jpeg"
        };

        const authorImage = authorImages[randomQuote.author] || "./USER.jpeg"; // Default image for the user quotes
        quoteImage.src = authorImage;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}


// Translate
 
function translateQuote() {
    const selectedLanguage = document.getElementById('language-select').value;
    const quoteText = document.getElementById('quote-text').innerText;
    const translatedQuoteElement = document.createElement('p');
    translatedQuoteElement.id = 'translated-quote';
    translatedQuoteElement.style.fontStyle = 'italic';
    translatedQuoteElement.style.marginTop = '10px';
    // translatedQuoteElement.innerText = 'Translated Quote will appear here.';
    document.querySelector('.quote-box').appendChild(translatedQuoteElement);
    if (selectedLanguage === 'en' || !selectedLanguage) {
        alert('OOPS! No Language Selected!');        
        return;
    }

    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${selectedLanguage}&dt=t&q=${encodeURIComponent(quoteText)}`;

    fetch(translateUrl)
        .then(response => response.json())
        .then(data => {
            const translatedText = data[0][0][0];
            document.getElementById('quote-text').innerText = translatedText;
        })
        .catch(error => {
            console.error('Error translating quote:', error);
            alert('Failed to translate the quote. Please try again.');
        });
}

        




