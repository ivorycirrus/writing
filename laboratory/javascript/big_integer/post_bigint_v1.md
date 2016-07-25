# Big Integer with Javascript

## 1. 시작하며
자바스크립트로 코드를 작성하다 큰 숫자는 어떻게 표현할까에 대해 고민해 본 적이 있었다.<br/>
Java언어의 경우 [java.math.BigInteger](https://docs.oracle.com/javase/7/docs/api/java/math/BigInteger.html) 라는 클래스를 제공하고 있는데, 이와 비슷한 역할을 하는 것을 자바스크립트로 구현해 보고자 시작을 했다.

큰 수를 표현하는 가장 간단한 예로 100!을 구해보자.<br/>
아래는 함수의 재귀호출을 통해 100!을 구하는 자바스크립트 코드와 실행결과다.
```javascript
(function(n){return (n==1)?1:(n*fact(n-1));})(100);
```
```
9.33262154439441e+157
```

그런데 실행 결과가 지수가 포함된 실수 형식으로 출력이 되고 있음을 볼 수 있다. 이는 100!이 자바스크립트에서 취급가능한 정수의 범위를 넘기 때문이다.<br/>
자바스크립트에서 안전하게 표현가능한 정수의 범위는 아래와 같으며, 이 이상의 수를 표현하기 위해서는 Number객체가 아닌 다른 방법을 고민해야 할 것이다.
```javascript
console.log(Number.MAX_SAFE_INTEGER);
```
```
9007199254740991
```

## 2. 큰 정수의 표현
대부분의 컴퓨터 언어는 부호가 있는 정수를 [2의 보수](http://www.swarthmore.edu/NatSci/echeeve1/Ref/BinaryMath/NumSys.html#signint)를 이용해서 표현을 한다. 이는 유효범위를 가지는 정수군에 대해 보수 계산과 덧셈 연산만으로 뺄셈연산을 정의 할 수 있다는 장점을 가진다. 하지만 이 방법으로 표현한 정수는 데이터의 표현에 사용된 저장소의 크기가 고정되어야 할 필요가 있어 큰 수를 표현하고 연산하는데 부가적인 장치를 필요로 할 것이다.

여기에서는 문자열(String)을 사용하여 큰수를 표현하고 그 연산을 정의해 볼 것이다. 물론 저장용량 및 계산 성능에 있어 불리한 점이 있을 수 있다. 하지만 큰 수의 연산방법을 고민하고 구현하는데 10진수로 표현된 문자열을 사용하면 사람의 시각에서 연산과정을 유추하고 정의하는 과정을 보다 쉽게 이해 할 수 있을 것이다.

### 2.1 데이터형 정의
아래는 앞으로 사용할 자바스크립트의 정수 클래스의 자료 표현이다. 정수데이터는 내부적으로 부호를 저장하는 _sign과 절대값을 저장하는 _arrBigInt로 구성되어 있다.

부호화 절대값을 분리하여 덧셈연산 알고리즘을 이용하여 뺄셈을 구현 할 수 있으며, 부호가 다른 두 수의 사칙연산시 부호처리를 단순화 할 수 있는 장점이 있다. 수치의 절대값을 표현하는 자료형을 단일 문자열이 아닌 문자열 객체의 배열을 사용하여 수의 연산시 문자열 연산 수를 줄여 연산성능을 높이고자 했다. 또한 배열의 각각의 원소가 10진수로 표현된 각각의 자리수에 1:1대응이 되도록 구성함으로서 각 자리 연산 알고리즘의 설계를 쉽게 할 수 있는 이점도 존재한다.

```javascript
{
	_sign : 1,
    _arrBigInt : []
}
```


#### 2.1.1 _sign
* +1 또는 -1의 number 타입의 데이터를 가진다.
* 정수 객체에서 수의 극한을 취급하지 않을 예정이므로 데이터의 출력을 위해 0의 경우 +1 로 지정한다.

#### 2.1.2 _arrBigInt
* string 타입의 데이터로 구성된 배열이다.
* 배열의 각 원소는 10진수로 표현된 정수의 각 자리 수에 해당한다.
* 원소의 순서는 덧셈/뺄셈 연산의 편의를 위해 [Little Endian](https://en.wikipedia.org/wiki/Endianness#Little-endian)으로 구성한다.

### 2.2 생성자
큰 정수를 표현하기위해 ```BigInt```라는 자료형을 다음과 같이 선언하고, 숫자 및 문자열을 입력받을 수 있는 생성자를 정의한다.

```javascript
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
})(window);
```


