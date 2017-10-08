AFRAME.registerComponent("status_ui", {
	schema: {},
	init: function(){
		const element   = this.el;
		const component = element.getMainComponent();
		const geometry  = element.components.geometry;
		//const {height, width} = element.getAttribute("geometry");
		this.targetComp = component;
		

		const compData  = component.data;

		this.background = POOKAGE.utils.createElement("plane", {
			color: "#666",
			height: 10,
			width: 20,
			visible: false
		});

		//YOU SHOULD CREATE A <A-STATS> COMPONENT THAT CAN BE CREATED HERE AND INITIALISED DISPLAYING COMPDATA

		element.appendChild(this.background);
		element.addEventListener("click", this.toggleStats);

		AFRAME.utils.bind(this.getStatsComponent, this)
		this.el.getStatsComponent = this.getStatsComponent.bind(this);
	},
	play: function(){
		const element            = this.el;
		const background         = this.background;

		offsetStatsElement();

		function offsetStatsElement(){
			const { 
				height: bgHeight, 
				width: bgWidth 
			} = background.getAttribute("geometry");
			const { 
				height: entityHeight, 
				width: entityWidth 
			} = element.components.geometry.data;
			
			const position = {
				x: entityWidth/2 + bgWidth/2,
				y: entityHeight + bgHeight/2,
				z: 0
			};
			background.setAttribute("position", position);	
		}//offsetStatsElement
	},//play
	getStatsComponent: function(){
		return this;
	},//getStatsComponent
	toggleStats: function(){
		const stats        = this.getStatsComponent().background;
		const currentState = stats.getAttribute("visible");
		stats.setAttribute("visible", !currentState);
	}//showStats
});