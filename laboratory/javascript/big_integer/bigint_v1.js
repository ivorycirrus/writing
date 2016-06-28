(function(scope){
	// Constructor
	scope.BigInt = function(obj){
		// Constants
		//var REGEXP_FLOAT = /^-?\d+\.?\d*$/;
		this.REGEXP_INT = /^[-,+]?\d+$/;

		// Type Check & value set
		if(obj === undefined)
		{
			this._sign = 1;
			this._arrBigInt = ['0'];
		} else if(obj instanceof scope.BigInt) {
			this._sign = obj._sign;
			this._arrBigInt = obj._arrBigInt;
		} else if(typeof obj === "number"){
			if(obj < 0) {
				this._sign = -1;
				this._arrBigInt = (""+(-1*obj)).split("").reverse();
			} else {
				this._sign = 1;
				this._arrBigInt = (""+obj).split("").reverse();
			}
		} else if(typeof obj === "string" && this.REGEXP_INT.test(obj)){
			this._arrBigInt = obj.split("");
			if(/^[+,-]$/.test(this._arrBigInt[0])) this._sign = parseInt(this._arrBigInt.shift() + "1");
			else this._sign = 1;
			
			this._arrBigInt.reverse();
			while(this._arrBigInt[this._arrBigInt.length-1] === '0') this._arrBigInt.pop();
		} else {
			throw ("IllegalArgumentException : "+obj);
			return;
		}
	};

	// toString
	// @return (String) value of bignumber string with sign
	scope.BigInt.prototype.toString = function() {
		var str = this._arrBigInt.reverse().join("");
		return this._sign<0?('-'+str):str;
	};

	// compare
	// @param (BigInt) x 
	// @return (Integer) -1 : this is smaller than x, 0 : same , 1 : x is larger thxn x
	scope.BigInt.prototype.compare = function(x) {
		if( !(x instanceof scope.BigInt)) {
			throw "IllegalArgumentException";
			return;
		}

		// sign differ
		if(this._sign*x._sign < 0) return this._sign;

		// sign same, length differ
		if(this._arrBigInt.length > x._arrBigInt.length) return 1;
		else if(this._arrBigInt.length < x._arrBigInt.length) return -1;

		// sign same, length same
		var absDiffer = 0;
		for(var inx = 0 ; inx < this._arrBigInt.length ; inx++){
			if(this._arrBigInt[inx] != x._arrBigInt[inx]) {
				if(this._arrBigInt[inx] > x._arrBigInt[inx]) absDiffer = 1; 
				else absDiffer = -1;
				break;
			}	
		}

		// large absolute value is small number if sign is negative
		return this._sign*absDiffer;
	};

	// add
	// @param (BigInt) x 
	// @return (BigInt) sum value;
	scope.BigInt.prototype.add = function(x) {
		//substract when signs are diffrent.
		if(this._sign*x._sign < 0) {
			var copyOfX = new scope.BigInt(x);
			copyOfX._sign *= -1;
			return this.sub(copyOfX);
		}

		//for same sign, choose base number which has large absolute number
		var base, addee, sum, overflow;
		if( (this.compare(x) > 0) * this._sign > 0) {
			base = this; addee = x;
		} else {
			base = x ; addee = this;
		}

		//calculate sum and overflow of each digits.
		var result = new BigInt(base._sign);
		result._arrBigInt = []; overflow = 0;
		for(var n = 0 ; n < base._arrBigInt.length ; n++) {
			sum = parseInt(base._arrBigInt[n]) + overflow;
			if(n < addee._arrBigInt.length) sum += parseInt(addee._arrBigInt[n]);

			overflow = parseInt(sum/10);
			sum = sum%10;

			result._arrBigInt.push(""+sum);
		}

		//if overflow remains, add magnificient value of result
		if(overflow > 0) result._arrBigInt.push(""+overflow);
		
		return result;
	}

})(window);