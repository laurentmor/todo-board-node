<<<<<<< HEAD
import Product, {IProduct} from '../models/product';

/**
 *
 */
=======
import Product from '../models/product';

>>>>>>> 2ee97ac (added shit)
export const getAllProducts = async () => {
	try {
		return await Product.find({});
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
/**
 *
 * @param _id
 */
=======

>>>>>>> 2ee97ac (added shit)
export const getOneProduct = async (_id) => {
	try {
		return await Product.findOne({ _id });
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
/**
 *
 * @param data
 */
export const createProduct:any = async (data) => {
=======

export const createProduct = async (data) => {
>>>>>>> 2ee97ac (added shit)
	try {
		return await Product.create(data);
	} catch (err) {
		throw err;
	}
};

<<<<<<< HEAD

/**
 *
 * @param _id
 * @param data
 */
=======
>>>>>>> 2ee97ac (added shit)
export const updateProduct = async (_id, data) => {
	try {
		return await Product.updateOne({ _id }, data);
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
/**
 *
 * @param _id
 */
=======
>>>>>>> 2ee97ac (added shit)

export const deleteProduct = async (_id) => {
	try {
		return await Product.deleteOne({ _id });
	} catch (err) {
		throw err;
	}
<<<<<<< HEAD
};
=======
};
>>>>>>> 2ee97ac (added shit)
