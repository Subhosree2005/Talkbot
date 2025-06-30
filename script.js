const form = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const recommendation = document.getElementById("recommendation");
document.getElementById("breathing-container").style.display = "none";
const prompts = [
  "What’s one thing you’re grateful for today?",
  "Describe a peaceful moment you had recently.",
  "What thoughts have been on your mind lately?",
  "Write about a challenge you're facing and how you're handling it.",
  "Who makes you feel safe and why?"
];

 

function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}


form.addEventListener("submit", function(e) {
  e.preventDefault();
  const message = userInput.value;
  addMessage("You", message);
  respond(message);
  userInput.value = "";
});

function addMessage(sender, text) {
  const msg = document.createElement("p");
  msg.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function respond(text) {
  const player = document.getElementById("music-player");
  player.style.display = "none";
  player.classList.remove("glow");

  document.getElementById("breathing-container").style.display = "none";

  const mood = detectMood(text);
  let reply = "";
  let suggestion = "";

  // switch-case for mood continues here...

  

  // Hide music player and breathing animation by default
  document.getElementById("music-player").style.display = "none";
  document.getElementById("breathing-container").style.display = "none";

  switch (mood) {
    case "sad":
      reply = "I'm here for you. It's okay to feel sad sometimes. You're not alone.";
      suggestion = "Try listening to calming music or journaling your thoughts.";
      document.getElementById("music-player").style.display = "block"; // show music
      break;

    case "anxious":
      reply = "Take a deep breath. You're doing your best. Let's try a breathing exercise.";
      suggestion = "Inhale for 4 seconds... Hold... Exhale. Try again a few times.";
      document.getElementById("breathing-container").style.display = "block"; // show animation
      break;

    case "angry":
      reply = "Let it out. It's healthy to acknowledge anger. Try to channel it constructively.";
      suggestion = "Go for a walk or listen to soothing music.";

      document.getElementById("music-player").style.display = "block";

      break;

    case "happy":
      reply = "That's wonderful to hear! Keep spreading positivity.";
      suggestion = "Maybe share your happiness in a journal!";
      break;

    case "lonely":
      reply = "You are not lonely dear, I'm with you.";
      suggestion = "Let's talk more.";
      break;

    default:
      reply = "I'm listening. Tell me more about how you're feeling.";
      suggestion = getRandomPrompt(); // if you're using the journaling prompt feature
  }

  addMessage("MindEase", reply);
  recommendation.textContent = "Suggestion: " + suggestion;
}


function detectMood(text) {
  text = text.toLowerCase();

  if (text.includes("sad") || text.includes("cry") || text.includes("down"))
    return "sad";

  if (text.includes("anxious") || text.includes("nervous") || text.includes("worried"))
    return "anxious";

  if (text.includes("angry") || text.includes("mad") || text.includes("frustrated"))
    return "angry";

  if (text.includes("happy") || text.includes("great") || text.includes("joy"))
    return "happy";

  if (text.includes("lonely") || text.includes("alone") || text.includes("isolated"))
    return "lonely";

  return "neutral";
}


 