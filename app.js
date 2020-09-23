/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
//scores = [0, 0];
//roundScore = 0;
//activePlayer = 0; // 0 est le 1er joueur; 1 est le 2ème
init();

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
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2- on veut afficher le résultat:
    // on remet visible le dé:
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    // on veut afficher l'image correspondant quand on lance le dé, en utilisant les noms données aux images pour chaque face du dé:
    // on change donc l'image de l'élément image, en accédant à src:
    diceDOM.src = 'dice-' + dice + '.png';
    // 3- Mettre à jour le score seulement si le dé qui a été lançé n'affiche pas un 1:
    if (dice !== 1) {
      // = si le dé est different de 1 ( ou on peut écrire  dice > 1)
      // Ajouter au score:
      roundScore += dice; // roundScore = roundScore + dice
      // Afficher le score dans l'interface du joueur:
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Sinon, on passe au joueur suivant:
      nextPlayer();
    }
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
    // 3- vérifier si le joueur en cours a gagné la partie:
    if(scores[activePlayer] >= 100){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
      // cacher le dé et retirer le statut 'actif' du joueur en cours( = retirer le point rouge):
      document.querySelector('.dice').style.display = 'none';
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
  document.querySelector('.dice').style.display = 'none';
}

// implémenter la fonction Ajouter un nouveau jeu:
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 est le 1er joueur; 1 est le 2ème
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
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

