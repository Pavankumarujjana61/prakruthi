const adminAuth = (
  req,
  res,
  next
) => {

  if (!req.session.admin_id) {

    return res.redirect(
      '/admin'
    );

  }

  next();

};

export default adminAuth;