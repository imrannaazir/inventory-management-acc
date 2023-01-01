const { postProductService, getProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("../services/product.service")

exports.getProducts = async (req, res, next) => {
    try {
        console.log(req.query);

        // coping the query object because obj is ref type
        const queryObj = { ...req.query }

        //fields that we want to exclude
        const excludeFields = ["sort", "page", "limit"]
        // exclude from query object
        excludeFields.forEach(field => delete queryObj[field])

        console.log(req.query);
        console.log(queryObj);
        //call the service func with excluded obj
        const products = await getProductService(queryObj)
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

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await updateProductService(id, req.body)
        res.status(200).send({
            success: true,
            message: "successfully updated",
            result: result
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
}

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body)
        res.status(200).send({
            success: true,
            message: "successfully updated",
            result: result
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductByIdService(id)
        res.status(200).send({
            message: `Successfully deleted the product by id ${id}`,
            result: result
        })
    } catch (error) {
        res.status(400).send({
            message: `Couldn't deleted the product!`,
            error: error.message
        })

    }
}

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const { ids } = req.body
        console.log(ids);
        const result = await bulkDeleteProductService(ids)
        if (!result.deletedCount) {
            res.status(400).send({
                message: `Couldn't deleted the products!`,
                error: error.message
            })
        }
        else {
            res.status(200).send({
                message: `Successfully deleted the product by id ${ids}`,
                result: result
            })
        }

    } catch (error) {
        res.status(400).send({
            message: `Couldn't deleted the products!`,
            error: error.message
        })
    }
}