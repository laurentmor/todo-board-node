<<<<<<< HEAD
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
=======
import  mongoose  from 'mongoose';
>>>>>>> 0f95521 (fix sec)

import uniqueValidator from "mongoose-unique-validator";

<<<<<<< HEAD
const productSchema = new Schema({
	name: { type: String, required: true },
>>>>>>> 2ee97ac (added shit)
=======

export interface IProduct extends mongoose.Document{
	name: { type: String, required: true,unique:true },
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}
const productSchema:mongoose.Schema = new mongoose.Schema({
	name: { type: String, required: true, unique:true },
>>>>>>> 0f95521 (fix sec)
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
<<<<<<< HEAD
<<<<<<< HEAD
	autoCreate:true
});
productSchema.plugin(uniqueValidator);
export default mongoose.model<IProduct>('Product', productSchema);
=======
});

export default mongoose.model('Product', productSchema);
>>>>>>> 2ee97ac (added shit)
=======
	autoCreate:true
});
productSchema.plugin(uniqueValidator);
export default mongoose.model<IProduct>('Product', productSchema);
>>>>>>> 0f95521 (fix sec)
