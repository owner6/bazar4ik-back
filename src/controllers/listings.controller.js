import prisma from '../lib/prisma.js';

import { createListing } from '../servises/listings.service.js';


export const createListingAction = async (req, res) => {
  try {
    const {title, description, price, category} = req.body;
    const userId = req.user.id

    // checking, чи all обов'язкові inputs заповнені
    if (!title || !description || !price || !category || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newListing = await createListing({title, description, price, category, userId})

    res.status(201).json(newListing);

  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateUserListingAction = async (req, res) => {
  try {
    const userId = req.user.id;

    const { id, title, description, price, category } = req.body; // Ensure you're extracting all necessary fields for the update

    console.log("отримуєм товар", id, title, description, price, category);
    console.log("хто отримувач товару", userId);

    // Checking if both ID and userId are provided
    if (!id || !userId) {
      return res.status(400).json({ error: 'ID and userId must be provided.' });
    }

    // Find the existing listing
    const listing = await prisma.add.findUnique({
      where: { id: parseInt(id) },
    });
    console.log("отримуєм оголошення", listing.id)

    // Check if the listing exists and if the user is the owner
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    if (listing.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this listing.' });
    }

    // Update the listing
    const updatedListing = await prisma.add.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price,
        category,
      },
    });

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({ error: 'An error occurred while updating the listing.' });
  }
};

export const getUserListingsAction = async (req, res) => {
  try {
    const userId = req.user.id; // The user ID obtained from the JWT token

    console.log("Ідентифікатор користувача", userId)

    // Receive all user announcements
    const ads = await prisma.add.findMany({
      where: {
        userId: userId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log("Receive all user announcements")

    if (!ads.length) {
      return res.status(200).json({ message: 'No ads found for this user.' });
    }

    // Відповідь з оголошеннями
    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching user ads:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteListingAction = async (req, res) => {
  try {

    const userId = req.user.id; // Ідентифікатор користувача з токена
    const { id } = req.params; // Ідентифікатор оголошення з параметрів URL

    console.log("Ідентифікатори користувача та товару")

    // Перевірка, чи ID оголошення й ID користувача присутні
    if (!id || !userId) {
      return res.status(400).json({ error: 'Listing ID and userId must be provided.' });
    }

    console.log("Перевірка, чи ID оголошення і ID користувача присутні")

    // Знаходимо оголошення, яке треба видалити
    const listing = await prisma.add.findUnique({
      where: { id: parseInt(id) },
    });

    console.log(listing, "Знаходимо оголошення, яке треба видалити")

    // Перевірка, чи існує оголошення
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }
    console.log("Перевірка, чи існує оголошення")

    if (listing.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this listing.' });
    }

    // Видалення оголошення
    await prisma.add.delete({
      where: { id: parseInt(id) },
    });

    console.log("Видалення оголошення")
 
    res.status(200).json({ message: 'Listing deleted successfully.' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deactivateListingAction = async (req, res) => {
  try {
    console.log("start")

    const userId = req.user.id; // Ідентифікатор користувача з токена
    const { id } = req.params; // Ідентифікатор оголошення з параметрів URL

    // Знаходимо оголошення, яке треба деактивувати
    const listing = await prisma.add.findUnique({
      where: { id: parseInt(id) },
    });

    console.log("Знаходимо оголошення", listing);

    // Перевірка, чи існує оголошення і, чи воно належить користувачеві
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    if (listing.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to deactivate this listing.' });
    }

    // Оновлення статусу на "неактивне"
    const updatedListing = await prisma.add.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    });

    console.log("Деактивація оголошення", updatedListing);

    res.status(200).json({ message: 'Listing deactivated successfully.', updatedListing });
  } catch (error) {
    console.error('Error deactivating listing:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
