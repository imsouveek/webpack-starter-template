require('webpack-hot-middleware/client?reload=true');
require('./main.css');
require('./index.pug');

var a = async (args) => {
  const {a, b} = args;
  await console.log("Arrow", a, b);
  console.log("Awaited");
}

a({ a: 5, b: 10});
