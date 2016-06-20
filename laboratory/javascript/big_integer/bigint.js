(function(scope){
	// Constructor
	scope.BigInt = function(obj){
		// Constants
		var REGEXP_FLOAT = /^-?\d+\.?\d*$/;
		var REGEXP_INT = /^-?\d+$/;

		// Private member variables
		var _sign = 1;
		var _value = '0';
	};

	// toString
	// @return (String) value of bignumber string with sign
	scope.BigInt.prototype.toString = function() {
		return this._sign<0?('-'+this._value):this._value;
	};

	// Getter
	scope.BigInt.prototype.get = function(type) {
		if(type === 'sign') return this._sign;
		else if (type === 'value') return this._sign;
		else return { sign : this._sign, value : this._value };
	};

	// Setter
	// @param  (String/Number/BigInt)inputValue : big integer strings
	// @return (Boolean) success to parse the input values.
	scope.BigInt.prototype.set = function(inputValue) {
		if(typeof inputValue === "number") {
			if(inputValue < 0) {
				this._sign = -1;
				this._value = ''+(-1*inputValue);
			} else {
				this._sign = 1;
				this._value = ''+(inputValue);
			}
			return true;
		} else if (typeof inputValue === "string") {
			var trimedValue = inputValue.trim();
			if(trimedValue.length === 0) {
				throw "[EmptyParameterException] empty value.";
				return false;
			} else if (this.REGEXP_INT.test(trimedValue)){
				// TODO : parse numbers
				var signedArr = trimedValue.split('-');
				if(signedArr.length === 1) {
					this._sign == 1;
					this._value = signedArr[0];
					return true;
				} else if(signedArr.length === 2) {
					this._sign == -1;
					this._value = signedArr[1];
					return true;
				} else {
					throw "[NumberFormatException] cannot parse to big integer.";
					return false;
				}
			} else {
				throw "[NumberFormatException] cannot parse to big integer.";
				return false;
			}
		} else if(inputValue instanceof BigInt) {
			this._sign = inputValue.get('sign');
			this._value = inputValue.get('value');
			return true;
		} else {
			throw "[InvalidArgumentException] cannot parse the parameters.";
			return false;
		}
	};

	//Compare
	scope.BigInt.prototype.compare(val1, val2) {

		return true;
	}

	//Add
	scope.BigInt.prototype.add(addValue) {

		
	}
})(window);