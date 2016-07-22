# Big Integer with Javascript

## 1. 시작하며
자바스크립트로 코드를 작성하다 큰 숫자는 어떻게 표현할까에 대해 고민해 본 복이 있었다. Java의 경우 [java.math.BigInteger](https://docs.oracle.com/javase/7/docs/api/java/math/BigInteger.html) 라는 클래스를 제공하고 있는데, 이와 비슷한 역할을 하는 것을 자바스크립트로 구현해 보고자 시작을 했다.

큰 수를 표현하는 가장 간단한 예로 100!을 구해보자.<br/>
아래는 함수의 재귀호출을 통해 100!을 구하는 예시이다.
```javascript
(function(n){return (n==1)?1:(n*fact(n-1));})(100);
```
```
9.33262154439441e+157
```

그런데 실행 결과가 지수가 포함된 실수 형식으로 출력이 되고 있음을 볼 수 있는데,
이는 100!가 자바스크립트에서 취급가능한 정수의 범위를 넘기 때문이다.<br/>
자바스크립트에서 사용가능한 정수의 범위는 아래와 같으며, 이 이상의 수를 표현하기 위해서는 Number객체가 아닌 다른 방법을 고민해야 할 것이다.
```javascript
console.log(Number.MAX_SAFE_INTEGER);
```
```
9007199254740991
```