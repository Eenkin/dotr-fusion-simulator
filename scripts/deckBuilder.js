//Notes: Check if Serpentine Princess has #448 Yormungarde or #446 Armored Lizard
var inDeck = [];
var uniqueCards = {};
var unobtainableTracker = [];

var loadFusions = 'all';
var useSimpleList = true;

const base36String = '0123456789abcdefghijklmnopqrstuvwxyz'

// const cardTypeArr = ['Dragon', 'Spellcaster', 'Zombie', 'Warrior', 'BeastWarrior', 'Beast', 'WingedBeast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile', 'Fish', 'SeaSerpent', 'Machine', 'Thunder', 'Aqua', 'Pyro', 'Rock', 'Plant', 'Immortal', 'Magic', 'Trap', 'Ritual'];
// const monsterAttributes = ['WATER', 'FIRE', 'EARTH', 'WIND', 'DARK', 'LIGHT'];
// const archetypeArray = ['Female', 'Toon', 'Elf', 'Egg', 'Horned', 'Shell', 'Turtle'];

var multipleCardsArr = []

var fusionTracker = {};

var storeRemainingFusions = [];
var remainingFusionsCounter = {
   "maxTotal": 0,
   "currentlyAt": 0
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
         card = cardNamelist.indexOf(temp); //is input a name
      } else if (!card) {
         //is input blank?
      } else {
         card = null;
         document.getElementById('spellingWarning').style.display = 'block';
         return;
      }

      // console.log(card);

   }

   if (!card && card !== 0) {
      return;
   }

   if (inDeck.length >= 40) {
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

   let sorting = document.getElementById('sorting').value;
   //Sort by:

   if (skipHash) {
      inDeck.sort((a, b) => {

         if (sorting == '123') {
            return a - b;
         } else {
            a = cardNamelist[a];
            b = cardNamelist[b];
            if (a < b) {
               return -1
            } else if (a > b) {
               return 1
            } else {
               return 0
            }
         }

      });
   }


   let tdCardId = document.getElementsByClassName('tdCardId');
   let tdCardName = document.getElementsByClassName('tdCardName');
   let tdCardStat = document.getElementsByClassName('tdCardStat');
   let deckStatSection = document.getElementById('deckStatSection');

   uniqueCards = {} //track # of each unique card
   multipleCardsArr = [];

   document.getElementById('unobtainListSection').innerHTML = '';
   document.getElementById('multipleListSection').innerHTML = '';

   let dcTotal = 0;
   let numOfMonsters = 0;
   let monsterSLV = 0;
   let averageLV;
   let trackTyping = {};
   let trackArchetype = {};
   let trackAttribute = {};
   unobtainableTracker = [];

   let hashString = '';

   function createHash(card) {
      //hashString += card.id < 36 ? '0' + card.id.toString(36) : card.id.toString(36);
      let num = card.id;
      let div36 = Math.floor(num / 36);
      let mod36 = num % 36;

      hashString += base36String.charAt(div36) + base36String.charAt(mod36);
   }

   function cardChecker() {
      for (var i = 0; i < 40; i++) {

         let textId = '';
         let textName = '';
         let textStat = '';

         tdCardId[i].style.backgroundColor = '';

         if (i < inDeck.length) {
            let card = cardList[inDeck[i]];

            uniqueCards[card.id] = uniqueCards[card.id] ? uniqueCards[card.id] + 1 : 1; //Check if unique card, else add to a counter

            if (!skipHash) {
               createHash(card);
               continue;
            }

            if (uniqueCards[card.id] > 3 && !multipleCardsArr.includes(card.id)) {
               document.getElementById('multipleCardsWarning').style.display = 'block'; //warns if more than 3 of the same card are in the deck,
               multipleCardsArr.push(card.id);
               document.getElementById('multipleListSection').innerText += multipleCardsArr.length > 1 ? ', ' + card.name : card.name; //Lists which cards
            }
            //document.getElementById('multipleCardsWarning').style.display = uniqueCards[card.id] > 3 ? 'block' : '';

            if (unobtainableCards.includes(card.id) && !unobtainableTracker.includes(card.id)) {
               document.getElementById('unobtainableWarning').style.display = 'block' //warns if unobtainable card is added to the deck;
               unobtainableTracker.push(card.id);
               document.getElementById('unobtainListSection').innerText += unobtainableTracker.length > 1 ? ', ' + card.name : card.name; //Lists which cards
            }

            textId = card.id;
            textName = card.name;

            //Type
            textStat = '<p>' + card.type;
            // trackTyping[card.type] = trackTyping[card.type] ? trackTyping[card.type] + 1 : 1;

            //Attribute
            if (card.attribute) {
               textStat += '/' + card.attribute;

            }

            //DC
            textStat += '/DC ' + card.dc;
            dcTotal += card.dc;


            //:V/ATK/DEF
            if (card.lv) {
               textStat += '/LV ' + card.lv + '/ATK ' + card.atk + '/DEF ' + card.def;
               numOfMonsters++;
               monsterSLV += card.lv;
            }


            //Archetypes
            if (card.archetype) {
               textStat += '<br>Archetype(s): ' + card.archetype;
            }

            textStat += '</p>';

            textStat += card.effect ? '<p>' + card.effect.replace(/\n/gi, '<br>') + '</p>' : '';

            if (normalSlotCards.includes(card.id)) {
               tdCardId[i].style.backgroundColor = 'lightgreen';
            }

         }

         tdCardId[i].innerText = textId;
         tdCardName[i].innerText = textName;

         tdCardStat[i].innerHTML = textStat;

      }
   }

   cardChecker();

   document.getElementById('dcTotal').innerText = dcTotal;

   averageLV = Math.ceil(monsterSLV / numOfMonsters * 100) / 100;
   averageLV = averageLV ? averageLV.toFixed(2) : '0.00';

   document.getElementById('averageLV').innerText = averageLV;

   document.getElementById('totalCards').innerText = inDeck.length;

   if (!skipHash) {
      window.location.hash = hashString;
   } else {
      // fuseCards();
   }

}

function removeCard(x) {

   inDeck.splice(x, 1);

   document.getElementById('presetForm').value = '';

   resetWarnings();
   sortDeck();
}

function usePreset(skipHash) {
   let presetForm = document.getElementById('presetForm').value;

   resetWarnings();

   if (presetForm) {

      if (!skipHash) {
         window.location.hash = presetForm.replace(/ /gi, '_');
      } else {
         inDeck = presetDeck[presetForm];
         // sortDeck(true);
      }

   }
}

function fuseCards(load) {

   let tbody = document.getElementById('fusionTBody');
   let deckStatSection = document.getElementById('deckStatSection');

   tbody.innerHTML = '';

   loadFusions = load ? load : loadFusions;

   fusionTracker = {};

   if (inDeck.length < 2 || loadFusions == 'none') {
      return; //skips fusion if there are insufficient amount of cards; if fusing options is set to none
   }


   //Prevents dublpicative sequences
   let uniqueSequence = [];
   let allResults = [];
   let trial;
   let fusableDeck;
   let fusionArr;

   let fusionTierAdded = false;

   function fusionCheck(arr, tier) {

      trial = bruteFusion(arr);

      if (trial) {

         let addArr = trial.sequence.slice();

         if (fusionTracker[trial.resultCard]) {

            if (fusionTracker[trial.resultCard]['t' + tier]) {
               fusionTracker[trial.resultCard]['t' + tier].push(addArr);
               //fusionTracker[trial.resultCard]['tS'].push(addArr.toString());
            } else {
               fusionTracker[trial.resultCard]['t' + tier] = [addArr]
            }
         } else {
            fusionTracker[trial.resultCard] = {};
            fusionTracker[trial.resultCard]['t' + tier] = [addArr];
            //fusionTracker[trial.resultCard]['tS'] = [addArr.toString()];

            //console.log(addArr)
         }
         fusionTierAdded = trial.resultCard; //ignore tier n -1 Requirement later in the code
      }
   }



   fusableDeck = inDeck.filter(card => fusableCards.includes(parseInt(card))); //Copies only cards from the deck that are fusable for fusions


   for (var i = 0; i < fusableDeck.length; i++) {
      // i is card A
      for (var j = i + 1; j < fusableDeck.length; j++) {
         //j is card B
         if (j >= fusableDeck.length) {
            continue; //skip if there are no other cards in the fusableDeck for j
         }

         fusionArr = [fusableDeck[i], fusableDeck[j]]; //fuse these cards
         fusionCheck(fusionArr, 0);

      }
   }

   function additionalTiers() {
      let uniqueDummies = new Set(fusableDeck);
      uniqueDummies = [...uniqueDummies]; //grabs only the unique cards from the deck;
      fusionTierAdded = false;
      let dummyDeck;
      let fusableFusions = Object.keys(fusionTracker).filter(card => fusableCards.includes(parseInt(card))).map(card => {
         return parseInt(card)
      }) //list of initial fusion results that can be used as fusion materials for other fusions

      // let fusableFusions = Object.keys(fusionTracker);
      let tierNum = 0;
      let addedTier;
      let previousTier;
      let simpleTier = 'tS';
      let insufficentAmount;
      let moveToNextTier = [];

      function buildTiers(fusionA, cardB, resultFusion) {
         //Creates the actual tiers

         if (!fusionTracker[fusionA] || !fusionTracker[fusionA][previousTier]) {
            //if the previous fusion doesn't exist in the fusion tracker (which should not happen) nor has a previous tier, end function
            return
         }
         let grabTier = fusionTracker[fusionA][previousTier]; //grabs the previous tier of the previous fusion card

         for (arr of grabTier) {


            let usedCards = arr.slice(); //for each array of the previous tier of the previous fusion, grab all of its cards
            usedCards.push(cardB); //add the newest card to the array

            dummyDeck = fusableDeck.slice(); //copy purposes to not overwrite the original fusableDeck
            insufficentAmount = false; //checking purposes to see if the right amount of cards are in the deck

            for (card of usedCards) {
               //remove each card from the deck, if no problems then proceed;
               if (dummyDeck.includes(card)) {
                  //if a copy of the card exists in the deck, remove one copy of it.
                  dummyDeck.splice(dummyDeck.indexOf(card), 1);
               } else {
                  //if there were no more copies of the card in the deck, then end current loop and move on to next array
                  insufficentAmount = true;
                  break;
               }

            }

            if (insufficentAmount) {
               continue; //ends current array if there are not enough copies of a certain card in the deck
            }

            if (!fusionTracker[resultFusion]) { //if the resulted rusion does not exist in the fusion tracker, make a new entry
               fusionTracker[resultFusion] = {};
               fusionTracker[resultFusion][addedTier] = [];
            } else if (!fusionTracker[resultFusion][addedTier]) { //if the current tier doesn't exist for the resulted fusion, then make an entry for it
               fusionTracker[resultFusion][addedTier] = [];
            }

            if (!fusionTracker[resultFusion]['tS']) {
               fusionTracker[resultFusion]['tS'] = [];
            }

            fusionTracker[resultFusion][addedTier].push(usedCards); //add the previous tier of the previou fusion with the added card to the new tier of the resulted fusion

            var arrString = [fusionA, cardB].toString()
            if (!fusionTracker[resultFusion]['tS'].includes(arrString)) {
               fusionTracker[resultFusion]['tS'].push(arrString)
            }


         }

      }

      do {

         previousTier = 't' + tierNum; //the previous tier (should start off with tier0)
         addedTier = 't' + (tierNum + 1); //the current tier

         fusableFusions = previousTier == 't0' ? fusableFusions : moveToNextTier.slice(); //if tier0, then grab the inital fusions; for all other tiers, grab only fusions that came into the results from the previous tier
         moveToNextTier = []; //tracks what set of fusions should be tested for the next tier
         fusionTierAdded = false; //if this remains false by the end of the loop, this loop ends due to no new tiers were added


         for (fusionA of fusableFusions) {

            //fusionA is the fusion that's going to forward dusioned into another fusion

            for (cardB of uniqueDummies) {
               //cardB is any card in the deck that can be used as fusion material

               let fusionTrial = bruteFusion([fusionA, cardB]); //test if it works
               let resultFusion = fusionTrial.resultCard; //grabs the resulted fusion from the test

               if (resultFusion) {
                  //if a result was found, then build the next/new tier for it
                  buildTiers(fusionA, cardB, resultFusion); //add to tier N : previous fusion + a card from the decck = resulted fusion
                  if (fusableCards.includes(resultFusion) && !moveToNextTier.includes(resultFusion)) {
                     //if the card can be forward fusioned and hasne't shown up as a result yet for this current tier, add it to be tested for the next tier and continue the do/while loop
                     moveToNextTier.push(resultFusion);
                     fusionTierAdded = true;
                  }
               }
            }

         }

         tierNum++; //move on to the next tier
      } while (fusionTierAdded);
   }


   if (loadFusions == 'all') {
      additionalTiers(); //do this if user wants to know all possible multi-chain fusions
   }
   createFusionResults();

}

function createFusionResults() {
   //adds fusions into the fusion table and reveal their Stats

   let tbody = document.getElementById('fusionTBody');
   let sorting = document.getElementById('sorting').value;

   let eachFusion = Object.keys(fusionTracker); //grab all of the fusion results
   tbody.innerHTML = '';

   for (var i = 0; i < eachFusion.length; i++) {
      eachFusion[i] = parseInt(eachFusion[i]); //turn their ids from strings into numbers
   }

   eachFusion.sort((a, b) => {
      //alphabetize or sort by id number

      if (sorting == '123') {
         return a - b;
      } else {
         a = cardNamelist[a];
         b = cardNamelist[b];
         if (a < b) {
            return -1
         } else if (a > b) {
            return 1
         } else {
            0
         }
      }
   })

   for (var fusion of eachFusion) {

      fusion = isNaN(fusion) ? mysteryCard : cardList[fusion]; //use MysterCard if Insect Imitation was used, else find card normally

      let tr1 = document.createElement('tr'); //the name and id number
      let tr2 = document.createElement('tr'); //the stats

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

      let stringId = fusion.id == "?" ? "'?'" : fusion.id; //refer to the ? entry if insect imitation was involved
      statText += '<br><i><u><a onclick="revealFusionCombos(' + stringId + ')">Check for fusion materials from the deck</a></u></i>'

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

function revealFusionCombos(x) {
   document.getElementById('fusionPopUp').style.display = 'inherit';
   document.getElementById('listBG').scrollTop = 0;
   document.getElementById('listBG').removeAttribute('onscroll');
   let listBG = document.getElementById('listBG');

   document.body.className = 'stop-scrolling';

   storeRemainingFusions = [];

   let fusion = x == "?" ? mysteryCard : cardList[x]; //use MysterCard if Insect Imitation was used, else find card normally
   //let combos = [...fusionTracker[x].deckCombos];

   let tiers = fusionTracker[x] //the fusioin card with all of its tiears

   listBG.innerHTML = '<h1>' + fusion.name + '</h1>'; //name of the fusion

   let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>'; //show the stats of the fusion

   //Base Stats
   statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
   statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';

   //Effect
   statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';

   let numOfFusions = 2;

   if (useSimpleList) {

      if (fusionTracker[x]['t0']) {
         statText += '<p><br>---Using 2 Cards from the deck---</p>';

         let finalDecipher = [];

         for (var i = 0; i < fusionTracker[x]['t0'].length; i++) {
            var combos = fusionTracker[x]['t0'][i];

            finalDecipher.push('<p>'+ cardList[combos[0]].name + ' &rarr; ' + cardList[combos[1]].name + '</p>')
         }

         finalDecipher.sort((a, b) => { //alphabetize

            if (a < b) {
               return -1
            } else if (a > b) {
               return 1
            } else {
               return 0
            }
         });

         statText+= finalDecipher.toString().replace(/>,/gi, '>');
      }

      if (fusionTracker[x]['tS']) {
         statText += '<p><br>---Using 1 Fusion Monster created from the deck & 1 card from the deck---</p>';

         let finalDecipher = [];

         for (var i = 0; i < fusionTracker[x]['tS'].length; i++) {
            var combos = fusionTracker[x]['tS'][i];
            combos = combos.split(',');
            combos[0] = parseInt(combos[0]);
            combos[1] = parseInt(combos[1]);
            console.log(combos);

            finalDecipher.push('<p>'+ cardList[combos[0]].name + '<i> (Fusion)</i> &rarr; ' + cardList[combos[1]].name + '</p>')
         }

         finalDecipher.sort((a, b) => { //alphabetize

            if (a < b) {
               return -1
            } else if (a > b) {
               return 1
            } else {
               return 0
            }
         });

         statText+= finalDecipher.toString().replace(/>,/gi, '>');
      }

   } else {
      for (combos in tiers) {
         //statText += '<p>---------</p>';

         if (combos == 'tS') {
            continue;
         }

         numOfFusions = tiers[combos][0].length;

         storeRemainingFusions.push('<p><br>---Using ' + numOfFusions + ' cards---</p>');
         //numOfFusions++;

         let finalDecipher = []; //used at the end to alphabetize and remove duplicate fusion combinations

         combos = tiers[combos]; //the current tiear that's being checked


         for (currentSet of combos) {
            //each set of cards that was used to make the fusion in one of the arrays in the current tiear



            let tempText = '<p>'

            let decipher = currentSet; //decipher is to grab the name of each card in the set

            for (var i = 0; i < decipher.length; i++) {
               let card = decipher[i]; //current card its checking
               tempText += cardList[card].name;
               tempText += i < decipher.length - 1 ? ' &rarr; ' : ''; //if this isn't the last card in the set, add a forward arrow

            }

            tempText += '</p>'

            finalDecipher.push(tempText);
         }

         finalDecipher = new Set(finalDecipher); //grab each unique set of comibinations
         finalDecipher = [...finalDecipher]; //turns it into an array

         finalDecipher.sort((a, b) => { //alphabetize

            if (a < b) {
               return -1
            } else if (a > b) {
               return 1
            } else {
               return 0
            }
         });

         storeRemainingFusions = storeRemainingFusions.concat(finalDecipher);
      }
      statText += '<p><br>Total Number of Fusion Combinations from the Deck: ' + (storeRemainingFusions.length - Object.keys(tiers).length) + '</p>';

      let maxLength = Math.min(storeRemainingFusions.length, 200);

      for (var i = 0; i < maxLength; i++) {
         statText += storeRemainingFusions[i]; //add evert fusion combination possible from the deck to the list
      }

      if (storeRemainingFusions.length > 199) {
         document.getElementById('listBG').setAttribute('onscroll', 'reveal200moreFusions()');
         remainingFusionsCounter.maxTotal = Math.ceil(storeRemainingFusions.length / 200);
         remainingFusionsCounter.currentlyAt = 1;
      }
   }

   listBG.innerHTML += statText;

}

function reveal200moreFusions() {

   let listBG = document.getElementById('listBG');

   if (listBG.scrollTop >= (listBG.scrollHeight - listBG.offsetHeight - 30)) {

      let statText = '';
      let minIndex;
      let maxIndex;

      minIndex = 200 * remainingFusionsCounter.currentlyAt;
      maxIndex = 200 + minIndex;

      for (var i = minIndex; i < maxIndex; i++) {

         if (!storeRemainingFusions[i]) {
            break;
         }

         statText += storeRemainingFusions[i];
      }

      listBG.innerHTML += statText;

      if (remainingFusionsCounter.currentlyAt < remainingFusionsCounter.maxTotal) {
         remainingFusionsCounter.currentlyAt++
      } else {
         listBG.removeAttribute('onscroll');
         //console.log('end');
      }

   } else {
      return;
   }
}

function listOutFusions(listType) {
   if (listType == 'detailed') {
      useSimpleList = false;
   } else if (listType == 'simple') {
      useSimpleList = true;
   }

}

function bruteFusion(order) {
   let object = {};

   //object.sequence = [order];

   for (var i = 0; i < order.length - 1; i++) {
      //Card A = first card in sequence. Otherwise, it equals the result of the previous card
      let cardA = i > 0 ? object.resultCard : order[i];
      let cardB = order[i + 1]; //card B = the next card in the sequence

      let pair = Math.min(cardA, cardB) + "," + Math.max(cardA, cardB); //1st card is the lowest id, 2nd is the highest id; this is because of how it is written for each entry in fusionCombos

      if (fusionCombos[pair]) {
         object.resultCard = fusionCombos[pair];
      } else {
         return false;
      }

   }

   object.sequence = order;

   return object;
}

function resetDeck() {
   //Empties all input boxes in fusion simulator
   inDeck = [];
   fusionTracker = {};

   document.getElementById('fusionTBody').innerHTML = '';
   document.getElementById('presetForm').value = '';
   window.location.hash = '';
   resetWarnings();
   sortDeck();
}

function checkHash() {
   let hashString = window.location.hash ? window.location.hash.slice(1).replace(/_/gi, ' ') : ''; //grab the # in url

   if (presetDeck.hasOwnProperty(hashString)) {
      //if # contains the name of a starter deck or an enemy deck
      document.getElementById('presetForm').value = hashString;
      usePreset(true);
   } else {
      document.getElementById('presetForm').value = '';
      hashString = hashString.replace(/[^0-9a-zA-Z]/gi, ''); //removes non-alphanumericcharacters
      hashString = hashString.length > 80 ? hashString.slice(0, 80) : hashString; //limits to only the first 80 characters (40 cards)

      let hashArr = hashString ? hashString.match(/.{1,2}/g) : []; //split to an array of 2 characters each, if string was empty, make an empty array

      let loopMax = hashArr.length; //Math.min(hashArr.length, 40);

      for (var i = 0; i < loopMax; i++) {
         hashArr[i] = parseInt(hashArr[i], 36); //convert base-36 to decimal
         hashArr[i] = hashArr[i] > 853 || hashArr[i] == 671 ? null : hashArr[i]; //Make any numbers higher than the number of cards in the game and Summoned Lord Exodia blank
      }

      // hashArr = hashArr.filter(hash => true);
      // let tempArr = [];
      //
      // for (var i = 0; i < hashArr.length; i++) {
      //    let x = hashArr[i];
      //    if (x) {
      //       tempArr.push(x)
      //    }
      // }
      //
      // hashArr = tempArr;

      inDeck = hashArr.filter(hash => true); //Remove blank spaces

      // inDeck = [...hashArr];
      // inDeck = hashArr;

      // console.log(hashArr);

      // sortDeck(true);
   }


}

function openTypeChart() {
   document.getElementById('chartPopUp').style.display = 'initial';
   document.body.className = 'stop-scrolling';

   document.getElementById('dupliicateStats').innerText = document.getElementById('deckStatSection').innerText.replace(/Chart of each type\/attribute\/archetype in the deck/, '');

   let trackTypeArr = {
      "Dragon": 0,
      "Spellcaster": 0,
      "Zombie": 0,
      "Warrior": 0,
      "BeastWarrior": 0,
      "Beast": 0,
      "WingedBeast": 0,
      "Fiend": 0,
      "Fairy": 0,
      "Insect": 0,
      "Dinosaur": 0,
      "Reptile": 0,
      "Fish": 0,
      "SeaSerpent": 0,
      "Machine": 0,
      "Thunder": 0,
      "Aqua": 0,
      "Pyro": 0,
      "Rock": 0,
      "Plant": 0,
      "Immortal": 0,
      "Magic": 0,
      "Trap": 0,
      "Ritual": 0,
      "WATER": 0,
      "FIRE": 0,
      "EARTH": 0,
      "WIND": 0,
      "DARK": 0,
      "LIGHT": 0,
      "PowerUp": 0,
      "LimitedRange": 0,
      "FullRange": 0,
      "Female": 0,
      "Toon": 0,
      "Elf": 0,
      "Egg": 0,
      "Horned": 0,
      "Shell": 0,
      "Turtle": 0
   }

   for (var i = 0; i < inDeck.length; i++) {
      let card = cardList[inDeck[i]];

      let tempType = card.type.replace(/ /gi, '').replace(/-/gi, '');
      // console.log(tempType)

      trackTypeArr[tempType]++;

      if (card.attribute) {
         let tempAttr = card.attribute.replace(/ /gi, '').replace(/-/gi, '');
         trackTypeArr[tempAttr]++;
      }

      if (card.archetype) {
         let archTemp = card.archetype.split(', ');

         for (arch of archTemp) {
            trackTypeArr[arch]++;
         }
      }
   }

   // console.log(trackTypeArr);
   for (var tdType in trackTypeArr) {
      // console.log(tdType)
      document.getElementById('td' + tdType).innerText = trackTypeArr[tdType];

      document.getElementById('td' + tdType).parentElement.style.backgroundColor = trackTypeArr[tdType] ? 'white' : 'inherit';
   }

}

window.onload = function() {
   if (window.location.hash) {
      checkHash();
      sortDeck(true);
      fuseCards();
   }

};

window.onhashchange = function() {
   if (window.location.hash) {
      checkHash();
      sortDeck(true);
      fuseCards();
   }
}
