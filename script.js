const colours = ["Red", "Green", "Violet"];

let score = 0;
let targetColour = "";
let playing = false;
let history = [];

const target = document.getElementById("target");
const message = document.getElementById("message");
const startButton = document.getElementById("start");
const instruction = document.getElementById("instruction");

const colourCodes = {
  Red: "#ef4444",
  Green: "#16a34a",
  Violet: "#9333ea"
};

function startGame() {
  if (playing) return;

  playing = true;
  startButton.disabled = true;
  instruction.textContent = "Memorise the target colour!";

  targetColour =
    colours[Math.floor(Math.random() * colours.length)];

  target.style.background = colourCodes[targetColour];
  target.textContent = targetColour;

  message.textContent = "Remember the colour...";

  setTimeout(() => {
    if (!playing) return;

    target.style.background = "#39344f";
    target.textContent = "?";

    instruction.textContent = "Which colour did you see?";
    message.textContent = "Select the matching colour.";
  }, 1800);
}

function choose(colour) {
  if (!playing || target.textContent !== "?") return;

  playing = false;

  const correct = colour === targetColour;

  if (correct) {
    score += 10;
    message.textContent = "Correct! +10 practice points 🎉";
  } else {
    message.textContent =
      "Not quite! The colour was " + targetColour + ".";
  }

  document.getElementById("score").textContent = score;

  history.unshift({
    selected: colour,
    target: targetColour,
    correct: correct
  });

  history = history.slice(0, 8);
  updateHistory();

  target.style.background = colourCodes[targetColour];
  target.textContent = targetColour;

  startButton.disabled = false;
  startButton.textContent = "Next Challenge";
  instruction.textContent = "Challenge completed!";
}

function updateHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");

    li.textContent =
      `Round ${history.length - index}: ` +
      `${item.selected} — ` +
      (item.correct ? "Correct ✓" : "Incorrect");

    list.appendChild(li);
  });
}
