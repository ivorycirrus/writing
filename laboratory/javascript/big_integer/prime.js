function findPrimeNumber(_finish){
	var START = new BigInt(2), FINISH = new BigInt(_finish);

	var primeNumberList = [];
	var result;

	for(var n = START ; n.compare(FINISH) < 0 ; n = n.add(new BigInt(1))){
		var isPrime = true;
		var searchEnd = n.sqrt();
		for(var i = 0 ; i < primeNumberList.length ; i++) {
			if(primeNumberList[i].compare(searchEnd) > 0) break;
			
			var remain = n.divide(primeNumberList[i])[1];
			if(remain.compare(new BigInt(0)) == 0) {
				isPrime = false;
				break;
			}
		}

		if(isPrime) {
			primeNumberList.push(n);
		}
	}

	return primeNumberList;
};