const { Router } = require("express");
const router = Router();

// Firebase
const admin = require("firebase-admin");
const serviceAccount = require("../../jposso-iot-dashboard-firebase-adminsdk-3mgxn-d1e6f0884f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jposso-iot-dashboard.firebaseio.com",
});
var db = admin.database();

// Rutas
router.get("/device/:device", (req, res) => {
  let records = {
    device: req.params.device,
  };

  var ref = db.ref(req.params.device);
  ref.once("value", function (snapshot) {
    records.log = snapshot.val();
    res.json(records);
  });
});

router.post("/device/:device", (req, res) => {
  var ref = db.ref(req.params.device);

  var newRecordRef = ref.push({
    sensor: req.body.sensor,
    value: req.body.value,
    timestamp: admin.database.ServerValue.TIMESTAMP,
  });

  db.ref(req.params.device).update({
    value: req.body.value,
  });

  res.json({
    message: "Done",
    recordId: newRecordRef.key,
  });
});

module.exports = router;
