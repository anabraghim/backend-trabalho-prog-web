import { prisma } from "../db.js";

export const getAllReviews = async () => {
    return await prisma.review.findMany({
    include: {
        movie: {
        select: {
            title: true,
            image_url: true
        }
        },
        user: {
            select: {
                username: true
            }
        }
    }
    });
}

export const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
    include: {
        user: {
            select: { username: true }
        },
        movie: true,
        comments: {
            select: {
                id,
                text: true,
                user: {
                    select: {
                        username: true
                    }
                }
            },
            orderBy: { created_at: 'desc' },
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
        { title: { contains: query, mode: 'insensitive' } },
        { text: { contains: query, mode: 'insensitive' } }, 
        { movie: { title: { contains: query, mode: 'insensitive' } } }
        ]
    },
    include: {
        movie: {
        select: {
            title: true
        }
        }
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
