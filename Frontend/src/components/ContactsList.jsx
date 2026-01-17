import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      //
      // for flask backend use:http: //localhost:5000/Contacts
      // for node backend use:http: //localhost:3000/Contacts
      //
      const response = await fetch(
        `http://127.0.0.1:3000/DeleteContact/${id}`,
        options,
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
        Contacts
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-300">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left text-sm font-medium">
                First Name
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm font-medium">
                Last Name
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm font-medium">
                Email
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className={`${
                  contact.id % 2 === 0 ? "bg-blue-200" : "bg-indigo-200"
                } hover:bg-sky-200`}
              >
                <td className="px-3 sm:px-4 py-2">{contact.firstName}</td>
                <td className="px-3 sm:px-4 py-2">{contact.lastName}</td>
                <td className="px-3 sm:px-4 py-2 break-all">{contact.email}</td>
                <td className="px-3 sm:px-4 py-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => updateContact(contact)}
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
