AFRAME.registerComponent("brain", {
	schema: {},
	init: function(){
		const element  = this.el;
		this.slowTick  = AFRAME.utils.throttle(this.evaluatePriorities, 5000, this);

		AFRAME.utils.bind(this.doJob, this);


		//JOB SPECIFIC STUFF
		this.state = {
			working: false,
			location: "",
			task: false
		};
	},
	play: function(){

	},
	tick: function(){
		this.slowTick()
	},
	evaluatePriorities: function(){
		const element = this.el;
		const data    = this.data;
		const needs   = element.getMainComponent().data;

		//calculate the neediest need
		//-----------------------------------
		let need, value;
		const highestNeed = {
			name: "",
			value: 101
		};
		for(need in needs){
			value = needs[need];
			if(Number.isInteger(value)){
				if(value < highestNeed.value){
					highestNeed.name  = need;
					highestNeed.value = value;
				}
			}
		}

		//decide what to do
		//---------------------------------
		if(highestNeed.value < 50){
			//FULFILL NEED
		} else {
			//DO JOB
		}

	}//evaluateNeeds


});