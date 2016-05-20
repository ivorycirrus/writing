#문자열 선언 : 홑따옴표('')와 쌍따옴표("")의 차이

## 자바스크립트의 문자열 표현

Javascript에서 문자열 상수를 표현하는 방법은 대표적으로 두 가지가 있다. 바로 쌍따옴표(Double quotaion, "")으로 문자열을 감싸거나, 또는 홑따옴표(Single quotation, '')으로 문자열을 감싸는 방법이 그 것이다. 다른 프로그래밍 언어(예를들면 C나 Java와 같은)에서는 쌍따옴표로 감싼 문자와 홑따옴표가 각기 다른 용도로 사용되고 있으나 유독 javascript에서는 문자열의 시작과 끝이 동일한 따옴표 기호로 감싸지기만 한다면 프로그램 코드 안에서 쌍따옴표와 홑따옴표를 혼용하여 사용 할 수 있다.

다음은 Javascript 코드에서 쌍따옴표와 홑따옴표를 혼용하여 사용 한 예제이다.

```javascript
//File : exp_01_print_literials.js

// Log Literials 
console.log("== Log Literials ==");

console.log('Single Quotation!');
console.log("Double Quotation!");

// Concaterations
console.log("== Concaterations ==");

var s1 = 'S1';
var s2 = 'S2';
var d1 = "D1";
var d2 = "D2";
var num = 999;

console.log(s1+s2);
console.log(d1+d2);
console.log(s1+d1);
console.log(d1+s1);
console.log(s1+num);
console.log(d1+num);

// Contains each other
console.log("== Contains each other ==");

console.log("Double quotations contain 'SINGLE' quotations.");
console.log('Single quotations contain "DOUBLE" quotations.');
```

위 코드는 쌍따옴표와 홑따옴표로 표현한 문자열의 출력, 문자열의 연결, 쌍따옴표와 홑따옴표의 혼용을 표현하고 있다. 이 코드를 실행하면 콘솔에 아래와 같은 결과를 볼 수 있다. 실행결과를 시험기능별로 살펴보자.

- 쌍따옴표와 홑따옴표로 표현된 단순 문자열을 출력해 보았다. 
    기능 및 결과에 차이가 없었다.
- 쌍따옴표와 홑따옴표로 표현된 문지열 끼리, 그리고 문자열과 숫자사이의 연결에 대한 연산을 출력해 보았다. 
    쌍따옴표와 홑따옴표로 표현한 문자열의 기능 차이는 없다.
- 쌍따옴표 안의 홑따옴표와 홑따옴표 안의 쌍따옴표를 표현해 보았다. 
    별도의 탈출문자(Escape chacrater)없이도 가장 쌍따옴표안의 홑따옴표와 홑따옴표 안의 쌍따옴표가 콘솔에 출력되는 것을 확인 할 수 있다.

즉 결과적으로 쌍따옴표와 홑따옴표는 그 기능상의 차이는 없으며, 문자열의 시작과 끝을 알리는 따옴표기호만 동일하다면 상호 혼용하여 사용 할 수 있음을 알 수 있다.

```
== Log Literials ==
Single Quotation!
Double Quotation!
== Concaterations ==
S1S2
D1D2
S1D1
D1S1
S1999
D1999
== Contains each other ==
Double quotations contain 'SINGLE' quotations.
Single quotations contain "DOUBLE" quotations.
```

## 자바스크립트 언어 표준

### 문자열 상수의 정의
쌍따옴표와 홑따옴표로 표현한 문자열 코드의 실행결과가 같다면, 자바스크립트 언어의 표준문서에서는 이를 어떻게 설명하고 있는지 의문이 들었다. 자바스크립트의 언어 표준은 ECMA Script라는 이름으로 진행 되 왔으며, 현재 HTML5로 알려진 언어표준은 ECMA Script 5.1에 대응된다. 이에 대한 표준 문서는 ECMA-262에서 정의하고 있으며, [문자열상수에 대한 정의](http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4)를 찾아보면 다음과 같이 설명하고 있다.

> **A string literal is zero or more characters enclosed in single or double quotes.** Each character may be represented by an escape sequence. All characters may appear literally in a string literal except for the closing quote character, backslash, carriage return, line separator, paragraph separator, and line feed. Any character may appear in the form of an escape sequence.

ECMA-262 표준문서에서도 홑따옴표(single quote)와 쌍따옴표(double quotes)를 모두 문자열상수에 대한 정의에 사용 할 수 있도록 규정하고 있는 것을 볼 수 있다. 동일한 문자열 상수로 인식되기 위해서는 문자열 상수 종료를 구분하는 따옴표(시작시 사용한것과 동일한)와 역슬래시(\), 줄이나 문장의 끝을 알리는 문자를 제외한 모든 문자는 그 표현 그대로 문자열 상수를 구성하는데 사용 할 수 있다. 다만, 탈출문자(escape sequence)형식으로 표현된 모든 문자는 문자열 상수의 정의에 사용 할 수 있다고 말하고 있다.

### 표준문서에서의 사용 빈도
즉, 표준문서의 정의만을 보면 쌍따옴표와 홑따옴표를 구분하지 않고 문자열 상수 정의에 사용 할 수 있겟다. 그런데 표준 문서를 보면 흥미로운 사실을 발견 할 수 있다.

ECMA-262 표준문서의 예제코드 및 프로토타입 함수를 정의 할 때 사용된 문자열 상수의 표현을 보면 모두 쌍따옴표가 사용 된 것을 볼 수 있다. [String 객체의 생성자 정의](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.1.1)나 [String 객체의 split 함수정의](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.14)에 보면 문자열 상수를 표현하는데 아래 예시와 같이 쌍따옴표 만을 사용하고 있는 것을 볼 수 있다.

>15.5.1.1 String ( [ value ] )
    Returns a String value (not a String object) computed by ToString(value). If value is not supplied, the empty String "" is returned.

이를 미루어 보면 공식적으로 정의되지는 않았지만, 자바스크립트 표준화 그룹에서는 문자열상수를 표현 할 때 쌍따옴표를 선호하고 있다고 볼 수 있을 것이다.

## 참고자료
* spec-string-literal : http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
* spec-string-constructor : http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.1.1
* spec-string-split : http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.14