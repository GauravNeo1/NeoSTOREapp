const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectId;

const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";

const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

const profileModel = require('../db/profileSchema');
const otpModel = require('../db/otpSchema');
const catModel = require('../db/categorySchema');
const colorModel = require('../db/colorSchema');
const productModel = require('../db/productSchema');
const addressModel = require("../db/addressSchema");
const cartModel = require("../db/cartSchema");
const orderModel = require("../db/orderSchema");



function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}




var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gaurav9zx@gmail.com',
        pass: 'Gaurav@neo1'
    }
});





router.post("/fetchproducts", (req, res) => {

    let findArg = {}
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "product_rating";
    let page = req.body.page ? req.body.page : 1;
    let size = req.body.size ? req.body.size : 6;
    let term = req.body.searchTerm;

    let limit = parseInt(size);
    let skip = (page - 1) * 6;
    console.log('skip', skip);
    console.log('limt', limit);
    console.log(req.body.filters)
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            findArg[key] = req.body.filters[key];

        }
    }

    // productModel.find(findArg)
    //     .populate(["category_id", "color_id"])

    //     .skip(skip)
    //     .limit(limit)
    //     .sort([[sortBy, order]])
    //     .exec((err, product) => {
    //         if (err) return res.status(400).json({ success: false, err })
    //         res.status(200).json(product)

    //     })


    if (term) {
        productModel.find(findArg)
            .populate(["category_id", "color_id"])
            .find({ $text: { $search: term } })
            .skip(skip)
            .limit(limit)
            .sort([[sortBy, order]])
            .exec((err, product) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json(product)

            })
    } else {
        productModel.find(findArg)
            .populate(["category_id", "color_id"])

            .skip(skip)
            .limit(limit)
            .sort([[sortBy, order]])
            .exec((err, product) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json(product)

            })
    }




})


router.get("/fetchcolors", (req, res) => {

    colorModel.find()
        .then(color => {
            console.log(color);
            res.json(color)
        })
})


router.get("/fetchcategories", (req, res) => {

    catModel.find()
        .then(category => {
            console.log(category);
            res.json(category)
        })
})


// router.get("/fetchproducts", (req, res) => {

//      productModel.find()
//     .populate(["category_id","color_id"])
//     .then(product=>{
//         console.log(product);
//         res.json(product)
//     })
// })


router.get("/fetchproductby/:data", (req, res) => {
    console.log(req.params.data)
    productModel.findOne({ _id: req.params.data }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else if (data == null) {

            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else {
            productModel.find({ _id: req.params.data })
                .populate(["category_id", "color_id"])
                .then(product => {
                    console.log(product);
                    res.json(product)
                })
        }
        console.log("mail correct")
    })



})


router.post("/addpost", (req, res) => {

    console.log(req.body)
    let fname = req.body.fname;
    let lname = req.body.lname;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let email = req.body.email;
    let password = req.body.password;
    let hash = bcrypt.hashSync(password, saltRounds);


    profileModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Server side error" })
        }
        else if (data == null) {
            let ins = new profileModel({ first_name: fname, last_name: lname, email: email, gender: gender, dob: dob, password: hash });
            console.log(ins)
            ins.save((err) => {
                if (err) throw err;
                else {
                    res.json({ "err": 0, "msg": "Register successfully" })
                }
            })
        }
        else {

            res.json({ "err": 2, "msg": "Email ID is already registerd" })

        }
        console.log("mail correct")
    })

    console.log(req.body)

})



router.post("/sociallogin", (req, res) => {

    console.log(req.body)
    let fname = req.body.fname;
    let lname = req.body.lname;
    let dob = req.body.dob ? req.body.dob : "01/01/1111";
    let gender = req.body.gender ? req.body.gender : "undefined";
    let email = req.body.email;
    let profile_image = req.body.profile_image;
    let password = req.body.email;
    let hash = bcrypt.hashSync(password, saltRounds);


    profileModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Server Error" })
        }
        else if (data == null) {
            let ins = new profileModel({ first_name: fname, last_name: lname, email: email, gender: gender, dob: dob, password: hash, profile_image: profile_image });
            console.log(ins)
            ins.save((err, data) => {
                if (err) { res.json("Already Added") }
                else {
                    console.log("data", data)
                    // res.json(" Data Added")
                    let payload = {
                        uid: email
                    }
                    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
                    res.json({ "err": 0, "msg": "Login Success", "token": token, "data": data._id })
                }
            })


        }
        else {

            let payload = {
                uid: data.email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token, "data": data._id })

        }
        console.log("mail correct")
    })

})



router.post("/loginstore", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    profileModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Server side error" })
        }
        else if (data == null) {
            res.json({ "err": 2, "msg": "Email is not correct" })
        }
        else {
            console.log(data.password)
            console.log(data.email)
            if (data.email === email && bcrypt.compareSync(password, data.password)) {
                let payload = {
                    uid: email
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
                res.json({ "err": 0, "msg": "Login Success", "token": token, "data": data._id })
            }
            else {
                res.json({ "err": 3, "msg": "Password is incorrect" })
            }
        }
        console.log("mail correct")
    })
    console.log(req.body)
})


router.post("/updateprofiledata", (req, res) => {
    if (req.body.old_email === req.body.new_email) {
        profileModel.updateOne({ email: req.body.old_email }, { $set: { first_name: req.body.fname, last_name: req.body.lname, dob: req.body.dob, gender: req.body.gender } }, (err) => {
            if (err) throw err;
            else {
                res.json({ "err": 0, "msg": "Profile updated" });
            }
        })
    }
    else {
        profileModel.findOne({ email: req.body.new_email }, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Error" })
            }
            else if (data == null) {
                profileModel.updateOne({ email: req.body.old_email }, { $set: { first_name: req.body.fname, last_name: req.body.lname, email: req.body.new_email, dob: req.body.dob, gender: req.body.gender } }, (err) => {
                    if (err) throw err;
                    else {
                        res.json({ "err": 0, "msg": "Profile updated" });
                    }
                })
            }
            else {
                res.json({ "err": 1, "msg": "Email already present" })
            }

        })
    }
})



router.post("/updateprofileimage", (req, res) => {
    let sampleFile = req.files.profile_image;
    sampleFile.mv('E:/NeoSTORE/neostoreapp/public/Assest/Profile_Images/' + sampleFile.name)
    console.log(sampleFile)
    console.log(req.body.email)
    profileModel.updateOne({ email: req.body.email }, { $set: { profile_image: sampleFile.name } }, (err) => {
        if (err) {
            res.json({ "err": 1, "msg": "Sever side problem" })
        }
        else {
            res.json({ "err": 0, "msg": "Profile updated" });
        }
    })
})


router.get("/fetchprofiledata/:data", (req, res) => {
    // console.log(req.params.data)
    // let email = req.params.data;
    let id = req.params.data;
    profileModel.findOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Error" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "No Data Found" })
        }
        else {
            res.json({ "err": 0, "loginuser": data })
        }

    })

})


router.post("/emailsendotp", (req, res) => {
    console.log(req.body.email)

    profileModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Something err in server" })
        }
        else if (data == null) {
            res.json({ "err": 2, "msg": "Email Id is not exist" })
        }
        else {

            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let expiretime = new Date().getTime() + 300 * 1000;
            console.log(expiretime)
            let ins = new otpModel({ email: req.body.email, code: otpcode, expirein: expiretime });
            console.log(ins)
            ins.save((err) => {
                if (err) { res.json("error") }
                else {
                    sendOTPmail(req.body.email, otpcode)
                    res.json({ "err": 0, "msg": "Plz check your Email ID", "flag": "true" })

                }
            })
        }
    })
})



router.post("/changepasswordold", (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let oldpass = req.body.oldpass;
    let newpass = req.body.newpass;


    profileModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Something err in server" })
        }
        else {
            if (data.email === email && bcrypt.compareSync(oldpass, data.password)) {
                let hash = bcrypt.hashSync(newpass, saltRounds);
                profileModel.updateOne({ email: req.body.email }, { $set: { password: hash } }, (err) => {
                    if (err) { res.json("error") }
                    else {
                        res.json({ "err": 0, "msg": "Password change succefully" })
                        console.log("password change")
                    }
                })
            }
            else {
                res.json({ "err": 2, "msg": "Old password not match" })
            }

        }
    })

})


router.post("/changepasswordotp", (req, res) => {
    console.log(req.body)
    let password = req.body.password;

    otpModel.findOne({ email: req.body.email, code: req.body.otpcode }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Something err in server" })
        }
        else if (data == null) {
            res.json({ "err": 2, "msg": "OTP not match" })
        }
        else {
            let currentTime = new Date().getTime();
            let diff = data.expirein - currentTime;
            if (diff < 0) {
                res.json({ "err": 3, "msg": "OTP Expire" })
            }
            else {
                let hash = bcrypt.hashSync(password, saltRounds);
                profileModel.updateOne({ email: req.body.email }, { $set: { password: hash } }, (err) => {
                    if (err) { res.json("error") }
                    else {
                        res.json({ "err": 0, "msg": "Password change succefully" })
                        console.log("password change")
                    }
                })
            }
        }
    })
})


const sendOTPmail = (email, otp) => {
    var mailOptions = {
        from: 'gaurav9zx@gmail.com',
        to: 'gaurav9zx@gmail.com',
        subject: `NeoSTORE`,
        text: `${email} your recovery password otp is ${otp}`,

    };

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + email);
        }
    });
}



router.get("/fetchaddress/:data", (req, res) => {

    addressModel.find({ customer_id: req.params.data })
        .then(address => {
            // console.log(address);
            res.json(address)
        })
})

router.post("/deleteaddress", (req, res) => {

    console.log(req.body)

    addressModel.remove(req.body, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Something err in server" })
        }
        else {
            console.log(data)
            res.json({ "err": 0, "data": data })
        }
    })
})



router.post("/fetchaddressbyid", (req, res) => {

    addressModel.findOne(req.body, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Something err in server" })
        }
        else {
            console.log(data)
            res.json({ "err": 0, "data": data })
        }
    })
})




router.post("/editaddress", (req, res) => {


    let formData = {
        customer_id: req.body.customer_id,
        _id: req.body.id
    }

    let address = req.body.address;
    let isdeliveryaddress = req.body.isdeliveryaddress;
    addressModel.updateOne(formData, { $set: { address: address, isdeliveryaddress: isdeliveryaddress } }, (err) => {
        if (err) {
            res.json({ "err": 1, "msg": "Sever side problem" })
        }
        else {
            res.json({ "err": 0, "msg": "address updated" });
        }
    })
})

router.post("/addaddress", (req, res) => {

    console.log(req.body)
    let customer_id = req.body.customer_id;
    let address = req.body.address;
    let city = req.body.city;
    let pin = req.body.pin;
    let country = req.body.country;
    let state = req.body.state;
    let isdeliveryaddress = req.body.isdeliveryadd;

    let ins = new addressModel({ customer_id: customer_id, address: address, pincode: pin, city: city, state: state, country: country, isdeliveryaddress: isdeliveryaddress });
    console.log(ins)
    ins.save((err) => {
        if (err) { res.json("Already Added") }
        else {
            res.json(" Data Added")
        }
    })
})

router.post("/cartadd", (req, res) => {
    console.log(req.body)
    // let user = '61cda9cc55407bf8bd5d5960';
    // let productp = '61d3d509a8cbb1716da04d4c';
    // let cartItemsp = {
    //     product: '61d3d509a8cbb1716da04d4c',
    //     quantity: 1,
    // }

    let user = req.body.customer_id;
    let productp = req.body.product_id;
    let price = req.body.price;
    let cartItemsp = {
        product: req.body.product_id,
        quantity: 1,
        total_productcost: req.body.price
    }

    var myquery = { customer_id: req.body.user, "cartItems.product": req.body.productp };
    var newvalues = { $set: { 'cartItems.$.quantity': 11 } };
    // cartModel.updateOne( myquery ,newvalues, (err,data)=>{
    //     if (err) throw err;
    // console.log("1 document updated");
    // })


    function runUpdate(condition, updateData) {
        return new Promise((resolve, reject) => {
            //you update code here

            cartModel.updateOne(condition, updateData, { upsert: true })
                .then((result) => resolve())
                .catch((err) => reject(err));
            console.log("new added")
        });
    }


    cartModel.findOne({ customer_id: user })
        .exec((err, cart) => {
            if (err) throw err;
            if (cart) {

                let promiseArray = [];

                //find product present in cart or not
                cartModel.find({ customer_id: user }).exec((err, cart) => {
                    cart.forEach((cart) => {
                        let item = cart.cartItems.find((c) => c.product == productp);
                        console.log(item)


                        if (item) {
                            console.log("item already present in cart - increase quantity");    //if present increse quantity and price

                            var myquery = { customer_id: user, "cartItems.product": productp };
                            // var newvalues = { $set: { 'cartItems.$.quantity': item.quantity + 1 } };
                            var newvalues = { $set: { 'cartItems.$.quantity': item.quantity + 1, 'cartItems.$.total_productcost': item.total_productcost + price } };

                            // cartModel.updateOne(myquery, newvalues, (err, data) => {
                            //     if (err) throw err;
                            //     console.log("1 document updated");
                            // })

                        }
                        else {
                            console.log("item not presnet in cart- add product")  //item not presnet in cart- add product

                            var myquery = { customer_id: user };
                            var newvalues = { $push: { cartItems: cartItemsp } };
                            // cartModel.updateOne({ user }, { $push: { cartItems: cartItemsp } })
                            //     .exec(err => {
                            //         if (err) throw err;
                            //     })
                            // console.log("Product added")

                        }
                        promiseArray.push(runUpdate(myquery, newvalues));

                    });
                    Promise.all(promiseArray)
                        .then((response) => res.status(201).json({ response }))
                        .catch((error) => res.status(400).json({ error }));
                });
            }
            else {
                //if user is new create new cart 
                console.log("Cart is created")
                let ins = new cartModel({ customer_id: user, cartItems: [cartItemsp] });
                ins.save((err) => {
                    if (err) throw err;
                    else {
                        res.json("Data added to cart")
                    }
                })
            }
        })


})



router.post("/cartremove", (req, res) => {
    // console.log(req.body)
    // let user = '61cd9681838257352dd78a44';
    // let productp = '61d3d547a8cbb1716da04d4f';
    let cartItemsp = {
        product: '61d3d547a8cbb1716da04d4f',
        quantity: 1,
        total_productcost: 500
    }
    let user = req.body.customer_id;
    let productp = req.body.product_id;

    var myquery = { customer_id: user, "cartItems.product": productp };
    var newvalues = { $pull: { cartItems: { product: productp } } };
    // cartModel.updateOne( myquery ,newvalues, (err,data)=>{
    //     if (err) throw err;
    // console.log("1 document updated");
    // })

    console.log("item already present in cart - update quantity");    //if present increse quantity and price
    cartModel.updateOne(myquery, newvalues, (err, data) => {
        if (err) throw err;
        console.log("1 document removed");
    })

})



router.post("/descproductqty", (req, res) => {
    // console.log(req.body)
    // let user = '61cda9cc55407bf8bd5d5960';
    // let productp = '61d3d547a8cbb1716da04d4f';
    let cartItemsp = {
        product: '61d3d547a8cbb1716da04d4f',
        quantity: 1,
        total_productcost: 500
    }
    let productp = req.body.product_id;
    let user = req.body.customer_id;
    let price = req.body.price;


    function runUpdate(condition, updateData) {
        return new Promise((resolve, reject) => {
            //you update code here

            cartModel.updateOne(condition, updateData, { upsert: true })
                .then((result) => resolve())
                .catch((err) => reject(err));
            console.log("new added")
        });
    }

    let data = { customer_id: user };
    let promiseArray = [];

    cartModel.find(data).exec((err, cart) => {
        cart.forEach((cart) => {
            let item = cart.cartItems.find((c) => c.product == productp);
            // console.log(item)

            console.log("qty", item.quantity)
            if (item.quantity > 1) {
                console.log("item already present in cart - decrese quantity");    //if present increse quantity and price

                var myquery = { customer_id: user, "cartItems.product": productp };
                // var newvalues = { $set: { 'cartItems.$.quantity': item.quantity - 1 } };
                var newvalues = { $set: { 'cartItems.$.quantity': item.quantity - 1, 'cartItems.$.total_productcost': item.total_productcost - price } };

                // cartModel.updateOne(myquery, newvalues, (err, data) => {
                //     if (err) throw err;
                //     console.log("1 document updated");
                // })

            }
            else {
                console.log("if it 1 then pull that product")
                var myquery = { customer_id: user, "cartItems.product": productp };
                var newvalues = { $pull: { cartItems: { product: productp } } };
            }
            promiseArray.push(runUpdate(myquery, newvalues));


        });


    });
    Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
})


router.get("/fetchcartdata/:data", (req, res) => {
    console.log(req.params.data)
    let user = "";
    cartModel.findOne({ customer_id: req.params.data })
        .populate("cartItems.product", "_id product_name product_cost product_image")
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                let cartItems = [];
                cart.cartItems.forEach((item, index) => {
                    //   cartItems[item.product._id.toString()] = {
                    cartItems[index] = {
                        _id: item.product._id.toString(),
                        name: item.product.product_name,
                        img: item.product.product_image,
                        price: item.product.product_cost,
                        qty: item.quantity,
                    };
                });
                console.log(cartItems)
                res.status(200).json(cartItems);
            }
        });


})



router.post("/addorder", (req, res) => {
    console.log(req.body)
    let ins = new orderModel(req.body);
    ins.save((error, data) => {
        if (error) return res.status(400).json({ error });
        if (data) {
            res.status(201).json({ data });
        }
    });

})


router.get("/fetchordersdata/:data", (req, res) => {
    console.log(req.params.data)

    orderModel.find({ customer_id: req.params.data })
        .select("_id totalamount paymentBy isDeliverd orderItems")
        .populate("orderItems.product", "_id product_name product_image product_cost")
        .exec((error, orders) => {
            if (error) return res.status(400).json({ error });
            if (orders) {
                res.status(200).json(orders);
                console.log(orders)
            }
        });


})


router.post("/fetchorderbyid", (req, res) => {

    console.log(req.body)
    orderModel.find(req.body)
        .select("_id totalamount paymentBy isDeliverd orderItems delivery_address createdAt")
        .populate(["orderItems.product", "_id product_name product_image product_cost", "delivery_address", "customer_id"])
        .exec((error, orders) => {
            if (error) return res.status(400).json({ error });
            if (orders) {
                res.status(200).json(orders);
                console.log(orders)
            }
        });

})



router.post("/userrating", (req, res) => {

    console.log(req.body)
    product_id = req.body._id;
    productrating = {
        rating: req.body.rating
    }
    productModel.updateOne({ _id: product_id }, { $push: { product_rating: productrating } }, (err, data) => {
        if (err) throw err;
        console.log("1 document updated");
    })



})


module.exports = router;



