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

1998년 국제 인터넷 표준화 기구(IETF, Internet Engineering Task Force)의 만우절 농잠으로 시작됫으며 실제로 [RFC 2324](https://tools.ietf.org/html/rfc2324)에  하이퍼텍스트 커피포트 제어규약(HTCPC, Hyper Text Coffee Pot Control Protocol)으로 정의됫다고 한다. 이 규약은 실제로 HTTP를 이용하여 커피를 끓이는 찻주전자의 상태를 서비스하는 서버의 구현을 염두 해 주고 정의되었다. 물론 [HTTP 1.1 표준문서](https://tools.ietf.org/html/rfc7231)에는 정식으로 포함되지 않았으나, IETF의 표준규약에는 아래와 같이 실제 HTCPCP의 RFC 문서가 존재하고 있다.

![rfc2324_htcpcp](rfc2324_htcpc.png)

### IETF가 표준문서에 장난을?
IETF, 국제 인터넷 표준화 기구는 인터넷의 운영, 관리, 개발에 대해 협의하고 프로토콜과 구조적인 사안들을 분석하는 인터넷 표준화 작업을 하는 국제기구이다. 이렇게 중요한 역할을 담당하는 국제기구가 국제표준으로 장난섞인 농담을 한다는 것은 쉽사리 상상이 되지 않는다.

![real](https://namu.wiki/file/%ED%8C%8C%EC%9D%BC:%EA%B7%B8%EC%8B%A4%EC%9D%BC%20%EC%9D%B4%EB%A7%90%EB%85%84.png)

그렇다. 실제로 IETF가 RFC를 가지고 농담을 하고 있으며, 이는 오늘 내일의 문제가 아니다. 게다가 커피포트 제어 프로토콜 뿐만이 아닌 꽤 많은 수의 만우절 장난으로 발표한 문서가 있음을 알수 있다. 심지어 이에 대해서 위키피디아에는 [만우절 RFC](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments)라는 항목이 실제로 존재하고 있다.

>A Request for Comments (RFC) is a type of publication from the Internet Engineering Task Force (IETF) and the Internet Society (ISOC), usually describing methods, behaviors, research, or innovations applicable to the working of the Internet and Internet-connected systems.
>
>Almost every April Fools' Day (1 April) since 1989, the Internet RFC Editor has published one or more humorous Request for Comments (RFC) documents, following in the path blazed by the June 1973 RFC 527 called ARPAWOCKY, a parody of Lewis Carroll's nonsense poem "Jabberwocky". [The following list](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments) also includes humorous RFCs published on other dates.

## HTCPCP의 구성
찻주전자로 커피를 끓이기 위한 통신규약인 HTCPCP는 IETF [RFC 2324](https://tools.ietf.org/html/rfc2324)에 정의되어 있으며, HTTP 통신을 기반으로 Method / Header / URI-scheme 등이 추가로 구성되어 있다.

### Method

- **```BREW``` 또는 ```POST``` 메소드**
   - 커피를 끓이기 위한 메소드 이며, Content-Type으로 ```application/coffee-pot-command```을 가진다.
   - 커피포트 서버에서는 BREW와 POST를 모두 지원해야 하며, POST를 통한 제어는 지양(deprecated)해야 한다.
   - 커피포트는 전열기기로 불(fire)을 사용하지 않으니 네트워크 방화벽(firewall)구성 및 제어를 필요로 하지 않는다.
   - POST 메소드는 커피의 상표를 서비스 하는 용도로 사용 할 수 있다.
   - BREW 메소드는 추가로 제공되는 메소드이며, 다른 HTTP프로토콜에서도 사용 될 수 있다.
      (예를 들면, Hyper Text Brewery Control Protocol 같은..)

- **```GET``` 메소드**
   - 커피포트에 대한 정보를 반환한다.
   - 커피에 대한 정보가 없는 이유는 대부분의 커피 URI가 카페인을 포함하지 않기 때문이다.

- **```PROPFIND``` 메소드**
   - 커피에 대한 메타데이터를 제공한다.

- **```WHEN``` 메소드**
   - 커피를 따른 다음 우유를 추가로 따를 경우, 언제(when) 우유를 따르는 것을 멈출것인지에 대한 명령이다.
   - 커피에 우유가 충분히 따라 진 경우 WHEN메소드를 호출하여 우유 따르는 동작을 중지 할 수 있다.

### Header

- 'safe' 응답 헤더 (recommended)
   실제로 커피를 끓여내는 과정에는 다양한 위험 요소가 존재한다. 커피포트 서버에서는 이러한 위험요소들을 식별해서 사용자에게 위험요소를 알릴 수 있다.
   커피포트의 헤더에 추가되는 안전한 상태에 대한 정보는 아래와 같은 형식으로 제공되며, 별도의 POST 명령을 구현하여 사용자가 더 편리하게 인지할 수 있는 방법으로 위험요소를 알릴 수 도 있다.

```
 Safe                = "Safe" ":" safe-nature
 safe-nature         = "yes" | "no" | conditionally-safe
 conditionally-safe  = "if-" safe-condition
 safe-condition      = "user-awake" | token
```

- 'Accept-Additions' 헤더
   'Accept-Additions'는 커피포트 서버에서는 요청헤더에 사용가능한 미디어타입을 알리기 위해 사용한다. 이 때 사용가능한 미디어타입이란 설탕/시럽의 포함여부, 우유의 종류 등등 커피를 끓이는데 있어서 취할 수 있는 부가적인 작업들을 말한다.

```
Accept-Additions = "Accept-Additions" ":"
              #( addition-range [ accept-params ] )

addition-type   = ( "*"
              | milk-type
              | syrup-type
              | sweetener-type
              | spice-type
              | alcohol-type
              ) *( ";" parameter )
milk-type       = ( "Cream" | "Half-and-half" | "Whole-milk"
              | "Part-Skim" | "Skim" | "Non-Dairy" )
syrup-type      = ( "Vanilla" | "Almond" | "Raspberry"
              | "Chocolate" )
alcohol-type    = ( "Whisky" | "Rum" | "Kahlua" | "Aquavit" )
```

### Status Code

- 406 Not Acceptable
   406 Not Acceptable 헤더는 일반적으로 '요청한 헤더에 정의된 컨텐츠의 특성이 실제 리소스에 적용될 수 없거나 처리될 수 없음'을 의미한다.
   HTCPCP에서는 Accept-Additions 헤더를 통한 요청을 처리 할 수 없을 경우에 발생하는 오류코드이다.<br/>
   이 406오류코드의를 정의하는 마지막 문장에는 '실제로는, 대부분의 자동커피머신은 이러한 추가작업을 수행 할 수 없다.' 라고 표현되어 있다.
   이는 HTCPCP 1.0이 작성된 1998년 기준으로 자동 커피머신에서는 우유나 설탕을 사용자의 선택에때라 제공할 수 있는 기기가 없었던 것을 생각 할 수 있다.
   이 글을 쓰고있는 2016년 현재에는 이 기능을 제공하는 커피머신이 존재하고 있으며, 이는 표준이 제정 될 당시 향후 추가될 기능 중 현재 미구현 항목에 대한 오류코드를 제시한 것으로 보인다.

- 418 I'm a teapot
   서비스를 제공하는 서버가 커피포트입을 알리는 오류코드. 응답 바디에 [short and stout](https://en.wikipedia.org/wiki/I%27m_a_Little_Teapot)라는 커피포트 노래를 포함 할 수 있다.

### URI Scheme

