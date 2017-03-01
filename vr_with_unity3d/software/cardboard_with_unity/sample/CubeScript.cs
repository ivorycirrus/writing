using UnityEngine;
using System.Collections;

public class CubeScript : MonoBehaviour {

	private Vector3 startingPosition;

	void Start() {
		startingPosition = transform.localPosition;
	}
	
	// Update is called once per frame
	void LateUpdate() {
		GvrViewer.Instance.UpdateState();
		if (GvrViewer.Instance.BackButtonPressed) {
			Application.Quit();
		}
	}

	public void Reset() {
		transform.localPosition = startingPosition;
	}

	public void TeleportRandomly() {
		Vector3 direction = Random.onUnitSphere;
		direction.y = Mathf.Clamp(direction.y, 0.5f, 1f);
		float distance = 2 * Random.value + 1.5f;
		transform.localPosition = direction * distance;
	}
}
