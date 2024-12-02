import {
  createListing,
  updateListing,
  getUserListings,
  deleteListing,
  deactivateListing
} from '../servises/listings.service.js';
import { validateListingData } from '../validators/listing.validator.js';
import { AppError } from '../utils/errors.js';

export const createListingAction = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;
    const userId = req.user?.id;

    const validationError = validateListingData({ title, description, price, category, userId });
    if (validationError) {
      throw new AppError(validationError, 400);
    }

    const newListing = await createListing({ title, description, price, category, userId });
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const updateUserListingAction = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id, title, description, price, category } = req.body;

    const validationError = validateListingData({ id, title, description, price, category, userId });
    if (validationError) {
      throw new AppError(validationError, 500);
    }

    const updatedListing = await updateListing({
      id: parseInt(id),
      userId,
      data: { title, description, price, category }
    });

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getUserListingsAction = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('User ID is required', 400);

    const listings = await getUserListings(userId);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const deleteListingAction = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!id || !userId) {
      throw new AppError('Listing ID and user ID are required', 400);
    }

    await deleteListing({ id: parseInt(id), userId });
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    next(error);
  }
};

  export const deactivateListingAction = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const { id } = req.params;

    if (!id || !userId) {
      throw new AppError('Listing ID and user ID are required', 400);
    }

    const updatedListing = await deactivateListing({ id: parseInt(id), userId });
    res.status(200).json({
      message: 'Listing deactivated successfully',
      listing: updatedListing
    });
  } catch (error) {
    next(error);
  }
};