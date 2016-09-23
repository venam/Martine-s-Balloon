function WeightedRand(spec) {
  var i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}
//how-to:
//WeightedRand({0:0.8, 1:0.1, 2:0.1}); // random in distribution...

function specialRand(min, max) {
	return Math.floor(Math.random()*(max-min) +min); 
}

