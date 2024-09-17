import './style.css'

const contacts = [];
const ul = document.getElementById('contactList');

function addContact(event) {
  event.preventDefault();
  const {elements} = event.currentTarget;
  const input = elements.namedItem("value");
  contacts.push(input.value);
  const li = document.createElement('li');
  li.innerText = input.value;
  ul.appendChild(li)
  const btnEdit = document.createElement('button');
  btnEdit.textContent = "Edit"
  const btnDelete = document.createElement('button')
  btnDelete.textContent = "Delete"
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);
  input.value = ""
}

document.getElementById('contact-form').addEventListener("submit", addContact);
