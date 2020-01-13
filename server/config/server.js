const app = require('../app');
const port = process.env.PORT || 3000;

app.listen(3000, ()=>{
    console.log("app listen in port " + port);
});