#문자열 선언 : 홑따옴표('')와 쌍따옴표("")의 차이

## Javascript의 문자열 표현

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

- 쌍따옴표와 홑따옴표로 표현된 단순 문자열을 출력해 보았다. 기능 및 결과에 차이가 없었다.
- 쌍따옴표와 홑따옴표로 표현된 문지열 끼리, 그리고 문자열과 숫자사이의 연결에 대한 연산을 출력해 보았다. 쌍따옴표와 홑따옴표로 표현한 문자열의 기능 차이는 없다.
- 쌍따옴표 안의 홑따옴표와 홑따옴표 안의 쌍따옴표를 표현해 보았다. 별도의 탈출문자(Escape chacrater)없이도 가장 쌍따옴표안의 홑따옴표와 홑따옴표 안의 쌍따옴표가 콘솔에 출력되는 것을 확인 할 수 있다.

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