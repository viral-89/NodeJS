const autocannon = require("autocannon");
const url = "http://localhost:3000";
const duration = "10"; // Duration of the test in seconds

const instance = autocannon(
  {
    url,
    duration, // Duration of the test
  },

  (err, result) => {
    if (err) {
      console.log("server test fail: ", err);
    } else {
      console.log("server test result :", result);
    }
  },
);

autocannon.track(instance);
