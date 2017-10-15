AFRAME.registerComponent("navigator", {
	schema: {
		destination: {
			type: "vec3"
		},
		direction: {
			type: "vec3"
		},
		speed: {
			default: 0.1
		},
		atDestination: {
			default: true
		}
	},
	init: function(){
		const fps = 1000 / 120;
		AFRAME.utils.bind(this.moveTo, this);
		this.slowTick  = AFRAME.utils.throttle(this.move, fps, this);
		this.resolver = false;
	},
	play: function(){

	},
	tick: function(){
		this.slowTick();
	},
	move: function(){
		if(!this.data.atDestination){
			const element     = this.el;
			const data        = this.data;
			const speed       = data.speed;
			const destination = data.destination;
			const currentPos  = element.object3D.getWorldPosition();

			const distance = {
				x: currentPos.x - destination.x,
				y: currentPos.y,
				z: currentPos.z - destination.z
			};

			if(distance.x < 0.5 && distance.x > -0.5){
				this.data.atDestination = true;
				this.resolver(true);
			} else {
				const newPos     = {
					x: currentPos.x - (this.data.direction.x * speed),
					y: currentPos.y,
					z: currentPos.z - (this.data.direction.z * speed)
				};
				element.setAttribute("position", newPos);
			}
		}
	},
	moveTo: function(destination){
		return new Promise((resolve, reject) => {
			const element    = this.el;
			const currentPos = element.object3D.getWorldPosition();
			//get destination as vec3
			let targetPos;
			if(Number.isInteger(destination.x)){
				targetPos = destination;
			} else {
				const targetEl = document.querySelectorAll(destination)[0];
				targetPos = targetEl.object3D.getWorldPosition();
			}
			this.data.atDestination = false;
			this.data.destination = targetPos;


			const absoluteDirection = new THREE.Vector3(
				currentPos.x - targetPos.x, 
				currentPos.y, 
				currentPos.z - targetPos.z
			);

			this.data.direction   = absoluteDirection.normalize();
			this.resolver = resolve;
		})
	}
});