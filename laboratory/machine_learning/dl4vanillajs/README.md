# Javascript로 Deep-learning 맛보기

요즘 딥러닝 또는 머신러닝을 학습한다고 하면 일단 Python부터 꺼내드는 이가 많이 늘었다. 그리고 Tensorflow든 Keras든 pyTorch든 프레임워크를 사용하면 쉽게 머신러닝 혹은 딥러닝 애플리케이션을 만들 수 있다고 이야기를 이어간다. 사실 대부분의 경우 이런 의견이 옳다는 사실에는 동의한다. 일일히 구현해야 하는 많은 기능들이 미리 준비되어 있어서 원하는 것을 빠르고 쉽게 만들수 있고, 문제가 생기더라도 웹서핑이든 커뮤니티 등을 통해 도움을 얻기도 수월하기 때문이다. 

하지만 이 글의 시작은 '왜 Python이 아니면 안되지?', '꼭 프레임워크를 써야만 하는걸까?' 라는 삐딱한 시각에서 시작했다. 그래서 쉽게 접근할 수 있는 스크립트 언어를 찾았고, 여차하면 웹브라우저 위에서 동작시켜볼 수도 있겟다는 생각에 Javascript를 선택했다. 물론 프레임워크의 도움 없이, 필요한 기능이 있다면 모두 직접 구현해 가면서 언어 기본기능만 가지고 Deep-learning 모델을 작성할 것이다. 그리고 (성능을 보장 할 수는 없지만) 간단한 예제에 대해 모델을 학습하고 평가하는 과정을 소개하고자 한다.


## 1. 시작하며

들어가기 앞서 미리 밝혀두자면, 이 글은 개발가이드 또는 업무적용사례와 같은 거창한 글이 아니다. 그렇다고 해서 [CNN](http://cs231n.github.io/convolutional-networks/)/[RNN](https://towardsdatascience.com/recurrent-neural-networks-and-lstm-4b601dd822a5)이나 등의 제법 유명한 인공신경망을 구현해 보자는 것 또한 아니다. 이 글에서는 먼저 단순한 수준의 [MLP(Multi-Layer Perceptron)](https://skymind.ai/wiki/multilayer-perceptron)를 이용한 모델을 작성하고, 샘플 프로젝트를 통해 훈련 및 평가를 하는 것을 목표로 할 것이다. 비록 아주 거창한 개발동기와 소박한 개발목표로 시작한 작은 프로젝트지만, 스크립트 언어 하나만 가지고 Deep-learning 애플리케이션을 만들어보겟다는 용기와 패기가 가득한 도전기이자 기행문 정도로 가볍게 바라봐 줬으면 좋겠다.

앞으로 작성할 소스코드와 예제코드는 아래 Github 링크에서 볼 수 있다.

* **[dl4vanilla.js](https://github.com/ivorycirrus/dl4vanillajs)** : Javascript로 작성한 행렬연산 및 인공신경망(ANN) 작성 유틸리티
* **[dl4vanilla.js 예제](https://github.com/ivorycirrus/dl4vanillajs-node-example)** : Node.js로 실행 할 수 있는 다층퍼셉트론(MLP) 예제.

## 2. 필요한 도구를 만들자
일반적인 딥러닝 모델은 행렬연산을 통한 결과의 추정과, 이 추정한 결과가 얼마나 오류가 있는지를 가지고 모델의 변수를 업데이트하는 훈련 단계를 포함하고 있다. 모델에서의 입력값은 수치화된 행렬 형태의 데이터로 표현되어야 하며, 여기에 모델에서 가진 행렬형태의 변수와 다양한 연산과정을 거쳐 결과값을 추정한다. 그리고 이 결과 값의 오차를 계산해서, 오차가 줄어드는 방향쪽으로 모델의 변수를 업데이트를 해서 추정한 값의 정확도를 올리는 것을 목표로 한다.

따라서 과정을 구현하기 위해서는 먼저 입력값과 모델 내부의 변수값의 행렬연산을 수행하는 기능이 준비되야 할 것이다. 그리고 행렬 연산이 단순한 일차 선형결합이 되지 않도록 행렬곱 사이에 활성화함수 라는 비선형함수와의 연산을 추가해 줘야 한다. 그리고 행렬연산결과로 나온 추정값의 오차를 계산해서 오차가 줄어드는 방향을 찾아야 하며 이를 위해 수치미분을 담당할 함수가 필요할 것이다. 여기에서는 모델을 구성하기 위해 필요한 요소기능들을 먼저 작성 해 보도록 하겟다.


### 2.1 행렬 연산
인공신경망 가운데 가장 기본적인 [완전연결계층(Fully Connected layer)](https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/fc_layer.html)의 [순전파(Forward Propagation)](https://www.bogotobogo.com/python/scikit-learn/Artificial-Neural-Network-ANN-2-Forward-Propagation.php)는 입력 행렬에 가중치(Weight)에 해당하는 행렬을 곱하고 편차(Bias)에 해당하는 행렬을 더하는 과정을 포함한다. 따라서  행렬의 연산은 기본적으로 행렬의 덧셈과 곱셈을 수행할 수만 있으면 된다.

아래는 다차원 행렬의 덧셈을 구현한 함수이다. 입력받은 행렬이 일차원 행렬인 경우 행렬의 값을 더한 일차원 행렬을 반환하며, 그 이상의 다차원 행렬인 경우 차원을 줄여가며 재귀적으로 행렬합 함수를 호출하고 있다. 따라서 결과적으로는 입력값의 차원이 깊더라도, 또는 입력값이 정방행렬이 아니더라도 입력받은 행렬의 차원이 같다면 성공적으로 행렬합을 구할 수 있는 함수를 구현했다. 물론 입력받은 행렬의 모양이 다르거나, 데이터타입이 다른 경우는 예외를 발생시키도록 처리하고있다.

```javascript
// [[ math/matrix.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/math/matrix.js

/* Matrix addition */
let _matrix_add = function(arr1, arr2){
	if(!Array.isArray(arr1) || !Array.isArray(arr2)) throw "MatrixException : parameters are not array.";
	else if(arr1.length != arr2.length) throw "MatrixException : Size of arrays are different.";
	else if(arr1.length == 0) return null;
	else {
		let result = [];
		for(let i = 0 ; i < arr1.length ; i++) {
			if(Array.isArray(arr1[i])) result[i] = _matrix_add(arr1[i], arr2[i]);
			else result[i] = arr1[i] + arr2[i];
		}
		return result;
	}
};
```

행렬의 곱셈은 2차원 행렬 사이의 곱만을 구할 수 있도록 작성했다. 혹여 3차원 이상의 행렬곱이 필요하다면 [텐서축소(Tensor Contraction)](https://math.stackexchange.com/a/63139)를 적용할 수 있겟으나, 간단한 단일 채널 데이터를 다루는 데에는 2차원 행렬곱 정도면 충분할 것이라 생각한다.

```javascript
// [[ math/matrix.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/math/matrix.js

/* Matrix multiply */
let _matrix_mul = function(arr1, arr2){
	if(!Array.isArray(arr1) || !Array.isArray(arr2)) throw "MatrixException : parameters are not array.";

	const s1 = _matrix_shape(arr1, []);
	const s2 = _matrix_shape(arr2, []);
	if(s1.length != 2 || s2.length != 2) throw "MatrixException : input arrays are not 2d array.";
	else if(s1[1] != s2[0]) throw "MatrixException : array shapes are mismatch.";
	else if(s1[0] == 0 || s2[1] == 0) throw "MatrixException : cannot multiple zseo-size array.";

	const rows = s1[0], cols = s2[1], middle = s1[1];
	let result = [];
	for(let i = 0 ; i < rows ; i++) {
		let row = [];
		for(let j = 0 ; j < cols ; j++) {
			let cell = 0;
			for(let k = 0 ; k < middle ; k++) {
				cell += (arr1[i][k] * arr2[k][j])
			}
			row[j] = cell;
		}
		result[i] = row;
	}

	return result;
};
```

그 외에, 행렬의 각각의 원소값에 대해 연산을 적용할 수 있는 함수도 작성했다. 이는 행렬의 초기값을 지정한다거나, 형렬의 각 값에대한 정규화를 수행하는데에도 유용하게 사용할 수 있을 것이다. 입력값으로는 배열하나와 함수하나를 받고있으며, 첫번째 파라메터로 입력받은 배열의 각각의 원소값을 두번째 파라메터로 입력받은 함수의 파라메터로 사용하여 그 결과값을 다시 배열로 구성하는 역할을 한다.

```javascript
// [[ math/matrix.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/math/matrix.js

/* Evaluate function */
let _eval_mat = function(arr1, func) {
	if(!Array.isArray(arr1)) throw "MatrixException : first parameter is not array.";
	else if(typeof func != `function`) throw "MatrixException : second parameter is not function.";
	else {
		let mapper = x => Array.isArray(x)?x.map(mapper):func(x);
		return arr1.map(mapper);
	}
}
```

그 외에도 전치행렬(Transposed matrix)을 구하거나, 행렬의 형태(Shape)를 구하고 변경하는 함수나, 행렬안의 원소의 최대/최소값을 구하는 함수도 `matrix.js`에 구현되어 있다. 이 함수들은 모델의 당장에 학습과 추정의 핵심적인 구성요소는 아니겟지만, 입력값이나 출력값의 가공에 유용하게 쓸 수 있을 것이라 생각한다.


### 2.2 활성화 함수
인공신경망의 연산은 기본적으로 행렬의 합과 곱으로 이루어진다. 하지만 단순한 행렬의 합과 곱은 연산을 여러번 수행한 다 할지라도 결국에는 단순한 선형변환의 형태로 표현될 수 밖에 없다. 즉 신경망을 여러번 연결해도 효과를 거두기 어렵다는 뜻이다. [활성화함수](https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6)는 행렬의 연산에 비선형성을 추가해서 신경망 사이의 데이터 전달히 선형변환의 형태로 단순화되지 않도록 하는 역할을 해 준다.

대표적인 활성화 함수에는 [Sigmoid](https://en.wikipedia.org/wiki/Sigmoid_function), [ReLU](https://en.wikipedia.org/wiki/Rectifier_(neural_networks)), [tanh](https://en.wikipedia.org/wiki/Hyperbolic_function) 등이 있다. 여기에서는 간단한 형태의 분류를 위한 지도학습을 구현할 예정이므로 Sigmoid와 ReLU함수를 준비했다. 먼저 스칼라 값을 처리 할 수 있는 활성화함수를 선언하고, 행렬연산을 위해 준비한 함수 가운데 `eval(arr,func)`을 이용해서 행렬의 각 원소에 활성화함수를 적용하도록 했다.

```javascript
// [[ nn/activation_function.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/nn/activation_function.js

/* Sigmoid(x) = 1/(1+exp(-x))*/
const _func_sigmoid = function(x){return 1.0/(1.0+Math.exp(-x));};
let _sigmoid = function(arr){
	if(typeof arr == `number`) return _func_sigmoid(arr);
	else if(Array.isArray(arr)) return mat.eval(arr, _func_sigmoid);
	else throw "SigmoidException : parameter has not suppoeted type.";
};

/*
ReLU(y) = { x  (x>0)
          { 0  (x<=0)
*/
const _func_relu = (x) => x>0?x:0;
let _relu = function(arr){
	if(typeof arr == `number`) return _func_relu(arr);
	else if(Array.isArray(arr)) return mat.eval(arr, _func_relu);
	else throw "ReLUException : parameter has not suppoeted type.";
};
```


### 2.3 수치미분
신경망을 학습시키기 위해서는 입력값과 가중치의 행렬연산으로 구한 추정치가 정답 또는 최적의 답과 얼마나 오차가 있는지, 오차를 줄이려면 가중치를 작게 해야 하는지 크게 해야 하는지에 대한 결정이 필요하다. 다시 말해, 가중치 값을 아주 조금 움직였을 때 가중치가 줄어드는 방향쪽으로 가중치를 수정하면 될 것이다. 이는 가중치의 움직임에 따른 오차의 변화를 미분한 것으로 볼 수 있다. 하지만 복잡한 신경망 전체에 대해 해석적인 방법으로 미분값을 구하는 것은 쉬운 일이 아니며, 우리는 이미 정의된 신경망 모델이 있으므로 이를 이용해 수치적인 방법으로 미분값을 구할 수 있을 것이다.

수치적인 방법으로 미분값을 구하는 방법은 아주 작은 변수의 변화에 따른 함수의 기울기를 구하는 방법을 사용한다. 신경망 학습을 위한 좀 더 나은 미분 방법으로, [미분의 연쇄법칙(Chain rule)](https://en.wikipedia.org/wiki/Chain_rule)을 이용한 [오차 역전파(Backpropagation)](http://cs231n.github.io/optimization-2/)를 적용하면 모델의 각 계충마다 미분을 수행하는 횟수를 줄일 수 있어 학습성능을 크게 향상시킬 수 있다. 여기서는 Javascript를 이용한 간단한 신경명의 구현에 초점을 맞추고 있으므로, 오차역전파가 적용되지 않은 가장 단순한 형태의 수치 미분을 구현했다. 

```javascript
// [[ math/derivative.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/math/derivative.js

/* Numerical Gradient */
let _numerical_gradient = function(f, x, h=0.0000001) {
	if(typeof f !== `function`) {
		throw "DerivativeException : first parameter is not function";
	} else if(Array.isArray(x)) {
		const _partial_diff = function(arr){				
			let grad = [];
			if(Array.isArray(arr[0])) {
				for(let i = 0 ; i < arr.length ; i++){
					grad.push(_partial_diff(arr[i]));
				}		
			} else {
				for(let i = 0 ; i < arr.length ; i++){
					let temp = arr[i];
					arr[i] = temp+h;
					let dhp = f(arr[i]);

					arr[i] = temp-h;
					let dhn = f(arr[i]);

					arr[i] = temp;
					grad.push((dhp-dhn)/(2.0*h));
				}
			}
			return grad;
		};
		
		return _partial_diff(x);
	} else {
		throw "DerivativeException : second parameter is suitable";
	}
}
```


## 3. 샘플 프로젝트 - XOR 문제
샘플 프로젝트로는 가장 단순한 형태의 비선형 이진분류 문제인 [XOR문제](https://medium.com/@jayeshbahire/the-xor-problem-in-neural-networks-50006411840b)를 선택했다. XOR문제는 단순 션형분류로는 구현하기 어려우며, 인공신경망으로 구현한경우 최소한 한개 이상의 은닉층(Hidden layer)를 포함해야 한다. 여기에서는 두개의 은닉층을 사용하는 모델을 구성해서 좀 더 복잡한 인공신경망을 구성 할 수 있는지에 대한 가능성을 함께 살펴보고자 한다.

### 3.1 모델 정의
아래는 XOR값의 추정과 오차계산, 그리고 훈련에 대한 동작을 포함하는 세개의 레이어를 가진 신경망이다. W1, W2, Wout는 각각 첫번째 은닉층과 두번째 은닉층 그리고 출력층의 가중치 값이며, b1, b2, bout는 마찬가지로 각 층의 편차값에 해당한다. 은닉층의 뉴런의 수는 모델 생성시 파라메터로 입력받고 있으며, 각 은닉층의 누런의 수를 세부적으로 설정할 수 있도록 하지는 않았다. 가중치와 편차의 초기값은 -5 ~ 5 까지의 임의의 값으로 설정해서 0이나 1과같이 같은 값으로 초기화했을 때보다 조금 빨리 해에 수렴할 수 있도록 했다. 물론 각 초기값은 활성화함수에 따라 [Xavier 또는 He초기값을](https://stats.stackexchange.com/questions/319323/whats-the-difference-between-variance-scaling-initializer-and-xavier-initialize/319849)사용하는 것이 성능상 이점이 있을수 있으나, 코드작성 측면에서 간단한 방법을 선택했다.

```javascript
// [[ ex02_xor_problem.js ]]
// https://github.com/ivorycirrus/dl4vanillajs-node-example/blob/master/ex02_xor_problem.js

// artificial neural nets with 3 layers
let MultiLayerNet = function(input_size, hidden_size, output_size){
	let thiz = this;

	if(!(thiz.params = storage.read(FILE_PRE_TRAINED))) {
		thiz.params = {
			'W1' : dl.mat.matrix([input_size, hidden_size], x=>(Math.random()*10.0-5.0)),
			'b1' : dl.mat.matrix([1,hidden_size], 0),
			'W2' : dl.mat.matrix([hidden_size, hidden_size], x=>(Math.random()*10.0-5.0)),
			'b2' : dl.mat.matrix([1,hidden_size], 0),
			'Wout' : dl.mat.matrix([hidden_size, output_size], x=>(Math.random()*10.0-5.0)),
			'bout' : dl.mat.matrix([1,output_size], 0)
		};
	}

	// forward process
	thiz.predict = function(x){ /* ... Skip Implimentation ... */ };

	// Loss function
	thiz.loss = function(x, t){ /* ... Skip Implimentation ... */ };

	// Train weights and biases
	thiz.train = function(x, t, batch_size){ /* ... Skip Implimentation ... */ };
};
```

### 3.2 모델 학습
입력값으로 추정치를 구하는 순전파는 아래와 같이 입력에 가중치를 곱하고 편차를 더해서 활성화함수를 적용하는 방법으로 구성했다. 활성화함수는 Sigmoid를 사용했으며, 원하는 출력값의 범위도 0과 1사이의 값므로 출력층의 활성화함수 또한 Sigmoid를 적용했다.

```javascript
// [[ ex02_xor_problem.js ]]
// https://github.com/ivorycirrus/dl4vanillajs-node-example/blob/master/ex02_xor_problem.js

// forward process
thiz.predict = function(x){
	// layer 1
	let L1 = dl.mat.mul(x, thiz.params['W1']);
	L1 = dl.mat.add(L1, thiz.params['b1']);
	L1 = dl.actv.sigmoid(L1);
	// layer 2
	let L2 = dl.mat.mul(L1, thiz.params['W2']);
	L2 = dl.mat.add(L2, thiz.params['b2']);
	L2 = dl.actv.sigmoid(L2);
	// output layer
	let Lout = dl.mat.mul(L2, thiz.params['Wout']);
	Lout = dl.mat.add(Lout, thiz.params['bout']);
	Lout = dl.actv.sigmoid(Lout);
	// output
	return Lout;
};
```

순전파의 결과와 정답 사이의 오차를 구하는 함수로는 [Cross-Entropy with Logits](https://gombru.github.io/2018/05/23/cross_entropy_loss) 함수를 적용했다. 이는 신경망으로 구한 y 값과 정답 t값이 얼마나 오차가 있는지 구해주는 기능을 한다.

```javascript
// [[ ex02_xor_problem.js ]]
// https://github.com/ivorycirrus/dl4vanillajs-node-example/blob/master/ex02_xor_problem.js

// Loss function
thiz.loss = function(x, t){		
	let y = thiz.predict(x);
	return dl.loss.cross_entropy_with_logits(y, t);
};
```

마지막으로 위의 오차함수와 학습율을 옵티마이저에 전달해서 가중치를 갱신하도록 한다. 옵티마이저는 수치미분을 이용한 단순 경사하강법으로 최적값을 찾아가도록 설계했다. `train`함수를 최초 기획할 때에는 미니배치를 이용한 [확률적 경사하강법(Stochastic Gradient Decent method)](https://towardsdatascience.com/difference-between-batch-gradient-descent-and-stochastic-gradient-descent-1187f1291aa1)도 고려하고자 했으나, 여기에서는 각각의 입력값마다 미분값을 구하는 일반적인 경사하강법 까지만 구현하고 있다.

```javascript
// [[ ex02_xor_problem.js ]]
// https://github.com/ivorycirrus/dl4vanillajs-node-example/blob/master/ex02_xor_problem.js

// Train weights and biases
thiz.train = function(x, t, batch_size){
	for(let b = 0 ; b < batch_size ; b++){
		let _x = x.slice(b,b+1);
		let _t = t.slice(b,b+1);
		for(i in thiz.params) {
			thiz.params[i] = dl.opt.gradient_decent_optimizer(()=>thiz.loss(_x,_t), thiz.params[i], LEARNING_RATE);
		}
	}
};
```

```javascript
// [[ nn/optimizer.js ]]
// https://github.com/ivorycirrus/dl4vanillajs/blob/master/nn/optimizer.js

/* Gradient Decent Optimizer */
let _gradient_decent_optimizer = function(f, x, lr=0.001){
	if(typeof f !== `function`) {
		throw "OptimizerException : first parameter is not function";
	} else if(!Array.isArray(x)) {
		throw "OptimizerException : second parameter is not array";
	}

	let grad = diff.grad(f, x);
	let trained = mat.add(x, mat.mul(grad, -1.0*lr));

	return trained;
};
```

### 3.3 평가
다음은 모델의 학습 및 평가결과이다. 학습율을 `0.01`로 해서 2001 에포크(Epoch)만큼 학습한 결과 오차는 약 `0.24`정도이며, XOR평가를 위한 네 개의 값이 유의한 수준에서 분류되는 것을 확인 할 수 있다. 

```
$ node ex02_xor_problem.js
==[TRAIN]==
step : 0 loss : 0.9823129621716575
step : 200 loss : 0.5809593623619813
step : 400 loss : 0.5251647745298205
step : 600 loss : 0.4857023698210541
step : 800 loss : 0.4516157963438475
step : 1000 loss : 0.4188023743659243
step : 1200 loss : 0.3851033533690704
step : 1400 loss : 0.34942643976702165
step : 1600 loss : 0.31207226355231443
step : 1800 loss : 0.2750145679970029
step : 2000 loss : 0.24064839885348238
==[TEST]==
Prediction : 0.13 	Correct : 0.00
Prediction : 0.70 	Correct : 1.00
Prediction : 0.89 	Correct : 1.00
Prediction : 0.29 	Correct : 0.00
```

물론 가중치가 어떻게 초기화 했는지에 따라 아래와 같이 2001회의 학습이 충분하지 않을 수 있다. 임의의 초기값을 가지고 2001에포크를 학습한 다 할지라도 경우에 따라 오차가 `0.5`이상이며, 입력값이 `[1,0]`인 XOR값을 `0.34`로 오답을 내는 상황이 발생할 수 있다.
```
==[TRAIN]==
step : 0 loss : 0.9880284306212831
step : 200 loss : 0.6019301518619822
step : 400 loss : 0.5668457641058527
step : 600 loss : 0.5477305276780536
step : 800 loss : 0.5356430221097995
step : 1000 loss : 0.5272774189972985
step : 1200 loss : 0.521101848949871
step : 1400 loss : 0.5163244034156572
step : 1600 loss : 0.512496475979676
step : 1800 loss : 0.5093447391416038
step : 2000 loss : 0.5066926080889506
==[TEST]==
Prediction : 0.36 	Correct : 0.00
Prediction : 0.95 	Correct : 1.00
Prediction : 0.34 	Correct : 1.00
Prediction : 0.35 	Correct : 0.00
```

하지만 이는 학습의 문제이며, 충분히 많은 횟수의 반복학습을 통해 정확도를 개선 할 수 있을 것이다. 예제 프로젝트에는 `pre_trained/ex02_pretrained_weights.json`에 미리 학습한 가중치의 초기값이 포함되어 있으며, `FILE_PRE_TRAINED` 변수에 해당 파일명을 지정해주면 임의의 초기값이 아닌 이미 학습된 초기값을 사용할 수 있다. 사전학습된 가중치는 `0.005`가량의 작은 오차를 내는 가중치이며, 물론 이를 초기값으로 2001에포크만큼 추가학습하면 오차가 더 줄어드는 것을 볼 수 있다. 

```
==[TRAIN]==
step : 0 loss : 0.005468257253796859
step : 200 loss : 0.0053710141731233675
step : 400 loss : 0.005277006523766076
step : 600 loss : 0.005186078832492771
step : 800 loss : 0.005098085310905433
step : 1000 loss : 0.00501288911878565
step : 1200 loss : 0.004930361693683351
step : 1400 loss : 0.004850382138454004
step : 1600 loss : 0.004772836663248752
step : 1800 loss : 0.0046976180757801935
step : 2000 loss : 0.004624625311294744
==[TEST]==
Prediction : 0.00 	Correct : 0.00
Prediction : 1.00 	Correct : 1.00
Prediction : 1.00 	Correct : 1.00
Prediction : 0.01 	Correct : 0.00
```

## 4. 마치며
개발자들 사이에서 많이 언급되는 격언 중에 '[바퀴를 재발명하지 마라](http://unikys.tistory.com/373)(
[Reinventing the wheel](https://en.wikipedia.org/wiki/Reinventing_the_wheel))'라는 말이 있다. 풀어서 말하자면, 이미 다른사람들이 많읃러 놓은 성능과안정성이 검증된 훌륭한도구들이 많은데, 굳이 시간낭비 해 가면서 처음부터 다시 만드는 수고 들이지 말라고 조언할때 쓰이는 말이다. 그렇다. 이 글은 바퀴를 재발명하는 과정의 이야기를 담은 글이 맞다. 하지만 그 과정에서 인공신경망이 어떻게 값을 추정하는지, 그리고 어떤과정을 거쳐 최적의 값을 찾아가는 훈련을 수행하는지를 세밀하게 살펴볼 수 있었다. 보태어 Javascript의 배열 연산을 처리하는 방법, 특히 배열의 내장함수나 [누산기(Accumulator)](https://medium.freecodecamp.org/reduce-f47a7da511a9)를 사용하는 방법에 대해 깊이 고민해 볼수 있는 계기가 되었다.

더 나아가 Javascript로 Deep Learning을 구현해 보고자 한다면 [Tensorflow.js](https://js.tensorflow.org/)라는 도구를 추천하고 싶다. 이는 Python이나 C++로 작성된 Tensorflow와 같은 메소드 및 데이터를 활용할 수도 있으며, [Github에 훌륭한 예제](https://github.com/tensorflow/tfjs-examples)도 공개되어 있다. Javascript를 이용한 Deep Learning는 웹 환경에서의 인공지능 서비스 애플리케이션을 작성하는 좋은 도구가 될 수 있을 것이라 생각한다. 그리고 이런 웹환경에서의 인공지능 서비스를 개발하는데 있어 이 글과 이 글에서 소개한 시도가 Python이 아니어도 Deep Learning 애플리케이션을 개발할 수 있다는 작은 용기가 되길 희망한다.