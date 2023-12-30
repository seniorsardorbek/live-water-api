import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { LoginDto } from './dto/login.dto'
import { Model } from 'mongoose'
import { User } from 'src/users/Schema/Users'
import * as bcrypt from 'bcryptjs'
import { CustomRequest } from 'src/_shared/response'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async login({ username, password }: LoginDto) {
    const existing = await this.userModel.findOne({ username })
    if (!existing) {
      throw new UnauthorizedException('Username yoki parol xato')
    }

    const valid = bcrypt.compareSync(password, existing.password)
    if (!valid) {
      throw new UnauthorizedException('Username yoki parol xato')
    }

    const token = this.jwtService.sign({
      user: { id: existing._id, role: existing.role },
    })
    return { msg: 'Muvaffaqqiyatli kirdingiz!', token, data: existing }
  }
  async verifyWithToken(req: CustomRequest) {
    const { id } = req.user
    const user = await this.userModel.findById(id).select('-password')
    if (!user) {
      throw new BadRequestException({
        msg: 'Foydlanuvchi topilmadi yoki token eskirgan!',
      })
    }
    return { msg: 'Muvaffaqqiyatli kirdingiz', data: user }
  }
}
