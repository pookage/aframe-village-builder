AFRAME.registerPrimitive("a-windmill", {
	defaultComponents: {
		windmill: {},
		geometry: {
			primitive: "box",
			height: 30,
			width: 10,
			depth: 10
		},
		material: {
			color: "#FFF"
		},
		shadow: {},
		status_ui: {
			rotation: {
				x: -90,
				y: 0,
				z: 0
			}
		}
	},
	mappings: {
		wheat: "windmill.wheat",
		flour: "windmill.flour"
	}
})
AFRAME.registerComponent("windmill", {
	schema: {
		wheat: {
			default: 0
		},
		flour: {
			default: 0
		}
	},
	init: function(){

		const element = this.el;
		AFRAME.utils.bind(this.getMainComponent, this)
		element.getMainComponent = this.getMainComponent.bind(this);

	},
	play: function(){
		const element = this.el;
		const { width, depth } = element.getAttribute("geometry");
		AFRAME.utils.entity.setComponentProperty(element, "status_ui.offset", { x: (width/2) + 0.5, y: 0.05, z: (depth/2) + 0.5 })
	},
	getMainComponent: function(){
		return this;
	}
})