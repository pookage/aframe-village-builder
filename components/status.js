AFRAME.registerPrimitive("a-status", {
	defaultComponents: {
		status: {}
	},
	mappings: {
		ui_data: "status.ui_data"
	}
})
AFRAME.registerComponent("status", {
	schema: {
		ui_data: {
			default: {},
			parse: function(value){
				return JSON.parse(value);
			}
		}
	},
	init: function(){

		//scope binding
		const element   = this.el;
		const data      = this.data;
		AFRAME.utils.bind(this.hide, this);  element.hide = this.hide;
		AFRAME.utils.bind(this.show, this);  element.show = this.show;

		//create <a-text> elements for every pice of UI data to show
		const uiData    = data.ui_data;
		const statCount = Object.keys(uiData).length;
		const fragment  = document.createDocumentFragment();
		let position    = { x: 1, y: statCount, z: 0 };
		for(let key in uiData){
			fragment.appendChild(POOKAGE.utils.createElement("a-text", {
				value: `${key} : ${uiData[key]}`,
				position: position,
				width: 20
			}));
			position.y -= 1;
		}

		//make the element stop rendering and scale it down
		this.hide();

		//add status to the parent entity
		element.appendChild(fragment)
	},//init
	hide: function(){
		const element = this.el || this;
		const children = element.children;

		for(let child of children){
			child.setAttribute("visible", false);
		}

		element.setAttribute("visible", false);
		element.setAttribute("scale", {x: 0, y: 0, z: 0});
	},
	show: function(){
		const element  = this.el || this;
		const children = element.children;

		for(let child of children){
			child.setAttribute("visible", true);
		}

		element.setAttribute("visible", true);
		element.setAttribute("scale", {x: 1, y: 1, z: 1});
	}
})