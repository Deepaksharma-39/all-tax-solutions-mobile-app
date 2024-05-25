const db = require('../../_helpers/db');

module.exports = {
    getBannerService,
    postBannerService,
    deleteBannerService
};

async function getBannerService(req, res) {
    try {
        const banners = await db.Banner.findAll();
        res.status(200).send(banners)
    } catch (error) {
        res.status(202).json('Error retrieving banners');
    }
}
async function postBannerService(req, res) {
    const { filename, description } = req.body;
    console.log(filename,description)
    try {
        const newBanner = await db.Banner.create({ filename, description });
        res.status(200).json("Banner posted Successfully")
    } catch (error) {
        res.status(202).json('Error creating banner');
    }
}

async function deleteBannerService(req, res) {
    try {
        const id = req.params.id;
        const banner = await db.Banner.findByPk(id);
        if (!banner) {
            res.status(202).json("Failed to delete file");}

            await banner.destroy();
            res.status(200).json("file deleted successfully")
        } catch (error) {
            res.status(202).json("Failed to delete file");
        }
    }
