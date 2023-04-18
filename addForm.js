const firstUser = "pavel-on-gh";
const path = `https://cats.petiteweb.dev/api/single/${firstUser}/`;
const strMyCats = `Мои коты:`;
const errorMessage = error => alert(`Упс, что-то пошло не так... Ваша ошибка: \n${error}`);


class WorkingWithCards {
	constructor() {
		this.path = path;
	}

	
	addCat = (cat) => {
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
			})
		.catch (errorMessage)
	};

	deleteCat = (id) => {
        return fetch(`${this.path}delete/${id}`, {
            method: 'DELETE'
        })
		.then(res => {
			if (res.status === 200) {
			res.json()}
			})
		.catch (errorMessage)
	}

	getAllCats = () => {
		return fetch(`${this.path}show`)
		.then((res) => {
			return res.ok 
			? res.json() 
			: Promise.reject(error => console.error(error));
		})
		.catch (errorMessage)
	};


    getCatById = (id) => {
        return fetch(`${this.path}show/${id}`)
		.then((res) => {
			return res.ok 
			? res.json() 
			: Promise.reject(error => console.error(error));
		})
		.catch (errorMessage)
    };


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
			})
		.catch (errorMessage)
	};

}


const requestsCards = new WorkingWithCards ({
	path: `https://cats.petiteweb.dev/api/single/${firstUser}/`,
});
