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

export const getAllListDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found.",
      });
    }

    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully.",
      playlists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch playlists.",
    });
  }
};

export const getPlaylistDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.user.id;

    if (!playlistId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: playlistId or userId.",
      });
    }

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(400).json({
        success: false,
        message: "Playlist not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist fetched successfully.",
      playlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching the playlist.",
    });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;
    const userId = req.user.id;
    
    if (!userId || !playlistId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: playlistId or userId.",
      });
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing problemIds. Provide a non-empty array.",
      });
    }

    const problemInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    return res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully.",
      problemInPlaylist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while adding problems to the playlist.",
    });
  }
};

export const deletePlaylist = async (req, res) => {};

export const removeProblemFromPlaylist = async (req, res) => {};
