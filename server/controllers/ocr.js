const axios = require('axios');

class OcrController {
    static detect(req, res, next) {
        axios({
            method: 'GET',
            url: `https://api.ocr.space/parse/imageurl?url=${req.body.url}`,
            headers: {
                apikey: process.env.OCR_KEY
            }
        })
            .then(({data}) => {
                const parsedText = data.ParsedResults[0].ParsedText;
                
                res.status(200).json({parsedText});
            }).catch(next);
    }
}

module.exports = {
    OcrController
};
