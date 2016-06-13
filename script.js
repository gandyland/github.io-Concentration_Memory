"use strict";

var concnetration_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var concnetration_attributes = [];
var concentration_tile_ids = [];
var tiles_flipped = 0;

// This adds a method called `concentration_tile_shuffle` to all arrays. So anytime I have any sort of array, I can call `concentration_tile_shuffle on it`
// That's not really a good thing. In general, it's strongly discouraged to attach anything to the prototype of a built-in Javascript object, like `Array` or `String` or what-have-you
// I'd recommend using a regular function and passing the array into it
Array.prototype.concentration_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function board(){
	tiles_flipped = 0;
	var output = '';
    // All your `concnetration_array`s are misspelled :-)
    concnetration_array.concentration_tile_shuffle();
	for(var i = 0; i < concnetration_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="concentrationFlipTile(this,\''+concnetration_array[i]+'\')"></div>';
	}
	document.getElementById('concentration_board').innerHTML = output;
}
// camelCase vs snake_case is another thing to keep consistent: pick one
function concentrationFlipTile(tile,val){
    // I wouldn't call this variable "_attributes" because they're not HTML attributes
    // It's simply recording the IDs of which cards have been flipped
    // So maybe call it "flipped_ids" or something
	if(tile.innerHTML == "" && concnetration_attributes.length < 2){
		tile.style.background = '#000';
		tile.innerHTML =  '<img src="' + val + '.jpg"/>';
		if(concnetration_attributes.length == 0){
			concnetration_attributes.push(val);
			concentration_tile_ids.push(tile.id);
		}
    else if(concnetration_attributes.length == 1){
			concnetration_attributes.push(val);
			concentration_tile_ids.push(tile.id);
			if(concnetration_attributes[0] == concnetration_attributes[1]){
				tiles_flipped += 2;
				concnetration_attributes = [];
            	concentration_tile_ids = [];
				if(tiles_flipped == concnetration_array.length){
					alert("Congratulations! You Win! Time for a new game.");
					document.getElementById('concentration_board').innerHTML = "";
					board();
				}
			}
      else {
          // Try to avoid declaring a function inside an `if/else` block
				function flipBack(){
				    var tile_1 = document.getElementById(concentration_tile_ids[0]);
				    var tile_2 = document.getElementById(concentration_tile_ids[1]);
				    tile_1.style.background = 'url(card_stock.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(card_stock.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    concnetration_attributes = [];
            	    concentration_tile_ids = [];
				}
				setTimeout(flipBack, 1000);
			}
		}
	}
}
// It would be really nice if your `if`, `else if`, and `else` above all called different functions
// Having one ginormous `if/else` block is pretty hard to read
