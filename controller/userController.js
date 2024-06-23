const DBConnect = require("../model/db");
const bcrypt = require("bcryptjs");
//const Recipe = require('../models/Recipe');

class UserController {

    constructor() {
        this.collectionName = "users";
    }

    async postAddNewUser(req, res) {
        const response = {};
        try{
            const post = req.body || {};
            //
            if(post){
                const email = post.email || "";
                const password = post.password || "";
                const verify_pass = post.confirm_password || "";
                const full_name = post.fullname || "";

                if (!email.trim() || !password.trim() || !verify_pass.trim() || !full_name.trim()){
                    response['success'] = false;
                    response['error_message'] = "Kindly make sure all required fields are correctly filled";

                    return res.status(400).send(response);
                }
                
                if(password !== verify_pass){
                    response['success'] = false;
                    response['error_message'] = "Your both password are not matching.";

                    return res.status(400).send(response);
                }

                /////NOW WE HAVE TO ENCRYPT THE PASSWORD WITH bcrypt LIBRARY LINK: https://www.npmjs.com/package/bcrypt
                let encrypted_password = "";
                const hashed_password = await bcrypt.hash(password, Number(process.env.BCRYPTSALT));
                if(hashed_password){
                    encrypted_password = hashed_password;
                }

                //NOW LETS SUBMIT TO DB
                const data_to_submit = {
                    email,
                    fullname: full_name,
                    password: encrypted_password
                }

                const db_connect = await DBConnect();
                const collection = db_connect.db().collection(this.collectionName);

                const add_new = await collection.insertOne(data_to_submit);
                if(add_new){
                    response['success'] = true;
                    response['data'] = add_new;

                    return res.status(201).send(response);
                }

                response['success'] = false;
                response['error_message'] = "Oops! we have encountered an issue, please try again later or contact support";
                return res.status(400).send(response);
            }
        } catch (e) {
            console.log(e);
            response['success'] = false;
            response['error_message'] = "Oops! we have encountered an issue, please try again later or contact support";
            return res.status(400).send(response);
        }
    }
}




module.exports = UserController;