AFRAME.registerPrimitive("a-user-camera", {
	defaultComponents: {
		camera: {
			fov: 60
		},
		"wasd-controls": {
			acceleration: 150,
			easing: 5
		},
		"look-controls": {},
		position: {
			x: 0,
			y: 15,
			z: 0
		},
		rotation: {
			x: -30,
			y: 0,
			z: 0
		}
	}
});