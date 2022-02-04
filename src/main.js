import {personData} from './mock.js';

const siteMainElement = document.querySelector('body');
const tableTbody = document.querySelector('tbody');
const mainContentBlock = document.querySelector('.table-wrapper');

// Функции сортировки "A-Я" и "Я-А"
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

// Функция сортировки строк
const sortString = (evt) => {
    const headTable = document.querySelector('thead');

    if (headTable.getAttribute('data-sort-order') === 'asc') {
        headTable.setAttribute('data-sort-order','desc' );
    } else {
        headTable.setAttribute('data-sort-order','asc' );
    }
    headTable.setAttribute('data-sort-column', evt.target.value)
    render(personData);
};

//Функции отрисовки
const renderEditForm = (evt) => {
    const editForm = document.querySelector('.edit-field-wrapper');
    const evtObject = personData.find(person => person.id === evt.target.closest('tr').id);
    if (mainContentBlock.contains(editForm)) {
        editForm.remove();
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
        const checkedColor = document.querySelector('[name="user-color"]:checked');

        evt.preventDefault();

        evtObject.name.firstName = inputName.value;
        evtObject.name.lastName = inputLastName.value;
        evtObject.about = inputAbout.value;
        evtObject.eyeColor = checkedColor.value;

        render(personData);
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
    const step = 10;
    let pageNumber = tableTbody.getAttribute('data-page-number');
    const pageCount = Math.round(data.length / step);
    siteMainElement.insertAdjacentHTML('beforeend', `<div class="pagination">
    <button class="pagination__button back"> < </button>
    <span class="pagination__number">${pageNumber}</span>...<span class="pagination__number">${pageCount}</span>
    <button class="pagination__button front"> > </button>
</div>`)
    const buttonPaginationAdd = siteMainElement.querySelector('.pagination__button.front');
    const buttonPaginationSubtract = siteMainElement.querySelector('.pagination__button.back');

    const addPaginationNumb = () => {
        let pageNumber = tableTbody.getAttribute('data-page-number');
        if (pageNumber < pageCount) {
            pageNumber = Number(pageNumber) + 1;
            tableTbody.setAttribute('data-page-number', pageNumber);
            siteMainElement.querySelector('.pagination').remove();
            render(personData);
        }
    }
    buttonPaginationAdd.addEventListener('click', addPaginationNumb);

    const subtractPaginationNumb = () => {
        let pageNumber = tableTbody.getAttribute('data-page-number');
        if (pageNumber > 1) {
            pageNumber = Number(pageNumber) - 1;
            tableTbody.setAttribute('data-page-number', pageNumber);
            siteMainElement.querySelector('.pagination').remove();
            render(personData);
        }
    }
    buttonPaginationSubtract.addEventListener('click', subtractPaginationNumb);
}

const renderRows = (data, number, checkedColumns) => {
    const step = 10;
    if (data.length > 10) {
        tableTbody.innerHTML = data.slice(number * step - step, number * step).map((person) =>  `
        <tr id=${person.id}>
            ${checkedColumns.includes('name') ? `<td class="table__td"><p class="table__text">${person.name.firstName}</p></td>` : ''}
            ${checkedColumns.includes('lastname') ? `<td class="table__td"><p class="table__text">${person.name.lastName}</p></td>` : ''}
            ${checkedColumns.includes('about') ? `<td class="table__td table__td--about"><p class="table__text">${person.about}</p></td>` : ''}
            ${checkedColumns.includes('eye-color') ? `<td class="table__td"><div class="eye-color eye-color--${person.eyeColor}"></div></td>` : ''}
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
         </tr>`).join('');
    }
    tableTbody.querySelectorAll("tr").forEach((tableString) => tableString.addEventListener('click', renderEditForm));
};

const renderHeaders = (checkedColumns) => {
    const headTable = document.querySelector('thead');
    headTable.innerHTML = `
        <th class="${checkedColumns.includes('name') ? "table__td table__td--header" : "visually-hidden"}"><div class="th-wrapper"><p class="table__text table__text--header">Имя</p> <button class="sort__button" value="firstName"> < > </button></div></th>
        <th class="${checkedColumns.includes('lastname') ? "table__td table__td--header" : "visually-hidden"}"><div class="th-wrapper"><p class="table__text table__text--header">Фамилия</p> <button class="sort__button" value="lastName"> < > </button></div></th>
        <th class="${checkedColumns.includes('about') ? "table__td table__td--header" : "visually-hidden"}"><div class="th-wrapper"><p class="table__text table__text--header">Описание</p> <button class="sort__button" value="about"> < > </button></div></th>
        <th class="${checkedColumns.includes('eye-color') ? "table__td table__td--header" : "visually-hidden"}"><div class="th-wrapper"><p class="table__text table__text--header">Цвет глаз </p><button class="sort__button" value="eyeColor"> < > </button></div></th>`
    const sortButtons = document.querySelectorAll('.sort__button');
    sortButtons.forEach((sortButton) => sortButton.addEventListener('click', sortString));
}

const render = (arr) => {
    const inputsChecked = document.querySelectorAll('.hidden-block__input:checked');
    const checkedColumns = Array.from(inputsChecked).map(checkbox => checkbox.value);
    renderHeaders(checkedColumns);
    let pageNumber = tableTbody.getAttribute('data-page-number');
    const nameColumn = document.querySelector('[data-sort-column]').getAttribute('data-sort-column');
    const sortOrder = document.querySelector('[data-sort-order]').getAttribute('data-sort-order');

    if (sortOrder === 'asc') {
        const sortArray = sortArrayASC(arr, nameColumn);
        renderRows(sortArray, pageNumber, checkedColumns);
    }
    if (sortOrder === 'desc') {
        const sortArray = sortArrayDESC(arr, nameColumn);
        renderRows(sortArray, pageNumber, checkedColumns);
    }
}
render(personData);

//Обработчик скрытия/показа колонок
const hiddenInputs = document.querySelectorAll('.hidden-block__input');

const hiddenColumn = () => {
    render(personData);
}

hiddenInputs.forEach(hiddenInput => hiddenInput.addEventListener('change', hiddenColumn));
