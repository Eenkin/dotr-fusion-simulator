var reincarnatableCards = [3, 4, 5, 8, 12, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 38, 39, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 55, 56, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 80, 81, 82, 84, 85, 88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 112, 114, 116, 117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 129, 130, 131, 133, 134, 136, 137, 138, 139, 140, 141, 142, 149, 150, 152, 153, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 188, 191, 192, 193, 194, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 212, 213, 214, 216, 217, 218, 222, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 267, 268, 270, 271, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 285, 286, 287, 288, 289, 290, 292, 293, 295, 296, 297, 298, 299, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 344, 345, 346, 347, 348, 349, 350, 351, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 393, 394, 395, 396, 397, 398, 399, 400, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 418, 419, 420, 421, 423, 424, 425, 426, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 473, 474, 475, 476, 477, 480, 481, 482, 483, 484, 485, 487, 489, 490, 491, 492, 493, 494, 495, 496, 497, 499, 503, 504, 506, 507, 508, 509, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 529, 530, 531, 532, 533, 534, 535, 536, 537, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 613, 614, 615, 616, 617, 618, 619, 620, 621, 623, 624, 625, 626, 627, 628, 630, 631, 633, 634, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 669, 679, 683, 684, 686, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 701, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 716, 717, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 774, 775, 776, 777, 779, 781, 782, 783, 784, 785, 786, 787, 788, 795, 796, 797, 799, 800, 801, 802, 803, 804, 805, 807, 808, 809, 810, 812, 813, 815, 816, 817, 818, 820, 821, 822, 823, 824, 826, 828, 831, 836, 838, 839, 845, 847, 850, 853];

const reincarnationDCMonsterList = {
   "5": [394, 407],
   "6": [416, 513],
   "7": [661],
   "9": [439, 463, 497, 516, 623, 657],
   "10": [102, 191, 297, 355, 574, 628],
   "11": [81, 193, 255, 344, 456, 575, 627, 669],
   "12": [73, 101, 127, 138, 177, 201, 227, 327, 349, 397, 410, 530, 556, 570, 589, 647, 663],
   "13": [26, 237, 243, 329, 543, 587, 614, 642, 643, 651],
   "14": [36, 107, 116, 117, 129, 261, 323, 405, 423, 562, 639, 650],
   "15": [55, 56, 105, 142, 167, 169, 242, 257, 292, 310, 331, 371, 415, 580],
   "16": [62, 97, 98, 106, 175, 204, 240, 276, 278, 296, 332, 426, 440, 586, 593, 602, 617, 679],
   "17": [25, 65, 72, 74, 111, 234, 239, 251, 318, 326, 357, 374, 383, 412, 413, 420, 449, 450, 495, 542, 594, 621, 658],
   "18": [28, 67, 68, 70, 125, 230, 305, 319, 328, 375, 377, 379, 384, 418, 431, 432, 444, 447, 503, 512, 557, 564, 578, 600, 601, 649, 653],
   "19": [21, 40, 48, 66, 88, 122, 176, 322, 333, 336, 372, 378, 411, 442, 457, 545, 547, 569, 571, 615, 616, 652, 654, 659],
   "20": [27, 41, 47, 64, 166, 170, 171, 174, 179, 198, 224, 231, 232, 245, 311, 315, 325, 330, 335, 346, 366, 376, 435, 496, 533, 568, 608, 613, 625, 630, 664],
   "21": [59, 103, 109, 110, 112, 133, 141, 149, 162, 172, 178, 188, 196, 205, 207, 213, 263, 264, 306, 317, 406, 424, 443, 448, 462, 518, 565, 577, 585, 591, 631, 662],
   "22": [32, 38, 139, 140, 161, 182, 185, 209, 241, 244, 254, 270, 277, 286, 307, 308, 369, 382, 404, 430, 461, 470, 509, 537, 541, 559, 560, 561, 572, 637, 665],
   "23": [4, 33, 69, 71, 184, 236, 247, 314, 356, 387, 414, 437, 452, 499, 579, 581, 603, 618, 624, 646],
   "24": [63, 119, 120, 137, 180, 194, 214, 235, 354, 360, 389, 454, 459, 504, 576, 588, 595, 609],
   "25": [163, 168, 173, 206, 246, 288, 320, 324, 334, 380, 395, 451, 453, 511, 523, 540, 554, 558, 582, 597, 606, 634, 636, 638, 644],
   "26": [22, 90, 93, 114, 164, 181, 186, 216, 217, 218, 225, 228, 238, 262, 271, 275, 312, 313, 359, 363, 386, 388, 399, 421, 466, 484, 517, 550, 566, 567, 583, 590, 655, 656],
   "27": [5, 44, 52, 82, 104, 124, 157, 158, 183, 212, 229, 259, 260, 265, 289, 293, 309, 316, 396, 400, 446, 460, 471, 475, 477, 492, 605, 660],
   "28": [8, 80, 92, 121, 131, 281, 290, 295, 304, 350, 373, 390, 434, 438, 468, 490],
   "29": [39, 159, 165, 233, 347, 525, 546, 599, 610, 611, 640],
   "30": [18, 136, 150, 203, 250, 268, 301, 393, 425, 489, 519, 527, 553, 604],
   "31": [37, 49, 89, 91, 96, 156, 202, 274, 302, 321, 391, 482, 535, 548, 555, 645],
   "32": [51, 100, 160, 253, 282, 283, 381, 491, 493, 521, 522, 551, 598, 607],
   "33": [29, 35, 46, 50, 208, 249, 279, 303, 358, 370, 408, 409, 455, 467, 474, 481, 483, 485, 506, 532, 536, 544, 626, 666],
   "34": [123, 134, 256, 298, 361, 441, 465, 473, 480, 507, 584, 619],
   "35": [45, 287, 385, 398, 464, 469, 494, 520, 531],
   "36": [15, 94, 126, 152, 200, 222, 419, 529, 592],
   "37": [85, 252, 258, 351, 362, 364, 515, 549],
   "38": [19, 84, 153, 192, 199, 367, 433, 436, 476, 487, 641, 648],
   "39": [20, 61, 197, 267, 280, 285, 299, 620],
   "40": [130, 345],
   "41": [226, 348, 524, 526],
   "42": [633],
   "43": [3, 368],
   "45": [30],
   "46": [12],
   "47": [508, 514],
   "48": [16, 17],
   "49": [75, 563],
   "51": [99],
   "53": [534],
   "54": [573]
};
const reincarnationDCSpellList = {
   "1": [745, 796],
   "2": [709],
   "5": [703, 710, 744, 787, 797, 799, 800, 807, 820, 821, 822, 826, 831, 836, 838, 839, 845, 847, 850, 853],
   "6": [704],
   "8": [711, 808],
   "10": [698, 705, 734, 735, 737, 738, 739, 740, 741, 742, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 774, 775, 776, 777, 779, 781, 782, 783, 784, 785, 786, 788, 809, 824],
   "15": [712, 716, 795, 804, 813, 828],
   "20": [717, 803, 805, 810, 818],
   "25": [708, 815, 816, 817],
   "30": [689, 690, 691, 692, 693, 694, 695, 696, 706, 736, 743, 801],
   "35": [697, 719, 823],
   "40": [713, 747, 802],
   "50": [683, 684, 686, 701, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 746],
   "60": [688, 707, 812],
   "75": [751],
   "80": [714]
};

const reincarnateFrom = {
   "monsterToMonster": .8,
   "monsterToSpell": .2,
   "spellToMonster": .6,
   "spellToSpell": .4
}

var probabilityTracker = {};

function reincarnateCard() {
   //Add card through input prompt
   card = document.getElementById('cardInput').value
   let temp = card.toLowerCase();

   // resetWarnings();
   if (!isNaN(card)) {
      //card = cardList[parseInt(card)]; //is input a number?
      card = parseInt(card)
      if (card > 853) {
         card = null;
         document.getElementById('cardInput').value = '';
         return;
      }

      document.getElementById('cardInput').value = cardList[card] ? cardList[card].name : document.getElementById('cardInput').value;
   } else if (cardNamelist.includes(temp)) {
      card = cardNamelist.indexOf(temp); //is input a name
   } else if (!card) {
      //is input blank?
   } else {
      card = null;
      // document.getElementById('spellingWarning').style.display = 'block';
      document.getElementById('reincarnationResults').innerHTML = '<b>This card doesn\'t exist. Please check spelling.</b>';
      return;
   }

   // console.log(card);

   if (!card && card !== 0) {
      document.getElementById('reincarnationResults').innerHTML = '<b>Please enter the name or ID# of a card.</b>';
      return;
   }

   if (card !== null) {
      var prob = parseInt(document.getElementById('leaderRankA').value) + parseInt(document.getElementById('leaderRankB').value);
      document.getElementById('cardInput').value = cardList[card].name;
      calculateProbability(card, prob);
      window.location.hash = cardList[card].name.replace(/ /gi, '_') + '?R' + document.getElementById('leaderRankA').value + '?R' + document.getElementById('leaderRankB').value;
   }


}

function findCards(reincarnationList, result, addToList, removal) {

   let checkAgain;
   let carryOver = result;

   do {

      if (reincarnationList[result]) { //does the monste/spell dc reincarnation list (depending which is asked for) contain cards with the reuslt dc

         if (carryOver) {
            probabilityTracker[addToList][carryOver] = reincarnationList[result]; //increases the chance to finde these cards if the original result could not find any cards;
         } else {
            probabilityTracker[addToList][result] = reincarnationList[result]; //if so, add it to the high/low list of the spells/monsters categroy of all of the cards it could contain
         }

         if (probabilityTracker[addToList][carryOver].includes(removal)) {
            //remove the card that's being reincarnated
            probabilityTracker[addToList][carryOver].splice(probabilityTracker[addToList][carryOver].indexOf(removal), 1);
         }

         probabilityTracker[addToList]["total"] = probabilityTracker[addToList]["total"].concat(reincarnationList[result]); //grab pool of cards from the resulted dc and adds it to the probability tracker for the original dc that it was looking for i.e. if it was searching for cards for dc 60, then 60 grabs from the pool 54 dc pool
         checkAgain = false

         if (probabilityTracker[addToList][carryOver].length < 1) {
            //if the list ends up empty due to splicing out the card that is being reincarnated from the list, then reset the loop with 1 lower DC
            checkAgain = true;
            result--;
         } else {
            let tempObj = {};
            for (var i = 0; i < probabilityTracker[addToList][carryOver].length; i++) {
               let tempProp = probabilityTracker[addToList][carryOver][i];
               tempObj[tempProp] = 1 / probabilityTracker[addToList][carryOver].length;
            }

            probabilityTracker[addToList][carryOver] = tempObj;
         }

      } else {
         //if no cards with the result DC is found, search again with 1 less DC
         result--;
         checkAgain = true;
      }

      if (result < 1) {
         //if redult DC reaches to 0 or below, stop checking and default to Fake Trap
         probabilityTracker[addToList][carryOver] = {
            820: 1
         }

         probabilityTracker[addToList]["total"] = probabilityTracker[addToList]["total"].concat([820])
         checkAgain = false;
      }


   } while (checkAgain);
}

function calculateProbability(card, leaderRank) {

   if (!cardList[card].dc) {
      return;
   }

   let baseDC = cardList[card].dc;
   let reincarnationResults = document.getElementById('reincarnationResults');

   reincarnationResults.innerHTML = '';

   let monsterChance = card < 683 ? 0.8 : 0.6;
   let spellChance = 1 - monsterChance;

   // console.log(monsterChance);

   if (baseDC > 99 || baseDC < 1) {
      console.log('Not within the 1-99 range!');
      return;
   }

   reincarnationResults.innerHTML += '<p><b>Reincarnation results for reincarnating "' + cardList[card].name + '".</b></p>'

   leaderRank = leaderRank || 0;

   let highRangeChance = .08 + (.02 * leaderRank);
   let lowRangeChance = .92 - (.02 * leaderRank);

   probabilityTracker.lowMonsters = {};
   probabilityTracker.lowMonsters.total = [];

   probabilityTracker.highMonsters = {};
   probabilityTracker.highMonsters.total = [];

   probabilityTracker.lowSpells = {};
   probabilityTracker.lowSpells.total = [];

   probabilityTracker.highSpells = {};
   probabilityTracker.highSpells.total = [];

   //probabilityTracker.fakeTrapCount = 0;

   for (var i = -1; i < 11; i++) {

      let lowResult = baseDC - i; //Low Range ifrom -10 to +1 DC added
      let highResult = baseDC + i; //HighRange Range from -1 to +10 Dc added

      findCards(reincarnationDCMonsterList, lowResult, "lowMonsters", card);
      findCards(reincarnationDCMonsterList, highResult, "highMonsters", card);
      findCards(reincarnationDCSpellList, lowResult, "lowSpells", card);
      findCards(reincarnationDCSpellList, highResult, "highSpells", card);

   }

   // let tempLoM = Object.keys(probabilityTracker.lowMonsters);
   // let tempHiM = Object.keys(probabilityTracker.highMonsters);
   // let tempLoS = Object.keys(probabilityTracker.lowSpells);
   // let tempHiS = Object.keys(probabilityTracker.highSpells);

   // for (var i = 0; i < 12; i++) {
   //    let tempMath = monsterChance * lowRangeChance / 12
   //
   //    for (card in probabilityTracker.lowMonster[tempLoM[i]]) {
   //       probabilityTracker.lowMonster[tempLoM][card] *= tempMath;
   //    }
   //

   probabilityTracker.percentages = {};

   let tempMath = (monsterChance * lowRangeChance) / 12;
   for (num in probabilityTracker.lowMonsters) {

      if (num == "total") {
         continue;
      }

      for (card in probabilityTracker.lowMonsters[num]) {
         probabilityTracker.lowMonsters[num][card] *= tempMath;
         probabilityTracker.percentages[card] = (probabilityTracker.percentages[card] || 0) + probabilityTracker.lowMonsters[num][card];
      }
   }

   tempMath = (monsterChance * highRangeChance) / 12;
   for (num in probabilityTracker.highMonsters) {

      if (num == "total") {
         continue;
      }

      for (card in probabilityTracker.highMonsters[num]) {
         probabilityTracker.highMonsters[num][card] *= tempMath;
         probabilityTracker.percentages[card] = (probabilityTracker.percentages[card] || 0) + probabilityTracker.highMonsters[num][card];
      }
   }

   tempMath = (spellChance * lowRangeChance) / 12;
   for (num in probabilityTracker.lowSpells) {

      if (num == "total") {
         continue;
      }

      for (card in probabilityTracker.lowSpells[num]) {
         probabilityTracker.lowSpells[num][card] *= tempMath;
         probabilityTracker.percentages[card] = (probabilityTracker.percentages[card] || 0) + probabilityTracker.lowSpells[num][card];
      }
   }

   tempMath = (spellChance * highRangeChance) / 12;
   for (num in probabilityTracker.highSpells) {

      if (num == "total") {
         continue;
      }

      for (card in probabilityTracker.highSpells[num]) {
         probabilityTracker.highSpells[num][card] *= tempMath;
         probabilityTracker.percentages[card] = (probabilityTracker.percentages[card] || 0) + probabilityTracker.highSpells[num][card];
      }
   }

   let add = 0;
   let monsterPercentages = 0;
   let spellPercentages = 0;

   for (num in probabilityTracker.percentages) {
      num = parseInt(num);
      add += probabilityTracker.percentages[num];

      if (num < 683) {
         monsterPercentages += probabilityTracker.percentages[num];
      } else {
         spellPercentages += probabilityTracker.percentages[num];
      }

   }

   // console.log([add, monsterPercentages, spellPercentages]);

   let cardResults = Object.keys(probabilityTracker.percentages);
   cardResults.sort((a, b) => {
      return probabilityTracker.percentages[b] - probabilityTracker.percentages[a]
   })
   //
   //
   // console.log(probabilityTracker);
   //
   var tempText = 'Original DC of the Reincarnating Card: ' + baseDC;
   tempText += '<br>Chance for Monster: ' + Number.parseFloat(monsterPercentages * 100).toFixed(0) + '%&emsp;Chance for Magic/Trap/Ritual: ' + Number.parseFloat(spellPercentages * 100).toFixed(0) + '%';
   tempText += '<br>Deck Leader Rank influence for Higher DC: +' + (.02 * leaderRank * 100) + '%';

   /*for (card of cardResults) {

      card = cardList[parseInt(card)];
      tempText += "<hr><p>";

      tempText += '<span class="percentage">' + Number.parseFloat(probabilityTracker.percentages[card.id] * 100).toFixed(4) + '%</span> '
      tempText += '<br>' + card.name + '<br>';
      tempText += 'ID# ' + card.id + '&emsp;';
      tempText += card.type;
      tempText += card.attribute ? '/' + card.attribute : '';
      tempText += card.dc ? '/DC ' + card.dc : '';
      tempText += card.lv ? '/LV ' + card.lv + '/ATK ' + card.atk + '/DEF ' + card.def : '';

      tempText += card.archetype ? '<br>Archetype(s): ' + card.archetype : '';

      tempText += card.effect ? '<br><br>' + card.effect.replace(/\n/gi, '<br>') : '';

      tempText += '</p>';

   }*/

   reincarnationResults.innerHTML += tempText;
   // console.log(add);

   // console.log(probabilityTracker);

   var table = document.createElement('table');
   var tbody = document.createElement('tbody');

   for (card of cardResults) {

      var trMain = document.createElement('tr');
      var trStat = document.createElement('tr');

      var tdPer = document.createElement('td');
      var tdId = document.createElement('td');
      var tdName = document.createElement('td');
      var tdStat = document.createElement('td');

      var tempText = '';

      card = cardList[parseInt(card)];

      switch (card.type) {
         case 'Magic':
            trMain.className = 'trMagic'
            break;
         case 'Trap':
            trMain.className = 'trTrap'
            break;
         case 'Ritual':
            trMain.className = 'trRitual'
            break;
         default:
            trMain.className = 'trMonster'
      }

      tdPer.innerHTML = Number.parseFloat(probabilityTracker.percentages[card.id] * 100).toFixed(4) + '%';
      tdPer.className = 'percentage';

      tdId.innerHTML = card.id;
      tdId.className = 'thId'
      tdName.innerHTML = card.name;

      tempText += card.type;
      tempText += card.attribute ? '/' + card.attribute : '';
      tempText += card.dc ? '/DC ' + card.dc : '';
      tempText += card.lv ? '/LV ' + card.lv + '/ATK ' + card.atk + '/DEF ' + card.def : '';

      tempText += card.archetype ? '<br>Archetype(s): ' + card.archetype : '';

      tempText += card.effect ? '<p>' + card.effect.replace(/\n/gi, '</p>') : '';

      tdStat.innerHTML = tempText;
      tdStat.colSpan = 3;
      tdStat.style.backgroundColor = '#dadada';

      trMain.appendChild(tdPer);
      trMain.appendChild(tdId);
      trMain.appendChild(tdName);

      trStat.appendChild(tdStat);

      tbody.appendChild(trMain);
      tbody.appendChild(tdStat);

   }

   table.appendChild(tbody);
   reincarnationResults.appendChild(table);


}

function checkHash(){
   let hashString = window.location.hash ? window.location.hash.slice(1).replace(/_/gi, ' ') : ''; //grab the # in url
   var hashSplit = hashString.split('?R')
   document.getElementById('cardInput').value = hashSplit[0];
   document.getElementById('leaderRankA').value = hashSplit[1] || 1;
   document.getElementById('leaderRankB').value = hashSplit[2] || 0;
   reincarnateCard();
}

function windowCheck(){
   if (window.location.hash) {
      checkHash();
   } else{
      document.getElementById('cardInput').value = '';
      document.getElementById('reincarnationResults').innerHTML = '';

   }
}

window.onload = function(){
   windowCheck();
};
//
window.onhashchange =  function(){
   windowCheck()
};
