import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetail, getPlaylistDetails, removeProblemFromPlaylist } from "../controllers/playlist.controllers.js";

const playlistRoutes = express.Router();

playlistRoutes.get('/', authenticate, getAllListDetail);

playlistRoutes.get('/:playlistId', authenticate, getPlaylistDetails);

playlistRoutes.post('/create-playlist', authenticate, createPlaylist);

playlistRoutes.post('/:playlistId/add-problem', authenticate, addProblemToPlaylist);

playlistRoutes.delete('/:plalistId', authenticate, deletePlaylist);

playlistRoutes.delete('/:plalistId/remove-problem', authenticate, removeProblemFromPlaylist);

export default playlistRoutes;