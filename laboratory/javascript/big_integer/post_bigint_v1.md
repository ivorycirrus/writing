# Big Integer with Javascript

## 1. 시작하며
자바스크립트로 코드를 작성하다 큰 숫자는 어떻게 표현할까에 대해 고민해 본 적이 있었다.<br/>
Java언어의 경우 [java.math.BigInteger](https://docs.oracle.com/javase/7/docs/api/java/math/BigInteger.html) 라는 클래스를 제공하고 있는데, 이와 비슷한 역할을 하는 것을 자바스크립트로 구현해 보고자 시작을 했다.

아래로 포함될 예제는 [ECMA-Script 5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition)을 기준으로 작성할 것이며, Chrome 52.0.2743.82 (64-bit) 버전에서 테스트 한 코드이다.

큰 수를 표현하는 가장 간단한 예로 100!을 구해보자.<br/>
아래는 함수의 재귀호출을 통해 100!을 구하는 자바스크립트 코드와 실행결과다.
```javascript
(function(n){return (n==1)?1:(n*fact(n-1));})(100);
```
```
9.33262154439441e+157
```

그런데 실행 결과가 지수가 포함된 실수 형식으로 출력이 되서 전체 숫자를 확인할수 없었다. 이는 100!의 계산 결과가 자바스크립트에서 취급가능한 정수의 범위를 넘기 때문에 지수부와 가수부로 표현하는 실수 형식으로 변환되어 보여지고 있다. 이보다 좀더 큰, 실수의 범위를 넘는 수를 표현하고자 할 경우 결과로 ```Infinite```라고 출력되어 유효숫자의 일부조차 확인 할 수 없는 상황도 발생 할 수 있다. <br/>
자바스크립트에서 안전하게 표현가능한 정수와 실수의 범위는 아래와 같으며, 이 이상의 수를 표현하기 위해서는 Number객체가 아닌 다른 방법을 고민해야 할 것이다.
```javascript
console.log("Max Safe Integer : "+Number.MAX_SAFE_INTEGER);
console.log("Max Number : "+Number.MAX_VALUE);
```
```
Max Safe Integer : 9007199254740991
Max Number : 1.7976931348623157e+308
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

생성자는 다음을 인자로 받을 수 있으며, BigInt객체로 변활 할 수 없는 파라메터 입력시 ```IllegalArgumentException``` 예외를 발생시킨다.
* **undefined** : 0 으로 초기화
* **BigInt** : 입력받은 BigInt객체로 초기화. 해당 객체의 깊은 복사(deep clone)에 해당한다.
* **number** : 입력받은 number로 초기화. 단, 소수점 아래는 버림
* **string** : 입력받은 문자열로 초기화. 단, 숫자 형식의 문자열만 허용.

다음과 같이 BigInt 객체를 생성 할 수 있다.
```javascript
var bint1 = new BigInt();      // parameter : undefined
var bint2 = new BigInt(bint1); // parameter : BigInt
var bint3 = new BigInt(-1234); // parameter : number
var bint4 = new BigInt("567"); // parameter : string
```

### 2.3 내장함수
새로 정의한 큰 정수를 표현하는 BigInt객체는 기본 자료형(primitive type)이 아니기 때문에, 값의 대입 및 출력을 위한 기능이 필요하다.<br/>
아래는 BigInt 객체의 내장함수의 종류와 그 동작에 대한 설명이다.

#### 2.3.1 toString
toString 함수는 객체 안에 저장된 값을 string 형식으로 변환하여 출력하는 기능을 제공한다.

BigInt는 수의 부호화 절대값을 분리하여 저장하고 있다.<br/>
toString함수는 아래 코드와 같이 두 줄로 구성되어 있으며 각 줄에서 수행하는 작업은 다음과 같다.

1. 절대값을 배열로 저장하고 있는 _arrBigInt의 직렬화(serialize)
   * 배열 객체를 복사한다.  : ```.slice(0)```
   * 작은 수가 앞에 위치한(Little Endian) 배열을 큰 수가 앞으로 오도록 순서를 뒤집는다. : ```.reverse()```
   * 배열의 각 원소를 구분자 없이 하나의 문자열로 합친다. : ```.join("")```
2. 부호 삽입
   * _sign 값이 -1 인 경우에만 문자열 앞에 ```-```를 붙인다. +1인 경우 수 앞에 별도로 부호를 표시하지 않는다.
   * _arrBigInt에 저장된 값이 ```["0"]```인 경우 부호를 붙이지 않는다.

```javascript
// toString
// @return (String) value of bignumber string with sign
scope.BigInt.prototype.toString = function() {
    var str = this._arrBigInt.slice(0).reverse().join("");
    return (this._sign<0 && !(this._arrBigInt.length === 1 && this._arrBigInt[0] === '0'))?('-'+str):str;
};
```

### 2.3.2 clone
BigInt 객체의 깊은 복사(deep clone)를 위한 기능을 제공한다.

아래 코드와 같이 BigInt객체를 생성하고, 원본객체의 부호화 배열을 복사하여 추가한다.<br/>
배열의 복사에는 자바스크립트의 Array객체의 내장함수인 slice가 배열의 깊은 복사를 생성한다는 점을 이용하여 구현했다.

```javascript
// clone
// @return (BigInt) deep copy of BigInt
scope.BigInt.prototype.clone = function() {
    var copyObj = new BigInt();
    copyObj._sign = this._sign;
    copyObj._arrBigInt = this._arrBigInt.slice(0);
    return copyObj;
};
```

## 3. 큰 정수의 연산
다음은 앞서 정의한 ```BigInt```객체의 연산을 정의한다.<br/>
* ```BigInt```객체는 **덧셈, 뺄셈, 곱셈** 연산에 닫혀있으며, **비교, 나눗셈**연산을 지원한다.
* 각 연산은 연산의 대상이 되는 객체의 멤버함수로 정의하며, 해당 객체의 값을 직접 변화시키지 않는다.
* 비교 연산은 두 BigInt객체의 크기를 비교하며, 그 연산의 크다,같다,작다에 해당하는 -1, 0, 1의 값을 반환한다.
* 나눗셈 연산은 BigInt 객체 두개로 이루어진 배열을 반환한다. 배열의 첫번째 원소는 몫, 두번째 원소는 나머지에 해당한다.
* 나눗셈결과의 나머지는 항상 양수 값을 가진다.


