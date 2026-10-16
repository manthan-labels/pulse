const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pulseUsers")
  .then(() => {
    console.log("✅ MongoDB connected, fetchHistory");
  })
  .catch((err) => {
    console.log("❌ MongoDB error:", err);
  });

const fetchHistorySchema = mongoose.Schema({
    monitor_id: String,
    statusCode: String,
    latency: String,
    success: String,
    checkedAt: String
});

module.exports = mongoose.model("FetchHistory", fetchHistorySchema);