AFRAME.registerComponent("status_ui", {
	schema: {},
	init: function(){
		const element   = this.el;
		const component = element.getMainComponent();
		const compData  = component.data;
		const status    = POOKAGE.utils.createElement("a-status", {
			"ui_data": JSON.stringify(compData)
		});

		this.ui_data = status;
		element.appendChild(status);
		element.addEventListener("click", this.toggleStats);
	},
	toggleStats: function(){
		const uiElement = this.components.status_ui.ui_data;
		const visible = uiElement.getAttribute("visible");

		if(visible) uiElement.hide();
		else        uiElement.show();
	}//showStats
});