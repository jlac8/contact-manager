import './style.css'

const ul = document.getElementById('contactList');

function addContact(event) {
  event.preventDefault();

  const {elements} = event.currentTarget;
  const input = elements.namedItem("value");
  const contact = {
    text: input.value,
    timestamp: Date.now(),
    id: crypto.randomUUID(),
  }

  const li = document.createElement('li');
  li.id = contact.id;
  ul.appendChild(li)
  const span = document.createElement('span')
  span.innerText = contact.text;
  li.appendChild(span);
  input.value = ""


  const btnEdit = document.createElement('button');
  btnEdit.innerText = "Editar";
  btnEdit.onclick = () => editContact(contact.id);
  li.appendChild(btnEdit);

  const btnDelete = document.createElement('button');
  btnDelete.innerText = "Eliminar";
  btnDelete.onclick = () => deleteContact(contact.id);
  li.appendChild(btnDelete);
}

function editContact(id) {
  const li = document.getElementById(id);
  const span = li.querySelector('span');
  const btnEdit = li.querySelector('button');

  const form = document.createElement('form');

  const label = document.createElement('label')

  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.innerText;
  form.onsubmit = (event) => saveContact(event, id, input.value);

  const btnSave = document.createElement('button');
  btnSave.type = 'submit';
  btnSave.innerText = 'Guardar';

  label.appendChild(input);
  label.appendChild(btnSave);
  form.appendChild(label);

  li.replaceChild(form,span)
  btnEdit.style.display = 'none';
  input.focus();
  input.select();
}

function saveContact(event, id, value) {
  event.preventDefault();

  const li = document.getElementById(id);
  const form = li.querySelector('form');
  const span = document.createElement('span');
  span.innerText = value;

  li.replaceChild(span, form)

  const btnEdit = li. querySelector('button');
  btnEdit.style.display = 'inline';
  btnEdit.innerText = 'Editar';
  btnEdit.onclick = () => editContact(id);
}

function deleteContact(id) {
  const li = document.getElementById(id);
  ul.removeChild(li);
}

document.getElementById('contactForm').addEventListener("submit", addContact);
