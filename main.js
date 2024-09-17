import './style.css'

const ul = document.getElementById('contactList');
const form = document.getElementById('contactForm')
form.addEventListener('submit', addContact);

function addContact(event) {
  event.preventDefault();

  const {elements} = event.currentTarget;
  const input = elements.namedItem('value');
  const contact = {
    text: input.value.trim(),
    timestamp: Date.now(),
    id: crypto.randomUUID(),
  }

  if(!contact.text) {
    alert('Debe incluir el nombre de un contacto');
    return;
  }

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
  const li = document.getElementById(id);
  const span = li.querySelector('span');
  const btnEdit = li.querySelector('button');

  const form = document.createElement('form');
  form.addEventListener('submit', (event) => saveContact(event, id, input.value));

  const label = document.createElement('label')

  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.innerText;

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
  li.replaceChild(span, form)

  const btnEdit = li.querySelector('button');
  btnEdit.style.display = 'inline';
}

function deleteContact(id) {
  const li = document.getElementById(id);
  ul.removeChild(li);
}
