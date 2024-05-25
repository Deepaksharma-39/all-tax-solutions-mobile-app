const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize')
const BannerService = require('./banner.service');

// routes

router.get('/', getAll);
router.post('/', authorize(['admin']), postBanner);
router.delete('/:id', authorize(['admin']), deleteBanner);
// router.delete('/', authorize(['admin']), deleteBanner);

async function getAll(req, res, next){
    BannerService.getBannerService(req,res)
}
async function postBanner(req, res, next){
    BannerService.postBannerService(req,res)
}
async function deleteBanner(req, res, next){
    BannerService.deleteBannerService(req,res)
}



module.exports = router;