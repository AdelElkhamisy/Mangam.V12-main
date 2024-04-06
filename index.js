require("dotenv").config();
const doQuery = require("./config/doQuery");
const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const connection = require("./config/dbconfig");
const schedule = require("node-schedule");
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

// ================= Modules =============
const category = require("./routes/categoryRoute");
const product = require("./routes/productRouter");
const color = require("./routes/colorRouter");
const color_props = require("./routes/colorPropRouter");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const shipping = require("./routes/shippingRoute");
const return_itemRoute = require("./routes/return_itemRoute");
const bannerRoute = require("./routes/bannerRouter");
const infoRoute = require("./routes/infoRouter");
const reasonRoute = require("./routes/reasonRoute");
const offersRoute = require("./routes/offersRoute");
// ================= Modules =============
const Pusher = require("pusher");
const roomsRoute = require("./routes/roomsRoute");
const { wss } = require("./socket");

const pusher = new Pusher({
  appId: "1762915",
  key: "d207d6ba54517230b8ab",
  secret: "76e0074d3e91abb542e3",
  cluster: "ap2",
  useTLS: true
});
app.use("/v3/category", category);
app.use("/v3/product", product);
app.use("/v3/color", color);
app.use("/v3/color_props", color_props);
app.use("/v3/order", order);
app.use("/v3/user", user);
app.use("/v3/shipping", shipping);
app.use("/v3/return", return_itemRoute);
app.use("/v3/banner", bannerRoute);
app.use("/v3/site", infoRoute);
app.use("/v3/reason", reasonRoute);
app.use("/v3/offers", offersRoute);
app.use("/v3/rooms", roomsRoute);
app.get("/v3/command", async (req, res) => {
  // const command = await doQuery("INSERT INTO offer_rooms SET offer_id = 92");
  const command = await doQuery(`
    CREATE TABLE reports (
      id int(11) NOT NULL AUTO_INCREMENT,
      user_id int(11) DEFAULT NULL,
      order_id int(11) DEFAULT NULL,
      user_email varchar(100) DEFAULT NULL,
      user_name varchar(100) DEFAULT NULL,
      reed boolean DEFAULT false,
      text longtext DEFAULT NULL,
      user_phone varchar(30) DEFAULT NULL,
      created_at timestamp NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci
  `);

  // const command = await doQuery("drop table reports");
  // const command = await doQuery("select * from orders");

  res.json(command);
});
app.get("/v2", (req, res) => {
  res.send("sd");
});
const notifyMe = async (data) => {
  try {
    const notifies = await doQuery("SELECT * FROM notifyOffer");
    if (notifies && notifies?.length) {
      const scheduledDate = new Date(data?.will_av_after);
      schedule.scheduleJob(scheduledDate, async () => {
        // Your job logic here
        await doQuery(
          "INSERT INTO notifies ( user_id, text, link) VALUES (?,?,?)",
          [
            notifies[0]?.user_id,
            "The Offer Number #" +
              notifies[0]?.id +
              " Are Be Available Go To Explore This Offer..!",
            "/otherof"
          ]
        );
        pusher.trigger("my-channel", "my-event", {
          message: "hello world"
        });
      });
    }
  } catch (err) {}
  // console.log(sch);
};
notifyMe();

app.listen(3307);
