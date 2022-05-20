const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool');

router.get( '/', (req, res )=>{
    let queryString = `SELECT * FROM list`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    } )
})

module.exports = router;