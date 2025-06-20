import { prisma } from "../db.js"

export const createComment = async ({ text, reviewId, userId }) => {
    return await prisma.comment.create({
    data: {
        text,
        review: { connect: { id: reviewId } },
        user: { connect: { id: userId } }
    }
    })
}

export const getCommentsByReviewId = async (reviewId) => {
    return await prisma.comment.findMany({
    where: {
        review_id: reviewId
    },
    include: {
        user: {
        select: {
            id: true,
            name: true,
            email: true
        }
        }
    },
    orderBy: {
        created_at: 'desc'
    }
    })
}
