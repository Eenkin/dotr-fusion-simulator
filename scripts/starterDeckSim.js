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
   "Maiden of the Aqua, Birdface, Wolf Axewielder",
   "Luminous Soldier, Patrician of Darkness, Tactical Warrior",
   "Fairy King Truesdale, Kryuel, Twin-Headed Behemoth",
   "Serpentine Princess, Patrician of Darkness, King Tiger Wanghu",
   "Luminous Soldier, Birdface, Tactical Warrior",
   "Maiden of the Aqua, The Illusory Gentleman, Wolf Axewielder",
   "Airknight Parshath, Maiden of the Aqua, Molten Behemoth",
   "Thunder Nyan Nyan, Serpentine Princess, Luminous Soldier",
   "Fairy King Truesdale, Thunder Nyan Nyan, Tactical Warrior",
   "Kryuel, Injection Fairy Lily, Twin-Headed Behemoth"
];

function mod(str) {
   let index = charIndex.indexOf(str); //find index of the character
   index = index % 16; //Divide value by 16 and get its remainder

   return index;
}

function nameConversion(name) {
   let resultArray = [...valueArray];

   let finalValue = 0;

   for (var i = 0; i < name.length; i++) {
      //Replace each array index with each character's value (all remaining spaces should be left at 14)
      resultArray[i] = mod(name[i]);
   }

   for (var i = 0; i < resultArray.length; i++) {
      finalValue += resultArray[i]; //Add each index
   }

   finalValue = finalValue % 16;

   return starterDeckSets[finalValue]; //Take final result to find find which starter deck set you will get
}

function checkName(){
   let nameInput = document.getElementById('nameInput').value;
   let resultSection = document.getElementById('resultSection');

   if (nameInput.length === 0) {
      return;
   }

   resultSection.innerHTML = '';

   if (nameInput.length > 12) {
      nameInput = nameInput.slice(0,12);
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

function checkHash(){
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
