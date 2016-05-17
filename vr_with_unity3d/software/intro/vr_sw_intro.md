# VR Sofrware 개요

## Virtual Reality의 구성요소
가상현실(Virtual Realiry, 이하 VR)은 기기 또는 소프트웨어를 이용하여 그 대상이 되는 사람에게 __마치 사실인것처럼 그럴듯한__ 시각적 경험을 제공하는것이 목적이다.
VR이 이러한 사용자경험을 제공하기 위해서 다음과 같은 기술을 필요로 한다.

### 1. Stereoscopic displays
 사람은 두 눈으로 입력받는 영상의 위상차에 따라 공간감을 느끼게 된다. 이를 이용하여 3D 입체감을 제공하는 기술을 스테레오스코픽(Stereo scopic)이라고 한다. 일반적으로 머리에 안경 또는 헬멧 형태로 장착하여 두 눈에 각기 다른 디스플레이를 보여주는 형태의 HMD(Head Mount Display)를 이용하여 VR을 구현한다. VR Software는 HMD와 같이 Stereoscopic을 구현할 수 있는 기기에 각각의 디스플레이에 보여지는 영상을 제어함으로서 사용자에게 가상의 공간을 체험할 수 있는 경험을 제공 할 수 있다.
 
![stereoscopic diaplsy](http://www.wareable.com/media/images/2014/10/windlands-oculus-rift-1-1412334393-0NUf-column-width-inline.jpg)

### 2. Motion tracking 
 VR을 체험하는 사용자의 시점을 제어하기 위해서는 사용자가 향하고 있는 몸의 방향이나 머리의 기울기를 감안하여 HMD의 화면을 제어 할 필요가 있다. 이 Motion tracking을 위해서는 Gyroscope, Accelerometer, Compas(Magnetic secsors) 등의 각종 센서와 이 센서들로부터 들어온 데이터를 Calibration하는 기술과 이렇게 얻어진 시점방향에 맞는 영상을 재생해 줄 수 있는 Software가 필요하다.

![oculus rift sensor](https://d3nevzfk7ii3be.cloudfront.net/igi/J6nl4bbTpAiDli5k.medium)

### 3. Input Devices
VR환경에서는 기존 PC또는 모바일 환경과는 다른 입력방식이 요구된다. 이는 VR기기의 대부분이 이용자의 시야를 완전히 가리고 있는 형태로 구성되어 있기 때문에며, 따라서 특정키 입력 방식 이외의 다양한 입력기기에 대한 제어를 요구하고 있다.

![htc vive](http://cdn.mos.techradar.com/art/Wearables/HTC/Vive%20Pre/HTC%20Vive%20Pre%20review07-970-80.JPG)

![leap vr](http://www.roadtovr.com/wp-content/uploads/cache/2014/12/leapmotion3djam/3334760298.jpg)

### 4. Desktop or Mobile platform
초창기 VR 시스템은 고사양의 Desktop platform을 필요로 했으나, 최근 PlayStation과 같은 비디오게임기나 GearVR 등의 모바일 기기의 VR지원으로 인해 VR 을 이용할 수 있는 플랫폼이 확대대되 있다. VR Software는 사용자에게 보다 편안한 VR경험을 제공하기위해 항상 플랫폼을 고려하여 리소스를 최적화 할 필요가 있다.

![card board](https://developers.google.com/cardboard/images/hero.jpg)


