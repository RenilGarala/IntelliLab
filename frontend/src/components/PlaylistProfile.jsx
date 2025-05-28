import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { Link, redirect } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
  Plus,
} from "lucide-react";
import CreatePlaylistModal from "./CreatePlaylistModel";

const PlaylistProfile = () => {
  const { getAllPlaylists, playlists, deletePlaylist,createPlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return <span className="badge badge-success">Easy</span>;
      case "MEDIUM":
        return <span className="badge badge-warning">Medium</span>;
      case "HARD":
        return <span className="badge badge-error">Hard</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="p-4 mt-5 bg-base/15 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-sky-500">My Playlists</h2>
          <button
            className="btn bg-sky-600 hover:bg-sky-700 btn-sm"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </button>
        </div>

        {playlists.length === 0 ? (
          <div className="card bg-base-200 ">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-medium">No playlists found</h3>
              <p className="text-base-content/70">
                Create your first playlist to organize problems!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card bg-base-200">
                <div className="card-body p-4">
                  {/* Playlist Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePlaylist(playlist.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder bg-sky-600 p-2.5 rounded-md flex items-center justify-center text-center ">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{playlist.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-base-content/70">
                          <div className="flex items-center gap-1">
                            <List size={14} />
                            <span>{playlist.problems?.length} problems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>
                              Created {formatDate(playlist.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm">
                      {expandedPlaylist === playlist.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-base-content/80 mt-1">
                    {playlist.description}
                  </p>

                  {/* Expanded Problems List */}
                  {expandedPlaylist === playlist.id && (
                    <div className="mt-4 pt-4 border-t border-base-300">
                      <h4 className="text-lg font-semibold mb-3">
                        Problems in this playlist
                      </h4>

                      {playlist.problems?.length === 0 ? (
                        <div className="alert">
                          <span>No problems added to this playlist yet.</span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {playlist.problems?.map((item) => (
                                <tr key={item.id} className="hover">
                                  <td className="font-medium">
                                    {item.problem.title}
                                  </td>
                                  <td>
                                    {getDifficultyBadge(
                                      item.problem.difficulty
                                    )}
                                  </td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags &&
                                        item.problem.tags.map((tag, idx) => (
                                          <div
                                            key={idx}
                                            className="badge badge-outline badge-sm"
                                          >
                                            <Tag size={10} className="mr-1" />
                                            {tag}
                                          </div>
                                        ))}
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <Link
                                      to={`/problem/${item.problem.id}`}
                                      className="btn btn-xs border border-sky-500 text-sky-500"
                                    >
                                      <ExternalLink size={12} />
                                      Solve
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => handleDelete(playlist.id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete Playlist
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <CreatePlaylistModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      </div>
    </div>
  );
};

export default PlaylistProfile;
