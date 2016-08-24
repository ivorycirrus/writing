var Test = {};

(function(scope){
	scope.sampleArray = null;	
	scope.createSampleArray = function(_size, _seed){
		scope.sampleArray = [];
		for(var inx = 0 ; inx < _size ; inx++) scope.sampleArray.push(_seed);
	};

	//--------------------------------

	scope.copyPushForIndexCount = function(){
		var _size = scope.sampleArray.length;
		var _arr = [];
		var _start = Date.now();

		for(var inx = 0 ; inx < _size ; inx++) _arr.push(scope.sampleArray[inx]);

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyPushForIn = function(){
		var _arr = [];
		var _start = Date.now();

		for(inx in scope.sampleArray) _arr.push(scope.sampleArray[inx]);

		var _end = Date.now();

		return (_end-_start);
	};

	scope.copyPushArrayForeach = function(){
		var _arr = [];
		var _start = Date.now();

		scope.sampleArray.forEach(function(element){
			_arr.push(element);
		})

		var _end = Date.now();
		return (_end-_start);
	};

	//--------------------------------

	scope.copyPushForIndexCountFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		for(var inx = 0 ; inx < _size ; inx++) _arr.push(scope.sampleArray[inx]);

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyPushForInFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		for(inx in scope.sampleArray) _arr.push(scope.sampleArray[inx]);

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyPushArrayForeachFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		scope.sampleArray.forEach(function(element){
			_arr.push(element);
		})

		var _end = Date.now();
		return (_end-_start);
	};

	//--------------------------------

	scope.copyIndexForIndexCount = function(){
		var _size = scope.sampleArray.length;
		var _arr = [];
		var _start = Date.now();

		for(var inx = 0 ; inx < _size ; inx++) _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyIndexForIn = function(){
		var _arr = [];
		var _start = Date.now();

		for(inx in scope.sampleArray)  _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyIndexArrayForeach = function(){
		var _arr = [];
		var _start = Date.now();

		scope.sampleArray.forEach(function(element, inx){
			 _arr[inx] = element;
		})

		var _end = Date.now();
		return (_end-_start);
	};

	//--------------------------------

	scope.copyIndexForIndexCountFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		for(var inx = 0 ; inx < _size ; inx++) _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyIndexForInFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		for(inx in scope.sampleArray) _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyIndexArrayForeachFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var _start = Date.now();

		scope.sampleArray.forEach(function(element, inx){
			 _arr[inx] = element;
		})

		var _end = Date.now();
		return (_end-_start);
	};

	//--------------------------------

	scope.copyIndexWhileIndexCount = function(){
		var _arr = [];
		var inx = scope.sampleArray.length;
		var _start = Date.now();

		while(--inx) _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyIndexWhileIndexCountFixedInit = function(){
		var _size = scope.sampleArray.length;
		var _arr = new Array(_size);
		var inx = _size;
		var _start = Date.now();

		while(--inx) _arr[inx] = scope.sampleArray[inx];

		var _end = Date.now();
		return (_end-_start);
	};

	//--------------------------------

	scope.copySlice = function(){
		var _arr = [];
		var _start = Date.now();

		_arr = scope.sampleArray.slice();

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copySliceZero = function(){
		var _arr = [];
		var _start = Date.now();

		_arr = scope.sampleArray.slice(0);

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyConcat = function(){
		var _arr = [];
		var _start = Date.now();

		_arr = scope.sampleArray.concat([]);

		var _end = Date.now();
		return (_end-_start);
	};

	scope.copyJSON = function(){
		var _arr = [];
		var _start = Date.now();

		_arr = JSON.parse(JSON.stringify(scope.sampleArray));

		var _end = Date.now();
		return (_end-_start);
	};
})(Test);


function startTest(){
	var arraySize = 1000000,
	    arrayValue = 0,
	    samplingCount = 10;

	var TestSet = {
		"copyPushForIndexCount" : 0,
		"copyPushForIn" : 0,
		"copyPushArrayForeach" : 0,

		"copyPushForIndexCountFixedInit" : 0,
		"copyPushForInFixedInit" : 0,
		"copyPushArrayForeachFixedInit" : 0,

		"copyIndexForIndexCount" : 0,
		"copyIndexForIn" : 0,
		"copyIndexArrayForeach" : 0,

		"copyIndexForIndexCountFixedInit" : 0,
		"copyIndexForInFixedInit" : 0,
		"copyIndexArrayForeachFixedInit" : 0,

		"copyIndexWhileIndexCount" : 0,
		"copyIndexWhileIndexCountFixedInit" : 0,

		"copySlice" : 0,
		"copySliceZero" : 0,
		"copyConcat" : 0,
		"copyJSON" : 0
	};

	Test.createSampleArray(arraySize, arrayValue);

	console.log("========================================================");
	console.log("Copying array - size : "+arraySize+" / sampling count : "+samplingCount);
	console.log("--------------------------------------------------------");

	for(TestName in TestSet){
		for(var inx = 0 ; inx < samplingCount ; inx++) {
			TestSet[TestName] += Test[TestName]();  
		}

		TestSet[TestName] /= samplingCount;
		console.log(TestName + " : " + TestSet[TestName] + "ms")
	}

	console.log("========================================================");
}


startTest();
