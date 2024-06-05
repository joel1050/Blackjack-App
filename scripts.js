var deck = [];
for (i = 1; i <= 10; i++) {
  for (j = 1; j <= 4; j++) {
    deck.push(i);
  }
}
for (k = 0; k < 12; k++) {
  deck.push(10);
}
// created deck with 52 cards with their values

let dealer = [];
let player = []; // empty array containing dealers cards
let playersCount = 0;
let dealersCount = 0;

let playerAlive = true;

dealerArea = document.querySelector('.dcards').innerHTML;
playerArea = document.querySelector('.pcards').innerHTML;// init html of cards to be rendered

function renderCard(num)
{
  return `<div class = card>${num}</div>`;
}

function playGame() {
  setTimeout(() => {
    dealerscard = randomCard(); // pulls random card
    document.querySelector('.dcards').innerHTML += renderCard(dealerscard);
    dealersCount += dealerscard;
    document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
  }, 800);

  setTimeout(() => {
    playerscard = randomCard();
    player.push(playerscard);
    document.querySelector('.pcards').innerHTML += renderCard(playerscard);
    playersCount += playerscard;
    document.getElementById('player-count').innerHTML = `Player: ${playerscard}`;
  }, 1600);

  // Deal one more card to the player
  setTimeout(() => {
    let additionalCard = randomCard();
    player.push(additionalCard);
    document.querySelector('.pcards').innerHTML += renderCard(additionalCard);
    playersCount += additionalCard;
    document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
  }, 2400);

  // Initialize player game and set up event listeners
  playerGame(playersCount);
}

function playerGame(playersCount) {
  if (playersCount <= 21) {
    document.querySelector('.js-hit').addEventListener("click", hitHandler);
    document.querySelector('.js-stand').addEventListener("click", standHandler);
  } else {
    console.log('count: busted');
    endGame();
    return playersCount;
  }
  return null;
}

function hitHandler() {
  let pcard = randomCard();
  console.log('New card: ' + pcard);
  document.querySelector('.pcards').innerHTML  += renderCard(pcard);
  playersCount += pcard;
  document.getElementById('player-count').innerHTML = `Player: ${playerscard}`;

  if (playersCount <= 21) {
    console.log('Players count: ' + playersCount);
    document.getElementById('player-count').innerHTML = `Player: ${playersCount}`;
    // Update the player display if needed
  } else {
    console.log('count: busted');
    document.getElementById('player-count').innerHTML = `Player: BUSTED`;
    setTimeout(()=>alert("You have busted."),400);
    //window.location.reload();
  }
}

function standHandler() {
  document.getElementById('player-count').innerHTML = `Player Stands on ${playersCount}`;
  setTimeout(()=>{dealersGame(playersCount);},500);
}

function endGame() {
  playerAlive = false;
  document.querySelector('.js-hit').removeEventListener("click", hitHandler);
  document.querySelector('.js-stand').removeEventListener("click", standHandler);
  console.log("Game Over!");
}

async function dealersGame(playersCount) {
  // Helper function to add delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  while (dealersCount < 17) {
    let dcard = randomCard();
    console.log('New card for Dealer: ' + dcard);
    document.querySelector('.dcards').innerHTML += renderCard(dcard);
    dealersCount += dcard;
    document.getElementById('dealer-count').innerHTML = `Dealer: ${dealersCount}`;
    console.log("Dealer count: " + dealersCount);
    await delay(1000); // Wait for 300ms before drawing the next card
  }
  if (dealersCount > 21) {
    document.getElementById('dealer-count').innerHTML = `Dealer: BUSTED`;
    alert("Dealer busts, You Win!!!");
    //window.location.reload();
  } else {
    if ((21 - playersCount) === (21 - dealersCount)) {
      alert("Push.");
      //window.location.reload();
    } else if ((21 - playersCount) > (21 - dealersCount)) {
      alert("Dealer Wins. You Lose.");
      //window.location.reload();
    } else {
      alert("You Win!!!");
      //window.location.reload();
    }
  }
}


function randomCard() {
  let cardIndex = Math.floor(Math.random() * deck.length); // Get a random index within the deck length
  let removedCard = deck.splice(cardIndex, 1)[0]; // Remove the card from the deck and get the removed card
  return removedCard; // Return the removed card
}