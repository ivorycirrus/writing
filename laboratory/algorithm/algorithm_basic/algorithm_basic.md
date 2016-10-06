# Algorithm Basic

## 탐욕 알고리즘 (Greedy algorithm)
탐욕 알고리즘은 다양한 경우의 수가 발생 할 수 있는 문제의 해를 구하기 위한 방법으로 많이 사용된다.

위키피디아 에서는 [탐욕 알고리즘](https://ko.wikipedia.org/wiki/%ED%83%90%EC%9A%95_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)에 대해 다음과 같이 정의하고 있다.<sup>[\[1\]](#ref-1)</sup>

>탐욕 알고리즘은 최적해를 구하는 데에 사용되는 근사적인 방법으로, 여러 경우 중 하나를 결정해야 할 때마다 그 순간에 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 해답에 도달한다. 순간마다 하는 선택은 그 순간에 대해 지역적으로는 최적이지만, 그 선택들을 계속 수집하여 최종적(전역적)인 해답을 만들었다고 해서, 그것이 최적이라는 보장은 없다.

>탐욕 알고리즘이 잘 작동하는 문제는 대부분 탐욕스런 선택 조건(greedy choice property)과 최적 부분 구조 조건(optimal substructure)이라는 두 가지 조건이 만족된다. 탐욕스런 선택 조건은 앞의 선택이 이후의 선택에 영향을 주지 않는다는 것이며, 최적 부분 구조 조건은 문제에 대한 최적해가 부분문제에 대해서도 역시 최적해라는 것이다.

>이러한 조건이 성립하지 않는 경우에는 탐욕 알고리즘은 최적해를 구하지 못한다. 하지만, 이러한 경우에도 탐욕 알고리즘은 근사 알고리즘으로 사용이 가능할 수 있으며, 대부분의 경우 계산 속도가 빠르기 때문에 실용적으로 사용할 수 있다. 이 경우 역시 어느 정도까지 최적해에 가까운 해를 구할 수 있는지를 보장하려면 엄밀한 증명이 필요하다.

>어떤 특별한 구조가 있는 문제에 대해서는 탐욕 알고리즘이 언제나 최적해를 찾아낼 수 있다. 이 구조를 매트로이드라 한다. 매트로이드는 모든 문제에서 나타나는 것은 아니나, 여러 곳에서 발견되기 때문에 탐욕 알고리즘의 활용도를 높여 준다.


탐욕 알고리즘은 간단히 말해 **결정이 일어나는 해당 시점에서 판단한 최적의 해**를 반복적으로 선택 하여 최종 해에 도달하는 방법을 찾는 알고리즘이다. 하지만 매 순간 최적의 해를 찾는 방법을 반복하는 경우 시작점의 위치 및 탐색경로에 따라 전체 관점에서 항상 최적의 해를 찾을 수 있다고 보장하지는 않는다.<sup>[\[2\]](#ref-2)</sup>

## References

1.<a name="ref-1"></a> 탐욕 알고리즘 정의 : https://ko.wikipedia.org/wiki/%ED%83%90%EC%9A%95_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
2. <a name="ref-2"></a> 탐욕알고리즘 실패 경우 : https://en.wikipedia.org/wiki/Greedy_algorithm#Cases_of_failure
2.<a name="ref-"></a> 설명 : http://janghw.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Greedy-Algorithm-%ED%83%90%EC%9A%95-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
3. <a name="ref-"></a> 설명 : http://eehoeskrap.tistory.com/38
4. <a name="ref-"></a> 예제 : http://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/04GreedyAlgorithmsI.pdf
5. <a name="ref-"></a> 예제 : http://polygoncraft.com/tag/%ED%83%90%EC%9A%95-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/
