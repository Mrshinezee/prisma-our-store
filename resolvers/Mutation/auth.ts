import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from '../../utils';

// const hashPassword = (password: string) => {
//     return bcrypt.hashSync(password, 10);
//   }
  
  const isValidPassword = (userPassword: string, password : string) => {
  return bcrypt.compareSync(password, userPassword)
  }

export const auth = {
  async signup(parent: any, args: any, ctx: Context, info: any) {
    const password = await bcrypt.hashSync(args.password, 10)
    const user = await ctx.prisma.user.create({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, 'APP_SECRET'),
      user,
    }
  },
  async login(parent: any, { email, password } : { email: string, password: string }, ctx: Context, info: any) {
    const user = await ctx.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compareSync(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, 'APP_SECRET'),
      user,
    }
  },

}