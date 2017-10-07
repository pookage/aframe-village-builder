AFRAME.registerPrimitive("a-pook", {
	defaultComponents: {
		pook: {},
		status_ui: {},
		geometry: {
			primitive: "box",
			width: 0.6,
			depth: 0.6,
			height: 1.2
		}
	},
	mappings: {
		health: "pook.health",
		hunger: "pook.hunger"
	}
})
AFRAME.registerComponent("pook", {
	schema: {
		health: {
			default: 1
		},
		hunger: {
			default: 0
		}
	},
	init: function(){

		AFRAME.utils.bind(this.getMainComponent, this)
		this.el.getMainComponent = this.getMainComponent.bind(this);
	},
	getMainComponent: function(){
		return this;
	}
})