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

	// Getter
	scope.BigInt.prototype.get = function() {
		return this._sign<0?('-'+this._value):this._value;
	};

	// Setter
	scope.BigInt.prototype.set = function(inputValue) {
		if(typeof inputValue === "number") {
			if(inputValue < 0) {
				this._sign = -1;
				this._value = -1*inputValue;
			} else {
				this._sign = 1;
				this._value = inputValue;
			}
			return true;
		} else if (typeof inputValue === "string") {
			var trimedValue = inputValue.trim();
			if(trimedValue.length === 0) {
				return false;
			} else if (this.REGEXP_INT.test(trimedValue)){
				// TODO : parse numbers
			} else {
				return false;
			}
		}
	};
})(window);