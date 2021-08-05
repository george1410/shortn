import validUrl from 'valid-url';

const validateLongUrl = (longUrl) => {
  console.log('longUrl', longUrl);
  if (!validUrl.isWebUri(longUrl)) {
    return {
      valid: false,
      message: "This doesn't look like a valid URL.",
    };
  } else {
    return { valid: true };
  }
};

export default validateLongUrl;
