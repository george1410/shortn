import Url from '../../../models/Url';

const shortUrlApi = async (req, res) => {
  const { shortUrl } = req.query;

  switch (req.method) {
    case 'DELETE':
      await Url.destroy({
        where: {
          shortUrl,
        },
      });
      return res.status(204).send();

    case 'PATCH':
      const { originalUrl } = req.body;
      const url = await Url.update(
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
      return res.status(200).json(url);

    default:
      return res.status(405).send();
  }
};

export default shortUrlApi;
