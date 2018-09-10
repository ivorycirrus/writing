# ML Kit을 사용한 바코드 인식 애플리케이션 만들기
![ML Kit](images/mlkit02_01.png)




## 1. 들어가며

 2018년 5월, 구글의 개발자 행사인 Google I/O에서는 모바일환경을 고려한 머신러닝 서비스로 ML Kit을 발표했다. 이는 기존에 서비스하던 Google Vision API를 확장하여 범용성있는 몇 가지 기능을 API형식으로 제공하며 개발자가 직접 작성한 머신러닝 모델도 서비스할 수 있는 모바일과 클라우드를 고려한 플랫폼으로 구성되어 있다. 

 이 글을 통해 MLKit을 처음으로 시작하는 개발자를 대상으로 하며, 입문 수준의 안드로이드 애플리케이션 개발지식을 요구한다. 이 글 에서는 ML Kit을 적용하는 방법의 가장 간단한 예로 바코드를 인식하는 샘플 프로젝트를 작성 해 볼 것이다. 갓 생성한 빈 프로젝트를 기준으로하여 카메라로부터 영상을 얻어오는 방법, 영상을 ML Kit에 전달해서 분석한 결과를 얻어오는 방법, 그리고 결과로 얻은 정보를 프리뷰화면에 오버레이로 덧입히는 방법을 단계별로 소개 할 것이다. ML Kit의 API는 넓은 범위에서 보면 영상으로부터 정보를 얻어내는 과정이므로, 바코드 인식 API 이외에도 ML Kit의 다른 API를 개발함에 있어서 이 글이 참고할만한 시작점이 되길 기대한다.

 이 글에서 다룰 애플리케이션의 기능은 다음과 같다.
 * 카메라 프리뷰를 실시간으로 화면에 표시
 * ML Kit을 이용하여 실시간으로 도서분류코드(ISBN)정보가 담긴 바코드를 인식
 * 인식한 바코드 번호 및 영상내 위치를 프리뷰 화면에 오버레이로 표시

 해당 애플리케이션의 코드는 아래 Github 저장소에 공유하고 있다. 해당 프로젝트를 컴파일하여 설치 및 테스트 하고자 할 경우 Firebase 콘솔에 로그인 가능한 구글계정이 필요하다.
 
| Example code  : on Github                                    |
| ------------------------------------------------------------ |
| [https://github.com/ML4Mobile/MLKitBarcodeAndroid](https://github.com/ML4Mobile/MLKitBarcodeAndroid) |


## 2. 카메라 프리뷰
바코드를 인식하기 위해서는 먼저 카메라를 통해 영상정보를 얻어와야 한다. 이번 챕터에서는 안드로이드 기기의 카메라를 초기화하고 프리뷰영상을 실시간으로 화면에 표시하는 방법에 대해 알아 볼 것이다. 안드로이드의 카메라API 활용에 익숙하다면 다음 챕터인 '3. ML Kit을 이용한 바코드인식' 부터 시작해도 좋다.

여기서 소개할 카메라API는 안드로이드 4.x버전 까지는 카메라 영상을 얻어오기 위해 사용했던 ```android.hardware.camera```패키지에 포함된 API다. 현재 카메라를 제어하기 위해 권장되는 방식은 안드로이드 5.0(Lollipop, API21) 이후부터 사용가능한 ```android.hardware.camers2```패키지이며, camera2가 이전의 camera에 비해 비동기패턴 적용 및 기능 확장측면에서 용이하다는 장점이 있다. 하지만 프리뷰를 표시하는 수준의 간단한 애플리케이션을 작성하는 데에는 이전버전의 camera 패키지를 이용하는 것이 프로그램 구조가 더 간단하기에 본 글에서는 ```android.hardware.camera```패키지의 API를 이용하여 프리뷰 영상을 가져올 것이다. 또한 프리뷰 영상은 스마트폰의 화면방향(screen orientation)과 무관하게 가로방향으로 고정되어 있어서 화면방향에 따른 계산을 직접 해 주어야 한다. 이 글에서는 화면을 세로(portrait)로 고정한 상태로 제한하여 프리뷰 영상을 얻어오고자 한다.

이 글의 예제에서 더 나아가, 화면회전을 고려하는 ```android.hardware.camera2``` API를 사용한 예제가 필요한 경우 [ML Kit for Firebase Quickstart](https://github.com/firebase/quickstart-android/tree/master/mlkit)를 참고하도록 하자.


### 2.1 카메라 권한 설정
안드로이드 앱에서 카메라를 사용하려면 AndroidManifest.xml에 사용권한을 등록해야 한다. 또한 안드로이드 6.0 이상에서 실행하려면 카메라 API호출 이전에 사용자에게 명시적으로 사용권한에대한 승인을 받아야 한다. ML Kit의 프리뷰 화면 역시 카메라API를 사용해야 하므로 아래와 같이 사용권한에 대한 코드를 작성해야 한다.

***AndroidManifest.xml***
```xml
<!-- AndroidManifest.xml -->

    <uses-permission android:name="android.permission.CAMERA" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
```

***MainActivity.java***
```java
/** Request permission and check */
private boolean isPermissionGranted(){
	int sdkVersion = Build.VERSION.SDK_INT;
	if(sdkVersion >= Build.VERSION_CODES.M) {
		//Android6.0(Marshmallow) 이상인 경우 사용자 권한 요청
		if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
			ActivityCompat.requestPermissions(MainActivity.this, REQUEST_PERMISSIONS, RESULT_PERMISSIONS);
			return false;
		} else {
			return true;
		}
	}else{
		//Android6.0(Marshmallow) 이하는 권한확인 안함
		return true;
	}
}

/** Post-process for granted permissions */
@Override
public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
	if (RESULT_PERMISSIONS == requestCode) {
		if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
			// Permission granted
			startCameraPreviewActivity();
		} else {
			// Rejected
			Toast.makeText(this, R.string.err_permission_not_granted, Toast.LENGTH_SHORT).show();
		}
		return;
	}

}
```


### 2.2 카메라 초기화
안드로이드 기기에는 일반적으로 하나 이상의 카메라가 장착되어 있다. 여기에서는 안드로이드 기기에 장착된 후면카메라로부터 영상을 가져오고자 한다. 기기에 장착된 카메라정보를 확인해서 후면카메라가 있는경우 장치에 접근해서 ```Camera```객체를 반환하는 함수를 다음과 같이 작성할 수 있다.

***CameraPreviewActivity.java***
```java
/** Get facing back camera instance */
public static Camera getCameraInstance()
{
	int camId = -1;
	Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
	for (int i = 0; i < Camera.getNumberOfCameras(); ++i) {
		Camera.getCameraInfo(i, cameraInfo);
		if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_BACK) {
			camId = i;
			break;
		}
	}

	if(camId == -1) return null;

	Camera c=null;
	try{
		c=Camera.open(camId);
	}catch(Exception e){
		e.printStackTrace();
	}
	return c;
}
```


### 2.3 프리뷰 영상을 표시할 SurfaceView 작성
카메라 프리뷰를 보여주는 뷰는 보편적인 안드로이드 UI를 그리는 것에 비해 매우 빠르게 화면을 새로 그려줘야 한다. 이런 경우 안드로이드에서는 SurfaceView를 사용해야 하며, 카메라의 영상을 SurfaceView의 SurfaceHolder에 넘겨서 보다 빠르게 화면에 표시될 수 있도록 하는 방법을 사용한다. 이에 SurfaceView 클래스를 상속받아 카메라 영상을 표시할 클래스를 작성해 보고자 한다.

여기에서는 SurfaceView를 상속받는 CameraView 클래스를 작성해 보고자 한다. 여기에 SurfaceView를 실질적으로 갱신해 주는 역할을 하는 SurfaceHolder의 Callback인터페이스를 구현하여 카메라의 영상데이터를 SurfaceView로 전달 해 주는 사용자정의 뷰를 작성할 것이다. 


#### 2.3.1 View의 생성과 소멸
생성자에서는 View를 생성할 Context와 함께 영상을 가져올 카메라객체를 파라메터로 받고 있다. 그 아래로 SurfaceHolder.Callback인터페이스의 함수를 구현하여 View의 생성과 소멸에 따라 카메라리소스를 가져오고 반환하는 동작을 수행 할 것이다.

***CameraView.java***
```java
public class CameraView  extends SurfaceView implements SurfaceHolder.Callback{
	public CameraView(Context context, Camera camera){
		//생성자
	}
	
	@Override
    public void surfaceCreated(SurfaceHolder holder) {
        // SurfaceView가 만들어질 때 호출됨
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        // SurfaceView가 없어질 때 호출됨
    }


    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {
		// SurfaceView의 크기가 바뀔 때 호출 됨
	}
}
```

#### 2.3.2 카메라 프리뷰 시작
SurfaceView가 생성되고 View가 화면에 배치되면, 배치된 View크기를 파라메터로 해서 ```surfaceChanged()```함수가 불리게 된다. 화면의 View크기변화에 따라 카메라 프리뷰의 크기 및 비율을 지정해서 영상정보를 가져올 수 있다. 일단 SurfaceView의 크기가 바뀌면 (View가 처음으로 표시된다던지, 화면회전으로 가로세로 비율이 바뀐다던지) preview를 중지하고 카메라의 파라메터를 재설정한 후 프리뷰를 다시 시작한다. 이 때 설정하는 값은 다음과 같다.

* ```setPreviewFormat(ImageFormat.NV21)``` : 카메라로부터 가져올 영상의 포맷을 의미한다. [NV21](http://www.fourcc.org/pixel-format/yuv-nv21/)은 영상분야에서 사용하는 색표현방식으로 YUV420SP 라고도 불리며 초록색을 밝기값의 기준으로 보고 파랑과 빨강의 밝기차를 샘플링하는 방식중 하나이다. 우리는 영상정보를 사진이나 동영상으로 저장할 것이 아닌 견산용으로 사용할 것이기 때문에 다른 가공없이 YUV포맷의 데이터로 가져오고자 한다.
* ```parameters.setPreviewSize(w,h)``` : 카메라로부터 가져올 프리뷰 영상의 크기를 설정한다. 픽셀단위의 너비와 높이 값을 입력으로 받으며, 안드로이드의 카메라API는 항상 가로모드(landsacpe)를 기준으로 크기 및 위치를 계산한다는 것을 고려해야 한다. 또한 카메라별로 지원가능한 해상도 범위 안에서 설정해야 하며, 지원가능한 해상도의 목록은 ```Camera.Parameters.getSupportedPreviewSizes()``` 함수를 이용하여 얻어올 수 있다. 예제코드에서는 ```CameraView```클래스의 클래스변수로 ```PREVIEW_WIDTH```와 ```PREVIEW_HEIGHT```에 희망하는 크기를 선언했으며, ```findSuitablePreviewSize()```에서 카메라의 지원가능한 해상도 목록에서 가장 유사한 크기로 프리뷰 영상을 설정했다.

* ```setFocusMode(FOCUS_MODE_CONTINUOUS_VIDEO)``` : 자동초점 기능을 동영상모드로 설정한다. 사물과 카메라의 거리가 시시각각 변하는 영상의 경우 일정 거리에 초점을 고정하면 선명한 영상을 얻기가 어렵다. 카메라의 움직임에 맞춰 자동초점기능이 유기적으로 동작 할 수 있도록 초점모드를 동영상모드로 설정한다.

* ```mCamera.setDisplayOrientation(SCREEN_ORIENTATION)``` : 프리뷰 영상을 표시할 때 영상을 어느 방향으로 회전시켜서 보여줄지를 의미한다. 카메라에서 얻어온 프리뷰영상은 가로방향이지만, 앱에서 보여줄 때에는 세로방향(portrait)으로 표시해야 하므로 회전값에 90을 넣어준다.

* ```setPreviewCallback(mPreviewCallback)``` : 프리뷰 화면이 업데이트 될 때마다 호출할 콜백인터페이스를 등록한다. 실시간으로 영상에서 바코드를 인식하기 위해서는 프리뷰영상이 변화할 때마다 그 순간의 정지영상 안에서 바코드 정보를 읽어내면 될 것이다. 따라서 정지된 이미지데이터 안에서 바코드를 인식하는 기능이 포함된 인터페이스 객체를 이곳에서 등록하면 영상이 변할 때마다 이미지 데이터를 공급받아서 해당 로직을 수행 할 수 있을 것이다.

* ```startPreview()``` : 카메라 프리뷰영상을 가져오기 시작한다. 이 때부터 카메라 영상 스트림이 열리며 이와 연결된 동작이 실행되기 시작한다.

***CameraView.java***
```java
@Override
public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {
	try{
		mCamera.stopPreview();
	} catch (Exception e){
		e.printStackTrace();
	}
	try{
		// Start set-up camera configurations
		Camera.Parameters parameters = mCamera.getParameters();

		// Set image format
		parameters.setPreviewFormat(ImageFormat.NV21);

		// Set preview size (find suitable size with configurations)
		mPreviewSize = findSuitablePreviewSize(parameters.getSupportedPreviewSizes());
		parameters.setPreviewSize(mPreviewSize.width, mPreviewSize.height);

		// Set Auto-Focusing if is available.
		if (parameters.getSupportedFocusModes().contains(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO)) {
			parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);
		}

		// Adapt parameters
		mCamera.setParameters(parameters);

		// Set Screen-Mode portrait
		mCamera.setDisplayOrientation(SCREEN_ORIENTATION);

		// Set preview callback
		// When the preview updated, 'onPreviewFrame()' function is called.
		mCamera.setPreviewCallback(mPreviewCallback);

		// Show preview images
		mCamera.startPreview();
	}catch(Exception e){
		e.printStackTrace();
	}
}
```


#### 2.3.3 프리뷰 크기 조정
앞에서 설정한 카메라 프리뷰 영상은 개발자가 임의로 선택한 크기의 영상을 얻어오고 있다. 화면에 꽉 찬 크기로 영상을 보여주기 위해서는 실제 화면의 해상도를 고려해서 View의 크기를 조정해 줘햐 할 필요가 있다. 따라서 View의 ```onMeasure()``함수를 오버라이드 하면 프리뷰 영상의 가로세로 비율을 유지하면서 실제 화면크기에 최대한 꼭 맞게 표시되도록 크기를 조정해 줄 수 있다.

***CameraView.java***
```java
/** Calculate preview size to fit output screen */
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
	double originalWidth = MeasureSpec.getSize(widthMeasureSpec);
	double originalHeight = MeasureSpec.getSize(heightMeasureSpec);

	// Switch width and height size for portrait preview screen.
	// Because the camera stream size always assume landscape size.
	int DISPLAY_WIDTH = PREVIEW_HEIGHT;
	int DISPLAY_HEIGHT = PREVIEW_WIDTH;
	if(mPreviewSize != null) {
		DISPLAY_WIDTH = mPreviewSize.height;
		DISPLAY_HEIGHT = mPreviewSize.width;
	}

	// Consider calculated size is overflow
	int calculatedHeight = (int)(originalWidth * DISPLAY_HEIGHT / DISPLAY_WIDTH);
	int finalWidth, finalHeight;
	if (calculatedHeight > originalHeight) {
		finalWidth = (int)(originalHeight * DISPLAY_WIDTH / DISPLAY_HEIGHT);
		finalHeight = (int) originalHeight;
	} else {
		finalWidth = (int) originalWidth;
		finalHeight = calculatedHeight;
	}

	// Set new measures
	super.onMeasure(
			MeasureSpec.makeMeasureSpec(finalWidth, MeasureSpec.EXACTLY),
			MeasureSpec.makeMeasureSpec(finalHeight, MeasureSpec.EXACTLY));
}
```

## 3. ML Kit을 이용한 바코드 인식
앞서 2장에서는 카메라로부터 프리뷰 영상을 얻어오는 방법을 알아보았다. 이번 장에서는 이 영상에서 ML Kit의 API를 이용해서 원하는 정보를 추출하고, 다시 영상 위에 해당 정보를 덧씌워서(overlay) 보여주는 코드를 작성해 보고자 한다.

### 3.1 바코드 정보 인식



## 4. 프리뷰 화면에 바코드 정보 표시


## 참고

* [ML Kit for Firebase](https://firebase.google.com/docs/ml-kit/)
* [Google Developers : ML Kit](https://developers.google.com/ml-kit/)
* [ML Kit — Add ML to android with ease](https://medium.com/@pankaj.rai16/ml-kit-add-ml-to-android-with-ease-ab03941e5d9a)
