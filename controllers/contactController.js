const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// @desc Get all Contacts
// @route GET /api/contact
// @access private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

// @desc Create New Contacts
// @route POST /api/contacts
// @access private

const createContacts = async(req, res) => {
  try {
    // console.log(req.body);
    const {name,email,phone} = req.body;
    const alreadyUser = await Contact.findOne({email})
    const alreadyPhoneNumber = await Contact.findOne({phone})
    console.log(alreadyUser);
    if(!name||!email||!phone){
      return res.send({status:400,message:"All Fields Are Required"});
    }
    if(alreadyUser){
      return res.send({status:400,message:"Email Already Exists"});
    }
    if(alreadyPhoneNumber){
      return res.send({status:400,message:"Phone Number Already Exists"});
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
  res.status(200).json(contact);
  } catch (error) {
    res.send(error)
  }
};

// @desc  GET Contacts
// @route GET /api/contacts:/id
// @access private

const getContactById = async(req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      return res.send({status:404,message:"Contact Not Found"});
    }
    else{
      res.status(200).json(contact);
    }
    
  } catch (error) {
    res.send(error)
  }
};

// @desc Update Contacts
// @route PUT /api/contacts:/id
// @access private

const updateContactById = async(req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      return res.send({status:404,message:"Contact Not Found"});
    }

    if(contact.user_id.toString() !== req.user.id){
      return res.status(403).json("User Dont Have to Permission To Update Other user Contact");
    }
      const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
      )
      res.status(200).json(updateContact);
    
  } catch (error) {
    res.send(error)
  }
};

// @desc Delete Contacts
// @route delete /api/contacts:/id
// @access private

const deleteContactById = asyncHandler(async(req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    // return
    if(!contact){
      return res.send({status:404,message:"Contact Not Found"});
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403).json("You Don't Have to Permission To Delete Other user Contact");
    }
      await Contact.deleteOne({_id:req.params.id})
      res.status(200).json(contact);
    
  } catch (error) {
    res.send(error)
  }
});

module.exports = {
  getContacts,
  createContacts,
  getContactById,
  updateContactById,
  deleteContactById,
};
