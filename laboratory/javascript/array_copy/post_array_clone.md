# The Fastest Way to Clone Javascript Arrays

배열(Array)은 많은 수의 데이터를 반복적으로 다루기에 편리한 개념으로 많은 개발 언어에서 사용가능한 기능이다. 이 글에서는 자바스크립트의 배열을 복제(shallow clone)하기 위해서 어떤 방법이 있는지 알아보고, 가장 빠르고 효율적인 자바스크립트 배열 복제방법에 대해 이야기하고자 한다.

## 1. 자바스크립트의 배열
자바스크립트의 배열은 레퍼런스 객체이다. 배열 변수의 대입은 배열의 원소가 저장되어 있는 메모리의 주소값에 대한 정보만을 복사한 것으로 배열 안에 있는 실제 값의 복제가 이루어지지는 않는다. 자바스크립트의 배열을 복제하는 방법에는 아래와 같이 크게 두 가지 방법이 있다.

* 자바스크립트 내장함수를 이용하는 방법
* 새로운 배열을 선언하고, 원본 배열의 모든 원소를 순회하며 새로 생성한 배열에 값을 삽입하는 방법

이어서 위 두 가지 방법의 자세한 구현 방법과 성능에 대해 이야기 해 보자.

## 2. 내장함수를 이용한 배열의 복사

자바스크립트의 내장함수 중에는(ES5 기준으로) 배열의 복사를 위한 함수가 존재하지는 않는다. 하지만, 일부 내장함수의 경우 출력되는 결과 값을 입력 파라메터와 다른 위치의 메모리에 값을 할당하여 반환하는 명령이 존재한다. 따라서 이러한 내장함수의 동작을 배열의 복제에 이용 할 수 있을 것이다.

### 2.1 Array.slice
Array객체의 prototype 함수인 slice는 본래 원본배열에서 원하는 갯수 만큼 원소를 잘라내는 기능을 제공한다. 그런데 원본 배열을 잘라 낼 위치를 배열의 시작지점으로 주면, 원본배열의 시작부터 끝까지를 잘라낸 값이라 판단하여 별도의 메모리 영역에 배열의 모든 값을 복제한 다음 이렇게 복제한 배열을 반환하게 된다. 이는 우리가 구현하고자 하는 배열의 복제에 해당하며, 많은 라이브러리에서 배열의 복제를 위해 이 방법을 이용하고 있다.

slice함수를 이용한 배열의 복제는 다음과 같이 파라메터를 주지 않거나, 0을 파라메터로 하여 함수를 호출하면 된다.
```javascript
var origin = [1,2,3,4];
var clone1 = origin.slice();
var clone2 = origin.slice(0);
```

### 2.2 Array.concat
Array객체의 prototype 함수인 concat은 원본 배열에 파라메터로 받은 배열을 붙여서 하나의 새로운 배열을 생성하는 기능을 제공한다. 이 때, 파라메터로 빈 배열객체를 전달하면 원본배열에 빈 배열을 합쳐서 원본배열과 같은데이터를 가진 새로운 객체를 반환하게 된다.

concat 함수를 이용한 배열의 복제는 다음과 같이 할 수 있다.
```javascript
var origin = [1,2,3,4];
var clone = origin.concat([]);
```

### 2.3 Serialize
자바스크립트의 객체(JSON)를 다른 시스템으로 전송하기 위해 자바스크립트의 내장함수를 이용하여 문자열로 직렬화(Serialize) 하는 기능을 사용 할 수 있다. 이렇게 직렬화한 객체를 다시 파싱하면 원본과 동일한 값을 가진 객체로 생성 할 수 있어 객체의 복사에 활용 할 수 도 있다.

```javascript
var origin = [1,2,3,4];
var clone = JSON.parse( JSON.stringify(origin) );
```

## 3. 배열을 순회와 배열 값 삽입
배열을 순회하면서 값을 삽입하는 방법은 공통적으로 빈 배열 객체를 생성하고, 이 배열 객체의 각각의 위치에 원본 배열의 값을 일일히 대입하는 과정을 거친다.

이 때, 동작 속도에 영향을 줄 수 있는 부분은 배열의 선언방법, 반복문을 이용한 배열의 순회방법, 배열에 값을 추가하는 방법을 들 수 있다.

### 3.1 배열의 생성 방법
자바스크립트의 배열 생성방법은, Array 객체의 생성자를 명시적으로 호출하는 방법과 리터럴(Literal) 방식으로 배열을 선언하는 방법을 들 수 있다.

Array객체를 이용하는 방법은 new 키워드를 이용하여 Array객체의 생성자를 명시적으로 호출하는 방법이며, 이때 파라메터로 배열의 크기를 지정하거나 초기 배열의 원소를 입력 할 수 있다. 리터럴 방식을 이용한 배열의 선언은 배열의 선언과 동시에 값을 바로 할당 할 수 있도록 배열의 원소를 포함하는 값의 목록을 ```[]```으로 감싸서 표현하는 방식이다. 일반적으로 배열의 생성은 성능 및 객체의 프로토타입 활용측면에서 리터럴 방식을 사용하는것을 추천하며, 이와 관련된 이야기는[여기 링크의 글](http://stackoverflow.com/questions/885156/whats-wrong-with-var-x-new-array)을 참고 하도록 하자.

```javascript
// Using constructor of Array object
var arr1 = new Array (3);
var arr2 = new Array (1,2,3);

// Using literal way
var arr3 = [1,2,3];
```

위의 예와 같이 자바스크립트의 배열을 생성 할 수 있다. 이 때 arr1은 배열의 크기만을 가진 ```[undefined, undefined, undefined]```의 값을 가진 배열을 생성하며, arr2와 arr3는 파라메터로 주어진 값을 배열의 원소로 구성하여 ```[1,2,3]```의 값으로 초리과된 배열 객체를 생성하게 된다.

### 3.2 반복문을 이용한 배열의 순회 방법
반복문을 이용하여 배열의 모든 값을 순회하는 방법은 여러가지가 있지만, 여기에서는 다음 4가지 방법을 소개 하고자 한다.

* for 구문과 배열의 인덱스를 이용한 순차 접근
* while 구문과 배열의 인덱스를 이용한 순차 접근
* for-in 구문을 이용한 인덱스 획득 및 원소 조회
* Array 객체의 프로토타입 함수인 forEach 함수를 이용한 배열 순회

위에 열거한 각각의 방법에 대해 ```[1,2,3,4]```의 값을 가진 배열의 모든 원소를 출력하는 예제는 다음과 같다.

```javascript
var arr = [1,2,3,4];

// for 구문과 배열의 인덱스를 이용한 순차 접근
var inx = 0;
for(inx = 0 ; inx < arr.length ; inx++ ){
    console.log(arr[inx]);
}

// while 구문과 배열의 인덱스를 이용한 순차 접근
var inx = arr.length;
while(inx--){
    console.log(arr[inx]);
}

// for-in 구문을 이용한 인덱스 획득 및 원소 조회
var inx = 0;
for(inx in arr){
    console.log(arr[inx]);
}

// Array 객체의 프로토타입 함수인 forEach 함수를 이용한 배열 순회
arr.forEach(function(element, inx){
    console.log(element);
});
```

### 3.3 배열에 값을 추가하는 방법
자바스크립트의 배열에 값을 추가하는 방법은 일반적으로 다음 3가지 방법이 사용 가능하다.

* 배열의 인덱스로 배열의 원소에 접근하여 직접 값을 대입하는 방법
* Array.push() 함수를 이용하여 배열의 뒤에 값을 추가하는 방법
* Array.unshift() 함수를 이용하여 배열의 앞에 값을 추가하는 방법

이 방법을 활용한 예제 코드는 아래와 같다.

```javascript
var arr = [];

// set value for using array index
arr[0] = 1;

// add value at the last of array
arr.push(2);

// add value at the first of array
arr.unshift(3);
```

### 4. 복사 속도 테스트

### 4.1 배열복사 속도 테스트
다음과 같이 배열을 복사하는 방법에 대한 속도 테스트를 진행했으며, 테스트에 사용된 시스템 환경은 다음과 같다.

```
배열 복사 테스트 환경
- H/W : MacBook Pro (Retina, 13-inch, Late 2013) , i5 , 8G ram
- OS : OSX El Capitan 10.11.6
- Tool : node.js v4.2.5
```

테스트에 사용한 배열은 10만개의 숫자를 원소로 하는 배열 객체를 미리 선언해서 모든 테스트에 공통으로 사용했다. 이 배열을 앞서 소개한 각각의 방법으로 복사를 수행하여 소요된 시간을 측정하며, 이 때 각각의 방법에 대해 10번씩 복사를 수행하여 평균 낸 값을 화면에 출력하도록 했다.

배열의 원소를 순회하면서 값을 복사하는 방법은 그 구성상 배열의 생성 및 순회, 배열에 값을 추가하는 방법이 각각 독립적으로 결과에 영향을 줄 수 있으므로 각각의 경우를 조합하여 동작 성능을 측정하는 코드를 작성했다. 전체 테스트에 대한 코드는 [여기 Gist Link](https://gist.github.com/ivorycirrus/8831875b9331d938311f7682500c7002)를 참고하자.

### 4.2 속도 테스트 결과
아래는 앞서 소개한 모든 방법에 대해 테스트를 수행 한 결과이다.

테스트 결과를 종합적으로 볼 때, 주목할 만한 결과를 정리하면 다음과 같다.

* 원본배열과 같은 크기의 배열을 미리 생성 한 후 배열의 인덱스로 접근하여 값을 대입하는 방법이 빈 배열객체 생성 후 Array.push() 함수로 값을 추가하는 방법에 비해 빠르다. (copyPushForIndexCount:1.8ms vs copyIndexForIndexCountFixedInit:0.2ms)
* 배열의 순회 속도는 '인덱스를 이용한 접근'이 가장 빠르며 'Array.forEach() 를 이용한 접근', 'for-in 구문의 활용' 순으로 빠른 동작속도를 보인다.
* for 문의 인덱스를 이용한 방법과 while 문의 인덱스를 이용한 방법은 그 동작 속도가 비슷하다.
* Array.unshift()는 Array.push()에 비해 동작속도가 매우 느리다.
* 자바스크립트 내장함수인 Array.slice()및 Array.concat()의 객체 복사 속도가 빠른 편이다..

```
========================================================
Copying array - size : 100000 / sampling count : 10
--------------------------------------------------------
copyPushForIndexCount : 1.8ms
copyPushForIn : 43.2ms
copyPushArrayForeach : 3ms
copyPushForIndexCountFixedInit : 5.6ms
copyPushForInFixedInit : 45.4ms
copyPushArrayForeachFixedInit : 4.9ms
copyUnshiftForIndexCount : 1943.9ms
copyUnshiftForIn : 1983.5ms
copyUnshiftArrayForeach : 1934.8ms
copyUnshiftForIndexCountFixedInit : 17118.9ms
copyUnshiftForInFixedInit : 26391.2ms
copyUnshiftArrayForeachFixedInit : 26395.6ms
copyIndexForIndexCount : 2ms
copyIndexForIn : 54.9ms
copyIndexArrayForeach : 2.2ms
copyIndexForIndexCountFixedInit : 0.2ms
copyIndexForInFixedInit : 47.1ms
copyIndexArrayForeachFixedInit : 1.9ms
copyIndexWhileIndexCount : 7.5ms
copyIndexWhileIndexCountFixedInit : 0.4ms
copySlice : 0.2ms
copySliceZero : 0.2ms
copyConcat : 0.1ms
copyJSON : 4.7ms
========================================================
```

위 결과중 1ms 미만의 동작속도를 보이는 값은 수행시간이 매우 짧은 관계로 자바스크립트 동작 이외의 다른 요소로 인안 오차 발생의 가능성이 있을 수 있다. 이에 빠른 속도를 보인 5가지 방법을 대상으로 1000만개의 원소를 가진 배열을 복사하는 테스트를 다시 수행했다.

수행 결과 고정길이로 배열을 선언하고 인덱스를 이용하여 값을 일일히 복사하는 방법이 자바스크립트의 내장함수들을 이용하는 방법에 비해 확연히 빠른 동작속도를 보인다는 것을 알 수 있었다. 그리고 For 구문과 While구문을 비교하면 For구문이 다소 빠른 속도를 보이는 것을 볼 수 있는데, 이는 While구문을 이용한 방법의 경우 복사한 배열의 순서를 맞추기 위해 Array.reverse()함수를 호출하는 것 때문에 수행시가이 증가 한 것으로 판단된다.

```
========================================================
Copying array - size : 10000000 / sampling count : 10
--------------------------------------------------------
copyIndexForIndexCountFixedInit : 16.2ms
copyIndexWhileIndexCountFixedInit : 18.2ms
copySlice : 49.6ms
copySliceZero : 49.2ms
copyConcat : 49.3ms
========================================================
```


## 5. 결론
지금까지 자바스크립트의 배열을 복사하는 방법에 대해 알아보고 어떤 방법이 빠르게 동작하는지 테스트 해 보았다. 앞서 소개한 내용을 바탕으로 자바스크립트 개발시 배열을 복사하는 방법으로 다음 두 가지 방법을 추천한다.

### 5.1 빠른 동작 속도를 요구하는 시스템
빠른 동작속도를 요구하는 시스템에서는 고정길이의 배열을 선언하고 배열의 인덱스 순회하며 값을 대입하는 방법의 복사를 추천한다. 단순 자바스크립트 객체의 값의 대입을 이용한 방법이므로, 시스템의 메모리 구조 및 자바스크립트 컴파일러의 최적화 방향에 따라 성능 차이가 있을 수 있으므로 적용에 앞서 각 시스템별 성능 테스트가 필요 할 수 있다.
```javascript
function copyArray(originArray){
	var index = 0,
        targetSize = originArray.length,
        targetArray = new Array(targetSize);

    for(index = 0 ; index < targetSize ; index++) {
    	targetArray[index] = originArray[index];
    }

    return targetArray;
}
```

### 5.2 간결한 코드를 필요로하는 시스템
자바스크립트의 내장함수인 Array.slice()는 한줄로 표현하는 자바스크립트 객체 복사 방법 중 굉장히 짧고 간편한 편이고 그 동작속도 또한 느리지 않은 편이다. 따라서 배열의 크기가 크지 않고, 간결한 코드로 구현을 하고자 하는 경우 Array.slice()는 굉장히 합리적인 선태이 될 수 있다.
```javascript
function copyArray(originArray){
	return originArray?originArray.slice():null;
}
```

일례로 자바스크립트의 객체 조작을 위해 많이 사용하는 라이브러리인 [underscore.js](http://underscorejs.org/)의 객체 복사 함수인 ```_.clone()``` 에서도 복사할 객체가 배열일 경우 Array.clone()함수를 이용하고 있다.
```javascript
// Ref. URL : https://github.com/jashkenas/underscore/blob/master/underscore.js
// Create a (shallow-cloned) duplicate of an object.
_.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};
```

## 6. 마치며
앞서 소개한 자바스크립트의 배열을 복사하는 방법은 많은 양의 자료가 담긴 배열을 다루는데 좋은 참고자료가 될 것이라 예상한다. 하지만 배열안의 원소가 객체/함수/배열 등에 대해서는 앞서 소개한 방법 가운데 JSON으로 직렬화 하는 방법을 제외하고는 깊은 복사를 수행하지 않는다. 즉 배열은 복사 했지만, 복사한 값이 이전 배열에 담겨있는 원소의 참조값일 수 있다. 따라서 기본형(primitive)변수 이외의 참조형(referential)변수를 포함하는 배열의 경우 깊은 복사를 수행하고자 할 경우 추가적인 처리를 고민해야 할 것이다.

이러한 깊은 복사에 대한 예로 [jQuery](https://jquery.com/)의 ```jQuery.extend()```함수에서는 배열 또는 객체안에 포함된 모든 원소를 for-in구문을 이용하여 순회하면서 신규객체를 생성하고 원소를 주입 하는 방법으로 객체복사를 구현 하고 있다. 분명 for-in구문이 인덱스를 활용한 for문에 비해 동작속도가 느린 것은 사실이나, 같은 코드로 배열과 객체를 동시에 처리할 수 있는 장점이 있어 라이브러리의 구조를 단순화 할 목적으로 선택된 방법으로 보인다.

웹의 영역이 모바일 환경까지 넓어지면서 단일 페이지 애플리케이션(SPA, Single Page Application)이 늘어나고 있는 상황에서, 많은 데이터를 클라이언트의 브라우저에서 처리하고자 할 때 이 글이 도움이 되었으면 한다.

## 참고
* The way to create Javascript arrays : http://stackoverflow.com/questions/885156/whats-wrong-with-var-x-new-array
* Test Code for copying javascript arrays : https://gist.github.com/ivorycirrus/8831875b9331d938311f7682500c7002