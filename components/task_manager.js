AFRAME.registerComponent("task_manager", {
	schema: {
		tasks: {
			default: [
				{
					type: "travel",
					destination: {
						x: -2,
						y: 0,
						z: 5
					}
				},
				{
					type: "travel",
					destination: "#windmill"
				},
				
				{
					type: "travel",
					destination: "#farm"
				},
				// {
				// 	type: "interaction",
				// 	action: "harvest",
				// 	target: "#farm",
				// 	quantity: 5
				// },
				{
					type: "travel",
					destination: "#windmill"
				},
				{
					type: "travel",
					destination: "#farm"
				},
				{
					type: "travel",
					destination: "#windmill"
				},
				{
					type: "travel",
					destination: "#farm"
				},
				{
					type: "travel",
					destination: "#bakery"
				},
			]
		}
	},
	init: function(){
		AFRAME.utils.bind(this.addTask, this);
		AFRAME.utils.bind(this.performTask, this);
		AFRAME.utils.bind(this.nextTask, this);
	},//init
	play: function(){
		
		this.nextTask(false)
		
	},
	addTask: function(task){
		const data = this.data;
		const tasks = data.tasks;
		tasks.push(task);
	},//addTask
	nextTask: function(removeCurrentTask){

		const data  = this.data;
		const tasks = data.tasks;
		if(removeCurrentTask) tasks.shift();
		if(tasks.length > 0){
			const currentTask = tasks[0];
			this.performTask(currentTask);
		} else {
			console.log("all tasks in queue done!")
		}
	},
	performTask: async function(task){

		console.log("performing task : ", task)

		switch(task.type){
			case "travel":
				const navigator    = this.el.components.navigator;
				const destination  = task.destination;
				await navigator.moveTo(destination);
				break;
			case "interaction":
				const target = document.querySelectorAll(task.target)[0].getMainComponent();
				const items  = await target[task.action](task.quantity);
				console.log(items); //CREATE AN INVENTORY MANAGER AND ADD THE WHEAT TO THE DUDE'S INVENTORY
				break;
		}
		this.nextTask(true);
	}//performTasK
})