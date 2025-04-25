let score1 = 0;
let score2 = 0;
let correctAnswer = 0;
let answered = false;
let gameInterval;
let roundTimeout;
let totalGameTime = 33; // in seconden
let timeLeft = totalGameTime;

function startGame() {
  score1 = 0;
  score2 = 0;
  timeLeft = totalGameTime;
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
  document.getElementById("winnerMessage").innerText = "";

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);

  generateQuestion();
}

function generateQuestion() {
  answered = false;
  document.getElementById("winnerMessage").innerText = "";

  const a = Math.floor(Math.random() * 100) + 1;
  const b = Math.floor(Math.random() * 100) + 1;
  correctAnswer = a + b;

  document.getElementById("question").innerText = `${a} + ${b} = ?`;

  const options = new Set([correctAnswer]);
  while (options.size < 3) {
    options.add(Math.floor(Math.random() * 200));
  }

  const choiceArray = Array.from(options).sort(() => Math.random() - 0.5);

  const player1Div = document.getElementById("player1");
  const player2Div = document.getElementById("player2");
  player1Div.innerHTML = '<h2>🟦 Speler 1</h2>';
  player2Div.innerHTML = '<h2>🟥 Speler 2</h2>';

  choiceArray.forEach(choice => {
    const btn1 = document.createElement("button");
    btn1.innerText = choice;
    btn1.onclick = () => handleAnswer(1, choice);
    player1Div.appendChild(btn1);

    const btn2 = document.createElement("button");
    btn2.innerText = choice;
    btn2.onclick = () => handleAnswer(2, choice);
    player2Div.appendChild(btn2);
  });

  clearTimeout(roundTimeout);
  roundTimeout = setTimeout(() => {
    if (!answered) {
      answered = true;
      generateQuestion();
    }
  }, 3000); // 3 seconden per ronde
}

function handleAnswer(player, choice) {
  if (answered) return;

  if (choice === correctAnswer) {
    const winner = player === 1 ? "Speler 1" : "Speler 2";
    document.getElementById("winnerMessage").innerText = `✅ ${winner} was het snelst!`;

    if (player === 1) {
      score1++;
      document.getElementById("score1").innerText = score1;
    } else {
      score2++;
      document.getElementById("score2").innerText = score2;
    }
  } else {
    document.getElementById("winnerMessage").innerText = `❌ Fout antwoord!`;
  }

  answered = true;
  clearTimeout(roundTimeout);
  setTimeout(generateQuestion, 500); // korte pauze voor de volgende vraag
}

function resetGame() {
  clearInterval(gameInterval);
  clearTimeout(roundTimeout);
  startGame();
}

function endGame() {
  clearTimeout(roundTimeout);
  document.getElementById("player1").innerHTML = '';
  document.getElementById("player2").innerHTML = '';

  if (score1 > score2) {
    document.getElementById("winnerMessage").innerText = "🏆 Speler 1 wint!";
  } else if (score2 > score1) {
    document.getElementById("winnerMessage").innerText = "🏆 Speler 2 wint!";
  } else {
    document.getElementById("winnerMessage").innerText = "🤝 Gelijkspel!";
  }

  document.getElementById("question").innerText = "⏱ Tijd is om!";
}

startGame();
