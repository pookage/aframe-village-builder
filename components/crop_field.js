AFRAME.registerPrimitive("a-crop-field", {
	defaultComponents: {
		crop_field: {},
		geometry: {
			primitive: "plane",
			height: 10,
			width: 10
		},
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
		type: "crop_field.type"
	}
});
AFRAME.registerComponent("crop_field", {
	schema: {
		type: {
			default: "oats"
		},
		height: {
			default: 10
		},
		width: {
			default: 10
		},
		count: {
			default: 25
		}
	},
	init: function(){
		const element   = this.el;
		const data      = this.data;
		const cropType  = data.type;
		const cropCount = data.count;

		AFRAME.utils.entity.setComponentProperty(element, "position.y", "0.03")
		const container = POOKAGE.utils.createElement("a-entity", {
			rotation: "90 0 0",
			position: "0 0 2"
		});
		const height = data.height; //get this from geometry later
		const width = data.width;  //get this from geometry later
		//const {height, width} = element.getAttribute("geometry");
		const spacing = 2;

		let x, y, crop, rotation, cropsPlanted = 0;
		for(x = 0; x < width; x+=spacing){
			for(y = 0; y < height; y+=spacing){
				if(cropsPlanted < cropCount){
					container.appendChild(POOKAGE.utils.createElement("a-crop", {
						type: cropType,
						position: `${x - (width/2) + 0.5} ${0} ${y - (height/2) + 0.5}`
					}));
				}
			}
		}

		element.appendChild(container);
	}
})