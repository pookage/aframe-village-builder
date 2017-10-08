AFRAME.registerPrimitive("a-crop-field", {
	defaultComponents: {
		crop_field: {},
		geometry: {
			primitive: "plane",
			height: 10,
			width: 10
		},
		status_ui: {},
		material: {
			color: "#888"
		},
		rotation: {
			x: -90,
			y: 0,
			z: 0
		},
		shadow: {}
	},
	mappings: {
		type: "crop_field.type",
		count: "crop_field.count"
	}
});
AFRAME.registerComponent("crop_field", {
	schema: {
		type: {
			default: "oats"
		},
		count: {
			default: 25
		}
	},
	init: function(){
		const element   = this.el;

		AFRAME.utils.bind(this.getMainComponent, this)
		element.getMainComponent = this.getMainComponent.bind(this);

		AFRAME.utils.entity.setComponentProperty(element, "position.y", "0.05")
		
	},
	play: function(){
		const element   = this.el;
		const data      = this.data;
		const cropType  = data.type;
		const cropCount = data.count;
		const container = POOKAGE.utils.createElement("a-entity", {
			rotation: "90 0 0",
			position: "0 0 0"
		});
		const {height, width} = element.getAttribute("geometry");
		const spacing  = 2;
		const cropSize = 1;
		const cropHeight = 2;

		AFRAME.utils.entity.setComponentProperty(element, "status_ui.offset", {x: 0, y: height/2, z: 0})

		let x, y, crop, rotation, cropsPlanted = 0;
		for(x = 0; x < width; x+=spacing){
			for(y = 0; y < height; y+=spacing){
				if(cropsPlanted < cropCount){
					container.appendChild(POOKAGE.utils.createElement("a-crop", {
						type: cropType,
						position: `${x - (width/2) + (cropSize/2)} ${cropHeight} ${y - (height/2) + (cropSize/2)}`
					}));
					cropsPlanted++;
				}
			}
		}
		element.appendChild(container);

	},
	getMainComponent: function(){
		return this;
	}
})