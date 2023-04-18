const store = window.localStorage; 
const content = document.querySelector('.content');
const modalOverlay = document.querySelector('.overlay');
const modalForm = document.querySelector('form');
const modalCloseBtn = document.querySelector('.close-modal'); 
const btnAddCat = document.querySelector('.add-cat');
const defaultImg = 'images/default.jpg';


const refreshCatsAndContent = () => {
    content.innerHTML = '';
    requestsCards.getAllCats().then(res => {
		store.setItem(strMyCats, JSON.stringify(res));
		const cards = JSON.parse(store.getItem(strMyCats));
        res.forEach(element => {
        content.insertAdjacentHTML('afterbegin', createCard(element));
        });
    });
};
refreshCatsAndContent();

btnAddCat.addEventListener('click', () => {
	document.querySelector('.disabled').readOnly = false;
	modalOverlay.classList.add('active');
		modalForm.addEventListener('submit', (event) => {			
				event.preventDefault();
				const reg = 'http';
				if (!modalForm.image.value.startsWith(reg)) {
					modalForm.image.value = defaultImg;
				} 
				const formData = new FormData(modalForm); 
				const cat = Object.fromEntries(formData); 
				if (cat.favorite) {
					cat.favorite = true;
				} else {
					cat.favorite = false;
				}
				
				requestsCards.addCat({...cat}).then(() => { 
				modalOverlay.classList.remove('active');
				addCatLocalStorage(cat);
				refreshCardsLocalStorage(); 
			})
			modalForm.reset();
		}, { once: true });
})

const openCatCardPopup = (cat) => {
	content.insertAdjacentHTML('afterbegin', createCatCardPopup(cat));
	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopup = document.querySelector('.popup-close-cat-card');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
};

content.addEventListener('click', (event) => {
	const idCat = event.target.value;
		if (event.target.tagName === 'BUTTON') {
			switch (event.target.className) {
			case 'cat-card-view':
			requestsCards.getCatById(idCat).then((res) => {
			openCatCardPopup(res);
					});
			break;
			case 'cat-card-update': 
			modalOverlay.classList.add('active');
			requestsCards.getCatById(idCat).then((res) => {
			document.querySelector('.disabled').readOnly = true;
			let form_elem = modalForm.getElementsByTagName("input");
			for (let index = 0; index < form_elem.length; index++) {
			Object.entries(res).forEach(([key, value]) => {
				if (form_elem[index].name == key) {
				form_elem[index].value = value;
				if(value === true) {
				form_elem[index].checked = true;
					}}
				})
			}
		});

		modalForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(modalForm); 
	const cat = Object.fromEntries(formData); 
		if (cat.favorite) {
			cat.favorite = true;
		} else {
			cat.favorite = false;
		}
	requestsCards.updateCat(cat).then((res) => { 							
		deleteCatLocalStorage(idCat);
		addCatLocalStorage(cat);
		refreshCardsLocalStorage();
	}); 
		modalOverlay.classList.remove('active');
		modalForm.reset();
	}, 
		{ once: true });
		modalForm.reset();
				break;
				case 'cat-card-delete': 
						requestsCards.deleteCat(idCat).then(() => {
							deleteCatLocalStorage(idCat);
							refreshCardsLocalStorage();
						});
				break;
				default: break;
			}
		}
		if (event.target.classList.contains('card-like')) {
			const idCatLike = event.target.dataset.id;
			const obj = {
				id: idCatLike,
				favorite: true,
			};
			if (event.target.classList.contains('fa-regular')) {
				obj.favorite = true;
			} else {
				obj.favorite = false;
			}
			event.target.classList.toggle('fa-regular');
			event.target.classList.toggle('fa-solid');
			requestsCards.updateCat(obj)
		}
	});

modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
	modalForm.reset();	
	addEventCat = 0;
})

const refreshCardsLocalStorage = () => {
	content.innerHTML = '';
	const cards = JSON.parse(store.getItem(strMyCats));
	cards.forEach(element => {
        content.insertAdjacentHTML('afterbegin', createCard(element));
    });
};

const addCatLocalStorage = (cat) => {
	store.setItem(strMyCats, JSON.stringify([...JSON.parse(store.getItem(strMyCats)), cat]));
};

const deleteCatLocalStorage = (catId) => {
	store.setItem(strMyCats, JSON.stringify(JSON.parse(store.getItem(strMyCats))
	.filter((el) => el.id != catId))
	);
};

const createCard = (cat) => {
	return `<div class="cat-card">
        <i class="fa-heart card-like ${cat.favorite ? 'fa-solid' : 'fa-regular'}" data-id='${cat.id}'></i>
            <div class="image-card">
                <img src=${cat.image !== '' ? cat.image : defaultImg} /> 
            </div>
            <div class="card-title">Имя: ${cat.name}</div>
            <div>Возраст: ${!!cat.age && cat.age >= 0 ? cat.age : 'Не указан'} </div>
            <div class="cat-card-btns">
                <button class="cat-card-view" value=${cat.id}>Просмотр</button>
                <button class="cat-card-update" value=${cat.id}>Изменение</button> 
                <button class="cat-card-delete" value=${cat.id}>Удаление</button>
            </div>
        </div>`;
};

const createCatCardPopup = (cat) => {
	return `<div class="popup-wrapper-cat-card active">
        <div class="popup-cat-card active">
        <div class="popup-close-cat-card btn"><i class="fa-solid fa-xmark"></i></div>
        <div class="popup-card">
            <div class="popup-card-info">
                <div>Имя: ${cat.name}</div>
                <div>Описание: ${cat.description}</div>
                <div>Возраст: ${!!cat.age && cat.age >= 0 ? cat.age : 'Не указан'}</div>
                <div>Рейтинг: ${!!cat.rate ? cat.rate : 'Не указан'}</div>
                <div>Отношение: ${cat.favorite ? 'Лайк' : 'Дизлайк, отписка'}</div>
            </div>
            <div class="popup-card-img" style="background: url(${cat.image !== '' ? cat.image : defaultImg}); background-size: cover;"></div>
        </div>
        </div>
    </div>`;
};