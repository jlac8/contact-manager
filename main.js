import './style.css'

let contacts = [];

const ul = document.getElementById('contactList');
const form = document.getElementById('contactForm')
form.addEventListener('submit', addContact);

function nameFormat(name) {
  return name.trim()
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')
}

function addContact(event) {
  event.preventDefault();

  const {elements} = event.currentTarget;
  const input = elements.namedItem('value');
  const contact = {
    text: nameFormat(input.value),
    timestamp: Date.now(),
    id: crypto.randomUUID(),
  }

  for (let i = 0; i < contacts.length; i++) {
    if (contact.text === contacts[i].text) {
      alert(`El nombre ${contact.text} ya se encuentra en la lista`);
      return
    }
  }

  contacts.push(contact)

  const li = document.createElement('li');
  li.id = contact.id;
  ul.appendChild(li);

  const span = document.createElement('span')
  span.innerText = contact.text;
  li.appendChild(span);
  input.value = ''

  const btnEdit = document.createElement('button');
  btnEdit.innerText = 'Editar';
  btnEdit.addEventListener('click', () => editContact(contact.id));
  li.appendChild(btnEdit);

  const btnDelete = document.createElement('button');
  btnDelete.innerText = 'Eliminar';
  btnDelete.addEventListener('click', () => deleteContact(contact.id));
  li.appendChild(btnDelete);
}

function editContact(id) {
  contacts = contacts.filter(contact => contact.id !== id);

  const li = document.getElementById(id);
  const span = li.querySelector('span');
  const btnEdit = li.querySelector('button');

  const form = document.createElement('form');
  form.addEventListener('submit', (event) => saveContact(event, id, nameFormat(input.value)));

  const label = document.createElement('label')

  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.innerText;
  input.required = true;

  const btnSave = document.createElement('button');
  btnSave.type = 'submit';
  btnSave.innerText = 'Guardar';

  label.appendChild(input);
  label.appendChild(btnSave);
  form.appendChild(label);
  li.replaceChild(form,span);

  btnEdit.style.display = 'none';
  input.focus();
  input.select();
}

function saveContact(event, id, text) {
  event.preventDefault();

  const li = document.getElementById(id);
  const form = li.querySelector('form');
  const span = document.createElement('span');

  span.innerText = text;
  for (let i = 0; i < contacts.length; i++) {
    if (text === contacts[i].text) {
      alert(`El nombre ${text} ya se encuentra en la lista`);
      return
    }
  }
  li.replaceChild(span, form)

  const btnEdit = li.querySelector('button');
  btnEdit.style.display = 'inline';
}

function deleteContact(id) {
  contacts = contacts.filter(contact => contact.id !== id);

  const li = document.getElementById(id);
  ul.removeChild(li);
}
