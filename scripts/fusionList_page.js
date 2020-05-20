var fusionMaterialStorage = {}

function createFusionTable(sortBy) {

   var table = document.getElementById('fusionTableID');
   var thead = document.createElement('thead');
   var tbody = document.createElement('tbody');

   var trHead = document.createElement('tr');

   var tdHeadID = document.createElement('td');
   var tdHeadName = document.createElement('td');

   const tdClassID = 'tdFusionId';
   const tdClassName = 'tdFusionName';
   const tdClassMaterial = 'tdCheckMaterials';
   const tdClassStat = 'tdFusionStat';

   table.innerHTML = '';

   trHead.className = 'fusionTableHead';

   tdHeadID.innerHTML = 'ID';
   tdHeadID.className = tdClassID;
   tdHeadName.innerHTML = 'Name';
   tdHeadName.className = tdClassName
   tdHeadName.colSpan = 2;

   trHead.appendChild(tdHeadID);
   trHead.appendChild(tdHeadName);

   thead.appendChild(trHead);

   //var abc = false;
   //var reverse = false;
   var useList = sortBy == 'ABC' ? [...fusionCardsABC] : [...fusionCards];

   //useList = reverse ? useList.reverse() : useList;


   for (var i = 0; i < useList.length; i++) {
      var trID = document.createElement('tr');
      var trStat = document.createElement('tr');

      var tdID = document.createElement('td');
      var tdName = document.createElement('td');
      var tdMaterial = document.createElement('td');
      var tdStat = document.createElement('td');

      var currentCard = cardList[useList[i]];
      var statText = '';

      tdID.innerHTML = currentCard.id;
      tdName.innerHTML = currentCard.name;
      tdMaterial.innerHTML = '<a onclick="checkMaterials(' + currentCard.id + ')"><u><i>Show all possible fusion material combinations.</u></i></a>';

      tdID.className = tdClassID;
      tdName.className = tdClassName;
      tdMaterial.className = tdClassMaterial;

      statText += '<i>Fusion Materials: ' + currentCard.fusionInfo + '</i>'

      statText += '<p>' + currentCard.type + '/' + currentCard.attribute + '/LV ' + currentCard.lv + '/ATK ' + currentCard.atk + '/DEF ' + currentCard.def;
      statText += currentCard.archetype ? '<br>Archetype(s): ' + currentCard.archetype : '';
      statText += currentCard.effect ? '<p>' + currentCard.effect.replace(/\n/gi, '<br>') + '</p>' : '';

      statText += '</p>'


      tdStat.innerHTML = statText;
      tdStat.className = tdClassStat;
      tdStat.colSpan = 3;


      trID.appendChild(tdID);
      trID.appendChild(tdName);
      trID.appendChild(tdMaterial);

      trStat.appendChild(tdStat);

      tbody.appendChild(trID);
      tbody.appendChild(trStat);

   }

   var trRandomID = document.createElement('tr');
   var trRandomStat = document.createElement('tr');

   trRandomID.innerHTML = '<td class="tdFusionId">?</td><td class="tdFusionName" colspan="2">?</td>';
   trRandomStat.innerHTML += '<td class="tdFusionStat" colspan="3"><i>Fusion Materials: "Insect Imitation" + any Egg monster with "Insect Imitation" in its SPECIAL POWER UP effect</i><p>?/?/LV ?/ATK ?/DEF ?</p><p>Check the SPECIAL POWER UP effect of the Egg monster to see what random monster it can be.</p></td>';

   tbody.appendChild(trRandomID);
   tbody.appendChild(trRandomStat);

   table.appendChild(thead);
   table.appendChild(tbody);

}

function checkMaterials(id) {
   document.getElementById('fusionPopUp').style.display = 'inherit';
   document.getElementById('listBG').scrollTop = 0;
   document.getElementById('listBG').removeAttribute('onscroll');

   document.body.className = 'stop-scrolling'

   var listBG = document.getElementById('listBG');

   listBG.innerHTML = '';

   listBG.innerHTML += '<p><b>' + cardList[id].name + '</b>'+ '<br><i>Fusion Materials: ' + cardList[id].fusionInfo + '</i></p><p id="fmP">Showing fusions involving: <i id="fmPi">___________</i> + ___________</p>'

   var table = document.createElement('table');
   var thead = document.createElement('thead');
   var tbody = document.createElement('tbody');

   var trHead = document.createElement('tr');
   var tdHeadA = document.createElement('td');
   var tdHeadB = document.createElement('td');

   table.className = 'fusionMaterialTable'

   tdHeadA.innerHTML = 'Fusion Material A';
   tdHeadB.innerHTML = 'Fusion Material B';

   tdHeadA.className = 'fusionMaterialTD';
   tdHeadB.className = 'fusionMaterialTD';

   tdHeadB.id = 'tdHeadB'

   trHead.appendChild(tdHeadA);
   trHead.appendChild(tdHeadB);
   thead.appendChild(trHead);

   var fusionMaterialList = [];
   fusionMaterialStorage = {}

   for (var i = 0; i < fusionListByResult[id].length; i++) {

      var currentCombination = fusionListByResult[id][i].split(',');

      if(!fusionMaterialList.includes(cardList[currentCombination[0]].name)){
         fusionMaterialList.push(cardList[currentCombination[0]].name);
      }

      if(fusionMaterialStorage[cardList[currentCombination[0]].name]){
         fusionMaterialStorage[cardList[currentCombination[0]].name].push(cardList[currentCombination[1]].name)
      } else {
         fusionMaterialStorage[cardList[currentCombination[0]].name] = [cardList[currentCombination[1]].name]
      }

      if (cardList[currentCombination[1]].name !== cardList[currentCombination[0]].name) {
         if(!fusionMaterialList.includes(cardList[currentCombination[1]].name)){
            fusionMaterialList.push(cardList[currentCombination[1]].name);
         }
         //fusionMaterialList.push(cardList[currentCombination[1]].name);

         if(fusionMaterialStorage[cardList[currentCombination[1]].name]){
            fusionMaterialStorage[cardList[currentCombination[1]].name].push(cardList[currentCombination[0]].name)
         } else {
            fusionMaterialStorage[cardList[currentCombination[1]].name] = [cardList[currentCombination[0]].name]
         }
      }
   }

   fusionMaterialList.sort(function(a, b) {
      var nameA = a[0].toUpperCase(); // ignore upper and lowercase
      var nameB = b[0].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
         return -1;
      }
      if (nameA > nameB) {
         return 1;
      }
      // names must be equal
      return 0;
   });

   for(var i = 0; i < fusionMaterialList.length; i++){
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');

      td1.className = 'fusionMaterialTD';
      td2.className = 'fusionMaterialTD';

      td1.innerHTML = '<a onclick="revealFusion(\'' +  fusionMaterialList[i].replace(/'/gi, "\\'") + '\')"><u>' + fusionMaterialList[i] +'</u></a>';

      td1.id = 'fma' + i;
      td2.id = 'fmb' + i;

      fusionMaterialStorage[fusionMaterialList[i]].sort(function(a, b) {
         var nameA = a[0].toUpperCase(); // ignore upper and lowercase
         var nameB = b[0].toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }
         // names must be equal
         return 0;
      });

      tr.appendChild(td1);
      tr.appendChild(td2);

      tbody.appendChild(tr);
   }

   fusionMaterialStorage['tdLength'] = fusionMaterialList.length;

   table.appendChild(thead);
   table.appendChild(tbody);

   listBG.appendChild(table);

   document.getElementById('listBG').style.scrollBehavior = 'smooth';

}

function revealFusion(card){

   for (var i = 0; i < fusionMaterialStorage.tdLength; i++) {
      var fma = document.getElementById('fma' + i);
      var fmb = document.getElementById('fmb' + i);

      fma.style.backgroundColor = fma.innerText == card ? '#eac8e5' : '#b5b5b5';
      fmb.style.backgroundColor = '#eac8e5';

      fmb.innerHTML = fusionMaterialStorage[card][i] ? fusionMaterialStorage[card][i] : '';
   }

   document.getElementById('fmPi').style.backgroundColor = 'yellow';
   document.getElementById('fmPi').innerHTML = '"' + card + '"';


   document.getElementById('listBG').scrollTop = 0;
}

window.onload = function() {
   createFusionTable('ABC');
}
