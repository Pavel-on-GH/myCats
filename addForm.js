const firstUser = "pavel-on-gh";
const path = `https://cats.petiteweb.dev/api/single/${firstUser}/`;

const testPic = 'https://i.pinimg.com/736x/fb/ff/f6/fbfff6a63b4c0931887c8a399234fe07--nature-instagram.jpg';

class WorkingWithCards {
	constructor() {
		this.path = path;
	}

	
	addCat = (cat, reject) => {
		return fetch(`${this.path}add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cat),
		})
		.then(res => {
			if (res.status === 200) {
			res.json()}
			else {console.log ('Упс, что-то пошло не так...')}
			})
	};

	deleteCat = (id) => {
        return fetch(`${this.path}delete/${id}`, {
            method: 'DELETE'
        })
		.then(res => {
		if (res.status === 200) {
		res.json()}
		else {console.log ('Упс, что-то пошло не так...')}
		})
	}

	getAllCats = () => {
		return fetch(`${this.path}show`)
		.then((res) => {
			return res.ok 
			? res.json() 
			: Promise.reject('Упс, что-то пошло не так...');
		});
	};

    getAllCatsId = (cat) => {
		return fetch(`${this.path}ids`)
		.then((res) => {
			return res.ok 
			? res.json() 
			: Promise.reject('Упс, что-то пошло не так...');
		});
	};

    getCatById = (id) => {
        return fetch(`${this.path}show/${id}`)
		.then((res) => {
			return res.ok 
			? res.json() 
			: Promise.reject('Упс, что-то пошло не так...');
		});
    }

	updateCat = (newCat) => {
		return fetch(`${this.path}update/${newCat.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCat),
		})
		.then(res => {
			if (res.status === 200) {
			res.json()}
			else {console.log ('Упс, что-то пошло не так...')}
			})
	};

}


const requestsCards = new WorkingWithCards ({
	path: `https://cats.petiteweb.dev/api/single/${firstUser}/`,
});
