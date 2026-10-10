const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pulseUsers")
  .then(() => {
    console.log("✅ MongoDB connected, monitorModel");
  })
  .catch((err) => {
    console.log("❌ MongoDB error:", err);
  });

const monitorSchema = mongoose.Schema({
    name: String,
    user_id: String,
    url: String,
    expectedStatusCode: String
});

module.exports = mongoose.model("model", monitorSchema);