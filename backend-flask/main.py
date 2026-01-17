from flask import request,jsonify
from config import app, db
from models import Contact

# GET ALL CONTACTS
@app.route("/Contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(),contacts))
    return jsonify({"contacts" : json_contacts})

# CREATE A NEW CONTACT
@app.route("/CreateContact",methods=["POST"])
def create_contacts():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (jsonify({"message": "include all fields"}),400)
    
    new_contact = Contact(first_name=first_name, last_name=last_name,email=email)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":(e)}),400
    
    return jsonify({"message":"Contact Created."}),201
 
# UPDATE EXISTING CONTACT
@app.route("/UpdateContact/<int:user_id>",methods=["PATCH"])   
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "Contact not found"}),404
    data = request.json
    
    contact.first_name = data.get("firstName",contact.first_name)
    contact.last_name = data.get("lastName",contact.last_name)
    contact.email = data.get("email",contact.email)
    
    db.session.commit()
    
    return jsonify({"message": "Contact Updated"}),200
    
# DELETE CONTACT
@app.route("/DeleteContact/<int:user_id>",methods=["DELETE"])
def Delete_Contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}),404
    
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "Contact Deleted"}),200
    
# 
    
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)