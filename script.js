'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew =document.querySelector('.btn--new');
const btnRoll =document.querySelector('.btn--roll');
const btnHold =document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting conditions
let scores,currentScore,activePlayer,player;
const init = function(){
    current0El.textContent=0;
    current1El.textContent=0;
    score0El.textContent=0;
    score1El.textContent=0;
    
    scores = [0,0];
    currentScore =0;
    activePlayer =0;
    player = true;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const swtichPlayer = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer===0?1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(player){
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
        //2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; 
    
        //3. Check for rolled 1
        if(dice!==1){
            //add dice to current score
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            swtichPlayer();
        }
    }
});

btnHold.addEventListener('click',function(){
    scores[activePlayer] += currentScore;
    //1. Add current score to active player's score
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    //2. Check if player's score is >=100
    if(scores[activePlayer]>=100){
        //if true - Finish the game
        player =false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
    }else{
        //else switch to second player
        swtichPlayer();
    }
});

btnNew.addEventListener('click',init);