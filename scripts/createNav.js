function createNav(){
   var nav = document.getElementsByTagName('nav')[0];

   // nav.innerHTML = "<nav><a href='.'>Fusion Simulator</a> &emsp; <a href='fusion_list'>Fusion List</a> &emsp; <a href='forward_fusion'>Forward Fusing</a> &emsp; <a href='naming_simulator'>Naming/Starter Deck Simulator</a> &emsp; <a href='deck_builder'>Deck Builder</a></nav>"

   var fusionText = '<h2>Fusion</h2>';
   fusionText += '<a href="."><span class="navLink">Fusion Simulator</span></a>';
   fusionText += '<a href="fusion_list"><span class="navLink">Fusion List</span></a>';
   fusionText += '<a href="forward_fusion"><span class="navLink">Forward Fusing</span></a>';

   var deckText = '<h2>Deck</h2>';
   deckText += '<a href="deck_builder"><span class="navLink">Deck Builder</span></a>';
   deckText += '<a href="naming_simulator"><span class="navLink">Naming/Starter Deck Simulator</span></a>';
   deckText += '<a href="reincarnation_calculator"><span class="navLink">Reincarnation Drop Rates</span></a>';

   var otherText = '<h2>Other</h2>';
   otherText += '<a href="about"><span class="navLink">About DotR Fusion Simulator</span></a>';



   nav.innerHTML = '<div id="displayMenu" onclick="displayMenu()"><div class="hamMenu"></div><div class="hamMenu"></div><div class="hamMenu"></div></div><div id="navMenu"><div id="hideBlock" onclick="displayMenu()"></div><div id="navBlock"><h1>MENU</h1>'+ fusionText + deckText + otherText + '</div></div>';
   // nav.setAttribute('onclick', 'this.style.display = "none"')
}

function displayMenu(){
   let navMenu = document.getElementById("navMenu");

   if(navMenu.className){
      navMenu.classList.remove('showMenu');
   } else {
      navMenu.className = 'showMenu';
   }
}
