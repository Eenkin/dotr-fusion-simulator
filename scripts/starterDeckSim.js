const charIndex = '  ,   ABCDEFGHIJKLMNOPQRSTUVWXYZ []abcdefghijklmnopqrstuvwxyz()1234567890!"#$%&\'=^-¥./_'; //a relative index of characters based off of the game's hex code assignment and their mod 16 positions
const problemChar = ' "¥'; //These characters cannot be loaded in url
const substChar = '+~*' //Replace problem characters with ones that can be accepted;

const valueArray = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]; //max length of characters is 12, if name is below 12, then empty spaces are filled with 14 for final calculation


const starterDeckSets = [
   "Fairy King Truesdale, Patrician of Darkness, Twin-Headed Behemoth",
   "Serpentine Princess, Birdface, King Tiger Wanghu",
   "Luminous Soldier, Kryuel, Tactical Warrior",
   "Maiden of the Aqua, Airknight Parshath, King Tiger Wanghu",
   "Robotic Knight, Fairy King Truesdale, The Illusory Gentleman",
   "Serpentine Princess, Airknight Parshath, King Tiger Wanghu",
   "Maiden of the Aqua, Birdface, Wolf Axwielder",
   "Luminous Soldier, Patrician of Darkness, Tactical Warrior",
   "Fairy King Truesdale, Kryuel, Twin-Headed Behemoth",
   "Serpentine Princess, Patrician of Darkness, King Tiger Wanghu",
   "Luminous Soldier, Birdface, Tactical Warrior",
   "Maiden of the Aqua, The Illusory Gentleman, Wolf Axwielder",
   "Airknight Parshath, Maiden of the Aqua, Molten Behemoth",
   "Thunder Nyan Nyan, Serpentine Princess, Luminous Soldier",
   "Fairy King Truesdale, Thunder Nyan Nyan, Tactical Warrior",
   "Kryuel, Injection Fairy Lily, Twin-Headed Behemoth"
];


// const starterDeckSets = [
//    [670, 132, 34],
//    [458, 291, 266],
//    [136, 365, 152],
//    [612, 392, 266],
//    [510, 670, 86],
//    [458, 392, 266],
//    [612, 291, 223],
//    [136, 132, 152],
//    [670, 365, 34],
//    [458, 132, 266],
//    [136, 291, 152],
//    [612, 86, 223],
//    [392, 612, 622],
//    [539, 458, 136],
//    [670, 539, 152],
//    [365, 95, 34]
// ];

function mod(str) {
   let index = charIndex.indexOf(str); //find index of the character
   index = index % 16; //Divide value by 16 and get its remainder

   return index;
}

function nameConversion(name) {
   let resultArray = [...valueArray];
   let finalValue = 0;
   let deck = [];
   let text = '';

   for (var i = 0; i < name.length; i++) {
      //Replace each array index with each character's value (all remaining spaces should be left at 14)
      resultArray[i] = mod(name[i]);
   }

   for (var i = 0; i < resultArray.length; i++) {
      finalValue += resultArray[i]; //Add each index
   }

   finalValue = finalValue % 16;

   deck = [...starterDeckSets[finalValue]];

   for (var i = 0; i < deck.length; i++) {
      // deck[i] = cardList[deck[i]].name;

      // text += i == 2 ? deck[i] : deck[i] + ', ';
   }

   let result = starterDeckSets[finalValue];

   result = result.split(',');


   for (var i = 0; i < result.length; i++) {
      let replaceSpaces = result[i].trim().replace(/ /gi, '_');
      let leader = result[i];

      // if (i > 0) {
      //    result[i] = ' ';
      //    replaceSpaces
      // }

      result[i] = i > 0 ? ' ' : '';
      result[i] += '<a class="link" href="deck_builder#' + replaceSpaces + '">' + leader + '</a>';
   }


   text = result;

   // text = starterDeckSets[finalValue];

   return text; //Take final result to find find which starter deck set you will get
}

function checkName() {
   let nameInput = document.getElementById('nameInput').value;
   let resultSection = document.getElementById('resultSection');

   if (nameInput.length === 0) {
      return;
   }

   resultSection.innerHTML = '';

   if (nameInput.length > 12) {
      nameInput = nameInput.slice(0, 12);
   }

   //Does the character exist in the charIndex?
   for (var i = 0; i < nameInput.length; i++) {
      if (!charIndex.includes(nameInput.charAt(i))) {
         //if not, then error
         resultSection.innerHTML = '<b>An invalid character was used. Please try again.</b>'
         return;
      }
   }


   resultSection.innerHTML = nameConversion(nameInput);
   //window.location.hash = nameInput.match(/^[a-z\d\-_\s]+$/i) ? nameInput : '';
   window.location.hash = nameInput.replace(/ /gi, '+').replace(/"/gi, '~').replace(/¥/gi, '*');

}

function checkHash() {
   let hashString = window.location.hash ? window.location.hash.slice(1) : '';
   let nameInput = document.getElementById('nameInput');

   nameInput.value = hashString.replace(/\+/gi, ' ').replace(/~/gi, '"').replace(/\*/gi, '¥');

   checkName();
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
