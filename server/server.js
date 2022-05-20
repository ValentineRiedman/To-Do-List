const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const list = require( './modules/list');

app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/list', list );

const port = 5001;

app.listen( port, ()=>{
    console.log( 'server up:', port );
})