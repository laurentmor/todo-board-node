import  mongoose  from 'mongoose';

import uniqueValidator from "mongoose-unique-validator";


export interface IProduct extends mongoose.Document{
	name: { type: String, required: true,unique:true },
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}
const productSchema:mongoose.Schema = new mongoose.Schema({
	name: { type: String, required: true, unique:true },
	category: { type: String, required: true },
	unit: { type: Number, required: true }
}, {
	timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
	autoCreate:true
});
productSchema.plugin(uniqueValidator);
export default mongoose.model<IProduct>('Product', productSchema);
