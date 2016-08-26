# The Fastest Way to Clone Javascript Arrays

배열(Array)은 많은 수의 데이터를 반복적으로 다루기에 편리한 개념으로 많은 개발 언어에서 사용가능한 기능이다. 이 글에서는 자바스크립트의 배열을 복제(deep clone)하기 위해서 어떤 방법이 있는지 알아보고, 가장 빠르고 효율적인 자바스크립트 배열 복제방법에 대해 이야기하고자 한다.

## 1. 자바스크립트의 배열
자바스크립트의 배열은 레퍼런스 객체이다. 배열 변수의 대입은 배열의 원소가 저장되어 있는 메모리의 주소값에 대한 정보만을 복사한 것으로 배열 안에 있는 실제 값의 복제가 이루어지지는 않는다. 자바스크립트의 배열을 복제하는 방법에는 아래와 같이 크게 두 가지 방법이 있다.

* 자바스크립트 내장함수를 이용하는 방법
* 새로운 배열을 선언하고, 원본 배열의 모든 원소를 순회하며 새로 생성한 배열에 값을 삽입하는 방법

이어서 위 두 가지 방법의 자세한 구현 방법과 성능에 대해 이야기 해 보자.

## 2. 내장함수를 이용한 배열의 복사

자바스크립트의 내장함수 중에는(ES5 기준으로) 배열의 복사를 위한 함수가 존재하지는 않는다. 하지만, 일부 내장함수의 경우 출력되는 결과 값을 입력 파라메터와 다른 위치의 메모리에 값을 할당하여 반환하는 명령이 존재한다. 따라서 이러한 내장함수의 동작을 배열의 복제에 이용 할 수 있을 것이다.

### 2.1 Array.slice
Array객체의 prototype 함수인 slice는 본래 원본배열에서 원하는 갯수 만큼 원소를 잘라내는 기능을 제공한다. 그런데 원본 배열을 잘라 낼 위치를 배열의 시작지점으로 주면, 원본배열의 시작부터 끝까지를 잘라낸 값이라 판단하여 별도의 메모리 영역에 배열의 모든 값을 복제한 다음 이렇게 복제한 배열을 반환하게 된다. 이는 우리가 구현하고자 하는 배열의 깊은 복제에 해당하며, 많은 라이브러리에서 배열의 복제를 위해 이 방법을 이용하고 있다. 

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

### 2.4 내장함수를 이용한 객체복사 성능 비교
<div id="barchart_material" style="width: 100%; height: 400px;"></div>

## 3. 배열을 순회와 배열 값 삽입


## 4. 결론


<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ]);

    var options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
      bars: 'horizontal' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material'));

    chart.draw(data, options);
  }
</script>