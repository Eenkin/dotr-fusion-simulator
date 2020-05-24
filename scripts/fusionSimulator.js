console.log('ver1.0.4c');

var abcList = [];

var shareLink = '';

const comboOrder = [
   [1, 0],
   [1, 0, 2],
   [2, 0],
   [2, 0, 1],
   [2, 1],
   [2, 1, 0],
   [1, 0, 2, 3],
   [1, 0, 3],
   [1, 0, 3, 2],
   [2, 0, 1, 3],
   [2, 0, 3],
   [2, 0, 3, 1],
   [2, 1, 0, 3],
   [2, 1, 3],
   [2, 1, 3, 0],
   [3, 0],
   [3, 0, 1],
   [3, 0, 1, 2],
   [3, 0, 2],
   [3, 0, 2, 1],
   [3, 1],
   [3, 1, 0],
   [3, 1, 0, 2],
   [3, 1, 2],
   [3, 1, 2, 0],
   [3, 2],
   [3, 2, 0],
   [3, 2, 0, 1],
   [3, 2, 1],
   [3, 2, 1, 0],
   [1, 0, 2, 3, 4],
   [1, 0, 2, 4],
   [1, 0, 2, 4, 3],
   [1, 0, 3, 2, 4],
   [1, 0, 3, 4],
   [1, 0, 3, 4, 2],
   [1, 0, 4],
   [1, 0, 4, 2],
   [1, 0, 4, 2, 3],
   [1, 0, 4, 3],
   [1, 0, 4, 3, 2],
   [2, 0, 1, 3, 4],
   [2, 0, 1, 4],
   [2, 0, 1, 4, 3],
   [2, 0, 3, 1, 4],
   [2, 0, 3, 4],
   [2, 0, 3, 4, 1],
   [2, 0, 4],
   [2, 0, 4, 1],
   [2, 0, 4, 1, 3],
   [2, 0, 4, 3],
   [2, 0, 4, 3, 1],
   [2, 1, 0, 3, 4],
   [2, 1, 0, 4],
   [2, 1, 0, 4, 3],
   [2, 1, 3, 0, 4],
   [2, 1, 3, 4],
   [2, 1, 3, 4, 0],
   [2, 1, 4],
   [2, 1, 4, 0],
   [2, 1, 4, 0, 3],
   [2, 1, 4, 3],
   [2, 1, 4, 3, 0],
   [3, 0, 1, 2, 4],
   [3, 0, 1, 4],
   [3, 0, 1, 4, 2],
   [3, 0, 2, 1, 4],
   [3, 0, 2, 4],
   [3, 0, 2, 4, 1],
   [3, 0, 4],
   [3, 0, 4, 1],
   [3, 0, 4, 1, 2],
   [3, 0, 4, 2],
   [3, 0, 4, 2, 1],
   [3, 1, 0, 2, 4],
   [3, 1, 0, 4],
   [3, 1, 0, 4, 2],
   [3, 1, 2, 0, 4],
   [3, 1, 2, 4],
   [3, 1, 2, 4, 0],
   [3, 1, 4],
   [3, 1, 4, 0],
   [3, 1, 4, 0, 2],
   [3, 1, 4, 2],
   [3, 1, 4, 2, 0],
   [3, 2, 0, 1, 4],
   [3, 2, 0, 4],
   [3, 2, 0, 4, 1],
   [3, 2, 1, 0, 4],
   [3, 2, 1, 4],
   [3, 2, 1, 4, 0],
   [3, 2, 4],
   [3, 2, 4, 0],
   [3, 2, 4, 0, 1],
   [3, 2, 4, 1],
   [3, 2, 4, 1, 0],
   [4, 0],
   [4, 0, 1],
   [4, 0, 1, 2],
   [4, 0, 1, 2, 3],
   [4, 0, 1, 3],
   [4, 0, 1, 3, 2],
   [4, 0, 2],
   [4, 0, 2, 1],
   [4, 0, 2, 1, 3],
   [4, 0, 2, 3],
   [4, 0, 2, 3, 1],
   [4, 0, 3],
   [4, 0, 3, 1],
   [4, 0, 3, 1, 2],
   [4, 0, 3, 2],
   [4, 0, 3, 2, 1],
   [4, 1],
   [4, 1, 0],
   [4, 1, 0, 2],
   [4, 1, 0, 2, 3],
   [4, 1, 0, 3],
   [4, 1, 0, 3, 2],
   [4, 1, 2],
   [4, 1, 2, 0],
   [4, 1, 2, 0, 3],
   [4, 1, 2, 3],
   [4, 1, 2, 3, 0],
   [4, 1, 3],
   [4, 1, 3, 0],
   [4, 1, 3, 0, 2],
   [4, 1, 3, 2],
   [4, 1, 3, 2, 0],
   [4, 2],
   [4, 2, 0],
   [4, 2, 0, 1],
   [4, 2, 0, 1, 3],
   [4, 2, 0, 3],
   [4, 2, 0, 3, 1],
   [4, 2, 1],
   [4, 2, 1, 0],
   [4, 2, 1, 0, 3],
   [4, 2, 1, 3],
   [4, 2, 1, 3, 0],
   [4, 2, 3],
   [4, 2, 3, 0],
   [4, 2, 3, 0, 1],
   [4, 2, 3, 1],
   [4, 2, 3, 1, 0],
   [4, 3],
   [4, 3, 0],
   [4, 3, 0, 1],
   [4, 3, 0, 1, 2],
   [4, 3, 0, 2],
   [4, 3, 0, 2, 1],
   [4, 3, 1],
   [4, 3, 1, 0],
   [4, 3, 1, 0, 2],
   [4, 3, 1, 2],
   [4, 3, 1, 2, 0],
   [4, 3, 2],
   [4, 3, 2, 0],
   [4, 3, 2, 0, 1],
   [4, 3, 2, 1],
   [4, 3, 2, 1, 0]
];

const comboGroundOrder = [
   [0, 1],
   [0, 1, 2],
   [0, 2],
   [0, 2, 1],
   [0, 1, 2, 3],
   [0, 1, 3],
   [0, 1, 3, 2],
   [0, 2, 1, 3],
   [0, 2, 3],
   [0, 2, 3, 1],
   [0, 3],
   [0, 3, 1],
   [0, 3, 1, 2],
   [0, 3, 2],
   [0, 3, 2, 1],
   [0, 1, 2, 3, 4],
   [0, 1, 2, 4],
   [0, 1, 2, 4, 3],
   [0, 1, 3, 2, 4],
   [0, 1, 3, 4],
   [0, 1, 3, 4, 2],
   [0, 1, 4],
   [0, 1, 4, 2],
   [0, 1, 4, 2, 3],
   [0, 1, 4, 3],
   [0, 1, 4, 3, 2],
   [0, 2, 1, 3, 4],
   [0, 2, 1, 4],
   [0, 2, 1, 4, 3],
   [0, 2, 3, 1, 4],
   [0, 2, 3, 4],
   [0, 2, 3, 4, 1],
   [0, 2, 4],
   [0, 2, 4, 1],
   [0, 2, 4, 1, 3],
   [0, 2, 4, 3],
   [0, 2, 4, 3, 1],
   [0, 3, 1, 2, 4],
   [0, 3, 1, 4],
   [0, 3, 1, 4, 2],
   [0, 3, 2, 1, 4],
   [0, 3, 2, 4],
   [0, 3, 2, 4, 1],
   [0, 3, 4],
   [0, 3, 4, 1],
   [0, 3, 4, 1, 2],
   [0, 3, 4, 2],
   [0, 3, 4, 2, 1],
   [0, 4],
   [0, 4, 1],
   [0, 4, 1, 2],
   [0, 4, 1, 2, 3],
   [0, 4, 1, 3],
   [0, 4, 1, 3, 2],
   [0, 4, 2],
   [0, 4, 2, 1],
   [0, 4, 2, 1, 3],
   [0, 4, 2, 3],
   [0, 4, 2, 3, 1],
   [0, 4, 3],
   [0, 4, 3, 1],
   [0, 4, 3, 1, 2],
   [0, 4, 3, 2],
   [0, 4, 3, 2, 1],
   [0, 1, 2, 3, 4, 5],
   [0, 1, 2, 3, 5],
   [0, 1, 2, 3, 5, 4],
   [0, 1, 2, 4, 3, 5],
   [0, 1, 2, 4, 5],
   [0, 1, 2, 4, 5, 3],
   [0, 1, 2, 5],
   [0, 1, 2, 5, 3],
   [0, 1, 2, 5, 3, 4],
   [0, 1, 2, 5, 4],
   [0, 1, 2, 5, 4, 3],
   [0, 1, 3, 2, 4, 5],
   [0, 1, 3, 2, 5],
   [0, 1, 3, 2, 5, 4],
   [0, 1, 3, 4, 2, 5],
   [0, 1, 3, 4, 5],
   [0, 1, 3, 4, 5, 2],
   [0, 1, 3, 5],
   [0, 1, 3, 5, 2],
   [0, 1, 3, 5, 2, 4],
   [0, 1, 3, 5, 4],
   [0, 1, 3, 5, 4, 2],
   [0, 1, 4, 2, 3, 5],
   [0, 1, 4, 2, 5],
   [0, 1, 4, 2, 5, 3],
   [0, 1, 4, 3, 2, 5],
   [0, 1, 4, 3, 5],
   [0, 1, 4, 3, 5, 2],
   [0, 1, 4, 5],
   [0, 1, 4, 5, 2],
   [0, 1, 4, 5, 2, 3],
   [0, 1, 4, 5, 3],
   [0, 1, 4, 5, 3, 2],
   [0, 1, 5],
   [0, 1, 5, 2],
   [0, 1, 5, 2, 3],
   [0, 1, 5, 2, 3, 4],
   [0, 1, 5, 2, 4],
   [0, 1, 5, 2, 4, 3],
   [0, 1, 5, 3],
   [0, 1, 5, 3, 2],
   [0, 1, 5, 3, 2, 4],
   [0, 1, 5, 3, 4],
   [0, 1, 5, 3, 4, 2],
   [0, 1, 5, 4],
   [0, 1, 5, 4, 2],
   [0, 1, 5, 4, 2, 3],
   [0, 1, 5, 4, 3],
   [0, 1, 5, 4, 3, 2],
   [0, 2, 1, 3, 4, 5],
   [0, 2, 1, 3, 5],
   [0, 2, 1, 3, 5, 4],
   [0, 2, 1, 4, 3, 5],
   [0, 2, 1, 4, 5],
   [0, 2, 1, 4, 5, 3],
   [0, 2, 1, 5],
   [0, 2, 1, 5, 3],
   [0, 2, 1, 5, 3, 4],
   [0, 2, 1, 5, 4],
   [0, 2, 1, 5, 4, 3],
   [0, 2, 3, 1, 4, 5],
   [0, 2, 3, 1, 5],
   [0, 2, 3, 1, 5, 4],
   [0, 2, 3, 4, 1, 5],
   [0, 2, 3, 4, 5],
   [0, 2, 3, 4, 5, 1],
   [0, 2, 3, 5],
   [0, 2, 3, 5, 1],
   [0, 2, 3, 5, 1, 4],
   [0, 2, 3, 5, 4],
   [0, 2, 3, 5, 4, 1],
   [0, 2, 4, 1, 3, 5],
   [0, 2, 4, 1, 5],
   [0, 2, 4, 1, 5, 3],
   [0, 2, 4, 3, 1, 5],
   [0, 2, 4, 3, 5],
   [0, 2, 4, 3, 5, 1],
   [0, 2, 4, 5],
   [0, 2, 4, 5, 1],
   [0, 2, 4, 5, 1, 3],
   [0, 2, 4, 5, 3],
   [0, 2, 4, 5, 3, 1],
   [0, 2, 5],
   [0, 2, 5, 1],
   [0, 2, 5, 1, 3],
   [0, 2, 5, 1, 3, 4],
   [0, 2, 5, 1, 4],
   [0, 2, 5, 1, 4, 3],
   [0, 2, 5, 3],
   [0, 2, 5, 3, 1],
   [0, 2, 5, 3, 1, 4],
   [0, 2, 5, 3, 4],
   [0, 2, 5, 3, 4, 1],
   [0, 2, 5, 4],
   [0, 2, 5, 4, 1],
   [0, 2, 5, 4, 1, 3],
   [0, 2, 5, 4, 3],
   [0, 2, 5, 4, 3, 1],
   [0, 3, 1, 2, 4, 5],
   [0, 3, 1, 2, 5],
   [0, 3, 1, 2, 5, 4],
   [0, 3, 1, 4, 2, 5],
   [0, 3, 1, 4, 5],
   [0, 3, 1, 4, 5, 2],
   [0, 3, 1, 5],
   [0, 3, 1, 5, 2],
   [0, 3, 1, 5, 2, 4],
   [0, 3, 1, 5, 4],
   [0, 3, 1, 5, 4, 2],
   [0, 3, 2, 1, 4, 5],
   [0, 3, 2, 1, 5],
   [0, 3, 2, 1, 5, 4],
   [0, 3, 2, 4, 1, 5],
   [0, 3, 2, 4, 5],
   [0, 3, 2, 4, 5, 1],
   [0, 3, 2, 5],
   [0, 3, 2, 5, 1],
   [0, 3, 2, 5, 1, 4],
   [0, 3, 2, 5, 4],
   [0, 3, 2, 5, 4, 1],
   [0, 3, 4, 1, 2, 5],
   [0, 3, 4, 1, 5],
   [0, 3, 4, 1, 5, 2],
   [0, 3, 4, 2, 1, 5],
   [0, 3, 4, 2, 5],
   [0, 3, 4, 2, 5, 1],
   [0, 3, 4, 5],
   [0, 3, 4, 5, 1],
   [0, 3, 4, 5, 1, 2],
   [0, 3, 4, 5, 2],
   [0, 3, 4, 5, 2, 1],
   [0, 3, 5],
   [0, 3, 5, 1],
   [0, 3, 5, 1, 2],
   [0, 3, 5, 1, 2, 4],
   [0, 3, 5, 1, 4],
   [0, 3, 5, 1, 4, 2],
   [0, 3, 5, 2],
   [0, 3, 5, 2, 1],
   [0, 3, 5, 2, 1, 4],
   [0, 3, 5, 2, 4],
   [0, 3, 5, 2, 4, 1],
   [0, 3, 5, 4],
   [0, 3, 5, 4, 1],
   [0, 3, 5, 4, 1, 2],
   [0, 3, 5, 4, 2],
   [0, 3, 5, 4, 2, 1],
   [0, 4, 1, 2, 3, 5],
   [0, 4, 1, 2, 5],
   [0, 4, 1, 2, 5, 3],
   [0, 4, 1, 3, 2, 5],
   [0, 4, 1, 3, 5],
   [0, 4, 1, 3, 5, 2],
   [0, 4, 1, 5],
   [0, 4, 1, 5, 2],
   [0, 4, 1, 5, 2, 3],
   [0, 4, 1, 5, 3],
   [0, 4, 1, 5, 3, 2],
   [0, 4, 2, 1, 3, 5],
   [0, 4, 2, 1, 5],
   [0, 4, 2, 1, 5, 3],
   [0, 4, 2, 3, 1, 5],
   [0, 4, 2, 3, 5],
   [0, 4, 2, 3, 5, 1],
   [0, 4, 2, 5],
   [0, 4, 2, 5, 1],
   [0, 4, 2, 5, 1, 3],
   [0, 4, 2, 5, 3],
   [0, 4, 2, 5, 3, 1],
   [0, 4, 3, 1, 2, 5],
   [0, 4, 3, 1, 5],
   [0, 4, 3, 1, 5, 2],
   [0, 4, 3, 2, 1, 5],
   [0, 4, 3, 2, 5],
   [0, 4, 3, 2, 5, 1],
   [0, 4, 3, 5],
   [0, 4, 3, 5, 1],
   [0, 4, 3, 5, 1, 2],
   [0, 4, 3, 5, 2],
   [0, 4, 3, 5, 2, 1],
   [0, 4, 5],
   [0, 4, 5, 1],
   [0, 4, 5, 1, 2],
   [0, 4, 5, 1, 2, 3],
   [0, 4, 5, 1, 3],
   [0, 4, 5, 1, 3, 2],
   [0, 4, 5, 2],
   [0, 4, 5, 2, 1],
   [0, 4, 5, 2, 1, 3],
   [0, 4, 5, 2, 3],
   [0, 4, 5, 2, 3, 1],
   [0, 4, 5, 3],
   [0, 4, 5, 3, 1],
   [0, 4, 5, 3, 1, 2],
   [0, 4, 5, 3, 2],
   [0, 4, 5, 3, 2, 1],
   [0, 5],
   [0, 5, 1],
   [0, 5, 1, 2],
   [0, 5, 1, 2, 3],
   [0, 5, 1, 2, 3, 4],
   [0, 5, 1, 2, 4],
   [0, 5, 1, 2, 4, 3],
   [0, 5, 1, 3],
   [0, 5, 1, 3, 2],
   [0, 5, 1, 3, 2, 4],
   [0, 5, 1, 3, 4],
   [0, 5, 1, 3, 4, 2],
   [0, 5, 1, 4],
   [0, 5, 1, 4, 2],
   [0, 5, 1, 4, 2, 3],
   [0, 5, 1, 4, 3],
   [0, 5, 1, 4, 3, 2],
   [0, 5, 2],
   [0, 5, 2, 1],
   [0, 5, 2, 1, 3],
   [0, 5, 2, 1, 3, 4],
   [0, 5, 2, 1, 4],
   [0, 5, 2, 1, 4, 3],
   [0, 5, 2, 3],
   [0, 5, 2, 3, 1],
   [0, 5, 2, 3, 1, 4],
   [0, 5, 2, 3, 4],
   [0, 5, 2, 3, 4, 1],
   [0, 5, 2, 4],
   [0, 5, 2, 4, 1],
   [0, 5, 2, 4, 1, 3],
   [0, 5, 2, 4, 3],
   [0, 5, 2, 4, 3, 1],
   [0, 5, 3],
   [0, 5, 3, 1],
   [0, 5, 3, 1, 2],
   [0, 5, 3, 1, 2, 4],
   [0, 5, 3, 1, 4],
   [0, 5, 3, 1, 4, 2],
   [0, 5, 3, 2],
   [0, 5, 3, 2, 1],
   [0, 5, 3, 2, 1, 4],
   [0, 5, 3, 2, 4],
   [0, 5, 3, 2, 4, 1],
   [0, 5, 3, 4],
   [0, 5, 3, 4, 1],
   [0, 5, 3, 4, 1, 2],
   [0, 5, 3, 4, 2],
   [0, 5, 3, 4, 2, 1],
   [0, 5, 4],
   [0, 5, 4, 1],
   [0, 5, 4, 1, 2],
   [0, 5, 4, 1, 2, 3],
   [0, 5, 4, 1, 3],
   [0, 5, 4, 1, 3, 2],
   [0, 5, 4, 2],
   [0, 5, 4, 2, 1],
   [0, 5, 4, 2, 1, 3],
   [0, 5, 4, 2, 3],
   [0, 5, 4, 2, 3, 1],
   [0, 5, 4, 3],
   [0, 5, 4, 3, 1],
   [0, 5, 4, 3, 1, 2],
   [0, 5, 4, 3, 2],
   [0, 5, 4, 3, 2, 1]
];

function displayFusionList(view) {
   document.getElementById('fusionPopUp').style.display = view;
}

// function createTable() {
//    let fusionTable = document.getElementById('fusionTableABC');
//    fusionTable.innerHTML = '';
//    let tbody = document.createElement('tbody');
//
//    let abcFusion = [...fusionCards];
//
//    abcFusion.sort((a, b) => {
//       return cardList[a].name.localeCompare(cardList[b].name)
//    })
//
//    console.log(abcFusion);
//
//    function tdNode(text, className, colspan) {
//       let td = document.createElement('td');
//       td.innerHTML = text;
//
//       if (className) {
//          td.className = className;
//       }
//
//       if (colspan) {
//          td.colSpan = 2;
//       }
//
//       return td;
//    }
//
//    for (var i = 0; i < abcFusion.length; i++) {
//       let tr = document.createElement('tr');
//
//       let fusion = cardList[abcFusion[i]];
//
//       //Id and Name Row
//       let tdId = tdNode(fusion.id, 'tdFusionId');
//       tr.appendChild(tdId);
//
//       let tdName = tdNode(fusion.name, 'tdFusionName')
//       tr.appendChild(tdName);
//
//       tbody.appendChild(tr);
//
//       //Stats
//       let tr2 = document.createElement('tr');
//
//       //Fusion Material
//       let statText = '<i>Fusion Materials: ' + fusion.fusionInfo.replace(/\n/gi, '<br>') + '</i>';
//
//       //Base Stats
//       statText += '<p>' + fusion.type + '/' + fusion.attribute + '/LV ' + fusion.lv + '/ATK ' + fusion.atk + '/DEF ' + fusion.def;
//       statText += fusion.archetype ? '<br>Archetype(s): ' + fusion.archetype + '</p>' : '</p>';
//
//       //Effect
//       statText += fusion.effect ? '<p>' + fusion.effect.replace(/\n/gi, '<br>') + '</p>' : '';
//
//
//
//       let tdStat = tdNode(statText, 'tdFusionStat', 2);
//       tr2.appendChild(tdStat);
//
//       tbody.appendChild(tr2);
//
//
//    }
//
//    fusionTable.appendChild(tbody);
// }

function swapTable(swap) {
   let table123 = document.getElementById('fusionTable123');
   let tableABC = document.getElementById('fusionTableABC');

   switch (swap) {
      case '123':
         tableABC.style.display = 'none';
         table123.style.display = 'inherit';
         break;
      default:
         table123.style.display = 'none';
         tableABC.style.display = 'inherit';
   }
}

function scrollToTop() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;

   resetFusionSectionColors();
}

function checkName(x){

   //Spelling Error is working incorrectly.

   let cardInput = document.getElementsByClassName('cardInput');
   let materialStats = document.getElementsByClassName('materialStats');

   materialStats[x].innerHTML = '';

   cardInput[x].style.backgroundColor = ''; //Reset input colors

   let temp = cardInput[x].value.toLowerCase();
   let deciNum = parseInt(cardInput[x].value);

   //Find if card exists
   if (!isNaN(temp)) {
      //If input was a number,
      if (deciNum < 854 && deciNum >= 0) {
         //If exists and input was ID# and exists
         cardInput[x].value = cardList[deciNum].name;
      } else {
         //If number input was used but ID doesn't exist, then make input blank;
         cardInput[x].value = '';
         deciNum = false;
      }
   } else if (cardNamelist.includes(temp)) {
      //if exists, convert then grab deciNum
      deciNum = cardNamelist.indexOf(temp);
   } else if (!temp) {
      //Skip if empty
      deciNum = false;
   } else {
      //If card is misspelled or don't exist, then error
      cardInput[x].style.backgroundColor = 'lightcoral'; //Highlight problem input
      materialStats[x].innerHTML = '<span class="warningHighlight">This card does not exist. Please check spelling.</span>'; //Show Warning
      //display error message
      deciNum = false;
   }

   //Show Fusion Material Stats
   if (deciNum) {
      let tempCard = cardList[deciNum];

      let tempText = ''

      tempText += /*'ID# ' + tempCard.id + ' | ' +*/ tempCard.type; //ID and Type
      tempText += tempCard.attribute ? '/' + tempCard.attribute : ''; //Attribute
      // tempText += tempCard.dc ? '/DC ' + tempCard.dc : ''; //Deck Cost
      tempText += tempCard.lv ? '/LV ' + tempCard.lv + '/ATK ' + tempCard.atk /*+ '/DEF ' + tempCard.def*/: ''; //Level/ATK/DEF
      tempText += tempCard.archetype ? '/' + tempCard.archetype.replace(/, /gi, '/') : ''; //Archetypes

      tempText += fusableCards.includes(deciNum) ? '' : '<br><span class="warningHighlight">Note: This card does not fuse with other cards.</span>' //Warns this card can't fuse

      materialStats[x].innerHTML = tempText; //Add stats below card input
   }

}

function fuseBase36() {
   //Converting Cards into base36 to add to # on window url

   let cardInput = document.getElementsByClassName('cardInput');
   let errorSection = document.getElementById('errorSection');
   let fusionResults = document.getElementById('fusionResults');
   let jumpToSection = document.getElementById('jumpToSection');

   let errorMessage;
   let countBlanks = 0;

   let hashString = [];
   let hashResult = '';

   let deciArr = [];

   //Empties out sections
   errorSection.innerHTML = '';
   fusionResults.innerHTML = '';
   jumpToSection.innerHTML = '';

   for (var i = 0; i < cardInput.length; i++) {
      cardInput[i].style.backgroundColor = ''; //Reset input colors

      let temp = cardInput[i].value.toLowerCase();
      let deciNum = parseInt(cardInput[i].value);

      //Find if card exists
      if (!isNaN(temp) && deciNum < 854 && deciNum >= 0) {
         //If exists and input was ID# and exists
         cardInput[i].value = cardList[deciNum].name;
         hashString[i] = deciNum < 36 ? '0' + deciNum.toString(36) : deciNum.toString(36); //Converts ID # to base 36; add a leading 0 if result only has 1 character
         deciArr.push(deciNum);
      } else if (cardNamelist.includes(temp)) {
         //if exists, convert card id into base36
         deciNum = cardNamelist.indexOf(temp);
         hashString[i] = deciNum < 36 ? '0' + deciNum.toString(36) : deciNum.toString(36); //Converts ID # to base 36; add a leading 0 if result only has 1 character
         deciArr.push(deciNum);
      } else if (!temp) {
         //if blank, then assign non-existent card id to leave input blank
         hashString[i] = 'nq'; //#854
         //Add counter to make sure there are less than 5 blank inputs
         countBlanks++;
      } else {
         //If card is misspelled or don't exist, then error
         errorMessage = "One or more cards do not exist. Please check if the spelling is correct!"
         //Highlight problem input
         cardInput[i].style.backgroundColor = 'lightcoral';
      }

      if (countBlanks > 4 && !errorMessage) {
         //If there are 5 or 6 blanks, then produce amount error. Spelling error takes priority over amount.
         errorMessage = 'There is an insufficient amount of cards to perform a fusion. Please input the names of at least 2 cards!';
      }

      if (errorMessage) {
         errorSection.innerHTML = errorMessage;
         errorSection.style.display = 'initial';
         return
      }


   }

   hashResult = hashString.join('');


   window.location.hash = hashResult;

   fuseCards(deciArr, true);
}

function fuseCards(idArrSkip, clearSkip) {

   let cardSelected = idArrSkip ? idArrSkip : [];
   let groundCards = [];
   let handCards = [];

   let cardInput = document.getElementsByClassName('cardInput');
   let errorSection = document.getElementById('errorSection');
   let fusionResults = document.getElementById('fusionResults');
   let jumpToSection = document.getElementById('jumpToSection');

   let errorCheck = false;
   let errorMessages = [];
   let groundExists = false;

   errorSection.innerHTML = '';
   // errorSection.style.display = 'none';
   fusionResults.innerHTML = '';
   jumpToSection.innerHTML = '';

   if (!clearSkip) {
      for (var i = 0; i < cardInput.length; i++) {
            cardInput[i].style.backgroundColor = ''; //Reset input colors
      }
   }

   if (!idArrSkip) {
      //Convert class values into card id# and check for any spelling errors
      for (var i = 0; i < cardInput.length; i++) {

         let temp = cardInput[i].value.toLowerCase();
         if (cardNamelist.includes(temp)) {
            //Conver name into value number.
            cardSelected.push(cardNamelist.indexOf(temp));
         } else if (!temp) {
            //Skips over empty fields so it does not produce an error.
         } else {
            //Cards values don't exist or are misspelled
            errorCheck = true;
            errorMessages = "One or more cards do not exist. Please check if the spelling is correct!"
            //Highlights problematic input boxes
            cardInput[i].style.backgroundColor = 'lightcoral';
         }
      }

      //Create error message if there is only 1 card listed.
      if (cardSelected.length < 2 && !errorCheck) {
         errorCheck = true;
         errorMessages = 'There is an insufficient amount of cards to perform a fusion. Please input the names of at least 2 cards!';
      }

      //List all possible error messages
      if (errorCheck) {
         errorSection.innerHTML = errorMessages;
         // errorSection.style.display = 'block';
         return;
      }

   }

   //Check if 'Card on Field' has value inside and then seperate it into 2 seperate lists
   if (cardInput[0].value) {
      groundExists = true;
      groundCards = cardSelected.slice(0);
      handCards = cardSelected.slice(1);
   } else {
      //Backup cardSelected to handCards
      handCards = cardSelected.slice(0);
   }

   //Prevents dublpicative sequences
   let uniqueSequence = [];
   let allResults = [];

   function fusionOrder(whichCards, whichOrder, checkForGround) {
      for (i = 0; i < whichOrder.length; i++) {

         if (whichOrder[i].includes(whichCards.length)) {
            break;
         }

         //swaps the order of cards around
         let currentOrder = [];
         for (var j = 0; j < whichOrder[i].length; j++) {
            let indexOrder = whichOrder[i][j];
            currentOrder.push(whichCards[indexOrder]);
         }
         let trial = bruteFusion(currentOrder);
         if (trial && !uniqueSequence.includes(trial.sequence.toString())) {

            uniqueSequence.push(trial.sequence.toString());
            createCardResults(checkForGround, trial.sequence, trial.resultCard);

            if(trial.resultCard == "?"){
               //Used for Insect Imitation fusions
               if (!allResults.includes("?")) {
                  allResults.push("?");
               }

            } else if (!allResults.includes(cardList[trial.resultCard].name)) {
               allResults.push(cardList[trial.resultCard].name);
            }
         }
      }

   }

   if (groundExists) {
      fusionOrder(groundCards, comboGroundOrder, true);
   }

   fusionOrder(handCards, comboOrder, false);


   if (!document.getElementsByClassName('resultSequence')[0]) {
      errorMessages = 'No possible fusion combinations found.'
      errorSection.innerHTML = errorMessages;
      // alert(errorMessages);
   } else {
      jumpToSection.innerHTML = 'Jump To: '; //+ allResults;
      allResults.forEach(function(element) {
         let jumpToLink = 'card' + element.replace(/ /g, '').replace(/\./g, '').replace(/#/g, '').replace(/,/g, '').replace(/-/g, '');
         jumpToSection.innerHTML += '&emsp; <a class="jumpAnch" onclick=" highlightResult(' + jumpToLink + ')">' + element + '</a>'
      })
   }


}

function createCardResults(groundExists, newSequence, finalResult, numberOrder) {
   let fusionResults = document.getElementById('fusionResults');

   for (var i = 0; i < newSequence.length; i++) {
      //Change Id into card name
      newSequence[i] = newSequence[i] == "?" ? "?": cardList[newSequence[i]].name;//If insect imitation, use mystery card info, else search for existing card
   }

   finalResult = finalResult == "?" ? mysteryCard : cardList[finalResult]; //If insect imitation, use mystery card info, else search for existing card

   //let fusionDetail = finalResult.fusionInfo.replace(/\] \[/g, '] &ensp;or&ensp; [');
   let fusionDetail = finalResult.fusionInfo.replace(/\n/g, '<br>')

   divResultsId = "card" + finalResult.name.replace(/ /g, '').replace(/\./g, '').replace(/#/g, '').replace(/,/g, '').replace(/-/g, '');
   let divCard = document.getElementById(divResultsId);
   let createSequenceText;

   //create a div if one doesn't exist for the final result
   if (!divCard) {
      let createDiv = document.createElement('div');
      createDiv.setAttribute('class', 'resultSequence');
      createDiv.setAttribute('id', divResultsId);

      let createBold = document.createElement('b');
      let createTitle = document.createTextNode(finalResult.name);

      let spanFusionDetail = document.createElement('span');
      spanFusionDetail.setAttribute('class', 'fusionDetail');
      spanFusionDetail.innerHTML = 'Fusion Materials: ' + fusionDetail;

      let spanResultStat = document.createElement('span');
      spanResultStat.setAttribute('class', 'resultStats');

      // let statText = '<p>Type: ' + finalResult.type + '&emsp;Attribute: ' + finalResult.attribute + '&emsp;ATK/DEF:' + finalResult.atk + '/' + finalResult.def;
      //
      // statText += finalResult.archetype ? '&emsp;<span class="no-wrap">Archetype: ' + finalResult.archetype + '</span></p>': '</p>';
      let statText = '<p>' + finalResult.type + '/' + finalResult.attribute + '/LV '+ finalResult.lv +'/ATK ' + finalResult.atk + '/DEF ' + finalResult.def;

      statText += finalResult.archetype ? '/' + finalResult.archetype.replace(/, /gi, '/') + '</p>': '</p>';
      // statText += finalResult.effect ? '<div class="fusionEffect"> <p>' + finalResult.effect.replace(/\n/g, '<br>') + '</p></div>': '';
      statText += finalResult.effect ? '<p style="text-align:left">' + finalResult.effect.replace(/\n/g, '<br>') + '</p>': '';
      // statText += '<hr>';

      spanResultStat.innerHTML = statText

      createBold.appendChild(createTitle);
      createDiv.appendChild(createBold);
      createDiv.appendChild(spanFusionDetail);
      createDiv.appendChild(spanResultStat);
      fusionResults.appendChild(createDiv);
   }

   divCard = document.getElementById(divResultsId);

   //Create body text
   let text = '<hr><span class="resultOrder">';
   for (i = 2; i < newSequence.length; i += 2) {
      if (i == 2) {
         // text += groundExists ? '<sup><sup><sub><i>(On Field)</i></sub></sup></sup> ' : '';
         text += groundExists ? '<span class="miniText"><i>(On Field)</i></span> ' : '';
         text += '"' + newSequence[i - 2] + '" &rarr; "' + newSequence[i - 1] + '"';
      } else {
         text += ' &rarr; "' + newSequence[i - 1] + '"';
      }
   }
   text += '</span>'

   divCard.innerHTML += text;
}

function highlightResult(card) {

   resetFusionSectionColors();

   card.style.backgroundColor = 'rgb(244, 245, 182)';
   card.scrollIntoView();
}

function resetFusionSectionColors() {
   let allFusionResults = document.getElementsByClassName('resultSequence');

   if (!allFusionResults[0]) {
      return
   }

   for (var i = 0; i < allFusionResults.length; i++) {
      allFusionResults[i].style.backgroundColor = '';
   }
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

   return object;
}

function exampleFusion() {
   //Fill input boxes with a preset combination
   let cardInput = document.getElementsByClassName('cardInput');
   cardInput[0].value = 'Key Mace';
   cardInput[1].value = 'Arlownay';
   cardInput[2].value = 'Feral Imp';
   cardInput[3].value = 'Shadow Specter';
   cardInput[4].value = 'Dancing Elf';
   cardInput[5].value = 'Key Mace #2';

   window.location.hash = '#aei5852tay9w'

   for (var i = 0; i < cardInput.length; i++) {
      checkName(i);
   }

   fuseCards([374, 653, 293, 101, 394, 356]);

}

function randomFusion() {
   //Creates random entries in fusion simulator
   let cardInput = document.getElementsByClassName('cardInput');
   let deciArr = [];

   let hashString = '';
   for (var i = 0; i < cardInput.length; i++) {
      // let random = Math.floor(Math.random() * (683 + 3))
      // if (random == 657) {
      //    //If Summoned Lord Exodia, switch to lower id;
      //    random--;
      // } else if (random > 683) {
      //    //Adds Power Up fusions into randomizer
      //    random += 114;
      // }
      // cardInput[i].value = cardList[random].name;

      let random = Math.floor(Math.random() * fusableCards.length);
      random = fusableCards[random];

      cardInput[i].value = cardList[random].name;

      hashString += random < 36 ? '0' + random.toString(36) : random.toString(36); //Convert random id to base 36; add leading 0 if result is below 2 characters.
      deciArr.push(random)

      checkName(i);
   }

   window.location.hash = hashString;

   fuseCards(deciArr);
}

function resetFusionInputs() {
   //Empties all input boxes in fusion simulator
   let cardInput = document.getElementsByClassName('cardInput');
   let materialStats = document.getElementsByClassName('materialStats');

   for (var i = 0; i < cardInput.length; i++) {
      cardInput[i].value = null;
      materialStats[i].innerHTML = '';

      cardInput[i].style.backgroundColor = ''; //Reset input colors

   }

   document.getElementById('fusionResults').innerHTML = '';
   window.location.hash = '';

}

function checkHash() {
   let hashString = window.location.hash ? window.location.hash.slice(1) : '';

   if (hashString && hashString.length === 12 && hashString.match(/^[a-z0-9]+$/i)) {
      //Hash should be 12 characters converted from base36 to decimal
      // console.log(hashString)
      let cardInput = document.getElementsByClassName('cardInput');

      //let hashArr = [0,0,0,0,0,0]

      for (var i = 0; i < 6; i++) {
         //break off every 2 characters of the string
         let subHash = hashString.substr(i * 2, 2);
         //Convert from base36 to decimal
         subHash = parseInt(subHash, 36);
         //subHash = subHash > 853 ? null : subHash;

         cardInput[i].value = subHash > 853 ? null : cardList[subHash].name;
         // hashArr[i] = subHash;

         checkName(i);
      }

      fuseCards();
      // console.log(hashArr);
   }
}

window.onload = function() {
   if (window.location.hash) {
      checkHash();
   }
};

window.onhashchange = function() {
   if (window.location.hash) {
      checkHash();
   }
}
