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


#### Camera, Perspective, Viewports, and Projections


## 2. Setreoscopic Display

## 3. Motion Tracking

## References
1. https://en.wikipedia.org/wiki/3D_computer_graphics
2. http://blog.goldface.kr/9
3. http://stackoverflow.com/questions/4262503/whats-the-difference-between-material-and-texture