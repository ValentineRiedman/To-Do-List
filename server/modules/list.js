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
        res.sendStatus( 500 );
    })
})// end POST

router.put( '/', ( req, res )=>{
    console.log( 'in /list PUT', req.query );
    let queryString = `UPDATE list SET completed=true WHERE id=$1;`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})// end PUT

router.delete( '/', ( req, res )=>{
    console.log(' /list DELETE:', req.query );
    let queryString = 'DELETE FROM list WHERE id=$1';
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})// end DELETE

module.exports = router;