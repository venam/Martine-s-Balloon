function cramerResolution(a,b,c,d,e,f) {
	/*
	 * ax+by = e
	 * cx+dy = f
	 */
	var determinant = a*d - b*c;
	var x = (e*d - b*f)/determinant;
	var y = (a*f - e*c)/determinant;
	return {
		x: x,
		y: y
	};
}

function linearEquation(x,a,b) {
	return (a*x+b);
}

function randInt(start, end) {
	return Math.floor(Math.random()*(end-start)+start);
}

function B1(t) { return t*t*t }
function B2(t) { return 3*t*t*(1-t) }
function B3(t) { return 3*t*(1-t)*(1-t) }
function B4(t) { return (1-t)*(1-t)*(1-t) }

/* Example of usage:
	var data = [];
	var C1 = {x: 280,y: 66}; //start
	var C2 = {x: 170,y: 75}; //control
	var C3 = {x: 155,y: 100}; //control2
	var C4 = {x: 160,y: 150}; //end

	for (var i =0; i< 20; i++) {
		var pos = getBezier(i/20.0, C1, C2, C3, C4);
		data.push(
			{x: pos.x,  y: pos.y, w:4}
		);
	}
	data = data.reverse();
*/
function getBezier(percent,C1,C2,C3,C4) {
	var pos = {};
	pos.x = C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent);
	pos.y = C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent);
	return pos;
}

