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
  li.innerText = contact.text;
  li.id = contact.id;
  input.value = ""
  ul.appendChild(li)

  const btnEdit = document.createElement('button');
  btnEdit.textContent = "Editar";
  li.appendChild(btnEdit);

  const btnDelete = document.createElement('button');
  btnDelete.textContent = "Eliminar";
  btnDelete.onclick = () => deleteContact(contact.id);
  li.appendChild(btnDelete);
}

function deleteContact(id) {
  const li = document.getElementById(id);
  ul.removeChild(li);
}

document.getElementById('contactForm').addEventListener("submit", addContact);
