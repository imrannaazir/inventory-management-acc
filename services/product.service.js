const Product = require("../models/Products")

exports.getProductService = async () => {
    const product = await Product.find({})
    return product
}

exports.postProductService = async (data) => {
    const result = await Product.create(data)
    return result
}