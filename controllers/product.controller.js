const { postProductService, getProductService } = require("../services/product.service")

exports.getProducts = async (req, res, next) => {
    try {
        //
        const products = await getProductService()
        res.status(200).send({
            success: true,
            products: products
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
}


exports.postProducts = async (req, res, next) => {
    try {
        // two way to post.
        //1. create
        const result = await postProductService(req.body)
        result.logger()
        //2.save
        // const product = new Product(req.body)
        // const result = await product.save()
        res.status(200).send({
            success: true,
            message: "successfully posted to database",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })

    }
}