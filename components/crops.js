AFRAME.registerPrimitive("a-crop", {
	defaultComponents: {
		crop: {},
		"obj-model": {}
	},
	mappings: {
		type: "crop.type"
	}
});
AFRAME.registerComponent("crop", {
	schema: {
		type: {
			default: "wheat"
		}
	},
	init: function(){
		const element  = this.el;
		const data     = this.data;
		const cropType = data.type;

		AFRAME.utils.entity.setComponentProperty(element, "obj-model.obj", `#${cropType}_model`);
	}
})