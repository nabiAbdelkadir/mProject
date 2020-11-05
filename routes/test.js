var express = require('express');
var router = express.Router();
const crypto=require("crypto")
router.get('/', function(req, res, next) {

    const hash = crypto.createHash('sha256').update("nabi").copy().digest("hex")

    res.send(hash)
    res.render('test',
        {
            title: 'test'
        }
    );
});

module.exports = router;
