# HTTP status code 418 : I'm a teapot

![https://d69dr897pi70n.cloudfront.net/images/blogs/3_main.jpg](https://d69dr897pi70n.cloudfront.net/images/blogs/3_main.jpg)

## HTTP 상태 코드
이제 인터넷은 우리 생활에 녹아들어 시간과 장소에 구애 받지 않고 사람과 사람, 사람과 정보를 연결 해 주고 있다.

이런 인터넷 상의 정보에 접근하는 것은 마치 우리가 누군가와 전화통화를 하는 과정과 이슷하게 생각 할 수 있다. 먼저 우리가 누군가와 전화 통화를 하려면, 받는 사람의 전화번호를 알아야 한다. 마찬가지로 인터넷의 정보에 접근하기 위해서는 이 정보가 위치하고 있는 곳의 주소(URL)이 필요하다. 자, 이제 수화기를 들고 전화번호를 누른다. 전화를 받는 사람의 번호를 올바르게 입력했다면 머지않아 벨 소리가 들릴 것이고, 상대방이 전화를 받았을 때 딸깍 하는 소리와 함께 통화가 시작된다. 이렇게 전화를 발신하고, 상대방이 받을 때까지 수신대기하고, 상대방이 받은 경우 실데 통화상태로 변경하여 목소리를 전달하기 시작하는 과정으로 전화 를 거는 행위를 정리 할 수 있다.

인터넷에서 정보를 가져오는 과정 또한 이와 비슷하게, 요청한 URL에 정보가 존재하는지 확인하고, 연결이 되엇다면 데이터를 전송받고, 전송이 성공 한 경우 전송성공 메세지와 함께 사용자에게 전송받은 정보를 보여주기 시작한다. 우리가 전화를 걸 때에도 '벨소리가 들리면 통화 대기중' 이라고 암묵적으로 약속이 되어 있을 것이다. 마찬가지로 인터넷을 이용하여 정보를 전달 할 때에도 정보의 전송방법 및 전송상태에 대한 약속들이 필요 할 것이다.

## I'm teapot

앞서 이야기 한 바와 같이 원격지에 있는 누군가와 통신을 할 때에는 통신 상태에 대한 정의가 필요한데, 이를 IETF에서는 [RFCs(Request for Comment)의 상태코드](http://www.iana.org/assignments/http-status-codes/)로 표준을 정의 해 놓았다. 그런데 [HTTP 상태 코드](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) 목록을 한번이라도 자세히 읽어 본 적이 있다면, 조금 특이한 의미 오류 코드를 발견 할 수 있다.

### HTTP 상태 코드 418

>**[418 I'm a teapot (RFC 2324)](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error)**
> This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by tea pots requested to brew coffee. This HTTP status is used as an easter egg in some websites, including Google.com.

1998년 국제 인터넷 표준화 기구(IETF, Internet Engineering Task Force)의 만우절 농잠으로 시작됫으며 실제로 [RFC 2324](https://tools.ietf.org/html/rfc2324)에  하이퍼텍스트 커피포트 제어규약(HTCPC, Hyper Text Coffee Pot Control Protocol)으로 정의됫다고 한다. 이 규약은 실제로 HTTP를 이용하여 커피를 끓이는 찻주전자의 상태를 서비스하는 서버의 구현을 염두 해 주고 정의되었다. 물론 [HTTP 1.1 표준문서](https://tools.ietf.org/html/rfc7231)에는 정식으로 포함되지 않았으나, IETF의 표준규약에는 아래와 같이 실제 HTCPC의 RFC 문서가 존재하고 있다.

![rfc2324_htcpc](rfc2324_htcpc.png)

### IETF가 표준문서에 장난을?
IETF, 국제 인터넷 표준화 기구는 인터넷의 운영, 관리, 개발에 대해 협의하고 프로토콜과 구조적인 사안들을 분석하는 인터넷 표준화 작업을 하는 국제기구이다. 이렇게 중요한 역할을 담당하는 국제기구가 국제표준으로 장난섞인 농담을 한다는 것은 쉽사리 상상이 되지 않는다.

![real](https://namu.wiki/file/%ED%8C%8C%EC%9D%BC:%EA%B7%B8%EC%8B%A4%EC%9D%BC%20%EC%9D%B4%EB%A7%90%EB%85%84.png)

그렇다. 실제로 IETF가 RFC를 가지고 농담을 하고 있으며, 이는 오늘 내일의 문제가 아니다. 게다가 커피포트 제어 프로토콜 뿐만이 아닌 꽤 많은 수의 만우절 장난으로 발표한 문서가 있음을 알수 있다. 심지어 이에 대해서 위키피디아에는 [만우절 RFC](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments)라는 항목이 실제로 존재하고 있다.

>A Request for Comments (RFC) is a type of publication from the Internet Engineering Task Force (IETF) and the Internet Society (ISOC), usually describing methods, behaviors, research, or innovations applicable to the working of the Internet and Internet-connected systems.
>
>Almost every April Fools' Day (1 April) since 1989, the Internet RFC Editor has published one or more humorous Request for Comments (RFC) documents, following in the path blazed by the June 1973 RFC 527 called ARPAWOCKY, a parody of Lewis Carroll's nonsense poem "Jabberwocky". [The following list](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments) also includes humorous RFCs published on other dates.
