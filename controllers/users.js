var User = require('../models/users');
var userController = require('../controllers/users');

exports.user_create = function (req, res, next) {
    //
    if (req.body) {
        let items = req.body
        User.create(items, function (err, newUsers) {
            if (err) return res.json({ error: err });
            //res.json(newUsers)
            res.redirect('/');
        });
    }
    else {
        res.json({ status: 'ERROR', message: 'Debe completar todos los campos' }); //opcional mandar un mensaje de error
    }
}
exports.user_get = async function (req, res, next) {
    var users = await User.find({});
    var newUsers = users.map((user)=> {
    user.lastname = user.lastname.replace('ñ','nn');
    return user;
});
return newUsers.sort();
};