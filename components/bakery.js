AFRAME.registerPrimitive("a-bakery", {
	defaultComponents: {
		bakery: {},
		status_ui: {
			rotation: {
				x: -90,
				y: 0,
				z: 0
			}
		},
		geometry: {
			primitive: "box",
			height: 5,
			width: 10,
			depth: 10
		},
		material: {
			color: "#fff"
		},
		shadow: {}
	},
	mappings: {
		flour: "bakery.flour",
		bread: "bakery.bread"
	}
})
AFRAME.registerComponent("bakery", {
	schema: {
		flour: {
			default: 0
		},
		bread: {
			default: 0
		}
	},
	init: function(){
		const element = this.el;
		AFRAME.utils.bind(this.getMainComponent, this)
		element.getMainComponent = this.getMainComponent.bind(this);
	},
	play: function(){
		const element          = this.el;
		const { width, depth } = element.getAttribute("geometry");
		AFRAME.utils.entity.setComponentProperty(element, "status_ui.offset", { x: (width/2) + 0.5, y: 0.05, z: (depth/2) + 0.5 })
	},
	getMainComponent: function(){
		return this;
	}
})