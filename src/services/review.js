import { prisma } from "../db.js";

export const getAllReviews = async () => prisma.review.findMany()

export const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
    include: {
        user: {
        select: { id: true, name: true, email: true }
        },
        movie: true,
        comments: {
        orderBy: { created_at: 'desc' },
        include: {
            user: {
            select: { id: true, name: true, email: true }
            }
        }
        }
    }
    });
}

export const createReview = async ({title, text, rating, movie_id, user_id}) => {
    const review = await prisma.review.create({
        data: {
            title,
            text,
            rating, 
            movie: { connect: { id: movie_id } },
            user: { connect: { id: user_id } },
        }
    })
    return review
}

export const updateReview = (id, data) => prisma.review.update({where: {id}, data})

export const deleteReview = (id) => prisma.review.delete({where: {id}})

export const searchReviews = async (query) => {
    return await prisma.review.findMany({
    where: {
        OR: [
        {
            title: {
            contains: query,
            mode: 'insensitive'
            }
        },
        {
            text: {
            contains: query,
            mode: 'insensitive'
            }
        }
        ]
    }
    })
}

export const getReviewsByUserId = async (userId) => {
    return await prisma.review.findMany({
    where: {
        user_id: userId
    },
    include: {
      movie: true // aqui é pra gente trazer dados do filme junto
    }
    })
}
