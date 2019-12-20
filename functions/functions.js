module.exports = {
  startServer: function (temp) {
    console.log(`\n${new Date().toLocaleString()} : App Started Running on Port : ${temp}\n`)
  },
  isAdminLoggedIn: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next()
    }
    res.redirect('/')
  },
  isNotLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/dashboard')
  }
}
