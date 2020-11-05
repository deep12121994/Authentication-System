const express = require("express");
const router = express.Router();
const {user_Registration, user_List, login, find_User, update_User, remove_User } = require("./users.control");
const {product_Registration, product_List, find_Product, remove_Product, update_Product } = require("./products.control");
const { vendor_Registration, vendor_List, find_Vendor, update_Vendor, remove_Vendor} = require("./vendors.control");
const { order_Registration, order_List, update_Order, find_Order, remove_Order, orderDetails_Registration} = require("./orders.control");

//users controller
router.post("/user/registration", user_Registration);
router.get("/user/user_list", user_List);
router.post("/user/login", login);
router.post("/user/find", find_User);
router.post("/user/update", update_User);
router.post("/user/remove", remove_User);

//product controller
router.post("/product/registration", product_Registration);
router.get("/product/product_list", product_List);
router.post("/product/find", find_Product);
router.post("/product/update", update_Product);
router.post("/product/remove", remove_Product);

//vendor controller
router.post("/vendor/registration", vendor_Registration);
router.get("/vendor/vendor_list", vendor_List);
router.post("/vendor/find", find_Vendor);
router.post("/vendor/update", update_Vendor);
router.post("/vendor/remove", remove_Vendor);

//order controller
router.post("/order/registration", order_Registration);
router.get("/order/order_list", order_List);
router.post("/order/find", find_Order);
router.post("/order/update", update_Order);
router.post("/order/remove", remove_Order);
router.post("/order/orderdetails_registration", orderDetails_Registration);

module.exports = router;