var deck = generateDeck();
console.log(deck);
let playersCount = 0;
let dealersCount = 0;

let playerAlive = true;

let dealerArea = document.querySelector('.dcards').innerHTML;
let playerArea = document.querySelector('.pcards').innerHTML;// init html of cards to be rendered

document.querySelector('.js-play').addEventListener("click", playGame);//adds eventlistener to deal button

function playGame() {
  document.querySelector('.js-play').removeEventListener("click", playGame);
  document.getElementById('mid-text').textContent = '';
  setTimeout(() => {//deals 1st dealer card
    dealerscard = randomCard(); // pulls random card
    document.querySelector('.dcards').innerHTML += renderCard(dealerscard);
    dealersCount += dealerscard;
    document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
  }, 800);

  setTimeout(() => {//deals 1st player card
    playerscard = randomCard();
    document.querySelector('.pcards').innerHTML += renderCard(playerscard);
    playersCount += playerscard;
    document.getElementById('player-count').innerHTML = `Player: ${playerscard}`;
  }, 1600);

  
  setTimeout(() => {// Deal one more card to the player
    let additionalCard = randomCard();
    document.querySelector('.pcards').innerHTML += renderCard(additionalCard);
    playersCount += additionalCard;
    document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
    document.getElementById('mid-text').textContent = `Hit or Stand?`;
  }, 2400);
  // Initialize player game and set up event listeners
  playerGame(playersCount);
}

function playerGame(playersCount) {//adds event listeners for hit and stand
  if (playersCount <= 21) {
    document.querySelector('.js-hit').addEventListener("click", hitHandler);
    document.querySelector('.js-stand').addEventListener("click", standHandler);
  } else {
    setTimeout(endGame,2000);
  }
}

function hitHandler() {//instructions for when hit is pressed
  let pcard = randomCard();
  document.querySelector('.pcards').innerHTML  += renderCard(pcard);
  playersCount += pcard;
  document.getElementById('player-count').innerHTML = `Player: ${playerscard}`;
  //generates new card
  if (playersCount <= 21) {
    document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
    // Update the player display
  } else {//player busts
    document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
    document.getElementById('mid-text').textContent = 'Player Busts. You lose.';
    setTimeout(endGame,2000);
  }
}

function standHandler() {//when stand is clicked
  document.getElementById('mid-text').textContent = '';
  document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
  document.getElementById('mid-text').textContent = `Player: Stands on ${playersCount}`;
  setTimeout(()=>{dealersGame(playersCount);},500);
}

async function dealersGame(playersCount) {
  // Helper function to add delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  while (dealersCount < 17) {//keeps dealing cards until 17 or higher
    let dcard = randomCard();
    document.querySelector('.dcards').innerHTML += renderCard(dcard);
    dealersCount += dcard;
    document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
    await delay(1000); // Wait for 300ms before drawing the next card
  }
  if (dealersCount > 21) {//checks for bust
    document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
    document.getElementById('mid-text').textContent = `Dealer Busts. You Win!`;
    setTimeout(endGame,2000);
  } else {
    if ((21 - playersCount) === (21 - dealersCount)) {//checks for push
      document.getElementById('mid-text').textContent = `Push.`;
      setTimeout(endGame,2000);

    } else if ((21 - playersCount) > (21 - dealersCount)) {//checks for player win
      document.getElementById('mid-text').textContent = `You Lose!`;
      setTimeout(endGame,2000);

    } else {//checks for player win
      document.getElementById('mid-text').textContent = `You Win.`;
      setTimeout(endGame,2000);
    }
  }
}


function randomCard()//Generates random card from deck
{
  let cardIndex = Math.floor(Math.random() * deck.length); // Get a random index within the deck length
  let removedCard = deck.splice(cardIndex, 1)[0]; // Remove the card from the deck and get the removed card
  return removedCard; // Return the removed card
}

function endGame() {//instructions for ending game and resetting so that deal can be clicked again
  document.querySelector('.dcards').innerHTML = '';
  document.querySelector('.pcards').innerHTML = '';
  //resetting cards on screen
  document.querySelector('.js-play').addEventListener("click", playGame);
  //adds event listener back to program
  playerAlive = false;
  document.querySelector('.js-hit').removeEventListener("click", hitHandler);
  document.querySelector('.js-stand').removeEventListener("click", standHandler);
  //removes event listeners from hit and stand
  playersCount = 0;
  dealersCount = 0;
  document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
  document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
  //resets counters
  deck = generateDeck();//makes new deck
}

function renderCard(num)//generates html of card
{
  return `<div class = card>${num}</div>`;
}

function generateDeck()// created deck with 52 cards with their values
{
  let deck = [];
  for (i = 1; i <= 10; i++) {
    for (j = 1; j <= 4; j++) {
      deck.push(i);
    }
  }
  for (k = 0; k < 12; k++) {
    deck.push(10);
  }
  return deck;
}