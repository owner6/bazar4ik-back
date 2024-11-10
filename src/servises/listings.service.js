import prisma from "../lib/prisma.js";

export const createListing = async (params) => {
    const { title, description, price, category, userId} = params;

    return await prisma.add.create({
        data: {
            title,
            description,
            price: parseFloat(price),
            category,
            userId,
        },
    });
};
