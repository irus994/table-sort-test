import {personData} from './mock.js';

const siteMainElement = document.querySelector('body');
const tableTbody = document.querySelector('tbody');
const sortButtons = document.querySelectorAll('.sort__button');
const mainContentBlock = document.querySelector('.table-wrapper');

// Функции сортировки
const sortArrayASC = (arr, value) => {
    if (value === 'firstName') {
        const SortArray = (x, y) => x.name.firstName.localeCompare(y.name.firstName);
        return arr.sort(SortArray);
    }
    if (value === 'lastName') {
        const SortArray = (x, y) => x.name.lastName.localeCompare(y.name.lastName);
        return arr.sort(SortArray);
    }
    if (value === 'about') {
        const SortArray = (x, y) => x.about.localeCompare(y.about);
        return arr.sort(SortArray);
    }
    if (value === 'eyeColor') {
        const SortArray = (x, y) => x.eyeColor.localeCompare(y.eyeColor);
        return arr.sort(SortArray);
    }
};

const sortArrayDESC = (arr, value) => {
    if (value === 'firstName') {
        const SortArray = (x, y) => y.name.firstName.localeCompare(x.name.firstName);
        return arr.sort(SortArray);
    }
    if (value === 'lastName') {
        const SortArray = (x, y) => y.name.lastName.localeCompare(x.name.lastName);
        return arr.sort(SortArray);
    }
    if (value === 'about') {
        const SortArray = (x, y) => y.about.localeCompare(x.about);
        return arr.sort(SortArray);
    }
    if (value === 'eyeColor') {
        const SortArray = (x, y) => y.eyeColor.localeCompare(x.eyeColor);
        return arr.sort(SortArray);
    }
}

//Функции отрисовки
const renderEditForm = (evt) => {
    const editForm = document.querySelector('.edit-field-wrapper');
    const evtObject = personData.find(person => person.id === evt.target.closest('tr').id);
    if (mainContentBlock.contains(editForm)) {
        editForm.remove()
    }
        mainContentBlock.insertAdjacentHTML('beforeend', `<div class="edit-field-wrapper">
            <button class="close-button">X</button>
        <form class="edit-field-form" action="#" method="post">
            <ul class="edit-field-form__list">
                <li class="edit-field-form__item">
                    <label for="name">Имя</label>
                    <input class="edit-field-form__input" type="text" id="name" name="user-name" value=${evtObject.name.firstName}>
                </li>
                <li class="edit-field-form__item">
                    <label for="lastname">Фамилия</label>
                    <input class="edit-field-form__input" type="text" id="lastname" name="user-lastname" value=${evtObject.name.lastName}>
                </li>
                <li class="edit-field-form__item">
                    <p>Цвет глаз</p>
                    <ul class="edit-field-form__color-list">
                        <li class="edit-field-form__color-item">
                            <label class="eye-color eye-color--red edit-field-form__color-label" for="eye-color-red"></label>
                            <input class="edit-field-form__color-input" type="radio" id="eye-color-red" name="user-color" value="red" ${evtObject.eyeColor === 'red' ? 'checked' : ''}>
                        </li>
                        <li class="edit-field-form__color-item">
                            <label class="eye-color eye-color--blue edit-field-form__color-label"  for="eye-color-blue"></label>
                            <input class="edit-field-form__color-input" type="radio" id="eye-color-blue" name="user-color" value="blue" ${evtObject.eyeColor === 'blue' ? 'checked' : ''}>
                        </li>
                        <li class="edit-field-form__color-item">
                            <label class="eye-color eye-color--brown edit-field-form__color-label" for="eye-color-brown"></label>
                            <input type="radio" id="eye-color-brown" name="user-color" value="brown" ${evtObject.eyeColor === 'brown' ? 'checked' : ''}>
                        </li>
                        <li class="edit-field-form__color-item">
                            <label class="eye-color eye-color--green edit-field-form__color-label" for="eye-color-green"></label>
                            <input type="radio" id="eye-color-green" name="user-color" value="green" ${evtObject.eyeColor === 'green' ? 'checked' : ''}>
                        </li>
                    </ul>
                </li>
            </ul>
            <textarea class="edit-field" placeholder="Описание" >${evtObject.about}</textarea>
            <button type="submit" class="button"><p class="button__text">Готово</p></button>
        </form>
    </div>`)

    const onSubmit = (evt) => {
        const inputName = document.querySelector('#name');
        const inputLastName = document.querySelector('#lastname');
        const inputAbout = document.querySelector('.edit-field');
        const checkedColor = document.querySelector('[name="user-color"]:checked')
        console.log(checkedColor.value)

        evt.preventDefault();

        evtObject.name.firstName = inputName.value;
        evtObject.name.lastName = inputLastName.value;
        evtObject.about = inputAbout.value;
        evtObject.eyeColor = checkedColor.value;

        renderStrings(personData);
    }

    const closeForm = () => {
        const editForm = document.querySelector('.edit-field-wrapper');
        editForm.remove();
    }

    const buttonSubmit = document.querySelector('.button');
    buttonSubmit.addEventListener('click', onSubmit);
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', closeForm);
};

const renderPaginationBlock = (data) => {
    let pageNumber = tableTbody.getAttribute('data-page-number');
    const pageCount = Math.floor(data.length / 10) - (pageNumber - 1);
    siteMainElement.insertAdjacentHTML('beforeend', `<div class="pagination">
    <button class="pagination__button back"> < </button>
    <span class="pagination__number">${pageNumber}</span>...<span class="pagination__number">${pageCount}</span>
    <button class="pagination__button front"> > </button>
</div>`)
    const buttonPaginationAdd = siteMainElement.querySelector('.pagination__button.front');
    const buttonPaginationSubtract = siteMainElement.querySelector('.pagination__button.back');

    const addPaginationNumb = () => {
        if (pageNumber < pageCount) {
            pageNumber = Number(pageNumber) + 1;
            console.log(pageNumber)
            siteMainElement.querySelector('.pagination').remove();
            renderStrings(personData.slice(pageNumber * 10 - 10, pageNumber * 10));
            siteMainElement.insertAdjacentHTML('beforeend', `<div class="pagination">
                <button class="pagination__button back"> < </button>
                <span class="pagination__number">${pageNumber}</span>...<span class="pagination__number">${pageCount}</span>
                <button class="pagination__button front"> > </button>
                </div>`)
        }
        const buttonPaginationAdd = siteMainElement.querySelector('.pagination__button.front');
        buttonPaginationAdd.addEventListener('click', addPaginationNumb);
        const buttonPaginationSubtract = siteMainElement.querySelector('.pagination__button.back');
        buttonPaginationSubtract.addEventListener('click', subtractPaginationNumb);
    }
    buttonPaginationAdd.addEventListener('click', addPaginationNumb);

    const subtractPaginationNumb = () => {
        let pageNumber = tableTbody.getAttribute('data-page-number')
        // if (pageNumber > 1) {
            pageNumber = Number(pageNumber) - 1;
            siteMainElement.querySelector('.pagination').remove()
            siteMainElement.insertAdjacentHTML('beforeend', `<div class="pagination">
                <button class="pagination__button back"> < </button>
                <span class="pagination__number">${pageNumber}</span>...<span class="pagination__number">${pageCount}</span>
                <button class="pagination__button front"> > </button>
                </div>`)
        // }
        const buttonPaginationAdd = siteMainElement.querySelector('.pagination__button.front')
        buttonPaginationAdd.addEventListener('click', addPaginationNumb)
        const buttonPaginationSubtract = siteMainElement.querySelector('.pagination__button.back')
        buttonPaginationSubtract.addEventListener('click', subtractPaginationNumb)
    }
    buttonPaginationSubtract.addEventListener('click', subtractPaginationNumb)
}

const renderStrings = (data) => {
    let pageNumber = tableTbody.getAttribute('data-page-number');
    if (data.length > 10) {
        tableTbody.innerHTML = data.slice(1 - pageNumber, pageNumber * 10).map((person) =>  `
        <tr id=${person.id}>
            <td class="table__td"><p class="table__text">${person.name.firstName}</p></td>
            <td class="table__td"><p class="table__text">${person.name.lastName}</p></td>
            <td class="table__td table__td--about"><p class="table__text">${person.about}</p></td>
            <td class="table__td"><div class="eye-color eye-color--${person.eyeColor}"></div></td>
         </tr>`).join('')
        if (!siteMainElement.contains(document.querySelector('.pagination'))) {
            renderPaginationBlock(personData);
        }

    } else {
        tableTbody.innerHTML = data.map((person) => `
        <tr id=${person.id}>
            <td class="table__td"><p class="table__text">${person.name.firstName}</p></td>
            <td class="table__td"><p class="table__text">${person.name.lastName}</p></td>
            <td class="table__td"><p class="table__text">${person.about}</p></td>
            <td class="table__td"><div class="eye-color eye-color--${person.eyeColor}"></div></td>
         </tr>`).join('')
    }

    tableTbody.querySelectorAll("tr").forEach((tableString) => tableString.addEventListener('click', renderEditForm));
}

renderStrings(personData);

// Обработчик кнопок сортировки
const sortString = (evt) => {
    if (evt.target.getAttribute('data-sort-order') === 'asc') {
        evt.target.setAttribute('data-sort-order','desc' );
    } else {
        evt.target.setAttribute('data-sort-order','asc' );
    }
    console.log(evt.target.getAttribute('data-sort-order'))
    sortButtons.forEach((sortButton) => {
        if (sortButton.value !== evt.target.value) {
            sortButton.removeAttribute('data-sort-order');
        }
    })
    if (evt.target.getAttribute('data-sort-order') === 'asc') {
        renderStrings(sortArrayASC(personData, evt.target.value))
    } else if (evt.target.getAttribute('data-sort-order') === 'desc') {
        renderStrings(sortArrayDESC(personData, evt.target.value));
    }
};
sortButtons.forEach((sortButton) => sortButton.addEventListener('click', sortString))

//Обработчик скрытия/показа колонок
const hiddenButtons = document.querySelectorAll('.hidden-block__button');

const hiddenColumn = (evt) => {
    if (evt.target.getAttribute('data-visibility') === 'visibility') {
        if (evt.target.value === 'name') {
            const headName = siteMainElement.querySelector('tr th:first-child');
            headName.classList.add('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:first-child');
            allStrings.forEach(string => string.classList.add('visually-hidden'));
            evt.target.textContent = 'Показать';
            evt.target.setAttribute('data-visibility', 'invisibility');
        }
        if (evt.target.value === 'lastname') {
            const headLastname = siteMainElement.querySelector('tr th:nth-child(2)');
            headLastname.classList.add('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(2)');
            allStrings.forEach(string => string.classList.add('visually-hidden'));
            evt.target.textContent = 'Показать';
            evt.target.setAttribute('data-visibility', 'invisibility');
        }
        if (evt.target.value === 'about') {
            const headAbout = siteMainElement.querySelector('tr th:nth-child(3)');
            headAbout.classList.add('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(3)');
            allStrings.forEach(string => string.classList.add('visually-hidden'));
            evt.target.textContent = 'Показать';
            evt.target.setAttribute('data-visibility', 'invisibility');
        }
        if (evt.target.value === 'eye-color') {
            const headColor = siteMainElement.querySelector('tr th:nth-child(4)');
            headColor.classList.add('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(4)');
            allStrings.forEach(string => string.classList.add('visually-hidden'));
            evt.target.textContent = 'Показать';
            evt.target.setAttribute('data-visibility', 'invisibility');
        }
    } else {
        if (evt.target.value === 'name') {
            const headName = siteMainElement.querySelector('tr th:first-child');
            headName.classList.remove('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:first-child');
            allStrings.forEach(string => string.classList.remove('visually-hidden'));
            evt.target.textContent = 'Скрыть'
            evt.target.setAttribute('data-visibility', 'visibility');
        }
        if (evt.target.value === 'lastname') {
            const headLastname = siteMainElement.querySelector('tr th:nth-child(2)');
            headLastname.classList.remove('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(2)');
            allStrings.forEach(string => string.classList.remove('visually-hidden'));
            evt.target.textContent = 'Скрыть'
            evt.target.setAttribute('data-visibility', 'visibility');
        }
        if (evt.target.value === 'about') {
            const headAbout = siteMainElement.querySelector('tr th:nth-child(3)');
            headAbout.classList.remove('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(3)');
            allStrings.forEach(string => string.classList.remove('visually-hidden'));
            evt.target.textContent = 'Скрыть'
            evt.target.setAttribute('data-visibility', 'visibility');
        }
        if (evt.target.value === 'eye-color') {
            const headColor = siteMainElement.querySelector('tr th:nth-child(4)');
            headColor.classList.remove('visually-hidden');
            const allStrings = siteMainElement.querySelectorAll('tr td:nth-child(4)');
            allStrings.forEach(string => string.classList.remove('visually-hidden'));
            evt.target.textContent = 'Скрыть'
            evt.target.setAttribute('data-visibility', 'visibility');
        }
    }
}

hiddenButtons.forEach(hiddenButton => hiddenButton.addEventListener('click', hiddenColumn));




