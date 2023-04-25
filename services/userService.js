import User from '../models/User.js'

class UserService {
    constructor (fastify){ 
        this.app = fastify
    }

    async login(username, password) {
        try {
            if (!username || !password) {
                throw new Error ('Please enter valid credentials')
            }
            
            const user = await User.findOne({ username: username})
            
            if (!user) {
                throw new Error('Credentials is invalid or user don\'t exist')
            }
    
            const correctPassword = await this.app.bcrypt.compare(password, user.password)
            
            if (!correctPassword) {
                throw new Error('Incorrect password')
            }
    
            return user
        } catch (err) {
            throw err
        }
    }

    async signup(userData) {
        try {
            const { username, firstName, lastName, email, password, role } = userData 
            const hashPassword = await this.app.bcrypt.hash(password)
            const newUser = new User({ username, firstName, lastName, email, password: hashPassword, role: !role ? 'user' : role })
            await newUser.save()
            
            return newUser
        } catch (err) {
            throw err
        }
    }

    async getUserInfo(id) {
        try {
            const user = await User.findById(id)

            if (!user) {
                throw new Error('User is not exist')
            }

            return user
        } catch (err) {
            throw err
        }
    }

    
}

export default UserService