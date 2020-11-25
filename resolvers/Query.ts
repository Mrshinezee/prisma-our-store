import { getUserId, Context } from '../utils'

export const Query = {
   users: async (parent: any, args: any, context : Context) => {
    return context.prisma.user.findMany({
        include: { products: true },
    });
   },
}