export async function run(
 value,
 response,
 requestParams,
 stylesheet
) {
 const code = `<!doctype html>
<html>
<head>
 <meta charset="UTF-8">
 <script src="/language/crown.js"></script>
${stylesheet}
</head>
<body>
 <p><a href=${JSON.stringify(
  "/explore?" +
   new URLSearchParams(requestParams).toString()
 )}>Explore</a></p>
 <script>
  const value = decodeURIComponent(${JSON.stringify(
   encodeURIComponent(value)
  )});
  async function run() {
   const rootScope = {};
   const rootCrown = crown({
   ...rootScope,
   document: globalThis.document,
   console: globalThis.console,
   process: globalThis.process,
   });
   try {
    await rootCrown.run([value]);
    const result = rootCrown.it();
    console.dir({ result }, { depth: 4 });
   } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.end("Internal server error");
   }
  }
  run().catch(e => console.error(e));
 </script>
</body>
</html>`;
 response.statusCode = 200;
 response.end(code);
}
