//Notes: Check if Serpentine Princess has #448 Yormungarde or #446 Armored Lizard

var abcList = [];

var inDeck = [];
var uniqueCards = {};

var canWinInSlots = [];

const cardTypeArr = ['Dragon', 'Spellcaster', 'Zombie', 'Warrior', 'Beast-Warrior', 'Beast', 'Winged Beast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile', 'Fish', 'Sea Serpent', 'Machine', 'Thunder', 'Aqua', 'Pyro', 'Rock', 'Plant', 'Immortal', 'Magic', 'Trap', 'Ritual']
const monsterAttributes = ['WATER', 'FIRE', 'EARTH', 'WIND', 'DARK', 'LIGHT'];
const archetypeArray = ['Female', 'Toon', 'Elf', 'Egg', 'Horned', 'Shell', 'Turtle']

const characters = ["Bakura",
   "Darkness-ruler",
   "Ishtar",
   "J. Shadi Morton",
   "Jasper Dice Tudor",
   "Joey",
   "Keith",
   "Labyrinth-ruler",
   "Mako",
   "Manawyddan fab Llyr (Chakra)",
   "Manawyddan fab Llyr (Skull Knight)",
   "Margaret Mai Beaufort",
   "Necromancer",
   "Pegasus Crawford",
   "Rex Raptor",
   "Richard Slysheen of York",
   "Seto",
   "T. Tristan Grey",
   "Tea",
   "Weevil Underwood",
   "Yugi",
   "Deck Master I",
   "Deck Master S",
   "Deck Master T"
];

let fusionTracker = {};

let dummy = [];

function createArray() {

   let a = [...dummy];

   if (!a) {
      return;
   }

   for (var i = 0; i < a.length; i++) {
      a[i] = a[i].slice(0, 3);
      a[i] = parseInt(a[i]);
   }

   let doc = document.createElement('textarea');
   document.body.appendChild(doc);

   doc.value = a;
   doc.select();
   document.execCommand('copy');
   document.body.removeChild(doc);

   console.log(a);
}

function createDeckTable() {
   document.getElementById('deckTable').innerHTML = ''

   let tbody = document.createElement('tbody');
   for (var i = 0; i < 40; i++) {
      let tr1 = document.createElement('tr');
      let tr2 = document.createElement('tr');


      let tdSlot = document.createElement('td')
      let tdRemove = document.createElement('td');
      let tdId = document.createElement('td');
      let tdName = document.createElement('td');
      let tdStats = document.createElement('td');

      tdSlot.className = 'cardSlot';
      tdRemove.className = 'tdRemove';
      tdId.className = 'tdCardId';
      tdName.className = 'tdCardName';
      tdStats.className = 'tdCardStat';

      tr1.className = 'trCardMain'
      tr2.className = 'trCardSub'

      tdRemove.rowSpan = 2;
      tdSlot.rowSpan = 2;
      tdStats.colSpan = 3;

      tdRemove.innerHTML = '<a onclick="removeCard(' + i + ')">Remove</a>';
      tdSlot.innerText = i + 1;


      tr1.appendChild(tdSlot)
      tr1.appendChild(tdRemove);
      tr1.appendChild(tdId);
      tr1.appendChild(tdName);
      tr2.appendChild(tdStats);

      tbody.appendChild(tr1);
      tbody.appendChild(tr2)
   }

   document.getElementById('deckTable').appendChild(tbody);
}

function createOptions() {

   let presetForm = document.getElementById('presetForm');

   for (var i = 0; i < characters.length; i++) {


      let options = document.createElement('option');
      options.value = characters[i];
      options.innerText = characters[i];

      presetForm.appendChild(options);
   }

}

function scrollToTop() {
   document.body.scrollTop = 0;
   resetFusionSectionColors();
}

function resetWarnings() {


   let warningSection = document.getElementById('warningSection').children;

   for (var warning of warningSection) {
      warning.style.display = ''
   }

}

function addCard(num) {

   let card;

   if (num) {
      //Do this if it is part of a preset or hash
      card = cardList[num]
   } else {
      //Add card through input prompt
      card = document.getElementById('cardInput').value
      let temp = card.toLowerCase();

      resetWarnings();

      if (!isNaN(card)) {
         //card = cardList[parseInt(card)]; //is input a number?
         card = parseInt(card)

         if (card > 853) {
            card = null;
         }
      } else if (cardNamelist.includes(temp)) {
         //card = cardList[cardNamelist.indexOf(temp)]; //is input a name?
         card = cardNamelist.indexOf(temp);
      } else if (!card) {
         //is input blank?
      } else {
         card = null;
         document.getElementById('spellingWarning').style.display = 'block';
      }

      console.log(card);

   }

   if (!card && card !== 0) {
      return;
   }

   if (inDeck.length > 40) {
      document.getElementById('limitWarning').style.display = 'block';
      return;
   }

   if (card == 671) {
      document.getElementById('exodiaWarning').style.display = 'block';
      return;
   }

   inDeck.push(card);

   sortDeck();


}

function sortDeck(skipHash) {
   //Sort by ID
   inDeck.sort((a, b) => {
      return a - b;
   })

   canWinInSlots = [];

   let tdCardId = document.getElementsByClassName('tdCardId');
   let tdCardName = document.getElementsByClassName('tdCardName');
   let tdCardStat = document.getElementsByClassName('tdCardStat');
   let deckStatSection = document.getElementById('deckStatSection');

   uniqueCards = {} //track # of each unique card

   let dcTotal = 0;
   let numOfMonsters = 0;
   let monsterSLV = 0;
   let averageLV;
   let trackTyping = {};
   let trackArchetype = {};
   let trackAttribute = {};

   let hashString = '';

   for (var i = 0; i < 40; i++) {

      let textId = '';
      let textName = '';
      let textStat = '';

      tdCardId[i].style.backgroundColor = '';

      if (i < inDeck.length) {
         let card = cardList[inDeck[i]];

         uniqueCards[card.id] = uniqueCards[card.id] ? uniqueCards[card.id] + 1 : 1; //Check if unique card, else add to a counter

         hashString += card.id < 36 ? '0' + card.id.toString(36) : card.id.toString(36);

         if (uniqueCards[card.id] > 3) {
            document.getElementById('multipleCardsWarning').style.display = 'block'; //warns if more than 3 of the same card are in the deck,
         }
         //document.getElementById('multipleCardsWarning').style.display = uniqueCards[card.id] > 3 ? 'block' : '';

         if (unobtainableCards.includes(card.id)) {
            document.getElementById('unobtainableWarning').style.display = 'block' //warns if unobtainable card is added to the deck
         }

         textId = card.id;
         textName = card.name;

         //Type
         textStat = '<p>' + card.type;
         trackTyping[card.type] = trackTyping[card.type] ? trackTyping[card.type] + 1 : 1;

         //Attribute
         if (card.attribute) {
            textStat += '/' + card.attribute;

            if (monsterAttributes.includes(card.attribute)) {
               trackAttribute[card.attribute] = trackAttribute[card.attribute] ? trackAttribute[card.attribute] + 1 : 1;
            }
         }

         //DC
         textStat += card.dc ? '/DC ' + card.dc : '';
         dcTotal += card.dc;


         //:V
         if (card.lv) {
            textStat += '/LV ' + card.lv;
            numOfMonsters++;
            monsterSLV += card.lv;
         }

         //ATK & DEF
         textStat += card.atk ? '/ATK ' + card.atk : '';
         textStat += card.def ? '/DEF ' + card.def : '';


         //Archetypes
         if (card.archetype) {

            textStat += '<br>Archetype(s): ' + card.archetype;

            let splitArchetype = card.archetype.split(', ');

            splitArchetype.forEach(function(archetype) {
               trackArchetype[archetype] = trackArchetype[archetype] ? trackArchetype[archetype] + 1 : 1;
            });

         }


         textStat += '</p>';

         textStat += card.effect ? '<p>' + card.effect.replace(/\n/gi, '<br>') + '</p>' : '';

         if (normalSlotCards.includes(card.id)) {
            canWinInSlots.push(card.id);
            tdCardId[i].style.backgroundColor = 'lightgreen';
         }

      }

      tdCardId[i].innerText = textId;
      tdCardName[i].innerText = textName;

      tdCardStat[i].innerHTML = textStat;

   }

   document.getElementById('dcTotal').innerText = dcTotal;

   averageLV = Math.ceil(monsterSLV / numOfMonsters * 100) / 100;
   averageLV = averageLV.toFixed(2);

   document.getElementById('averageLV').innerText = averageLV;

   document.getElementById('totalCards').innerText = inDeck.length;

   let typeText = ''

   let tempObjKey = Object.keys(trackTyping);
   tempObjKey.sort(function(a, b) {
      return cardTypeArr.indexOf(a) - cardTypeArr.indexOf(b);
   })

   for (var i = 0; i < tempObjKey.length; i++) {
      let key = tempObjKey[i];
      typeText += '<span class="noWrap">' + key + ': ' + trackTyping[key];
      typeText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
      typeText += '</span>';
   }

   // deckStatSection.innerHTML = '<span class="noWrap">Total DC: ' + dcTotal + '</span>&emsp;|&emsp;<span class="noWrap">Average LV: ' + averageLV + '</span>&emsp;|&emsp;<span class="noWrap"># of Cards in Deck: '  + inDeck.length + '/40</span>'
   // deckStatSection.innerHTML += '<p>Total of Each Type<br>' + typeText + '</p>';

   let attrText = ''

   if (trackAttribute) {
      tempObjKey = Object.keys(trackAttribute);
      tempObjKey.sort(function(a, b) {
         return monsterAttributes.indexOf(a) - monsterAttributes.indexOf(b);
      })

      for (var i = 0; i < tempObjKey.length; i++) {
         let key = tempObjKey[i];
         attrText += '<span class="noWrap">' + key + ': ' + trackAttribute[key];
         attrText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
         attrText += '</span>';
      }

      // deckStatSection.innerHTML += '<p>Total of Each Attribute<br>' + attrText + '</p>';
   }

   let archeText = '';

   if (trackArchetype) {
      tempObjKey = Object.keys(trackArchetype);
      tempObjKey.sort(function(a, b) {
         return archetypeArray.indexOf(a) - archetypeArray.indexOf(b);
      })

      for (var i = 0; i < tempObjKey.length; i++) {
         let key = tempObjKey[i];
         archeText += '<span class="noWrap">' + key + ': ' + trackArchetype[key];
         archeText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
         archeText += '</span>';
      }

      // deckStatSection.innerHTML += '<p>Total of Each Archetype<br>' + archeText + '</p>';

   }

   if (!skipHash) {
      window.location.hash = hashString;
   }

   fuseCards();
}

function removeCard(x) {

   inDeck.splice(x, 1);

   document.getElementById('presetForm').value = ''

   resetWarnings();
   sortDeck();
}

function usePreset(skipHash) {
   let presetForm = document.getElementById('presetForm').value;

   resetWarnings();

   if (presetForm) {
      inDeck = presetDeck[presetForm];
      sortDeck(true);

      if (!skipHash) {
         window.location.hash = presetForm.replace(/ /gi, '_');
      }

   }
}

function fuseCards() {

   let cardInput = document.getElementsByClassName('cardInput');
   let errorSection = document.getElementById('errorSection');
   let fusionResults = document.getElementById('fusionResults');
   let jumpToSection = document.getElementById('jumpToSection');
   let deckStatSection = document.getElementById('deckStatSection');

   let errorCheck = false;
   let errorMessages = [];
   let groundExists = false;

   errorSection.innerHTML = '';
   fusionResults.innerHTML = '';
   jumpToSection.innerHTML = '';

   fusionTracker = {};

   if (inDeck.length < 2) {
      return; //skips fusion if there are insufficient amount of cards
   }


   //Prevents dublpicative sequences
   let uniqueSequence = [];
   let allResults = [];
   let currentOrder = [];
   let trial;
   let copyDeck;
   let fusableDeck;

   function fusionCheck(arr, tier){
      // a = Math.min(cardA, cardB);
      // b = Math.max(cardA, cardB);

      // copyDeck = [...fusableDeck];
      //
      // // copyDeck.splice(copyDeck.indexOf(a), 1);
      // // copyDeck.splice(copyDeck.indexOf(b), 1);
      //
      // for (var i = 0; i < arr.length; i++) {
      //    copyDeck.splice(copyDeck.indexOf(arr[i]), 1)
      // }

      currentOrder = arr;

      let stringSeq = currentOrder.toString();

      if (uniqueSequence.includes(stringSeq)) {
         return;
      }

      uniqueSequence.push(stringSeq);
      trial = bruteFusion(currentOrder);


      if (trial) {
         //uniqueSequence.push(trial.sequence.toString())

         let addArr = [...trial.sequence];
         // let result = addArr.pop();
         // addArr = addArr.toString();

         if (fusionTracker[trial.resultCard]) {

            if (fusionTracker[trial.resultCard]['t' + tier]) {
               fusionTracker[trial.resultCard]['t' + tier].push(addArr);
            } else {
               fusionTracker[trial.resultCard]['t' + tier] = [addArr]
            }

         } else {
            fusionTracker[trial.resultCard] = {};
            fusionTracker[trial.resultCard]['t' + tier] = [addArr];
         }

      }
   }


   // console.groupCollapsed();

   fusableDeck = [...inDeck];
   fusableDeck = fusableDeck.filter(fusable => fusableCards.includes(fusable))

   //console.log(copyDeck)

   for (var i = 0; i < fusableDeck.length; i++) {
      currentOrder = [];

      // if (!fusableCards.includes(inDeck[i])) {
      //    continue;
      // }
      for (var j = i + 1; j < fusableDeck.length; j++) {

         if (j + 1 == fusableDeck.length || !fusableCards.includes(fusableDeck[j])) {
            continue;
         }

         let fusionArr = [fusableDeck[i], fusableDeck[j]]
         fusionCheck(fusionArr, 0);
         // console.log(trial);

      }
   }

   let fusions = Object.keys(fusionTracker);

   for (var a = 1; a < 11; a++) {

      for (var i = 0; i < fusions.length; i++) {


         fusions[i] = parseInt(fusions[i])

         let currentTier = fusionTracker[fusions[i]]['t' + (a - 1)]

         if(!fusableCards.includes(fusions[i]) || !currentTier) {
            continue;
         }
         // console.log(fusions[i])
         // console.log(fusions[i])
         // console.log(a);

         for (var j = 0; j < currentTier.length; j++) {
            let thisSet = currentTier[j];

            let dummyDeck = [...fusableDeck];

            for (var k = 0; k < thisSet.length; k++) {
               dummyDeck.splice(dummyDeck.indexOf(thisSet[k]), 1);
            }

            for (var k = 0; k < dummyDeck.length; k++) {
               let fusionArr = [...thisSet, dummyDeck[k]];

               // console.log(fusionArr)

               fusionCheck(fusionArr, a);
            }
         }


      }
   }

   fusions = Object.keys(fusionTracker);

   for (var i = 0; i < fusions.length; i++) {
      let x = fusions[i];

      let keys = Object.keys(fusionTracker[x]);

      // console.log(keys)

      for (var j = 0; j < keys.length; j++) {
         // fusionTracker[x].deckCombos = fusionTracker.deckCombos ? [...fusionTracker[x][keys[j]]] :  fusionTracker[x].deckCombos.concat(fusionTracker[x][keys[j]]);
         fusionTracker[x].deckCombos = fusionTracker[x].deckCombos ?  fusionTracker[x].deckCombos.concat(fusionTracker[x][keys[j]]) :  [...fusionTracker[x][keys[j]]];
      }

   }

   createFusionResults();



}

function continueFusions(copyDeck){
   let eachFusion = Object.keys(fusionTracker);

   let mimicDeck = [...copyDeck];

   let uniqueSequence = [];

   for (var i = 0; i < eachFusion.length; i++) {
      let current = parseInt(eachFusion[i]);

      if (!fusableCards.includes(current)) {
         continue;
      }

      for (var j = 0; j < fusionTracker[current].deckCombos.length; j++) {
         let baseSet = [...fusionTracker[current].deckCombos[i]];

         mimicDeck = [...copyDeck];

         for (var t = 0; t < baseSet.length; t++) {
            mimicDeck.splice(mimicDeck.indexOf(baseSet[t]), 1)
         }

         for (var i = 0; i < mimikDeck.length; i++) {
            let newSet = [...baseSet];
            mimicDeck[i]
         }


      }


   }
}

function createFusionResults() {
   let tbody = document.getElementById('fusionTBody');
   tbody.innerHTML = ''

   let eachFusion = Object.keys(fusionTracker);

   for (var i = 0; i < eachFusion.length; i++) {
      eachFusion[i] = parseInt(eachFusion[i])
   }

   for (var fusion of eachFusion) {

      fusion = cardList[fusion];

      let tr1 = document.createElement('tr');
      let tr2 = document.createElement('tr');

      let tdId = document.createElement('td');
      let tdName = document.createElement('td');
      let tdStats = document.createElement('td');

      tdId.className = 'tdFusionId';
      tdName.className = 'tdFusionName';
      tdStats.className = 'tdFusionStat';

      tr1.className = 'trFusionMain'
      tr2.className = 'trFusionSub';

      tdId.innerText = fusion.id;
      tdName.innerText = fusion.name;

      tdStats.colSpan = 3;

      //Fusion Material
      let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>';
      statText += '<br><i><u><a onclick="revealFusionCombos(' + fusion.id+ ')">Check for fusion materials from the deck</a></u></i>'

      //Base Stats
      statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
      statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';

      //Effect
      statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';



      tdStats.innerHTML = statText;

      tr1.appendChild(tdId);
      tr1.appendChild(tdName);
      tr2.appendChild(tdStats);

      tbody.appendChild(tr1);
      tbody.appendChild(tr2);

      if (normalSlotCards.includes(fusion.id)) {
         tdId.style.backgroundColor = 'lightgreen';
      }
   }
}

function revealFusionCombos(x){
   document.getElementById('fusionPopUp').style.display = 'inherit';
   let listBG = document.getElementById('listBG');

   let fusion = cardList[x];
   let combos = [...fusionTracker[x].deckCombos]



   // console.log(combos);

   listBG.innerHTML = '<h1>'+fusion.name+'</h1>';

   let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>';

   //Base Stats
   statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
   statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';

   //Effect
   statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';

   statText += '<p>---------</p>';

   let finalDecipher = [];

   for (currentSet of combos) {

      let tempText = '<p>'


      let decipher = currentSet;

      for (var i = 0; i < decipher.length; i++) {
         let card = decipher[i];
         tempText += cardList[card].name;

         tempText += i < decipher.length - 1 ? ' &rarr; ' : '';

      }

      tempText += '</p>'

      finalDecipher.push(tempText);
   }

   finalDecipher.sort((a,b) => {

      if (a < b) {
         return -1
      } else if (a > b) {
         return 1
      } else {
         0
      }
   });

   for (var i = 0; i < finalDecipher.length; i++) {
      statText += finalDecipher[i]
   }


   listBG.innerHTML += statText;


}

function bruteFusion(order) {
   let object = {};

   object.sequence = [];

   for (var i = 0; i < order.length - 1; i++) {
      //Card A = first card in sequence. Otherwise, it equals the result of the previous card
      let cardA = i > 0 ? object.resultCard : order[i];
      let cardB = order[i + 1];

      let pair = Math.min(cardA, cardB) + "," + Math.max(cardA, cardB);

      if (pair in fusionCombos) {
         object.resultCard = fusionCombos[pair];
         if (object.sequence < 1) {
            // adds very first card to sequence
            object.sequence.push(cardA);
         }
         object.sequence.push(cardB, object.resultCard);
      } else {
         return false;
      }

   }

   object.sequence = order;

   return object;
}

function randomDeck() {

   resetWarnings();

   inDeck = [];
   for (var i = 0; i < 40; i++) {
      let random;
      do {
         random = Math.floor(Math.random() * 854)
      } while (random === 671);

      inDeck.push(random);
   }

   sortDeck();
}

function resetDeck() {
   //Empties all input boxes in fusion simulator
   inDeck = [];
   fusionTracker = {};

   document.getElementById('fusionTBody').innerHTML = '';
   resetWarnings();
   sortDeck();
}

function checkHash() {
   let hashString = window.location.hash ? window.location.hash.slice(1).replace(/_/gi, ' ') : '';

   // console.log(hashString);

   if (presetDeck.hasOwnProperty(hashString)) {
      document.getElementById('presetForm').value = hashString;
      usePreset(true)
   } else {
      hashString = hashString.replace(/[^0-9a-z]/gi, '');
      hashString = hashString.length > 80 ? hashString.slice(0, 80) : hashString;

      let hashArr = hashString.match(/.{1,2}/g);

      for (var i = 0; i < hashArr.length; i++) {
         hashArr[i] = parseInt(hashArr[i], 36);
         hashArr[i] = hashArr[i] > 853 || hashArr[i] == 671 ? null : hashArr[i];
      }

      hashArr = hashArr.filter(hash => true);
      inDeck = [...hashArr];

      // console.log(hashArr);

      sortDeck(true);
   }


}

window.onload = function() {
   if (window.location.hash) {
      checkHash();
   }

   //createArray(dummy);
};

window.onhashchange = function() {
   if (window.location.hash) {
      checkHash()
   }
}
