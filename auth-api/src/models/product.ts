<<<<<<< HEAD
import  mongoose  from 'mongoose';

import uniqueValidator from "mongoose-unique-validator";


export interface IProduct extends mongoose.Document{
	name: { type: String, required: true,unique:true },
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}
const productSchema:mongoose.Schema = new mongoose.Schema({
	name: { type: String, required: true, unique:true },
=======
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, required: true },
>>>>>>> 2ee97ac (added shit)
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
<<<<<<< HEAD
	autoCreate:true
});
productSchema.plugin(uniqueValidator);
export default mongoose.model<IProduct>('Product', productSchema);
=======
});

export default mongoose.model('Product', productSchema);
>>>>>>> 2ee97ac (added shit)
