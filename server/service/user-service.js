
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`User with this email (${email}) address already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4() //password caching

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`, activationLink) //save user at db

        const userDto = new UserDto(user); // send e-mail for activation
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken); //save to db

        return {
            ...tokens,
            user: userDto
        }


    }
    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw  ApiError.BadRequest('incorrect activation')
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService()