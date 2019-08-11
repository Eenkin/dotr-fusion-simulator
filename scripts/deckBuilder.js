//Notes: Check if Serpentine Princess has #448 Yormungarde or #446 Armored Lizard

var abcList = [];

var inDeck = [];
var uniqueCards = {};
var unobtainableTracker = [];

var loadFusions = 'all';

var canWinInSlots = [];
const base36String = '0123456789abcdefghijklmnopqrstuvwxyz'

const cardTypeArr = ['Dragon', 'Spellcaster', 'Zombie', 'Warrior', 'BeastWarrior', 'Beast', 'WingedBeast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile', 'Fish', 'SeaSerpent', 'Machine', 'Thunder', 'Aqua', 'Pyro', 'Rock', 'Plant', 'Immortal', 'Magic', 'Trap', 'Ritual'];
const monsterAttributes = ['WATER', 'FIRE', 'EARTH', 'WIND', 'DARK', 'LIGHT'];
const archetypeArray = ['Female', 'Toon', 'Elf', 'Egg', 'Horned', 'Shell', 'Turtle'];

var multipleCardsArr = []

var fusionTracker = {};

function loadingFusions(load) {
   loadFusions = load;

   //console.log(load)
   fuseCards();
}

function copyUniqueCards() {
   return Object.assign({}, uniqueCards);
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
      } else if (cardNamelist.indexOf(temp) > -1) {
         //card = cardList[cardNamelist.indexOf(temp)]; //is input a name?
         card = cardNamelist.indexOf(temp);
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

   if (!skipHash) {
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

   canWinInSlots = [];

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

            if (uniqueCards[card.id] > 3 && multipleCardsArr.indexOf(card.id) < 0) {
               document.getElementById('multipleCardsWarning').style.display = 'block'; //warns if more than 3 of the same card are in the deck,
               multipleCardsArr.push(card.id);
               document.getElementById('multipleListSection').innerText += multipleCardsArr.length > 1 ? ', ' + card.name : card.name; //Lists which cards
            }
            //document.getElementById('multipleCardsWarning').style.display = uniqueCards[card.id] > 3 ? 'block' : '';

            if (unobtainableCards.indexOf(card.id) > -1 && unobtainableTracker.indexOf(card.id) < 0) {
               document.getElementById('unobtainableWarning').style.display = 'block' //warns if unobtainable card is added to the deck;
               unobtainableTracker.push(card.id);
               document.getElementById('unobtainListSection').innerText += unobtainableTracker.length > 1 ? ', ' + card.name : card.name; //Lists which cards

               // if (unobtainableTracker.indexOf(card.id) > -1) {
               //    unobtainableTracker.push(card.id);
               //    //document.getElementById('unobtainListSection').innerHTML += unobtainableTracker.length > 1 ? ', ' + card.name : card.name; //Lists which cards
               //    //console.log(document.getElementById('unobtainListSection').innerHTML)
               // }
            }

            textId = card.id;
            textName = card.name;

            //Type
            textStat = '<p>' + card.type;
            // trackTyping[card.type] = trackTyping[card.type] ? trackTyping[card.type] + 1 : 1;

            //Attribute
            if (card.attribute) {
               textStat += '/' + card.attribute;

               // if (monsterAttributes.indexOf(card.attribute) > -1) {
               //    trackAttribute[card.attribute] = trackAttribute[card.attribute] ? trackAttribute[card.attribute] + 1 : 1;
               // }
            }

            //DC
            // textStat += card.dc ? '/DC ' + card.dc : '';
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

               // let splitArchetype = card.archetype.split(', ');
               //
               // splitArchetype.forEach(function(archetype) {
               //    trackArchetype[archetype] = trackArchetype[archetype] ? trackArchetype[archetype] + 1 : 1;
               // });

            }


            textStat += '</p>';

            textStat += card.effect ? '<p>' + card.effect.replace(/\n/gi, '<br>') + '</p>' : '';

            if (normalSlotCards.indexOf(card.id) > -1) {
               // canWinInSlots.push(card.id);
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

   function hide() {
      // let typeText = ''
      //
      // let tempObjKey = Object.keys(trackTyping);
      // tempObjKey.sort(function(a, b) {
      //    return cardTypeArr.indexOf(a) - cardTypeArr.indexOf(b);
      // })
      //
      // for (var i = 0; i < tempObjKey.length; i++) {
      //    let key = tempObjKey[i];
      //    typeText += '<span class="noWrap">' + key + ': ' + trackTyping[key];
      //    typeText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
      //    typeText += '</span>';
      // }
      //
      //
      // let attrText = '';
      //
      // if (trackAttribute) {
      //    tempObjKey = Object.keys(trackAttribute);
      //    tempObjKey.sort(function(a, b) {
      //       return monsterAttributes.indexOf(a) - monsterAttributes.indexOf(b);
      //    })
      //
      //    for (var i = 0; i < tempObjKey.length; i++) {
      //       let key = tempObjKey[i];
      //       attrText += '<span class="noWrap">' + key + ': ' + trackAttribute[key];
      //       attrText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
      //       attrText += '</span>';
      //    }
      //
      //    // deckStatSection.innerHTML += '<p>Total of Each Attribute<br>' + attrText + '</p>';
      // }
      //
      // let archeText = '';
      //
      // if (trackArchetype) {
      //    tempObjKey = Object.keys(trackArchetype);
      //    tempObjKey.sort(function(a, b) {
      //       return archetypeArray.indexOf(a) - archetypeArray.indexOf(b);
      //    })
      //
      //    for (var i = 0; i < tempObjKey.length; i++) {
      //       let key = tempObjKey[i];
      //       archeText += '<span class="noWrap">' + key + ': ' + trackArchetype[key];
      //       archeText += i < tempObjKey.length - 1 ? ',&emsp;' : '';
      //       archeText += '</span>';
      //    }
      //
      //    // deckStatSection.innerHTML += '<p>Total of Each Archetype<br>' + archeText + '</p>';
      //
      // }
   }

   if (!skipHash) {
      window.location.hash = hashString;
   } else {
      fuseCards();
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
         sortDeck(true);
      }

   }
}

function fuseCards() {

   let fusionResults = document.getElementById('fusionTBody');
   let deckStatSection = document.getElementById('deckStatSection');

   fusionResults.innerHTML = '';


   fusionTracker = {};



   if (inDeck.length < 2 || loadFusions == 'none') {
      return; //skips fusion if there are insufficient amount of cards; if fusing options is set to none
   }


   //Prevents dublpicative sequences
   let uniqueSequence = [];
   let allResults = [];
   let currentOrder = [];
   let trial;
   let copyDeck;
   let fusableDeck;
   let tempArr;

   function uniqueString(arr) {
      //let stringSeq = arr.toString();
      let stringSeq = '' + arr;
      // console.log(stringSeq);

      if (uniqueSequence.indexOf(stringSeq) > -1) {
         return false;
      }

      uniqueSequence.push(stringSeq);
      return true;
   }



   function fusionCheck(arr, tier) {

      //currentOrder = arr;

      // if (!uniqueString(arr)) {
      //    return;
      // }


      trial = bruteFusion(arr);

      if (trial) {
         //uniqueSequence.push(trial.sequence.toString())

         // let addArr = [...trial.sequence];
         let addArr = trial.sequence.slice();
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

   // fusableDeck = [...inDeck];
   // fusableDeck = fusableDeck.filter(fusable => fusableCards.includes(fusable))

   fusableDeck = inDeck.slice();
   tempArr = [];

   for (var i = 0; i < fusableDeck.length; i++) {
      let x = parseInt(fusableDeck[i])
      if (fusableCards.indexOf(x) > -1) {
         tempArr.push(x);
      }
   }

   fusableDeck = tempArr;

   //console.log(copyDeck)

   for (var i = 0; i < fusableDeck.length; i++) {
      currentOrder = [];


      // if (!fusableCards.includes(inDeck[i])) {
      //    continue;
      // }
      for (var j = i + 1; j < fusableDeck.length; j++) {


         if (j == fusableDeck.length || fusableCards.indexOf(fusableDeck[j]) < 0) {
            continue;
         }

         let fusionArr = [fusableDeck[i], fusableDeck[j]]
         fusionCheck(fusionArr, 0);
         // console.log(trial);

      }
   }

   let fusions = Object.keys(fusionTracker);
   tempArr = [];
   //fusions = fusions.filter(card => fusableCards.includes(parseInt(card)));

   for (var i = 0; i < fusions.length; i++) {
      let x = parseInt(fusions[i])
      if (fusableCards.indexOf(x) > -1) {
         tempArr.push(x);
      }
   }

   fusions = tempArr;
   // console.log(fusions)

   for (var a = 1; a < 20; a++) {

      if (loadFusions == 'some' || fusions.length === 0) {
         break;
      }

      // let hasTiers = [...fusions];
      let hasTiers = fusions.slice();

      for (var i = 0; i < hasTiers.length; i++) {


         //currentFusion = parseInt(hasTiers[i]); //searchForFusion
         currentFusion = hasTiers[i]
         let currentTier = fusionTracker[currentFusion]['t' + (a - 1)];

         // if(!fusableCards.includes(fusions[i]) || !currentTier) {
         //    continue;
         // }

         if (!currentTier) {
            fusions.splice(i, 1)
            continue;
         }
         // console.log(fusions[i])
         // console.log(fusions[i])
         // console.log(a);

         for (var j = 0; j < currentTier.length; j++) {
            let thisSet = currentTier[j];

            // let dummyDeck = [...fusableDeck];
            let dummyDeck = fusableDeck.slice();

            for (var k = 0; k < thisSet.length; k++) {
               dummyDeck.splice(dummyDeck.indexOf(thisSet[k]), 1);
            }

            for (var k = 0; k < dummyDeck.length; k++) {
               //let fusionArr = [...thisSet, dummyDeck[k]];
               let fusionArr = thisSet.slice()
               fusionArr.push(dummyDeck[k]);

               // console.log(fusionArr)

               fusionCheck(fusionArr, a);
            }
         }


      }

      // console.log(a + ": " +fusions);
   }

   createFusionResults();

}

function createFusionResults() {
   let tbody = document.getElementById('fusionTBody');
   let sorting = document.getElementById('sorting').value;

   let eachFusion = Object.keys(fusionTracker);

   for (var i = 0; i < eachFusion.length; i++) {
      eachFusion[i] = parseInt(eachFusion[i])
   }

   eachFusion.sort((a, b) => {
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

      let stringId = fusion.id == "?" ? "'?'" : fusion.id;
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

      if (normalSlotCards.indexOf(fusion.id) > -1) {
         tdId.style.backgroundColor = 'lightgreen';
      }
   }
}

function revealFusionCombos(x) {
   document.getElementById('fusionPopUp').style.display = 'inherit';
   document.getElementById('listBG').scrollTop = 0;
   let listBG = document.getElementById('listBG');

   let fusion = x == "?" ? mysteryCard : cardList[x]; //use MysterCard if Insect Imitation was used, else find card normally
   //let combos = [...fusionTracker[x].deckCombos]
   let tiers = fusionTracker[x]

   // console.log(tiers)



   // console.log(combos);

   listBG.innerHTML = '<h1>' + fusion.name + '</h1>';

   let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>';

   //Base Stats
   statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
   statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';

   //Effect
   statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';



   for (combos in tiers) {
      statText += '<p>---------</p>';

      let finalDecipher = [];

      // console.log(combos)
      combos = tiers[combos];

      for (currentSet of combos) {

         // console.log(currentSet)

         let tempText = '<p>'


         let decipher = currentSet;

         for (var i = 0; i < decipher.length; i++) {
            let card = decipher[i];

            // console.log(card);
            tempText += cardList[card].name;

            tempText += i < decipher.length - 1 ? ' &rarr; ' : '';

         }

         tempText += '</p>'

         finalDecipher.push(tempText);
      }

      finalDecipher = new Set(finalDecipher);
      finalDecipher = [...finalDecipher];

      finalDecipher.sort((a, b) => {

         if (a < b) {
            return -1
         } else if (a > b) {
            return 1
         } else {
            return 0
         }
      });



      for (var i = 0; i < finalDecipher.length; i++) {
         statText += finalDecipher[i]
      }


   }

   listBG.innerHTML += statText;




}

function bruteFusion(order) {
   let object = {};

   //object.sequence = [order];

   for (var i = 0; i < order.length - 1; i++) {
      //Card A = first card in sequence. Otherwise, it equals the result of the previous card
      let cardA = i > 0 ? object.resultCard : order[i];
      let cardB = order[i + 1];

      let pair = Math.min(cardA, cardB) + "," + Math.max(cardA, cardB);

      if (fusionCombos[pair]) {
         object.resultCard = fusionCombos[pair];
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
   document.getElementById('presetForm').value = '';
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
      hashString = hashString.toLowerCase();
      hashString = hashString.replace(/[^0-9a-z]/gi, '');
      hashString = hashString.length > 80 ? hashString.slice(0, 80) : hashString;

      let hashArr = hashString.match(/.{1,2}/g);

      let loopMax = Math.min(hashArr.length, 40);

      for (var i = 0; i < loopMax; i++) {
         hashArr[i] = parseInt(hashArr[i], 36);
         hashArr[i] = hashArr[i] > 853 || hashArr[i] == 671 ? null : hashArr[i];
      }

      // hashArr = hashArr.filter(hash => true);
      let tempArr = [];

      for (var i = 0; i < hashArr.length; i++) {
         let x = hashArr[i];
         if (x) {
            tempArr.push(x)
         }
      }

      hashArr = tempArr;


      // inDeck = [...hashArr];
      inDeck = hashArr;

      // console.log(hashArr);

      sortDeck(true);
   }


}

function openTypeChart() {
   document.getElementById('chartPopUp').style.display = 'initial';

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
   }

}

window.onload = function() {
   if (window.location.hash) {
      checkHash();
   }

};

window.onhashchange = function() {
   if (window.location.hash) {
      checkHash()
   }
}
