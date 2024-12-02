import prisma from '../lib/prisma.js';
import { AppError } from '../utils/errors.js';

export const createListing = async ({ title, description, price, category, userId }) => {
    return prisma.add.create({
        data: {
            title,
            description,
            price,
            category,
            userId,
            isActive: true
        }
    });
};

export const updateListing = async ({ id, userId, data }) => {
    const listing = await prisma.add.findUnique({ where: { id } });

    if (!listing) {
        throw new AppError('Listing not found', 404);
    }

    if (listing.userId !== userId) {
        throw new AppError('Not authorized to update this listing', 403);
    }

    return prisma.add.update({
        where: {id},
        data
    });
};

export const getUserListings = async (userId) => {
    const listings = await prisma.add.findMany({
        where: {
            userId,
            isActive: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return listings;
};

export const deleteListing = async ({ id, userId }) => {
    const listing = await prisma.add.findUnique({ where: { id } });

    if (!listing) {
        throw new AppError('Listing not found', 404);
    }

    if (listing.userId !== userId) {
        throw new AppError('Not authorized to delete this listing', 403);
    }

    return await prisma.add.delete({ where: { id } });
};

export const deactivateListing = async ({ id, userId }) => {
    const listing = await prisma.add.findUnique({ where: { id } });

    if (!listing) {
        throw new AppError('Listing not found', 404);
    }

    if (listing.userId !== userId) {
        throw new AppError('Not authorized to deactivate this listing', 403);
    }

    return prisma.add.update({
        where: {id},
        data: {isActive: false}
    });
};