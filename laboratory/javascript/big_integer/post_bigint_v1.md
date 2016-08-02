# Big Integer with Javascript

## 1. 시작하며
자바스크립트로 코드를 작성하다 큰 숫자는 어떻게 표현할까에 대해 고민해 본 적이 있었다.<br/>
Java언어의 경우 [java.math.BigInteger](https://docs.oracle.com/javase/7/docs/api/java/math/BigInteger.html) 라는 클래스를 제공하고 있는데, 이와 비슷한 역할을 하는 것을 자바스크립트로 구현해 보고자 시작을 했다.

아래로 포함될 예제는 [ECMA-Script 5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition)을 기준으로 작성할 것이며, Chrome 52.0.2743.82 (64-bit) 버전에서 테스트 한 코드이다.

큰 수를 표현하는 가장 간단한 예로 100!과 200!을 구해보자.<br/>
아래는 함수의 재귀호출을 통해 100!을 구하는 자바스크립트 코드와 실행결과다.
```javascript
function fact(n){return (n==1)?1:(n*fact(n-1));}
console.log("100! = "+fact(100));
console.log("200! = "+fact(200));
```
```
100! = 9.33262154439441e+157
200! = Infinity
```

그런데 실행 결과가 지수가 포함된 실수 형식으로 출력이 되서 전체 숫자를 확인할수 없었다. 이는 100!의 계산 결과가 자바스크립트에서 취급가능한 정수의 범위를 넘기 때문에 지수부와 가수부로 표현하는 실수 형식으로 변환되어 보여지고 있다. 이보다 좀더 큰, 실수의 범위를 넘는 수를 표현하고자 할 경우 결과로 ```Infinite```라고 출력되어 유효숫자의 일부조차 확인 할 수 없는 상황도 발생 할 수 있다.

자바스크립트에서 안전하게 표현가능한 정수와 실수의 범위는 Number객체의 상수로 정의되어 있으며 다음과 같은 방법으로 확인 할 수 있다.

```javascript
console.log("Max Safe Integer : "+Number.MAX_SAFE_INTEGER);
console.log("Max Number : "+Number.MAX_VALUE);
```
```
Max Safe Integer : 9007199254740991
Max Number : 1.7976931348623157e+308
```

사실 100! 과 200!는 10진수로 표현시 아래와 같이 각각 158자리와 375자리의 매우 큰 수이다. 200!의 경우 지수표현이 가능한 실수형 변수로도 표현이 불가능 할 정도로 큰 수 이며, 이런 수를 표현하기 위해서는 기본적으로 제공되는 Number객체가 아닌 다른 방법을 이용하여 값을 표현하고 그 연산을 정의 해야 할 필요가 있을 것이다.

```
100! (length : 158)
9332621544394415268169923885626670049071596826438162146859296389521759999322991560894146397615651828625
3697920827223758251185210916864000000000000000000000000

200! (length : 375)
7886578673647905035523632139321850622951359776871732632947425332443594499634033429203042840119846239041
7721213891963883025764279024263710506192662495282993111346285727076331723739698894392244562145166424025
4033291864131227428294853277524242407573903240321257405579568660226031904170324062351700858796178922222
789623703897374720000000000000000000000000000000000000000000000000
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

### 3.1 덧셈
```BigInt```객체의 덧셈 함수는 두 BigInt객체의 값을 더하는 기능을 수행하며, 다음과 같이 선언되어 있다.

```javascript
// add
// @param (BigInt) x
// @return (BigInt) sum value;
scope.BigInt.prototype.add = function(x) {
	/* Function implementations .... */
};
```

#### 3.1.1 사용 예
덧셈 함수의 사용법은 다음과 같다.

```javascript
var A = new BigInt("567");
var B = new BigInt("98765");
var result = A.add(B);

console.log(A.toString() + " + " + B.toString() + " = " + result.toString());
```

```
567 + 98765 = 99332
```

#### 3.1.2 덧셈 함수의 구성
BigInt의 덧셈을 수행하는 함수인 add는 내부적으로 같은 부호를 가진 수의 덧셈만을 취급하며, 다음의 네 파트로 구성되어 있다.

##### 1. 덧셈을 수행할 두 수의 부호 체크
두 수의 부호가 서로 다른 경우, 입력받은 수(x) 의 부호를 바꿔 뺄셈 연산을 수행<br/>
예1 : -6 + 3 =&gt; (-6) - (-3)<br/>
예2 : 3 + (-2) =&gt; (3) - (+2)

##### 2. 덧셈을 수행할 두 수의 절대값 체크
절대 값이 큰 수에 절대값이 작은 수를 더하도록 덧셈 순서 조정<br/>
예1 : 382 + 1001 =&gt; 1001 + 382<br/>
예2 : (-382) + (-1001) =&gt; (-1001) + (-382)

##### 3. 덧셈 수행
부호가 같고, 절대값의 크개대로 덧셈의 순서가 조정된 두수의 덧셈을 수행.

##### 4. 결과값의 부호결정 및 결과 반환
덧셈 수행결과에 원래 수의 부호를 적용하여 반환한다.<br/>
두 수의 부호가 다른 경우는 뺄셈연산의 결과를 반환하며, 두 수의 부호가 같은경우 덧셈연산시 부호가 바뀌지 않으므로 연산대상인 두 수 중 어느 수의 부호를 따라도 무관하다.

#### 3.1.3 덧셈 알고리즘 설명
두수의 덧셈연산시 실제로 수의 절대값이 저장된 _arrBigInt배열의 덧셈만을 수행하며, 부호는 결과값 출력시 할당한다.<br/>
_arrBigInt배열의 덧셈 연산은 다음과 같이 수기로 덧셈을 하는 과정을 자바스크립트 코드로 모사했다.

아래 예와 같이 두 수의 각 자리를 모두 도한 다음에도 올림수가 남을 경우,<br/>
연산이 끝난 다음에 올림수 1을 수의 앞에 추가해 준다

```
   1 2 3                1 2 3               1 2 3              1 2 3
+  9 6 7             +  9 6 7            +  9 6 7           +  9 6 7
---------            ---------          ---------          ---------
     (3+7)    ==>   (2+6+1) 0     ==>   (1+9) 9 0     =>     1 0 9 0
```

```javascript
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
```

### 3.2 뺄셈
```BigInt```객체의 sub 함수는 두 BigInt객체의 값을 빼는 기능을 수행하며, 다음과 같이 선언되어 있다.

```javascript
// sub
// @param (BigInt) x
// @return (BigInt) substract value;
scope.BigInt.prototype.sub = function(x) {
	/* Function implementations .... */
};
```

#### 3.2.1 사용 예
뺄셈 함수의 사용법은 다음과 같다.

```javascript
var A = new BigInt("567");
var B = new BigInt("98765");
var result = A.sub(B);

console.log(A.toString() + " + " + B.toString() + " = " + result.toString());
```

```
567 - 98765 = -98198
```

#### 3.2.2 뺄셈 함수의 구성
BigInt의 뺄셈을 수행하는 함수인 sub는 내부적으로 같은 부호를 가진 수의 뺄셈만을 취급하며, 부호가 다른 두 수의 뺄셈연산은 두번째 인수의 부호를 바꾸어 덧셈 연산으로 처리한다.<br/>
뺄셈 연산은 다음의 네 파트로 구성되어 있다.

##### 1. 뺄셈을 수행할 두 수의 부호 체크
두 수의 부호가 서로 다른 경우, 입력받은 수(x) 의 부호를 바꿔 덧셈 연산을 수행<br/>
예1 : -6 - 3 =&gt; (-6) + (-3)<br/>
예2 : 3 - (-2) =&gt; (3) + (+2)

##### 2. 뺄셈을 수행할 두 수의 절대값 체크 및 결과 값 부호 결정
절대 값이 큰 수에 절대값이 작은 수를 더하도록 덧셈 순서 조정<br/>
결과 값의 부호는 절대값이 큰 수의 부호와 같다.<br/>
예 : 382 - 1001 =&gt; 1001 - 382<br/>

##### 3. 뺄셈 수행
부호가 같고, 절대값의 크개대로 뺄셈의 순서가 조정된 두수의 뺄셈을 수행.

##### 4. 결과값의 불필요한 0 삭제 및 결과 반환
뺄셈 후 불필요한 0이 결과값에 포함된 경우 0 삭제.
예 : 9548 - 9533 = 0015  =&gt; 15

#### 3.2.3 뺄셈 알고리즘 설명
두 수의 부호가 같고 절대값이 큰 수에서 정대값이 작은 수를 빼는 연산을 수행하므로, 부호의 영향을 제외하면 큰 양의정수에서 작은 양의정수를 빼는 연산과 동일하다.<br/>
따라서 뺄셈 연산 또한 수기로 뺄셈을 하는 과정을 모사하여 _arrBigInt배열의 뺄셈 연산을 구현했다.

뺄셈의 시작은 작은 수에서 부터 시작하여 큰 자리의 수로 진행하며, 뺄 값이 부족한 경우 상위 자리의 값을 1 빼고 해당 자리의 뺄 값에 10을 더하는 방식을 사용한다.<br/>
특정 자리에서 상위의 수를 임차한 경우 상위값에 바로 1을 삭제하지 않고, 상위 값 연산시 하위값에서 사용한 값의 유무를 확인하여 연산결과에 적용하였다.

```
   8 2 3                8 2 3               8 2 3              8 2 3
-  3 6 7             +  3 6 7            +  3 6 7           +  3 6 7
---------            ---------          ---------          ---------
  (3-7+10)  ==>  (2-6-1+10) 6   ==>   (8-3-1) 5 6     =>       4 5 6
   u = -1            u = -1             u = 0

* u : underflow
```

```javascript
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
```

### 3.3 곱셈
```BigInt```객체의 multiply 함수는 두 BigInt객체의 값을 곱하는 기능을 수행하며, 다음과 같이 선언되어 있다.

```javascript
// multiply
// @param (BigInt) x
// @return (BigInt) x-times value;
scope.BigInt.prototype.multiply = function(x) {
	/* Function implementations .... */
};
```

#### 3.3.1 사용 예
곱셈 함수의 사용법은 다음과 같다.

```javascript
var A = new BigInt("567");
var B = new BigInt("98765");
var result = A.multiply(B);

console.log(A.toString() + " x " + B.toString() + " = " + result.toString());
```

```
567 x 98765 = 55999755
```

#### 3.3.2 곱셈 함수의 구성
BigInt의 곱셈을 수행하는 함수인 multiply 다음의 세 파트로 구성되어 있다.

##### 1. 곱셈을 수행할 두 수의 길이 체크
반복문 구성의 편의를 위해 10진수로 표현했을 때 절대값의 자리수가 더 긴 수에 절대값의 길이가 더 작은 수를 곱하고자한다.<br/>
이를 위해 두 수의 길이를 비교하여 길이순으로 정렬한다.<br/>
예 : 958 * 11263 =&gt; 11263 * 958

##### 2. 결과값 부호 결정
곰셈 결과값의 부호는 곱셈의 대상이 되는 두 수의 부호가 같은지 또는 다른지에만 영향을 받는다.<br/>
따라서 연산결과를 저장할 면수를 먼저 선언하고, 결과값의 부호를 먼저 할당해도 무관하다.

##### 3. 곱셈 연산 수행
실제 곱셈 연산을 수행한다. 곱셈 연산의 수행과정은 아래 알고리즘 항목에서 자세히 설명한다.

####3.3.3 곱셈 알고리즘 설명
```BigInt```객체의 곱셈 연산 또한 수기로 두 수의 곱을 계산하는 과정을 모사했다.<br/>
곱셈을 계산하는 방법에는 여러가지 과정이 있으나, 여기에서는 곱셈을 수행할 수를 각각의 자리별로 구분하여 곱셈의 대상이 되는 수와 곱하고, 각각의 결과를 더해서 최종 결과를 도출한다.

```
   3 2 6             3 2 6             3 2 6             3 2 6
 x   5 8           x   5 8           x   5 8           x   5 8
--------   ==>    --------    ==>   --------    ==>   --------
    (6*8)       (4+ 2*8) 8      (2+ 3*8) 0 8           2 6 0 8
 ov = 4          ov = 2            ov= 2

              3 2 6             3 2 6             3 2 6
            x   5 8           x   5 8           x   5 8
     ==>   --------  =...=>  --------    ==>   --------
            2 6 0 8           2 6 0 8           2 6 0 8
             (6*5)          1 6 3 0        +  1 6 3 0 0
           ov = 3                          ------------
                                              1 8 9 0 8

* ov : overflow
```

```javascript
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
```

### 3.4 나눗셈
```BigInt```객체의 divide 함수는 인수로 받은 BigInt객체로 그 대상이 되는 객체의 값을 나눈 결과랄 구하는 기능을 수행하며, 다음과 같이 선언되어 있다.

```javascript
// divide
// @param (BigInt) x
// @return (Array[BigInt,BigInt]) quotient, renains;
scope.BigInt.prototype.divide = function(x) {
	/* Function implementations .... */
};
```

#### 3.4.1 사용 예
나눗셈 함수는 그 결과로 몱과 나머지를 담은 배열을 반환하며 사용법은 다음과 같다.

```javascript
var A = new BigInt("567");
var B = new BigInt("98765");
var result = B.divide(A);

console.log(B.toString() + " / " + A.toString() + " = " + result[0].toString()+" remains "+result[1].toString());
```

```
98765 / 567 = 174 remains 107
```

#### 3.4.2 나눗셈 함수의 구성
BigInt의 곱셈을 수행하는 함수인 multiply 다음의 세 파트로 구성되어 있다.

##### 1. 0으로 나누는 예외 체크
0으로 나눗셈을 시도 할 경우 DivideByZeroException 예외를 발생시키고 연산을 중지한다.

##### 2. 제수와 피제수의 크기 비교
제수와 피제수 크기비교를 통해 몱이 0또는 1이 나오는 경우의 연산과정을 단순화 한다.
* 제수의 절대값이 피제수보다 클 경우 몫은 0, 나머지는 피제수 전체가 되도록 한다.<br/>
* 제수와 피제수의 값이 동일 할 경우 몫은 1, 나머지는 0을 반환한다.

##### 3. 나눗셈 연산 수행
실제 나눗셈 연산을 수행한다. 나눗셈 연산의 수행과정은 아래 알고리즘 항목에서 자세히 설명한다.

##### 4. 몫과 나머지의 불푤이효나 0 삭제 및 값 출력
나눗셈 결과값의 가장 큰수 자리에는 0이 아닌 수가 오도록 앞에 딸려오는 0을 삭제한다.

#### 3.4.3 나눗셈 알고리즘 설명
```BigInt```객체의 나눗셈 연산 또한 수기로 두 수의 곱을 계산하는 과정을 모사했다.<br/>
나눗셈 연산은 다음의 과정을 반복하여 값을 구한다.
1. 먼저 나눗셈의 대상이 되는 수(피제수) 에서 나눌 수(제수)의 자리수 만큼의 단위로 값을 잘라온다. <br/>잘라온 값이 제수보다 작을 경우 다음 자리의 값을 잘라와서 뒤에 추가한다.
2. 제수에 1부터 9까지 차례로 곱해서, 곱한 값이 잘라온 값보다 커지는 순간의 곱한 수를 찾는다.
3. 2번단계에서 찾은 값에 1을 뺀 값을 몫 결과값 배열에 추가한다.
4. 이전 2번 단계에서 찾은 값에 1을 빼서 제수에 곱한 다음, 피제수에서 잘라온 값에서 빼준다.
5. 4번 단계에서 뺄셈 결과로 나온 값에 피제수의 다음 자리 값을 뒤에 추가하여, 피제수의 가장 마지막 자리수를 계산 할 때 까지 2번과정으로 돌아가 연산을 계속한다.

```
예 : 37456 ÷ 25 = 1498 ... 6

        1                     1                     1 4                     1 4 9 8
    +----------   ==>     +----------   ==>     +----------  ==...=>    +----------
 25 | 3 7 4 5 6        25 | 3 7 4 5 6        25 | 3 7 4 5 6          25 | 3 7 4 5 6
      2 5                   2 5                   2 5                     2 5
     ----------            ----------            ----------              ----------
      1 2                   1 2 4                 1 2 4                   1 2 4
                                                  1 0 0                   1 0 0
                                                 ----------               ----------
                                                    2 4                     2 4 5
                                                                            2 2 5
                                                                          ----------
                                                                              2 0 6
                                                                              2 0 0
                                                                          ----------
                                                                                  6

```

```javascript
ar tmpQuotient;
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
```