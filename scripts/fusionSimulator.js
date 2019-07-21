var abcList = [];

function scrollToTop() {
   document.getElementById('myBtn').style.visibility = 'hidden';
   scrolled = false;
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;

   if (window.location.href.includes('fusionSimulator.html')) {
      resetFusionSectionColors();
   }
}

function fuseBase36(){
   //Converting Cards into base36 to add to # on window url

   let cardInput = document.getElementsByClassName('cardInput');
   let errorSection = document.getElementById('errorSection');
   let fusionResults = document.getElementById('fusionResults');
   let jumpToSection = document.getElementById('jumpToSection');

   let errorMessage;
   let countBlanks = 0;

   let hashString = [];
   let hashResult = '';

   //Empties out sections
   errorSection.innerHTML = '';
   fusionResults.innerHTML = '';
   jumpToSection.innerHTML = '';

   for (var i = 0; i < cardInput.length; i++) {
      if (i == 0) {
         cardInput[i].style.backgroundColor = 'lightblue'; //Reset Ground Color
      } else {
         cardInput[i].style.backgroundColor = '#f1f1f1'; //Reset all other input colors
      }

      let temp = cardInput[i].value.toLowerCase();

      //Find if card exists
      if (cardNamelist.includes(temp)) {
         //if exists, convert card id into base36
         let deciNum = cardNamelist.indexOf(temp);
         hashString[i] = deciNum;
      } else if(!temp){
         //if blank, then assign non-existent card id to leave input blank
         hashString[i] = 854;
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
         return
      }

   }

   // console.log(hashString);

   for (i = 0; i < 6; i++) {
      hashString[i] = hashString[i].toString(36);

      //Add a leading 0 so there's at least 2 characters for the algorithm
      while (hashString[i].length < 2) {
         hashString[i] = '0' + hashString[i]
      }

      hashResult += hashString[i];
   }

   // console.log(hashString);
   // console.log(hashResult);

   window.location.hash = hashResult;
   location.reload();
}

function fuseCards() {

   let comboOrder = [
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

   let comboGroundOrder = [
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

   let cardSelected = [];
   let groundCards = [];
   let handCards = [];

   let selectClass = document.getElementsByClassName('cardInput');
   let errorSection = document.getElementById('errorSection');
   let fusionResults = document.getElementById('fusionResults');
   let jumpToSection = document.getElementById('jumpToSection');

   let errorCheck = false;
   let errorMessages = [];
   let groundExists = false;

   errorSection.innerHTML = '';
   fusionResults.innerHTML = '';
   jumpToSection.innerHTML = '';


   //Convert class values into card id# and check for any spelling errors
   for (var i = 0; i < selectClass.length; i++) {
      if (i == 0) {
         selectClass[i].style.backgroundColor = 'lightblue';
      } else {
         selectClass[i].style.backgroundColor = '#f1f1f1';
      }

      let temp = selectClass[i].value.toLowerCase();
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
         selectClass[i].style.backgroundColor = 'lightcoral';
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
      // alert(errorMessages);
      return;
   }

   //Check if 'Card on Field' has value inside and then seperate it into 2 seperate lists
   if (selectClass[0].value) {
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

            if (!allResults.includes(cardList[trial.resultCard].name)) {
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
         //element = element.

         // jumpToSection.innerHTML += '&emsp; <a href="#' + jumpToLink + '" onclick=" highlightResult(' + jumpToLink + ')">' + element + '</a>'
         jumpToSection.innerHTML += '&emsp; <a onclick=" highlightResult(' + jumpToLink + ')">' + element + '</a>'
      })
   }


}

function createCardResults(groundExists, newSequence, finalResult, numberOrder) {
   let fusionResults = document.getElementById('fusionResults');

   for (var i = 0; i < newSequence.length; i++) {
      //Change Id into card name
      newSequence[i] = cardList[newSequence[i]].name;
   }

   finalResult = cardList[finalResult]

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
      spanResultStat.innerHTML = '<br>Type: ' + finalResult.type + '&emsp;Attribute: ' + finalResult.attribute + '&emsp;ATK/DEF:' + finalResult.atk + '/' + finalResult.def;

      spanResultStat.innerHTML += finalResult.extra ? '&emsp;Archetype: ' + finalResult.extra.split(',') : '';
      spanResultStat.innerHTML += finalResult.effect ? '<br><br>' + finalResult.effect.replace(/\n/g, '<br>') : '';
      spanResultStat.innerHTML += '<br><br><hr style="width: 60%">'

      createBold.appendChild(createTitle);
      createDiv.appendChild(createBold);
      createDiv.appendChild(spanFusionDetail);
      createDiv.appendChild(spanResultStat);
      fusionResults.appendChild(createDiv);
   }

   divCard = document.getElementById(divResultsId);

   //Create body text
   let text = '<span class="resultOrder">';
   for (i = 2; i < newSequence.length; i = i + 2) {
      if (i == 2) {
         text += groundExists ? '<sup><sup><sub><i>On Field</i></sub></sup></sup> ' : '';
         text += newSequence[i - 2] + ' &rarr; ' + newSequence[i - 1];
      } else {
         text += ' &rarr; ' + newSequence[i - 1];
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

   let fusionCardIds = Object.keys(fusionCombos);
   object.sequence = [];
   let isFusable = false;

   for (var i = 0; i < order.length - 1; i++) {
      //Card A = first card in sequence. Otherwise, it equals the result of the previous card
      let cardA = i > 0 ? object.resultCard : order[i];
      let cardB = order[i + 1];

      let optionA = cardA + ',' + cardB;
      let optionB = cardB + ',' + cardA;

      for (var j = 0; j < fusionCardIds.length; j++) {
         let fusionCard = fusionCombos[fusionCardIds[j]]

         //Checks if combo exist in any fusion card
         if (fusionCard.combo.includes(optionA) || fusionCard.combo.includes(optionB)) {
            object.resultCard = fusionCard.id;

            if (object.sequence < 1) {
               //adds very first card to sequence
               object.sequence.push(cardA);
            }
            object.sequence.push(cardB, object.resultCard);
            isFusable = true;
            break;
         }
      }

      if (!isFusable) {
         //stop fusion altogether. This order doesn't work.
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

   fuseBase36();

}

function resetFusionInputs() {
   //Empties all input boxes in fusion simulator
   let cardInput = document.getElementsByClassName('cardInput');
   for (var i = 0; i < cardInput.length; i++) {
      cardInput[i].value = null;
   }
}

function randomFusion() {
   //Creates random entries in fusion simulator
   let cardInput = document.getElementsByClassName('cardInput');
   for (var i = 0; i < cardInput.length; i++) {
      let random = Math.floor(Math.random() * (683 + 3))
      if (random == 657) {
         random--;
      } else if (random > 683) {
         random += 114;
      }
      cardInput[i].value = cardList[random].name;
   }

   fuseBase36();
}

function checkHash(){
   let hashString = window.location.hash ? window.location.hash.slice(1) : '';

   if (hashString && hashString.length === 12 && hashString.match(/^[a-z0-9]+$/i)) {
      //Hash should be 12 characters converted from base36 to decimal
      // console.log(hashString)
      let cardInput = document.getElementsByClassName('cardInput');

      let hashArr = [0,0,0,0,0,0]

      for (var i = 0; i < 6; i++) {
         //break off every 2 characters of the string
         let subHash = hashString.substr(i * 2, 2);
         //Convert from base36 to decimal
         subHash = parseInt(subHash, 36);
         //subHash = subHash > 853 ? null : subHash;

         cardInput[i].value = subHash > 853 ? null : cardList[subHash].name;
         // hashArr[i] = subHash;

         fuseCards();
      }

      // console.log(hashArr);
   }
}

window.onload = function() {
  checkHash();
};

window.onhashchange = function() {
   //checkHash();
}
