import Url from '../../../models/Url';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const urlsApi = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    await sleep(1000);
  }

  switch (req.method) {
    case 'POST':
      const { originalUrl, shortUrl } = req.body;
      const url = await Url.create({
        originalUrl,
        shortUrl,
      });
      return res.status(201).json({ url });

    case 'GET':
      const { limit = 3, offset = 0 } = req.query;

      const urls = await Url.findAll({
        order: [['clicks', 'DESC']],
        limit,
        offset,
      });

      return res.json(urls);

    default:
      break;
  }
};

export default urlsApi;
