# 기초 알고리즘 소개

알고리즘이란 주어진 조건아래에서 원하는 결과물을 얻기 위한 각 과정의 동작을 정의하고 순서를 배치하는 일련의 과정을 뜻한다. 따라서 알고리즘은 특정 개발언어에 종속적인 개념은 아니며, 하나 이상의 언어로 구현 될 수 있다.<sup>[\[1\]](#ref-1)</sup>

이 글에서는 문제해결 알고리즘 가운데 많이 사용되고 있는 탐욕 알고리즘(Greedy Algorithm), 분할 정복(Devide and Conquer), 동적계획법(Dynamic Programming)에 대해 알아보고자 한다.

## 1. 탐욕 알고리즘 (Greedy algorithm)
탐욕 알고리즘은 최적화 문제의 해를 구하기 위한 방법으로 동적계획법에 비해 동작속도가 빨라서 근사해를 구하는 목적으로 많이 사용된다.

### 1.1 정의
위키피디아 에서는 [탐욕 알고리즘](https://ko.wikipedia.org/wiki/%ED%83%90%EC%9A%95_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)에 대해 다음과 같이 정의하고 있다.<sup>[\[2\]](#ref-2)</sup>

>탐욕 알고리즘은 최적해를 구하는 데에 사용되는 근사적인 방법으로, 여러 경우 중 하나를 결정해야 할 때마다 그 순간에 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 해답에 도달한다. 순간마다 하는 선택은 그 순간에 대해 지역적으로는 최적이지만, 그 선택들을 계속 수집하여 최종적(전역적)인 해답을 만들었다고 해서, 그것이 최적이라는 보장은 없다.

>탐욕 알고리즘이 잘 작동하는 문제는 대부분 탐욕스런 선택 조건(greedy choice property)과 최적 부분 구조 조건(optimal substructure)이라는 두 가지 조건이 만족된다. 탐욕스런 선택 조건은 앞의 선택이 이후의 선택에 영향을 주지 않는다는 것이며, 최적 부분 구조 조건은 문제에 대한 최적해가 부분문제에 대해서도 역시 최적해라는 것이다.

>이러한 조건이 성립하지 않는 경우에는 탐욕 알고리즘은 최적해를 구하지 못한다. 하지만, 이러한 경우에도 탐욕 알고리즘은 근사 알고리즘으로 사용이 가능할 수 있으며, 대부분의 경우 계산 속도가 빠르기 때문에 실용적으로 사용할 수 있다. 이 경우 역시 어느 정도까지 최적해에 가까운 해를 구할 수 있는지를 보장하려면 엄밀한 증명이 필요하다.

>어떤 특별한 구조가 있는 문제에 대해서는 탐욕 알고리즘이 언제나 최적해를 찾아낼 수 있다. 이 구조를 매트로이드라 한다. 매트로이드는 모든 문제에서 나타나는 것은 아니나, 여러 곳에서 발견되기 때문에 탐욕 알고리즘의 활용도를 높여 준다.


즉, 탐욕 알고리즘은 간단히 말해 **결정이 일어나는 해당 시점에서 판단한 최적의 해**를 반복적으로 선택 하여 최종 해에 도달하는 방법을 찾는 알고리즘이다. 선택이 일어나는 시점에서의 최선의 값만을 고려 하며, 결정에 있어서 이전단계 및 이후 단계의 결과에 따른 가중치를 고려하지는 않는다. 따라서 해당 시점의 값 만을 고려하므로 프로그램의 구현 및 동작속도에 있어 상당한 이점을 가질 수 있다.

하지만 이러한 이유로 인해 매 순간 최적의 해를 찾는 방법을 반복하다 보면 시작점의 위치 및 탐색경로에 따라 해가 달라질 수 있으며, 전체 관점에서 항상 최적의 해를 찾을 수 있다고 보장하지는 않는다.<sup>[\[3\]](#ref-3)</sup>

### 1.2 구성

탐욕 알고리즘은 다음의 다섯가지 요소로 구성된다.<sup>[\[4\]](#ref-4)</sup>

1. 해(solution)의 후보 목록
2. 후보목록에서 해를 선택하기 위한 결정함수(selection function)
3. 선택한 해의 적정성(feasibility)판별 함수
4. 해 또는 부분해 집합을(partial solution)을 저장할 함수
5. 전체의 해를 구하고 저장하는 함수

### 1.3 예시 - 거스름돈 계산

### 1.4 활용 분야

* [외판원 문제 (Travelling Salesman Problem)](https://en.wikipedia.org/wiki/Travelling_salesman_problem)
* [최소 신장 트리 (Minimal Spanning Tree)](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
    * [Prim's Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
    * [Kruskal's Algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
    * [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
* 그래프 (Graph)
    * [Map Coloring](https://en.wikipedia.org/wiki/Greedy_coloring)
    * [Vertex Cover](https://en.wikipedia.org/wiki/Vertex_cover)
* [배낭 문제(Knapsack Problem)](https://en.wikipedia.org/wiki/Knapsack_problem)
* [잡-샵 스케쥴링 문제(Job Scheduling Problem)](https://en.wikipedia.org/wiki/Job_shop_scheduling)

## References

1. <a name="ref-1"></a> 알고리즘 정의 : https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm
2. <a name="ref-2"></a> 탐욕 알고리즘 정의 : https://ko.wikipedia.org/wiki/%ED%83%90%EC%9A%95_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
3. <a name="ref-3"></a> 탐욕알고리즘 실패 경우 : https://en.wikipedia.org/wiki/Greedy_algorithm#Cases_of_failure
4. <a name="ref-4"></a> 탐욕알고리즘의 구성요소 : https://en.wikipedia.org/wiki/Greedy_algorithm#Specifics

* <a name="ref-"></a> 설명 : http://janghw.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Greedy-Algorithm-%ED%83%90%EC%9A%95-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
* <a name="ref-"></a> 설명 : http://eehoeskrap.tistory.com/38
* <a name="ref-"></a> 예제 : http://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/04GreedyAlgorithmsI.pdf
* <a name="ref-"></a> 예제 : http://polygoncraft.com/tag/%ED%83%90%EC%9A%95-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/
