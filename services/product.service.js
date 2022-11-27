const Product = require("../models/Products")

exports.getProductService = async () => {
    const product = await Product.find({})
    return product
}

exports.postProductService = async (data) => {
    const result = await Product.create(data)
    return result
}

exports.updateProductService = async (productId, data) => {
    const product = await Product.findById(productId)
    const result = await product.set(data).save()
    return result
}

exports.bulkUpdateProductService = async (ids, data) => {
    const result = await Product.updateMany({ _id: ids }, data, {
        runValidators: true
    })
    return result
}