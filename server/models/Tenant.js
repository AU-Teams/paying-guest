import mongoose from 'mongoose';
const tenantSchema = new mongoose.Schema({
  name: String,
  room: String,
  rent: String,
  roomtype: String,
  photo: String,
  address: String
});
export default mongoose.model('Tenant', tenantSchema);