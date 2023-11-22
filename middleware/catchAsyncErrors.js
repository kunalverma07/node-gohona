module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

// why this file
// => because if you are not create this file, let say you dont sent one of the database entity like "price" you having an error and your server gonna crash.
