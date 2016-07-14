function findPrimeNumber(){
	var resultPanel = document.getElementById('result');
	var primeNumberList = [];
	var result;
	for(var n = 2 ; n < 100 ; n++){
		var isPrime = true;
		var searchEnd = Math.sqrt(n);
		for(var i = 0 ; i < primeNumberList.length ; i++) {
			if(primeNumberList[i]>searchEnd) break;
			if(n%primeNumberList[i] == 0) {
				isPrime = false;
				break;
			}
		}

		if(isPrime) {
			primeNumberList.push(n);
			//console.log(n);
		}
	}

	console.log(primeNumberList);
};

/*
if n > 1 ; x > 0
sqrt(10^2n+x) = (10^n) * sqrt(x)

*/