var fusionTracker = {}; //Tracks all of the current fusion

var tempNameTracker;

function checkCard() {
   let card = document.getElementById('cardInput').value;
   let temp = card.toLowerCase();

   // resetWarnings();
   if (!isNaN(card)) {
      //card = cardList[parseInt(card)]; //is input a number?
      card = parseInt(card)
      if (card > 853) {
         card = null;
         return;
      }
      //console.log(card)
   } else if (cardNamelist.includes(temp)) {
      card = cardNamelist.indexOf(temp); //is input a name
   } else if (!card) {
      //is input blank?
   } else {
      //does card not exist
      card = null;
      document.getElementById('resultSection').innerHTML = '<b>This card does not exist. Please check the spelling.</b>';
      return;
   }

   if (card !== null) {
      checkForFusion(card);
      document.getElementById('cardInput').value = cardList[card].name;
      window.location.hash = cardList[card].name.replace(/ /gi, '_')
   }
}

function checkForFusion(cardA) {

   resultSection = document.getElementById('resultSection');
   var fusionResults = [];

   fusionTracker = {}; //Reset tracker

   var mainCard = cardList[cardA];

   if (!fusableCards.includes(cardA)) {
      //If the card is not a fusable card, then end function;
      // resultSection.innerHTML = '<b>This card cannot be used to make fusions</b>';
      resultSection.innerHTML = '<b>No results found for fusions involving "' + mainCard.name + '"</b>';
      return;
   }



   resultSection.innerHTML = '<b>Search results for fusions involving "' + mainCard.name + '".</b><br><br>';

   //Compare current card with all other fusable cards.
   for (cardB of fusableCards) {

      let pair = Math.min(cardA, cardB) + "," + Math.max(cardA, cardB);

      if (fusionCombos[pair]) {

         let fusionResult = fusionCombos[pair];

         if (!fusionTracker[fusionResult]) {
            //If a fusion result is found, but this is the first entry. Create a new array in the fusion tracker
            fusionTracker[fusionResult] = [];
         }

         fusionTracker[fusionResult].push(cardB); //Add card into the fusion for fusion Tracker

      }

   }

   for (var currentFusion in fusionTracker) {
      //Sort results by alphabetical order
      fusionTracker[currentFusion].sort(function(a, b) {
         let check1 = cardList[a].name.toUpperCase();
         let check2 = cardList[b].name.toUpperCase();

         if (check1 < check2) {
            return -1;
         }

         if (check1 > check2) {
            return 1;
         }

         return 0;
      })

      fusion = currentFusion == "?" ? mysteryCard : cardList[currentFusion];

      let table = document.createElement('table');
      let tbody = document.createElement('tbody');

      let tr1 = document.createElement('tr');

      let th1 = document.createElement('th');
      th1.innerText = fusion.id == "?" ? "'?'" : fusion.id; //refer to the ? entry if insect imitation was involved
      th1.className = 'thID'
      //Base Stats

      let th2 = document.createElement('th');
      th2.innerText = fusion.name;

      tr1.appendChild(th1);
      tr1.appendChild(th2);

      tbody.appendChild(tr1);

      let tr2 = document.createElement('tr');
      let statsTd = document.createElement('td');

      let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>';

      statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
      statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';

      //Effect
      statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';

      statsTd.innerHTML = statText;
      statsTd.colSpan = 2;


      tr2.appendChild(statsTd);
      tbody.appendChild(tr2);

      let tr3 = document.createElement('tr');
      let materialTd = document.createElement('td');

      let materialText = '<span class="fusionAddTitle">Fusion: "' + cardList[cardA].name + '" + ________:</span><ul class="materialUL">';

      for (material of fusionTracker[currentFusion]) {
         materialText += '<li>"' + cardList[material].name + '"</li>';
      }

      materialTd.innerHTML = materialText + "</ul>"

      materialTd.className = 'materialTd';

      materialTd.colSpan = 2;
      // materialTd.style.columnCount = 3;

      tr3.appendChild(materialTd);
      tbody.appendChild(tr3)

      table.appendChild(tbody);

      resultSection.appendChild(table);

   }

   //fusionResults.sort(); //sort fusion results by alphabetical order;



   // console.log(fusionTracker);
}

function tempNamer() {
   tempNameTracker = {};
   for (var currentFusion in fusionTracker) {
      tempNameTracker[cardList[currentFusion].name] = [];

      for (card of fusionTracker[currentFusion]) {
         tempNameTracker[cardList[currentFusion].name].push(cardList[card].name);
      }
   }

   console.log(tempNameTracker);
}

function sortFusionTracker(sortType) {
   //sortType = ABC = alphabetical; sortType = ID = id number;

}

function checkHash(){
   let hashString = window.location.hash ? window.location.hash.slice(1).replace(/_/gi, ' ') : ''; //grab the # in url
   document.getElementById('cardInput').value = hashString;
   checkCard();
}

function windowCheck(){
   if (window.location.hash) {
      checkHash();
   } else{
      document.getElementById('cardInput').value = '';
      document.getElementById('resultSection').innerHTML = '';

   }
}

window.onload = function(){
   windowCheck();
};
//
window.onhashchange =  function(){
   windowCheck()
};

// window.addEventListener('DOMContentLoaded', windowCheck());
