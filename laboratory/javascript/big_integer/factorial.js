function facrotials(){
	var result = "\n==[ factorials ]========\n";
	var fac = 1;
	var facBigInt = new BigInt(1);
	for(var inx = 1 ; inx <= 100 ; inx++ ){
		fac *= inx; facBigInt = facBigInt.multiply(new BigInt(inx));
		result += (inx+"!  =>  actual : "+fac+"  / bigint : "+facBigInt.toString()+"\n");
	}

	return result;
}