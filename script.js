const emojis = ['🍎', '🍌', '🍓', '🍇', '🍍', '🍒'];
let cards = [...emojis, ...emojis]; // 12 total

let flippedCards = [];
let matchedCards = [];

const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${emoji}</div>
    `;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (
    flippedCards.length < 2 &&
    !this.classList.contains('flip') &&
    !matchedCards.includes(this)
  ) {
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const emoji1 = card1.dataset.emoji;
  const emoji2 = card2.dataset.emoji;

  if (emoji1 === emoji2) {
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }
  flippedCards = [];
}

restartBtn.addEventListener('click', () => {
  matchedCards = [];
  flippedCards = [];
  createBoard();
});

createBoard(); // Start the game
