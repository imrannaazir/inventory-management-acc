const express = require("express")
const { getProducts, postProducts, updateProduct, bulkUpdateProduct } = require("../controllers/product.controller")
const router = express.Router()

router.route("/")
    .get(getProducts)
    .post(postProducts)

router.route("/bulk-update")
    .patch(bulkUpdateProduct)

router.route("/:id")
    .patch(updateProduct)
module.exports = router