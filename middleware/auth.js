const jwt = require('jsonwebtoken');

module.exports  = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) { 
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try { 
        const decoded = jwt.verify(token, 'dogrRun');
        req.user = decoded.user;
        req.full_name = decoded.full_name;
        req.company = decoded.company;
        req.currentAuthority = decoded.currentAuthority;
        req.te_identifier_id = decoded.te_identifier_id;

        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }


}