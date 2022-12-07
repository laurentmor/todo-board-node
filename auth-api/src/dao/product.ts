import Product, {IProduct} from '../models/product';

/**
 *
 */
export const getAllProducts = async () => {
	try {
		return await Product.find({});
	} catch (err) {
		throw err;
	}
};
/**
 *
 * @param _id
 */
export const getOneProduct = async (_id) => {
	try {
		return await Product.findOne({ _id });
	} catch (err) {
		throw err;
	}
};
/**
 *
 * @param data
 */
export const createProduct:any = async (data) => {
	try {
		return await Product.create(data);
	} catch (err) {
		throw err;
	}
};


/**
 *
 * @param _id
 * @param data
 */
export const updateProduct = async (_id, data) => {
	try {
		return await Product.updateOne({ _id }, data);
	} catch (err) {
		throw err;
	}
};
/**
 *
 * @param _id
 */

export const deleteProduct = async (_id) => {
	try {
		return await Product.deleteOne({ _id });
	} catch (err) {
		throw err;
	}
};
