import Url from '../../../models/Url';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shortUrlApi = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    await sleep(1000);
  }

  const { shortUrl } = req.query;

  switch (req.method) {
    case 'GET':
      const url = await Url.findByPk(shortUrl);
      if (!url) {
        return res.status(404).send();
      }
      return res.json(url);
    case 'DELETE':
      await Url.destroy({
        where: {
          shortUrl,
        },
      });
      return res.status(204).send();

    case 'PATCH':
      const { originalUrl } = req.body;
      const patchedUrl = await Url.update(
        {
          originalUrl,
        },
        {
          where: {
            shortUrl,
          },
          returning: true,
        }
      );
      return res.status(200).json(patchedUrl);

    default:
      return res.status(405).send();
  }
};

export default shortUrlApi;
