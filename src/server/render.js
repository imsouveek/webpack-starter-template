export default (renderer) => (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).end("Internal Server error");
      return;
    }

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/main.css"/>
        </head>
        <body>
          ${html}
          <script src='vendors~main-bundle.js'></script>
          <script src='main-bundle.js'></script>
        </body>
      </html>
    `)
  })
}