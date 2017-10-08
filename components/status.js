AFRAME.registerPrimitive("a-status", {
	defaultComponents: {
		status: {},
		shadow: {
			cast: false,
			receive: false
		}
	},
	mappings: {
		ui_data: "status.ui_data",
		follow_camera: "status.follow_camera"
	}
})
AFRAME.registerComponent("status", {
	schema: {
		ui_data: {
			default: {},
			parse: function(value){
				return JSON.parse(value);
			}
		},
		follow_camera: {
			default: false
		}
	},
	init: function(){

		//scope binding
		const element   = this.el;
		const data      = this.data;
		AFRAME.utils.bind(this.lookAtCamera, this);
		AFRAME.utils.bind(this.hide, this);  element.hide = this.hide;
		AFRAME.utils.bind(this.show, this);  element.show = this.show;

		//setup
		this.slowTick  = AFRAME.utils.throttle(this.updateStats, 1000, this);
		this.isVisible = false;
		this.parent    = element.parentEl;

		//create <a-text> elements for every pice of UI data to show
		const uiData    = data.ui_data;
		const statCount = Object.keys(uiData).length;
		const fragment  = document.createDocumentFragment();
		let position    = { x: 0, y: statCount, z: 0 };
		let textElement, value;
		for(let key in uiData){
			value       = uiData[key];
			textElement = POOKAGE.utils.createElement("a-text", {
				value: `${key} : ${value}`,
				position: position,
				width: 20,
				shadow: "cast: false; receive: false;"
			});
			this[`${key}_el`] = textElement;
			fragment.appendChild(textElement);
			position.y -= 1;
		}

		//make the element stop rendering and scale it down
		this.hide();

		//add status to the parent entity
		element.appendChild(fragment)
	},//init
	tick: function(){
		if(this.isVisible){
			this.slowTick();
			if(this.data.follow_camera){
				this.lookAtCamera();
			}
		}
	},//tick
	updateStats: function(){
		const data = this.parent.getMainComponent().data;
		let key, element, value, checkedValue;
		for(key in data){
			value        = data[key];
			checkedValue = Number.isInteger(value) ? Math.round(value*100)/100 : value;
			element = this[`${key}_el`];
			
			element.setAttribute("value", `${key} : ${checkedValue}`);
		}
	},//updateStats
	lookAtCamera: function(){
		const element        = this.el;
		const cameraPosition = element.sceneEl.camera.el.object3D.position;
		element.object3D.lookAt(cameraPosition);
	},//lookAtCamera
	hide: function(){
		const element   = this.el || this;
		const component = element.components.status;
		const children  = element.children;

		for(let child of children){
			child.setAttribute("visible", false);
		}

		element.setAttribute("visible", false);
		element.setAttribute("scale", {x: 0, y: 0, z: 0});

		component.isVisible = false;
	},//hide
	show: function(){
		const element   = this.el || this;
		const component = element.components.status;
		const children  = element.children;

		for(let child of children){
			child.setAttribute("visible", true);
		}

		element.setAttribute("visible", true);
		element.setAttribute("scale", {x: 1, y: 1, z: 1});

		component.isVisible = true;
	}//show
})