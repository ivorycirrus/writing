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
				this._sign = "-1";
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

})(window);