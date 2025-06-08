// import AddProblemToSheet from "../components/AddProblemToSheet";
// import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
// import UpdateSheetModal from "../components/UpdateSheetModal";
import { useAuthStore } from "../store/useAuthStore";
import { useSheetStore } from "../store/useSheetsStore";
import {
  BookOpen,
  ChevronLeft,
  Clock,
  ExternalLink,
  List,
  Pencil,
  Plus,
  Sheet,
  Tag,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SheetPage = () => {
  const { id } = useParams();

  const [isRemoveProblemModalOpen, setIsRemoveProblemModalOpen] =
    useState(false);
  const [isDeleteSheetModalOpen, setIsDeleteSheetModalOpen] = useState(false);
  const [isUpdateSheetModalOpen, setIsUpdateSheetModalOpen] = useState(false);
  const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState("");

  const {
    sheet,
    getSheetById,
    isLoading,
    removeProblemFromSheet,
    deleteSheet,
    updateSheet,
    errorMessage,
    getSheets,
  } = useSheetStore();

  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    getSheets();
  }, []);

  useEffect(() => {
    if (id) {
      getSheetById(id);
    }
  }, [id]);

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
    if (!dateString) return "Invalid date";

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleProblemRemove = (problemId) => {
    setSelectedProblemId(problemId);
    setIsRemoveProblemModalOpen(true);
  };

  const handleSheetDelete = () => {
    setIsDeleteSheetModalOpen(true);
  };

  const handleConfirmProblemRemove = async () => {
    if (id) {
      await removeProblemFromSheet(id, [selectedProblemId]);
    }
  };

  const handleConfirmSheetDelete = async () => {
    if (id) {
      await deleteSheet(id);
      navigate("/sheets");
    }
  };

  const handleUpdateSheet = async (data) => {
    if (id) {
      await updateSheet(id, data);
    }
  };

  if (errorMessage) {
    return (
      <div className="flex flex-col justify-center items-center text-center mt-10 -mb-20">
        <h1 className="text-error text-2xl font-black">Error</h1>
        <h1 className="text-xl text-error-content">{errorMessage}</h1>
        <div className="w-96">
          <div>404 - error</div>
        </div>
        <Link to={"/"}>
          <button className="btn btn-link btn-lg">Go Home</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full p-4 bg-base-200 min-h-screen rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Link
              to={"/sheets"}
              className="flex items-center gap-1 text-sky-500"
            >
              <ChevronLeft className="w-4 h-4" />
              <Sheet className="w-6 h-6" />
            </Link>
            <h2 className="text-2xl font-bold text-sky-500">
              {sheet?.company}
            </h2>
          </div>

          {authUser?.role === "ADMIN" && (
            <button
              onClick={() => setIsUpdateSheetModalOpen(true)}
              className="btn bg-sky-600 btn-sm"
            >
              <Pencil className="w-4 h-4 text-white" />
              Update Sheet
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder flex items-center justify-center">
                    <div className="flex bg-sky-600 text-primary-content rounded-lg w-12 items-center justify-center">
                      <BookOpen size={24} className="m-auto mt-3" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{sheet?.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-base-content/70">
                      <div className="flex items-center gap-1">
                        <List size={14} />
                        <span>{sheet?.problems?.length} problems</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Created {formatDate(sheet?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {authUser?.role === "ADMIN" && (
                  <button
                    onClick={() => setIsAddProblemModalOpen(true)}
                    className="btn btn-info flex"
                  >
                    <Plus className="w-4 h-4" />
                    Add Problems
                  </button>
                )}
              </div>

              <p className="text-base-content/80 mt-1">{sheet?.description}</p>

              <div className="mt-4 pt-4 border-t border-base-300">
                <h4 className="text-lg font-semibold mb-3">
                  Problems in this Sheet
                </h4>

                {sheet?.problems?.length === 0 ? (
                  <div className="alert">
                    <span>No problems added to this Sheet yet.</span>
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
                        {sheet?.problems?.map((item) => (
                          <tr key={item.id} className="hover">
                            <td className="font-medium">
                              <Link
                                to={`/problem/${item.problem?.id}`}
                                className="font-medium hover:underline"
                              >
                                {item.problem?.title}
                              </Link>
                            </td>

                            <td>
                              {getDifficultyBadge(
                                item?.problem?.difficulty || ""
                              )}
                            </td>

                            <td>
                              <div className="flex flex-wrap gap-1">
                                {item.problem?.tags?.map((tag, idx) => (
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

                            <td className="text-right flex gap-2 justify-end">
                              {authUser?.role === "ADMIN" && (
                                <button
                                  onClick={() =>
                                    handleProblemRemove(item.problem?.id || "")
                                  }
                                  className="btn btn-xs btn-error"
                                >
                                  <TrashIcon className="w-4 h-4 text-white" />
                                  remove Problem
                                </button>
                              )}
                              <Link
                                to={`/problem/${item.problem?.id}`}
                                className="btn btn-xs btn-outline text-sky-600"
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
                  {authUser?.role === "ADMIN" && (
                    <button
                      onClick={handleSheetDelete}
                      className="btn btn-sm btn-error"
                    >
                      <TrashIcon className="w-4 h-4 text-white" />
                      Delete Sheet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ConfirmDeleteModal
        isOpen={isRemoveProblemModalOpen}
        isLoading={isLoading}
        onClose={() => setIsRemoveProblemModalOpen(false)}
        onConfirm={handleConfirmProblemRemove}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteSheetModalOpen}
        isLoading={isLoading}
        onClose={() => setIsDeleteSheetModalOpen(false)}
        onConfirm={handleConfirmSheetDelete}
      />

      <AddProblemToSheet
        isOpen={isAddProblemModalOpen}
        onClose={() => setIsAddProblemModalOpen(false)}
        sheetId={id || ""}
        sheet={sheet}
      />

      <UpdateSheetModal
        isOpen={isUpdateSheetModalOpen}
        sheet={sheet}
        onClose={() => setIsUpdateSheetModalOpen(false)}
        onSubmit={handleUpdateSheet}
      /> */}
    </div>
  );
};

export default SheetPage;
