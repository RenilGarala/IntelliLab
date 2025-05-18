import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "Please enter all details",
      });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    const existingPlaylist = await db.playlist.findUnique({
      where: {
        name_userId: {
          name,
          userId,
        },
      },
    });

    if (existingPlaylist) {
      return res.status(400).json({
        message: "Playlist Already Exist! Please Change Name",
      });
    }

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Playlist not created",
    });
  }
};

export const getAllListDetail = async (req, res) => {};

export const getPlaylistDetails = async (req, res) => {};

export const addProblemToPlaylist = async (req, res) => {};

export const deletePlaylist = async (req, res) => {};

export const removeProblemFromPlaylist = async (req, res) => {};
