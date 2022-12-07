<<<<<<< HEAD
<<<<<<< HEAD
import Product, {IProduct} from '../models/product';

/**
 *
 */
=======
import Product from '../models/product';

>>>>>>> 2ee97ac (added shit)
=======
import Product, {IProduct} from '../models/product';

/**
 *
 */
>>>>>>> 0f95521 (fix sec)
export const getAllProducts = async () => {
	try {
		return await Product.find({});
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)
/**
 *
 * @param _id
 */
<<<<<<< HEAD
=======

>>>>>>> 2ee97ac (added shit)
=======
>>>>>>> 0f95521 (fix sec)
export const getOneProduct = async (_id) => {
	try {
		return await Product.findOne({ _id });
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)
/**
 *
 * @param data
 */
export const createProduct:any = async (data) => {
<<<<<<< HEAD
=======

export const createProduct = async (data) => {
>>>>>>> 2ee97ac (added shit)
=======
>>>>>>> 0f95521 (fix sec)
	try {
		return await Product.create(data);
	} catch (err) {
		throw err;
	}
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)

/**
 *
 * @param _id
 * @param data
 */
<<<<<<< HEAD
=======
>>>>>>> 2ee97ac (added shit)
=======
>>>>>>> 0f95521 (fix sec)
export const updateProduct = async (_id, data) => {
	try {
		return await Product.updateOne({ _id }, data);
	} catch (err) {
		throw err;
	}
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0f95521 (fix sec)
/**
 *
 * @param _id
 */
<<<<<<< HEAD
=======
>>>>>>> 2ee97ac (added shit)
=======
>>>>>>> 0f95521 (fix sec)

export const deleteProduct = async (_id) => {
	try {
		return await Product.deleteOne({ _id });
	} catch (err) {
		throw err;
	}
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
};
>>>>>>> 2ee97ac (added shit)
=======
};
>>>>>>> 0f95521 (fix sec)
