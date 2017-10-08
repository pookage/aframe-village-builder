AFRAME.registerComponent("status_ui", {
	schema: {
		follow_camera: {
			default: false
		},
		offset: {
			default: {
				x: 0,
				y: 0, 
				z: 0
			}
		},
		rotation: {
			default: {
				x: 0,
				y: 0,
				z: 0
			}
		}
	},
	init: function(){
		const element   = this.el;
		const data      = this.data;

		const component = element.getMainComponent();
		const compData  = component.data;
		const status    = POOKAGE.utils.createElement("a-status", {
			"ui_data": JSON.stringify(compData),
			"follow_camera" : data.follow_camera,
			"position": data.offset,
			"rotation": data.rotation
		});

		this.ui_data = status;
		element.appendChild(status);
		element.addEventListener("click", this.toggleStats);
	},
	update: function(oldDdta){
		this.ui_data.setAttribute("position", this.data.offset)
	},
	toggleStats: function(){
		const uiElement = this.components.status_ui.ui_data;
		const visible = uiElement.getAttribute("visible");

		if(visible) uiElement.hide();
		else        uiElement.show();
	}//showStats
});