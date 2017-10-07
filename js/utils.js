var POOKAGE = {
	utils : {
		createElement: function createElement(type, attributes){
			const element = document.createElement(`a-${type}`);
			setAttributes(element, attributes);
			return element;
		},//createElement
		setAttributes: function setAttributes(element, attributes){
			for(let key in attributes) {
				element.setAttribute(key, attributes[key]);
			}
		}//setAttribute
	}
}

const setAttributes = POOKAGE.utils.setAttributes;