/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;
//scores = [0, 0];
//roundScore = 0;
//activePlayer = 0; // 0 est le 1er joueur; 1 est le 2ème
init();

// challenge 1:
var lastDice;

//document.querySelector('#current-' + activePlayer).textContent = dice; // on sélectionne l'id='score-0', d'où le #; textContent = pour chznger le texte
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// querySelector pour lire la valeur/contenu de l'élément avec l'id score-0:
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

// querySelector pour changer le css d'un élément: par ex, cacher le dé, qui dans le code html est une image avec la classe dice:
//document.querySelector('.dice').style.display = 'none';

// Mettre tous les scores à zéro:
//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0'; // current est le joueur en cours de jeu.
//document.getElementById('current-1').textContent = '0';

// Mettre un event sur le bouton roll dice:
// on le séléctionne d 'abord, puis on ajoute l'event qui prend 2 arguments : le type d'évènement, et la fonction appelée qd l 'evènement se produit :

document.querySelector('.btn-roll').addEventListener('click', function () {
  if(gamePlaying){
  // Que souhaite t on au click du bouton?
    // 1- on veut un nombre aléatoire:
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2- on veut afficher le résultat:
    // on remet visible le dé:
    // challenge 3:
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    
    // on veut afficher l'image correspondant quand on lance le dé, en utilisant les noms données aux images pour chaque face du dé:
    // on change donc l'image de l'élément image, en accédant à src:
    // challenge 3:
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    // 3- Mettre à jour le score seulement si le dé qui a été lançé n'affiche pas un 1:
    //challenge 3:
    if (dice1 !== 1 && dice2 !== 1) {
      // = si le dé est different de 1 ( ou on peut écrire  dice > 1)
      // Ajouter au score:
      roundScore += dice1 + dice2; // roundScore = roundScore + dice
      // Afficher le score dans l'interface du joueur:
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Sinon, on passe au joueur suivant:
      nextPlayer();
    }
    //  challenge 1: on veut que le joueur perd son score quand le dernier dé lançé et le suivant affichent  6:
    /*if(dice === 6 && lastDice === 6){
      // challenge 1:le joueur perd son score:
      scores[activePlayer] = 0;
      // challenge 1:Mettre a jour le DOM:
      document.querySelector('#score-' + activePlayer).textContent =  0;
      nextPlayer();
    } else if (dice !== 1) {
      // = si le dé est different de 1 ( ou on peut écrire  dice > 1)
      // Ajouter au score:
      roundScore += dice; // roundScore = roundScore + dice
      // Afficher le score dans l'interface du joueur:
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Sinon, on passe au joueur suivant:
      nextPlayer();
    }
    // challenge 1:
    lastDice = dice;*/
  }
});

// Hold button :
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying){
// que veut- on qu'il se passe quand on click sur le  bouton HOLD ?:
    // 1- ajouter le score du joueur en cours au score global:
    scores[activePlayer] += roundScore; // ou : scores[activePlayer]  = scores[activePlayer] + roundScore
    // scores[activePlayer] est le score que le joueur en cours a déja.
    // 2- mettre à jour l'interface du joueur:
    // on sélectionne le joueur en cours et on modifie le contenue:
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

// Challenge 2:
  var input = document.querySelector('.final-score').value;
  var winningScore;
  // Undefined, 0, null or "" sont considérés comme false:
  if(input){
    winningScore = input;
  } else {
    winningScore = 100;
  }

    // 3- vérifier si le joueur en cours a gagné la partie:
    if(scores[activePlayer] >= winningScore){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
      // cacher le dé et retirer le statut 'actif' du joueur en cours( = retirer le point rouge):
      // challenge 3:
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // 4- Faire en sorte que ce soit le joueur suivant quand on appuie sur HOLD:
      nextPlayer();
    }
  }
});

function nextPlayer(){
  // on passe au joueur suivant:
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Remettre le score à zéro:
  roundScore = 0;
  // Remettre aussi le score du joueur en cours à zéro quand il perd:
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Mettre visible le joueur en cours avec un texte en bold , un background en gris et un point rouge:
  // D'abord, on séléctionne l'élément voulu, puis on utilise classList et ses propriétés:
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Cacher le dé quand le joueur en cours lançe le nombre 1 :
  // challenge 3:
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// implémenter la fonction Ajouter un nouveau jeu:
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 est le 1er joueur; 1 est le 2ème
  gamePlaying = true;

  // challenge 3:
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

 
  // Mettre tous les scores à zéro:
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0'; // current est le joueur en cours de jeu.
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner'); // retirer la class winner
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active'); // retirer la class active
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active'); // mettre le 1er joueur en tant que joueur actif( = joueur en cours)
}

