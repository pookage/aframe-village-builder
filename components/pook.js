AFRAME.registerPrimitive("a-pook", {
	defaultComponents: {
		pook: {},
		status_ui: {
			follow_camera: true,
			offset: {
				x: 0,
				y: 1,
				z: 0
			}
		},
		brain: {},
		navigator: {},
		task_manager: {},
		geometry: {
			primitive: "box",
			width: 0.6,
			depth: 0.6,
			height: 1.2
		},
		shadow: {},
		material: {}
	},
	mappings: {
		health: "pook.health",
		hunger: "pook.hunger"
	}
})
AFRAME.registerComponent("pook", {
	schema: {
		health: {
			default: 100
		},
		hunger: {
			default: 100
		},
		role: {
			default: "courier"
		},
		inventory: {
			default: new Array(3)
		}
	},
	init: function(){

		AFRAME.utils.bind(this.getMainComponent, this)
		this.el.getMainComponent = this.getMainComponent.bind(this);
	},
	play: function(){
		const element  = this.el;
		const position = element.getAttribute("position");
		const height   = AFRAME.utils.entity.getComponentProperty(element, "geometry.height");
		const yOffset  = (height/2) + 0.05;
		position.y     = yOffset;

		element.setAttribute("position", position);
	},
	getMainComponent: function(){
		return this;
	}
})