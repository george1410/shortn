import Url from '../models/Url';

export default function Redirector() {}

export const getServerSideProps = async (context) => {
  const url = await Url.findByPk(context.query.shortUrl);

  if (!url) {
    return {
      notFound: true,
    };
  }

  await url.increment('clicks', {
    silent: true,
  });

  return {
    redirect: {
      destination: url.originalUrl,
      permanent: false,
    },
  };
};
