const validateShortUrl = (shortUrl) => {
  const shortUrlRegex = /^[\w\-]+$/;
  console.log('sUrl', shortUrl);
  if (shortUrl === 'admin') {
    return {
      valid: false,
      message: 'The admin URL cannot be changed.',
    };
  } else if (!shortUrlRegex.test(shortUrl)) {
    return {
      valid: false,
      message: 'This short URL contains invalid characters.',
    };
  } else {
    return { valid: true };
  }
};

export default validateShortUrl;
