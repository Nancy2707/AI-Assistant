const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const modeToggle = document.querySelector('.mode-toggle');
    if (document.body.classList.contains('dark-mode')) {    
        modeToggle.textContent = 'Toggle Light Mode';
    } else {
        modeToggle.textContent = 'Toggle Dark Mode';
    }
}
function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning Nancy");
    } else if(hr == 12) {
        speak("Good noon Nancy");
    } else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon Nancy");
    } else {
        speak("Good Evening Nancy");
    }
}

window.addEventListener('load', ()=>{
    speak("Activating SORA");
    speak("Going online");
    wishMe();
    speak("Hello Nancy How can I assist you today");
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello Nancy";
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine Nancy tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('hello how are you')) {
        const finalText = "Hello Nancy I am good how can I assist you today";
        speech.text = finalText;
    }

    else if(message.includes('name')) {
        const finalText = "My name is SORA";
        speech.text = finalText;
    }

    else if(message.includes('introduce yourself') || message.includes('who are you') || message.includes('what can you do')) {
        const finalText = "Hello, I'm SORA, your personal AI assistant. I can help you with various tasks such as opening websites, providing information, telling jokes, checking the weather, playing music on Spotify, and much more. Feel free to ask me anything!";
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else if(message.includes('weather')) {
        window.open(`https://www.google.com/search?q=weather`, "_blank");
        const finalText = "Here's the current weather information";
        speech.text = finalText;
    }

    else if(message.includes('tell me a joke')) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "Why don't eggs tell jokes? They'd crack each other up!"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speech.text = randomJoke;
    }

    else if(message.includes('play') && (message.includes('song') || message.includes('artist'))) {
        const query = message.replace('play', '').replace('song', '').replace('artist', '').trim();
        const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
        window.open(spotifySearchUrl, "_blank");
        const finalText = `Opening Spotify and searching for ${query}`;
        speech.text = finalText;
    }

    else if(message.includes('translate')) {
        window.open(`https://translate.google.com`, "_blank");
        const finalText = "Opening Google Translate";
        speech.text = finalText;
    }

    else if(message.includes('set a timer')) {
        const finalText = "I'm sorry, I can't set a timer directly. But I can open a timer website for you.";
        window.open(`https://www.google.com/search?q=timer`, "_blank");
        speech.text = finalText;
    }

    else if(message.includes('news')) {
        window.open(`https://news.google.com`, "_blank");
        const finalText = "Here are the latest news headlines";
        speech.text = finalText;
    }

    else if(message.includes('directions') || message.includes('navigate')) {
        window.open(`https://www.google.com/maps`, "_blank");
        const finalText = "Opening Google Maps for directions";
        speech.text = finalText;
    }

    else if(message.includes('reminder')) {
        const finalText = "I'm sorry, I can't set reminders directly. But I can open Google Calendar for you to set a reminder.";
        window.open(`https://calendar.google.com`, "_blank");
        speech.text = finalText;
    }

    else if(message.includes('thank you')) {
        const finalText = "You're welcome, Nancy. Is there anything else I can help you with?";
        speech.text = finalText;
    }

    else if(message.includes('goodbye') || message.includes('bye')) {
        const finalText = "Goodbye, Nancy. Have a great day!";
        speech.text = finalText;
    }

    // New features
    else if(message.includes('tell me a fun fact')) {
        const funFacts = [
            "The shortest war in history lasted 38 minutes.",
            "A group of flamingos is called a 'flamboyance'.",
            "The world's oldest known living tree is over 5,000 years old."
        ];
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        speech.text = randomFact;
    }

    else if(message.includes('flip a coin')) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        speech.text = `I flipped a coin and it's ${result}`;
    }

    else if(message.includes('roll a die') || message.includes('roll a dice')) {
        const result = Math.floor(Math.random() * 6) + 1;
        speech.text = `I rolled a die and it's ${result}`;
    }

    else if(message.includes('what\'s your favorite')) {
        speech.text = "As an AI, I don't have personal preferences. But I'd love to hear about your favorites!";
    }

    else if(message.includes('tell me about yourself')) {
        speech.text = "I'm an AI assistant created to help with various tasks. I don't have a physical form, but I can process language and help you find information or perform simple tasks. Is there anything specific you'd like to know?";
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}