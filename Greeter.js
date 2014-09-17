export default
class Greeter {
	constructor(message) {
		this.message = message;
	}

	greet() {
		let element = document.querySelector('#message');
		element.innerHTML = this.message;
	}
}


