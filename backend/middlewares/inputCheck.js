const passwordValidator = require('password-validator');

var schemaPassword = new passwordValidator();
schemaPassword
    .is().min(6)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()

const emailRegex = /^[a-zA-Z0-9.\-]{2,20}@([a-zA-Z0-9]{2,15})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/
let nameRegex = /^[a-zA-Z\-àâäÂÄéèêëÊËîïÎÏôöÔÖùûüÛÜ\s"]+$/;

function isValid(regex, stringToTest) {
    return regex.test(stringToTest);
}

module.exports = (req, res, next) => {
    // Si route login
    if(!req.body.firstName && !req.body.lastName){
        if(isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)) {
            next();
        }else if(!isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(400).json({ error: 'L\'adresse email ne respecte pas le format attendu' });
        }else if(isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(400).json({ error: 'Le mot de passe ne respecte pas le format attendu' });
        }else{
            res.status(400).json({ error: 'Ni l\'adresse email ou le mot de passe ne respectent le format attendu' });
        }

    // Si route signup
    }else{
        // On test chaque cas un par un pour renvoyer une réponse personnalisée

        if(!isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(432).json({ error: 'Le prénom ne respecte pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(433).json({ error: 'Le nom de famille ne respecte pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(434).json({ error: 'L\'email ne respecte pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(435).json({ error: 'Le mot de passe ne respecte pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(436).json({ error: 'Le prénom et le nom de famille ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(437).json({ error: 'Le prénom et l\'email ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(438).json({ error: 'Le prénom et le mot de passe ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(439).json({ error: 'Le prénom, le nom de famille et l\'email ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(440).json({ error: 'Le prénom, le nom de famille et le mot de passe ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(441).json({ error: 'Le prénom, l\'email et le mot de passe ne respectent pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && schemaPassword.validate(req.body.password)){
            res.status(442).json({ error: 'Le nom de famille et l\'email ne respectent pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(443).json({ error: 'Le nom de famille et le mot de passe ne respectent pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(444).json({ error: 'Le nom de famille, l\'email et le mot de passe ne respectent pas le format attendu' });
        }else if(isValid(nameRegex, req.body.firstName) && isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(445).json({ error: 'L\'email et le mot de passe ne respectent pas le format attendu' });
        }else if(!isValid(nameRegex, req.body.firstName) && !isValid(nameRegex, req.body.lastName) && !isValid(emailRegex, req.body.emailAddress) && !schemaPassword.validate(req.body.password)){
            res.status(446).json({ error: 'Aucun des champs ne respecte le format attendu' });
        }else{
            next();
        }
    }
}
