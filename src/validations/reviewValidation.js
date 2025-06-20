import { z } from 'zod'

export const reviewSchema = z.object({
    title: z.string().min(1, 'Título obrigatório'),
    text: z.string().min(1, 'Texto obrigatório'),
    rating: z.enum(['one', 'two', 'three', 'four', 'five']),
    movie_id: z.number()
})
