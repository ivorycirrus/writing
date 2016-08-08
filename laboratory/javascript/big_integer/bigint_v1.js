(function(scope){
	// Constructor
	scope.BigInt = function(obj){
		// Constants
		var REGEXP_INT = /^[-,+]?\d+$/;

		// Type Check & value set
		if(obj === undefined)
		{
			this._sign = 1;
			this._arrBigInt = ['0'];
		} else if(obj instanceof scope.BigInt) {
			this._sign = obj._sign;
			this._arrBigInt = obj._arrBigInt.slice(0);
		} else if(typeof obj === "number"){
			if(obj < 0) {
				this._sign = -1;
				this._arrBigInt = (""+(-1*obj)).split("").reverse();
			} else {
				this._sign = 1;
				this._arrBigInt = (""+obj).split("").reverse();
			}
		} else if(typeof obj === "string" && REGEXP_INT.test(obj)){
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

	// clone
	// @return (BigInt) deep copy of BigInt
	scope.BigInt.prototype.clone = function() {
		var copyObj = new BigInt();
		copyObj._sign = this._sign;
		copyObj._arrBigInt = this._arrBigInt.slice(0);
		return copyObj;
	};

	// toString
	// @return (String) value of bignumber string with sign
	scope.BigInt.prototype.toString = function() {
		var str = this._arrBigInt.slice(0).reverse().join("");
		return (this._sign<0 && !(this._arrBigInt.length === 1 && this._arrBigInt[0] === '0'))?('-'+str):str;
	};

	// compare
	// @param (BigInt) x 
	// @return (Integer) -1 : this is smaller than x, 0 : same , 1 : this is larger than x
	scope.BigInt.prototype.compare = function(x) {
		if( !(x instanceof scope.BigInt)) {
			throw "IllegalArgumentException";
			return;
		}

		// sign differ
		if(this._sign*x._sign < 0) return this._sign;

		// same sign
		var absDiffer = this.absCompare(x);

		// large absolute value is small number if sign is negative
		return this._sign*absDiffer;
	};

	// absCompare : compare absolute value
	// @param (BigInt) x 
	// @return (Integer) -1 : this is smaller than x, 0 : same , 1 : this is larger than x
	scope.BigInt.prototype.absCompare = function(x) {
		// length differ
		if(this._arrBigInt.length > x._arrBigInt.length) return 1;
		else if(this._arrBigInt.length < x._arrBigInt.length) return -1;

		// length same
		var absDiffer = 0;
		for(var inx = this._arrBigInt.length-1 ; inx >= 0  ; inx--){
			if(this._arrBigInt[inx] != x._arrBigInt[inx]) {
				if(this._arrBigInt[inx] > x._arrBigInt[inx]) absDiffer = 1; 
				else absDiffer = -1;
				break;
			}	
		}

		return absDiffer;
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
	};

	// sub
	// @param (BigInt) x 
	// @return (BigInt) substract value;
	scope.BigInt.prototype.sub = function(x) {
		//add when signs are diffrent.
		if(this._sign*x._sign < 0) {
			var copyOfX = new scope.BigInt(x);
			copyOfX._sign *= -1;
			return this.add(copyOfX);
		}

		//for same sign, choose base number which has large absolute number
		var base, subee, sub, underflow, result;
		if( (this.compare(x) > 0) * this._sign > 0) {
			base = this; subee = x;
			result = new BigInt(base._sign);
		} else {
			base = x ; subee = this;
			result = new BigInt(base._sign*-1);
		}

		//calculate substract and underlfow
		result._arrBigInt = []; underflow = 0;
		for(var n = 0 ; n < base._arrBigInt.length ; n++) {
			sub = parseInt(base._arrBigInt[n]) + underflow;
			if(n < subee._arrBigInt.length) sub -= parseInt(subee._arrBigInt[n]);
			if(sub < 0){
				underflow = -1;
				sub += 10;
			} else {
				underflow = 0;
			}
			result._arrBigInt.push(""+sub);
		}

		//remove zero headings
		while(result._arrBigInt.length > 1 && result._arrBigInt[result._arrBigInt.length-1] === '0') {
			result._arrBigInt.pop();
		}

		return result;
	};

	// multiply
	// @param (BigInt) x 
	// @return (BigInt) x-times value;
	scope.BigInt.prototype.multiply = function(x) {
		var base, multiplier, result, temp, overflow, lineArr; 

		// choose base number which has long digits
		if( this._arrBigInt.length > x._arrBigInt.length) {
			base = this; multiplier = x;
		} else {
			base = x ; multiplier = this;
		}

		// init result variables
		result = new BigInt(0);
		result._sign = this._sign*x._sign;

		// calculate multiply
		for(var n = 0 ; n < multiplier._arrBigInt.length ; n++) {
			var multiplyValue = parseInt(multiplier._arrBigInt[n]); 

			if(multiplyValue == 0) {
				// someone * 0 = 0
				continue;
			} else if(multiplyValue == 1) {
				// someone * 1 = someone
				lineArr = base._arrBigInt.slice(0);
			} else {
				// multiply base by each digit of multiplier
				overflow = 0; temp = 0; lineArr = [];
				for(var d = 0 ; d < base._arrBigInt.length ; d++) {
					temp = (parseInt(base._arrBigInt[d]) * multiplyValue) + overflow;
					overflow = parseInt(temp/10);
					lineArr.push(""+temp%10);
				}
				if(overflow > 0) lineArr.push(""+overflow);
			}

			// 0 padding for shifting digits
			for(var digit = 0 ; digit < n ; digit++) {
				lineArr.unshift("0");
			}

			// sum multiply value
			var lineValue = new BigInt(result._sign);
			lineValue._arrBigInt = lineArr;
			result = result.add(lineValue);
		}

		return result;
	};

	// divide
	// @param (BigInt) x 
	// @return (Array[BigInt,BigInt]) quotient, renains;
	scope.BigInt.prototype.divide = function(x) {
		// prevent devide by 0
		if(x._arrBigInt.length == 1 && x._arrBigInt[0] == "0") {
			throw "DivideByZeroException";
			return;
		}

		// absolute value of divosor is greater or equal than dividend
		var compareWithDivisor = this.absCompare(x); 
		if(compareWithDivisor < 0) {
			return [
				new BigInt(0), // quotient
				this.clone()   // remains
			];
		} else if(compareWithDivisor == 0) {
			return [
				new BigInt(1), // quotient
				new BigInt(0)  // remains
			];
		}

		var tmpQuotient;
		var tmpDividend = new BigInt(0); tmpDividend._arrBigInt = [];
		var quotient = new BigInt(0), dividend = this.clone();
		for(var offset = this._arrBigInt.length - x._arrBigInt.length ; offset >= 0 ; offset--) {
			tmpDividend._arrBigInt = dividend._arrBigInt.splice(offset).concat(tmpDividend._arrBigInt);

			//remove zero headings for dividend
			removeZeroHeadings(tmpDividend)

			var tmpCompare = tmpDividend.absCompare(x);
			if(tmpCompare < 0) {
				tmpQuotient = 0;
			} else if( tmpCompare == 0 ) {
				tmpQuotient = 1;
				tmpDividend = new BigInt(0);
			} else {
				tmpQuotient = 1;
				while(tmpQuotient < 10) {
					var lineCheck = x.multiply(new BigInt(tmpQuotient+1)).compare(tmpDividend);
					if(lineCheck > 0) {
						tmpDividend = tmpDividend.sub(x.multiply(new BigInt(tmpQuotient)));
						break;
					} else if(lineCheck == 0) {
						tmpQuotient++;
						tmpDividend = new BigInt(0);
						break;
					}
					tmpQuotient++;
				}
			}

			//removeZeroHeadings(quotient);
			quotient._arrBigInt.unshift(""+tmpQuotient);
			removeZeroHeadings(quotient);
		}

		//remove zero headings for quotient
		removeZeroHeadings(quotient);

		tmpDividend._arrBigInt = tmpDividend._arrBigInt.concat(dividend._arrBigInt.splice(0));
		var remains = removeZeroHeadings(tmpDividend).clone();

		return [quotient, remains];
	};

	// Find square root in approximately 10 digits
	// @param (void)
	// @return (BigInt) square root of this
	scope.BigInt.prototype.sqrt = function() {
		if(this._sign < 0) return undefined;
		else if(this.compare(new BigInt(100)) < 0) return new BigInt(Math.ceil(Math.sqrt(this.toString())));
		else {
			var _n = parseInt( (this._arrBigInt.length+1) / 2 ) - 1;
			var _2n = _n*2;
			var _x = (this._arrBigInt.slice(_2n).reverse().join(''))+"."+(this._arrBigInt.slice((_2n>10)?(_2n-10):0,_2n).reverse().join(''));

			var sqrtX = (Math.sqrt(parseFloat(_x))+1).toString().split('.');
			var result = [sqrtX[0]];
			var expTerm = (sqrtX[1])?sqrtX[1].split(''):'';
			for(var inx = 0 ; inx < _n ; inx++){
				if(inx < expTerm.length) {
					if(inx==(expTerm.length-1)){
						result.push(parseInt(expTerm[inx])+1);
					} else {
						result.push(expTerm[inx]);
					}
				} else {
					result.push("0");
				}
			}

			return new BigInt(result.join(''));
		}
	};

	// remove zero headings for BigInt
	/*private*/ function removeZeroHeadings(bi) {
		if( !(bi instanceof scope.BigInt)) {
			throw "IllegalArgumentException";
			return;
		}

		while(bi._arrBigInt.length > 1 && bi._arrBigInt[bi._arrBigInt.length-1] === '0') {
			bi._arrBigInt.pop();
		}

		return bi;
	};

})(window);