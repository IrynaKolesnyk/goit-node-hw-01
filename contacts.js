const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// const contactsPath = path.parse("./db/contacts.json"); возвр. объект

// можно просто импортировать json на прямую и в функции вставлем уже готовый products
//const contacts = require("./db/contacts.json");
//console.log("contacts :>> ", contacts);
console.log("contactsPath :>> ", contactsPath);

async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    //console.log("typeof :>> ", typeof contactId);
    //const intId = Number(contactId); - не раб т.к. изначально число а через uuid строка, лучше привести contact.id к строке, а contactId всегда строка
    const oneContact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const remaindContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(remaindContacts));
    return remaindContacts;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

//fs.writeFile(contactsPath, JSON.stringify(remaindContacts)); - записываем в файл.json всегда строку

//экспорт const любое имя или {имя нужного объекта через деструктуризацию} = require("./contacts(путь к файлу в нашем проекте)")
//если импортируем функцию, то ее можно при импорте сразу вызвать
//и в переменную сохран. результат вызова функции
// const curMonth = require("./contacts/contactsFn)")()

//fs.readFile(filename, [options]) - чтение файла
//fs.writeFile(filename, data, [options]) - запись файла
