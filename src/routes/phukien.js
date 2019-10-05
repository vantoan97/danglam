const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', async (req, res) => {
    const listdtdd = await pool.query('SELECT * FROM danhmuc_con WHERE id_dmuc=1');
    const listpk = await pool.query('SELECT * FROM danhmuc_con WHERE id_dmuc=2');
    res.render('shop/page/phukien',{ listdtdd, listpk});
});

module.exports = router;