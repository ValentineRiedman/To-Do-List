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
})// end GET

router.post( '/', ( req, res )=>{
    console.log( 'in list POST:', req.body );
    const queryString = `INSERT INTO list( task ) VALUES ( $1 );`;
    const values = [ req.body.task];
    pool.query( queryString, values ).then( ( result )=>{
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( err );
        req.sendStatus( 500 );
    })
})

module.exports = router;