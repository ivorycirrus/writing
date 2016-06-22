# BigInt v1

## 1. 구현목표
### 정의
* 4Byte 정수의 크기을 넘어서는 숫자를 표현 할 수 있는 자바스크립트 객체

### 기능
* 숫자로 이루어진 ```string```타입의 문자를 입력받아 ```BigInt```객체로 변환
* ```BigInt```로 표현된 수를 ```string```타입의 10진수 문자열로 출력
* ```BigInt```객체 사이의 사칙연산(덧셈/뺄셈/곱셈/나눗셈)
* ```BigInt```사이의 크기 비교

### 목표 구현물
* 100! 계산
* 0 < x < 10^500 ,x ∈ Z 일 때 [소수계량함수 π(x)](https://ko.wikipedia.org/wiki/%EC%86%8C%EC%88%98_%EA%B3%84%EB%9F%89_%ED%95%A8%EC%88%98) 값 계산

## 2. Variables
### sign
* Aim : 양수/음수 판별을 위한 부호
* Value : (integer) -1 또는 1
### arrBigInt
* Aim : 부호를 제외한 수의 절대값을 저장
* Value : (string-array) 10진수 형식의 수를 1자리씩 쓶어서 문자열 배열로 저장. [Little-Eidian](https://en.wikipedia.org/wiki/Endianness#Little-endian).

## 3. Method
### BigInt( [initialValue] )
* Aim : 객체 생성자
* Param
   * initialValue : (number/string/undefined) 초기 값
* Return : (BigInt)
   * 생성한 객체
* Description
   * BigInt객체를 생성하고, 입력받은 parameter을 이용하여 객체를 초기화 함
   * undefined 입력시 0으로 초기화

### compare( x )
* Aim : BigInt 사이의 크기 비교
* Param
   * x : (BigInt) 비교 대상
* Return : (int)
   * -1 : 해당 객체가 x 보다 작음
   * 0 : 해당 객체가 x 와 같음
   * 1 : 해당 객체가 x 보다 큼
* Description
   * BigInt 사이의 크기비교를 위해 사용.

### add( x )
* Aim : BigInt 덧셈 연산
* Param
   * x : (BigInt) 더할 값
* Return : (BigInt)
   * 연산 결과

### sub( x )
* Aim : BigInt 뺄셈 연산
* Param
   * x : (BigInt) 뺄 값
* Return : (BigInt)
   * 연산 결과
* Remark : 부호만 바꾸어서 덧셈 연산으로 처리

### multiply( x )
* Aim : BigInt 곱셈 연산
* Param
   * x : (BigInt) 곱할 값
* Return : (BigInt)
   * 연산 결과

### divide( x )
* Aim : BigInt 나눗셈 연산
* Param
   * x : (BigInt) 나눌 값
* Return : (BigInt)
   * 연산 결과
* Throw : DiviceByZeroException
* Remark : 곱셈/비교 연산과 뺄셈 연산을 조합하여 구성