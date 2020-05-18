const productModel = require('../models/product.model')

module.exports = {
	getProductAll: async (req, res) => {
		try {

			/*productModel.find({},'product_name');
			productModel.find({},{'product_name':1,'_id':0});
			productModel.find({'product_name':'pen'},{'product_name':1,'_id':0});
			productModel.find({product_name:'pen'});
			productModel.find({product_price:{$gt:10}});
			productModel.find({}).sort({product_price:-1}).skip(1).limit(10).select({product_name:1,_id:0}).exec();*/

			const products = await productModel.find();
			res.json({ 'success': true, message: "Product fetched successfully!!!", data: products });
		} catch (err) {
			res.status(404).json({ 'success': false, 'message': 'Some Error', 'err': err.message });
		}
	},
	getProductDetail: async (req, res) => {
		try {
			const productInfo = await productModel.findById(req.params.id);
			res.json({ 'success': true, message: "Product fetched successfully!!!", data: productInfo });
		} catch (err) {
			res.status(404).json({ 'success': false, 'message': 'Some Error', 'err': err.message });
		}
	},
	createProduct: async (req, res) => {
		try {
			const prodObj = new productModel(req.body);

			const result = await productModel.create(prodObj);

			res.json({ 'success': true, message: "Product added successfully!!!", data: result });
		} catch (err) {
			res.status(404).json({ 'success': false, 'message': 'Some Error', 'err': err.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
			const prodObj = { product_name: req.body.product_name, product_price: req.body.product_price };

			const result = await productModel.findByIdAndUpdate(req.params.id, prodObj);

			res.json({ 'success': true, message: "Product Updated successfully!!!", data: result });
		} catch (err) {
			res.status(404).json({ 'success': false, 'message': 'Some Error', 'err': err.message });
		}
	},

	deleteProduct: async (req, res) => {
		try {
			const result = await productModel.findByIdAndRemove(req.params.id);

			res.json({ 'success': true, message: "Product deleted successfully!!!", data: result });
		} catch (err) {
			res.status(404).json({ 'success': false, 'message': 'Some Error' });
		}
	}
}