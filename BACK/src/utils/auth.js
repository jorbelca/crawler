// AUTENTICAION Y AUTORIZACION PARA MIDDLEWARE


export const auth = function (req, res, next) {
  console.log(req.session);
  console.log(req.session.user)
  console.log(req.session.admin);

  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
