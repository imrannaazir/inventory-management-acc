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

exports.bulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: ids }, data, {
    //     runValidators: true
    // })
    // return result
    console.log(data);
    const products = []
    data.products.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    })
    const result = await Promise.all(products)
    return result
}