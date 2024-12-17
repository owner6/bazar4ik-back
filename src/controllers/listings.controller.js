import {
  createListing,
  updateListing,
  getUserListings,
  deleteListing,
  toggleListingStatus,
  getInactiveListings
} from '../servises/listings.service.js';
import { validateRequiredFields, validateListingData } from '../utils/validators.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export const createListingAction = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  validateRequiredFields(
    { title, description, price, category, userId },
    ['title', 'description', 'price', 'category', 'userId']
  );

  const validationError = validateListingData({ title, description, price, category, userId });
  if (validationError) {
    throw new ValidationError(validationError);
  }

  const newListing = await createListing({ title, description, price, category, userId });
  res.status(201).json(newListing);
});

export const updateUserListingAction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id, title, description, price, category } = req.body;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  validateRequiredFields({ id }, ['id']);

  const validationError = validateListingData({ id, title, description, price, category, userId });
  if (validationError) {
    throw new ValidationError(validationError);
  }

  const updatedListing = await updateListing({
    id: parseInt(id),
    userId,
    data: { title, description, price, category }
  });

  if (!updatedListing) {
    throw new NotFoundError('Listing not found or access denied');
  }

  res.status(200).json(updatedListing);
});

export const getUserListingsAction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  const listings = await getUserListings(userId);
  res.status(200).json(listings);
});

export const deleteListingAction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  validateRequiredFields({ id }, ['id']);

  const deleted = await deleteListing({ id: parseInt(id), userId });

  if (!deleted) {
    throw new NotFoundError('Listing not found or access denied');
  }

  res.status(200).json({ message: 'Listing deleted successfully' });
});

export const toggleListingStatusAction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  validateRequiredFields({ id }, ['id']);

  const updatedListing = await toggleListingStatus({ id: parseInt(id), userId });

  if (!updatedListing) {
    throw new NotFoundError('Listing not found or access denied');
  }

  res.status(200).json({
    message: `Listing status updated successfully to ${updatedListing.isActive ? 'active' : 'inactive'}`,
    listing: updatedListing
  });
});

export const getInactiveListingsAction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ValidationError('User ID is required');
  }

  const inactiveListings = await getInactiveListings(userId);
  res.status(200).json(inactiveListings);
});
