import { useState, useEffect } from "react";
import ContactList from "./components/ContactsList";
import "./App.css";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    //
    // for flask backend use:http: //localhost:5000/Contacts
    // for node backend use:http: //localhost:3000/Contacts
    //

    const response = await fetch("http://localhost:3000/Contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <div className="px-20 py-10 bg-blue-100 h-screen ">
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button
        onClick={openCreateModal}
        className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create New Contact
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-xl shadow-lg p-5 sm:p-6 relative">
            <span
              className="absolute top-3 right-4 text-2xl text-center rounded cursor-pointer text-red-400 px-1.5 hover:text-red-600"
              onClick={closeModal}
            >
              &times;
            </span>

            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
