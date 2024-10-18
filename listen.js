const app = require("./app");

app.listen(10000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on 10000!");
  }
});
