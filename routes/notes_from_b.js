var express = require('express');
var router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加
require('dotenv').config();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
// corsミドルウェアを使用
router.use(cors());

const log4js = require('log4js')
const logger = log4js.getLogger();
logger.level = 'debug';

router.get('/', async (req, res) => {
    try {
    // データベース、コレクションを指定
    logger.debug('get data start!');
    const database = client.db('notes');
    const notes = database.collection('notes');

    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();
    //console.log(note);
    res.json(note);
    }catch(err) {
     logger.debug('error!');
     client.close();
    } finally {
     logger.debug('close client!');
     client.close();
    };
})

module.exports = router;