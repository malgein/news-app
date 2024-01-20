const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
		id: {type: Number, required: true},
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    // password: { type: "String", required: true },
    username: { type: "String", required: true },
    address: {
        street: { type: String },
        suite: { type: String },
        // Puedes agregar más propiedades según sea necesario (por ejemplo, código postal, país, etc.)
        city: { type: String },
        zipcode: { type: String }
      },
		geo: {
        lat:{ type: String },
        lng: { type: String }
      },
		phone: { type: String },
		website: { type: String },
		company: {
			name: { type: String },
			catchPhrase: { type: String },
			bs: { type: String }
			},
  },
  { timestaps: true }
);

const User = mongoose.model("User", userModel);

module.exports = User;