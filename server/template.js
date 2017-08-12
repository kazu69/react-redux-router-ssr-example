export default ({ body, title, state }) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="/bundle.css">
</head>
<body>
    <div id="root">${body}</div>
     <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
    </script>
    <script async src="/bundle.js"></script>
</body>
</html>
`;
};
