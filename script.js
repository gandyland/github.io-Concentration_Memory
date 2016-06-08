var concnetration_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var concnetration_attributes = [];
var concentration_tile_ids = [];
var tiles_flipped = 0;
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
    concnetration_array.concentration_tile_shuffle();
	for(var i = 0; i < concnetration_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="concentrationFlipTile(this,\''+concnetration_array[i]+'\')"></div>';
	}
	document.getElementById('concentration_board').innerHTML = output;
}
function concentrationFlipTile(tile,val){
	if(tile.innerHTML == "" && concnetration_attributes.length < 2){
		tile.style.background = '#000';
		tile.innerHTML =  '<img src="' + val + '.jpg"/>';
		if(concnetration_attributes.length == 0){
			concnetration_attributes.push(val);
			concentration_tile_ids.push(tile.id);
		} else if(concnetration_attributes.length == 1){
			concnetration_attributes.push(val);
			concentration_tile_ids.push(tile.id);
			if(concnetration_attributes[0] == concnetration_attributes[1]){
				tiles_flipped += 2;
				concnetration_attributes = [];
            	concentration_tile_ids = [];
				if(tiles_flipped == concnetration_array.length){
					alert("Congratulations! You Win! Generating new board.");
					document.getElementById('concentration_board').innerHTML = "";
					board();
				}
			} else {
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
