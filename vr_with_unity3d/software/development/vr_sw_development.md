# VR Software 개발 기초

VR 애플리케이션은 일반적으로 3D객체로 이루어진 공간을 생성하고 이 안에 3D로 표현된 객체를 구성하여 보여주는 과정이 필요하다. 이러한 3D공간과 장면, 시점을 구현하기 위해 3D Graphics 를 제어하는 코드를 작성해야 한다. 3D 공간과 객체를 표현하기 위한 프레임워크 가운데 많이 쓰이는 것으로는 OpenGL이나 DirectX를 들 수 있으며, 이들이 제공하는 API를 직접 호출할 수도 있다. 하지만 이 3D Rendering API를 직접 호출하여 사용하는 것은 프로그래머의 노력을 많이 필요로 하며, 일반적으로는 Unity 3D, Unreal Engine, Cry Engine등의 게임 개발엔진을 이용하여 VR 애플리케이션을 보다 쉽고 빠르게 개발하는 방법을 이용한다.

VR 애플리케이션을 개발하기 위한 기본 개념은 다음과 같다.

* 3D 공간 및 3D 객체의 표현 (3D Graphics)
* 시점이 다른 두 영상을 각각의 디스플레이에 표현 (Setreoscopic)
* 사용자의 움직임에 따른 시점 전환 (Motion Tracking)

## 1. 3D Graphics

3D Graphics는 VR 뿐만이 아닌 다양한 분야에서 다루고 있으며, 이에 대한 Wikipedia의 정의는 다음과 같다.

> 3D computer graphics (in contrast to 2D computer graphics) are graphics that use a three-dimensional representation of geometric data (often Cartesian) that is stored in the computer for the purposes of performing calculations and rendering 2D images. Such images may be stored for viewing later or displayed in real-time. 

이 정의를 자세히 짚어보면 다음과 같은 의미 를 포함하고 있다.

1. __use a three-dimensional representation of geometric data__
 3D Graphics는 3차원 공간 좌표를 이용하는 시스템이다.
 
2. __purposes of performing calculations and rendering 2D images__
 결과적으로는 계산을 거쳐서 2D이미지로 변환하여 보여주는(rendering) 시스템이다. VR의 경우 두 개의 분리된 디스플레이에 영상을 보여준다는 차이가 있을 뿐 2D이미지로 변환하여 보여주는 컨셉에는 차이가 없다.
 
3. __images may be stored for viewing later or displayed in real-time__
 보여줄 이미지를 나중을 위해 저장하고 있거나 실시간으로 표출한다. 바꿔 말하면 2D 이미지를 지속적으로 생산하여 표출을 해 버퍼 등에 저장하며, 이를 실시간으로 또는 특정한 시간간격으로 표시함으로서 사용자가 영상의 움직임을 느낄 수 있도록 할 수 있다.

이어지는 항목은 3D 그래픽 프로그래밍을 하기 위한 기본 개념에 대한 간략한 소개이다.

#### 3D Coordinate Systems
일반적인 PC Application 또는 Mobile Application은 x와 y좌표로 구성된 2좌표계 위에 펜 또는 붓(brush)등을 이용하여 그래픽을 표현한다. 3D 좌표계(3D Coordinate system)은 이 2D 좌표계에 깊이(z-axis) 개념이 추가된 좌표계라고 볼 수 있다. 3D 좌표계는 다시 z축의 방향에 따라 z 축의 양의 방향이 모니터 안쪽으로 들어가는 왼손 좌표계(left-handed)와 z 축의 양의 방향이 모니터 전면을 향하는 오른손 좌표계로 나눌 수 있다. DirectX에서는 왼손좌표계를 사용하며 OpenGL에서는 왼손/오른손 좌표계를 선택적으로 사용 할 수 있다.

![3d coordinate system](http://cfile1.uf.tistory.com/image/185C09364F2D6E80048360)

#### Meshes, Polygons, and Vertics

3D 그래픽을 표현하기 위해서 일반적으로 가장 많이 사용되는 객체가 __메쉬(Mesh)__이다. 이 메쉬는 삼각형 모양의 면을 조합하여 만들며, 이 때 면을 이루는 삼각형을 각각 __폴리곤(Polygon)__이라고 부른다. 다시 이 폴리곤은 세 개의 끝점을 이루어진 선분으로 둘러쌓여 있어서 이 각 끝점끼리 연결되어 메쉬를 이루게 되며, 이때 메쉬를 이루는 선분의 끝점을 __버텍스(Vertex)__라고 부른다.

![mesh](http://cfile9.uf.tistory.com/image/1370A3344F2D42D4111D17)

#### Material, Texture, and Lights
3D 객체인 메쉬는 그 표면의 위치에 따라 특정한 색이라던가, 문양, 빛의 반사/흡수 등의 속성을 가질 수 있다. __텍스쳐(Texture)__란 메쉬의 표면에 정의된 1, 2, 3, 4 차원의 정보를 가진 비트맵 이미지라고 볼 수 있다. 이러한 텍스쳐는 폴리곤 단위로 정의되기도 하며, 이러한 하나이상의 텍스쳐 이미지를 모아놓은 것을 텍스쳐 맵(Texture map)이라고 부르기도 한다. __마테리얼(Material)__은 일반적인 의미로 빛과 상호작용하는 상수들의 모임이라고 볼 수 있다. 여기에는 주변광(ambient), 확산(diffuse), 반사(specular)등이 포함된다.

![texture](http://img.tfd.com/cde/TEXTMAP.GIF)

![material](http://lh5.ggpht.com/_QLwms0mVa4w/Sfn4HH_HGxI/AAAAAAAAAS4/ZpGr11BjJVk/component.jpg)

#### Transform Matrices

3D 객체인 메쉬는 3차원공간의 위치로 정위된 버텍스(vertex)로 구성되어 있다. 이 버텍스의 위치관계에 따라 폴리곤이 구성되어 메쉬의 위치(position) 및 회전(rotaion), 크기(scaling)가 결정되게 된다. 때문에 대부분의 3차원 시스템에서는 __Transform__을 지원하여 메쉬안의 버텍스의 관계를 제어함으로서 메쉬를 표현한다. 

아래 그림은 3차원 공간에서의 메쉬의 Transform을 표현한 예시이다. 가운데 정육면체 모양의 메쉬를 기준으로하여 왼쪽 메쉬는 x 방향으로 -4만큼 이동하고, x축과 y축을 기준으로 각각 pi/8 라디안만큼 회전한 모양이다.  가장 오른쪽에 위치한 메쉬는 역시 가운데 메쉬를 기준으로 x/y/z 모든 축의 방향으로 1.5배씩 크기를 확대한 것이다.

![transform](https://www.safaribooksonline.com/library/view/programming-3d-applications/9781449363918/figs/p3da_0105.png)

이런 3차원 공간의 Transform은 보통 __Transform Matrix__ 라는 행렬 형태로 표현된다. 가장 많이 사용되는 Transform matrix는 아래와 같은 4x4 크기의 행렬이다. 이 행렬의 각각의 요소는 다음과 같은 의미를 지닌다.

* m~12~, m~13~, m~14~ : 각각 x,y,z 방향으로의 이동 값 (position)
* m~0~, m~5~, m~10~ : 각각 x,y,z 방향으로의 크기 값 (scaling)
* m~1~/m~2~(x 방향), m~4~/m~6~(y 방향), m~8~/m~9~(z 방향) : 회전 값 (rotaion)

![transform matrix](https://www.safaribooksonline.com/library/view/programming-3d-applications/9781449363918/figs/p3da_0106.png)

#### Camera, Perspective, Viewports, and Projections

앞서 3D Graphics의 정의에서 언급한 바와 같이 3D Graphics는 결국 3차원의 입체를 2D 이미지로 표현하는 과정을 포함한다. 이 경우 어느방향에서 바라본 모습(Field of views)을 보여줄 지를 결정하기 위해 __카메라(Camera)__라는 객제를 이용한다. 카메라는 일반적으로 위치(position)와 회전(orienration)의 두 속성으로 이루어지며, 이 카메라가 바라보는 방향에서 실제 출력(drawing to viewport)이 되는 영역을 __Projection__이라고 한다.

아래는 Camera, Viewport 그리고 Projection에 대한 개념을 표현한 그림이다. 카메라는 3차원 좌표로 표현되는 위치와 방향을 가지며, 이때 카메라가 바라보는 방향의 시야각을 FOV(Vield of View)라고 부른다. 이 카메라의 시선방향의 FOV에 해당하는 면(최종적으로 2D이미지로 렌더링 되는 평면)을 __Viewport__라고 한다. 이 때, 초점거리 및 시야의 한계에 의해 생기는 가시영역을 정의 할 수 있어서, 초록색과 빨간색 사각형으로 표시된 시야영역의 한계를 각각 표현의 근거리한계(near clipping screen)과 원거리한계(far clipping screen)이라고 하며, 이 시야영역으로 둘러쌓인 렌더링 대상이 되는 3D객체가 존재하는 공간을 __View frustum__이라고 부른다.

![projection](https://www.safaribooksonline.com/library/view/programming-3d-applications/9781449363918/figs/p3da_0107.png)

## 2. Setreoscopic Display
VR을 표현하기위한 3D 렌더링 방법 또한 앞서 설명한 Camera, Viewport 그리고 Projection을 통해여 구현 할 수 있다. 다시 말해 Stereoscopic을 구현하려면 이 렌더링 과정을 각각의 눈에 할당된 디스플레이별로 두번~(사람의 눈은 2개이므로..)~ 수행하면된다. 이를 구현하는 데에는 여러가지 방법이 있지만 가장 단순한 방법으로는 다음과 같은 과정으로 시작 할 수 있다.

* __시뮬레이션을 위한 1개의 메인카메라 정의__
 VR 애플리케이션을 개발한다고 처음부터 두 눈을 고려할 필요는 없다. 처음에는 하나의 카메라를 통해 3D 모델을 구성하고, 동작을 정의하며, 각종효과나 지형 충돌과 같은 물리동작등을 구현한다. 이렇게 개발된 애플리케이션은 하나의 애플리케이션 안에서 VR버전과, 일반 버전의 애플리케이션 모두를 지원하도록 할 수 있다.

* __2개의 카메라를 이용한 렌더링__
 앞서 벙의한 메인 카메라의 위치에 메인카메라와 방향(orientation)이 같고 위치가 약간 차이나는(위상차를 가지는) 2개의 카메라를 추가로 배치한다. 이 때 두 카메라의 거리가 멀어질 수록 위상차가 크게 발생하며 따라서 사용자가 느끼는 입체감의 깊이가 달라지므로 사용자의 설정에 따라 카메라의 거리를 조정 할 수 있도록 구현하는 방법을 고려해 보는 것도 좋을 것이다.

* __Viewport 구성__
 추가로 배치한 카메라는 출력할 화면을 반으로 나누워 각각 절반의 오프셋(offset)을 가지고 왼쪽과 오른쪽 눈에 해당하는 영상을 출력해 준다. 이 때 사용자의 시야각에 따른 일그러짐(Distorsion)을 보정하기 위해 고려하여 표현할 수 있으며 이는 VR SDK에서 일반적으로 지원하는 기능을 사용하면 어렵지 않게 구현 할 수 있다.

![stereo camera](https://developer.oculus.com/images/documentation/intro-vr/latest/inter-camera-distance.png)

## 3. Motion Tracking
사람의 몸의 움직임은 3방향의 이동과 3방향의 회번으로 구성된 6개의 파리메터로 정의 할 수 있다. VR이 사용자의 시점에 따른 화면전환을 하고자 할 경우 이러한 사용자의 움직임을 고려해야 한다.
하지만 VR 애플리케이션이 보여주는 모든 장면에 Motion Tracking이 필요하지 않을 수 있으며, 또한 이러한 시점의 전환및 시야의 방향을 제어하기 위해 사용자에게 불편한 동작을 요구하지 않도록 프로그램을 설계해야 할 것이다.

![cardboard_headtracking](https://material-design.storage.googleapis.com/publish/vr_v_1/vrexternal/0B7WCemMG6e0VN0pfZ1lGS0JBMFk/physiologicalconsiderations_headtracking.png)

#### 시점의 자유도 (Defrees of freedom)
VR을 구현하는 HMD 기기에 따라 지원하는 시점의 자유도가 다를 수 있으며, 시점의 자유도는 다음과 같이 구분 할 수 있다.

##### 3 Degrees of freedom (Orientation tracking)
스마트폰 기반의 대부분의 HMD기기(Geer VR, Cardboard, etc..)는 3축의 모션자유도(3DOF)를 가진다. 이 때 지원하는 움직임은 아래 그림과 같이 x,y,z축 방향의 회전(rotation)에 대한 정보를 포함한다.

![3dof](https://d262ilb51hltx0.cloudfront.net/max/1600/1*bJQluIkWyg3HX2XSCS98CA.jpeg)

##### 6 Degrees of freedom (Orientation + Position tracking)
Oculus Rift 또는 HTC Vive와 같이 고사양의 VR기기는 앞서 언급한 3축 모션자유도와 함께 사용자의 위치(transform)에 따른 3가지정보를 포함하는 6축의 모션자유도(6DOF)를 제공한다.

![6dof](https://d262ilb51hltx0.cloudfront.net/max/1600/1*sNTxX9iMJnE0oWybyTHNBw.jpeg)

이 6축의 모션자유도를 지원하기 위해서 Oculus Rift와 HTC Vive는 별도의 적외선 입력장치를 이용하고 있다. 아래의 첫번째 그림은 Oculus Rift의 적외선 센서 배치이며, 두번째 그림은 HTC Vive의 적외선센서의 배치를 표현하고 있다.

![sendor_oculus](https://d262ilb51hltx0.cloudfront.net/max/1200/1*v-ClTzahcgH9IMJtZR3BAQ.jpeg)

![sensor_vive](https://d262ilb51hltx0.cloudfront.net/max/1200/1*q_mrMtR0g8KGhedW6bzNKw.jpeg)

#### Motion Tracking (via Google Cardboard)
Google Cardboard SDK에는 GyroSensor를 이용할 수 있는 API를 제공하고 있다. 만일 Unity 3D를 이용하여 Cardboard VR 애플리케이션을 개발한다면, 다음과 같이 GyroSensor값을 이용한 HeadTracking을 구현 할 수 있을 것이다.
```C#
// Ref : http://answers.unity3d.com/questions/985989/google-cardboard-not-move-the-camera-when-im-using.html#answer-1092005
// Platform : Cardboard SDK 0.5.2 / Unity 3D (C#)
 #if UNITY_EDITOR

 using UnityEngine; 
 using System.Collections;

 public class GyroscopeEnable : MonoBehaviour
 {    
    private Gyroscope gyro;

     void Start ()
     {
         if (SystemInfo.supportsGyroscope) {
             gyro = Input.gyro;
             gyro.enabled = true;
         }
     }
 }

 #endif
```

#### When does turn off morion tracking
VR 애플리케이션을 개발하다 보면 Motion Tracking이 의도하지 않은 방향으로 동작하는 경우가 있다. 예를 들면, 리소스를 불러오든 도중에 Motion Tracking을 동작 할 경우 시스템자원 부족으로 인한 일시적인 성능 저하로 인해 사용자의 움직임이 Viewport에 실시간으로 적용되지 못해 잠깐씩 멈짓 하는 것처럼 보일 수 있다. 또 다른 경우, 메뉴 등의 2D 화면을 보여주고 있을 때에는 Motion Tracking이 오히려 사용성에 나쁜 영향을 줄 수도 있다. 따라서 Motion Tracking은 항상 적용하는 것이 아닌, 사용자에게 제공하는 장면(Scene)이 무엇인지를 고려하여 필요할 때에는 기능을 꺼 두는 것이 더 좋은 사용자 경험을 제공하는 방법이 될 수 있다.

![2d_screen](https://material-design.storage.googleapis.com/publish/vr_v_1/vrexternal/0B7WCemMG6e0VUGlJT2s3WjQzYjg/physiologicalconsiderations_headtracking_2d.png)

#### User experience
VR 기기를 이용하는데 있어 사용자가 불편을 느끼는 것에는 여러 요소가 있을 수 있다. 일부 이용자들은 VR기기를 착용했을 때 어지러움을 느낄 수 있으며, 대부분의 VR기기가 HMD형태로 머리에 장착되어 시야를 가릴뿐 아니라 목에 부담을 줄 수 있다. 아래는 보다 편안한 사용자 경험을 제공하기 위해 고려해야 할 사항을 정리 한 것이다.

##### 편한안 사용자 경험 제공
Google I/O에서 [Alex의 발표 영상](https://youtu.be/Qwh1LBzz3AU?t=18m12s)을 요약하자면 VR애플리케이션의 향상된 사용자 경험을 위해서는 다음 두 가지를 고려해야 한다고 한다.

* Frame drop을 유발하지 말 것
* Head Tracking을 관리(maintain)할 것

무거운 리소스 및 오브젝트의 사용으로 인해 화면의 재생빈도(FPS)가 떨어지거나, 과도한 Head Tracking으로 Viewport가 빈번하게 움직 일 경우 사용자가 어지러움을 느낄 확률이 올라간다. 따라서 VR애플리케이션을 개발 할 때에는 항상 영상의 품질과 기기의 성능 사이에서 적절한 타협점을 찾는 노력을 해야 할 것이다.

##### HMD 착용자의 시점에 대한 고려
일반적으로 사람의 시야는 모든 면에서 고른해상도를 보이지는 않는다. 아래 그림과 같이 주시방향에 가꾸운 쪽인 초록색으로 표시되는 영역을 인지할 때의 애상도가 더 높은 편이며, 붉은색 쪽으로 갈 수록 해상력이 떨어지게 된다. 따라서 주요한 오브젝트는 HMD의 전방 주시방향에 배치하고 시야 가장자리의 오브젝트의 제어를 지양하는 뱡향으로 애플리케이션을 개발해야 할 것이다.

![fov](https://d262ilb51hltx0.cloudfront.net/max/1600/1*XJwTciYJOXlJMu62D1vDNw.jpeg)

##### HMD 착용자의 자세에 대한 고려
사람의 머리는 전체 체중대비 굉장히 무거운 편이다. 사람이 고개를 앞으로 숙이고 있을 경우 목에 상당한 부하가 작용하며 HMD기기를 착용하고 있을 경우 이는 더 큰 문제가 된다. 아래 그림은 머리의 각도에 따라 목에 가해지는 부하를 나타낸 그림으로, 30도 만큼 고개를 숙이고 있을 경우 40lbs(약 18.14kg)의 부하를 목이 지탱하고 있음을 보여준다. 사용자가 고개를 숙이고 있는 자세를 오래 요구 할 경우 애플리케이션을 이용할 때의 피로도가 증가함은 물론 이용자의 건강에 좋지 않은 영향을 줄 수 있다.

![weight_hmd](https://d262ilb51hltx0.cloudfront.net/max/1600/1*TxrR4g5d6HZVhBN0nyRwcA.jpeg)

## References
1. https://en.wikipedia.org/wiki/3D_computer_graphics
2. http://blog.goldface.kr/9
3. http://stackoverflow.com/questions/4262503/whats-the-difference-between-material-and-texture
4. https://www.safaribooksonline.com/library/view/programming-3d-applications/9781449363918/ch01.html
5. https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_app_imaging/
6. https://www.google.com/design/spec-vr/designing-for-google-cardboard/physiological-considerations.html#
7. https://medium.com/google-design/from-product-design-to-virtual-reality-be46fa793e9b#.g6nmtqex8