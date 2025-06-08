import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Plus } from "lucide-react";

// import CreateSheetModal from "./components/CreateSheetModal";
import { useAuthStore } from "../store/useAuthStore";
import { useSheetStore } from "../store/useSheetsStore";
import CreateSheetModal from "../components/CreateSheetModal";

const SheetListPage = () => {
  const { allSheets, getSheets, createSheet, isLoading } = useSheetStore();

  const { authUser } = useAuthStore();
  const [isCreateSheetModalOpen, setIsCreateSheetModalOpen] = useState(false);

  useEffect(() => {
    getSheets();
  }, [getSheets]);

  const handleCreateSheet = async (data) => {
    await createSheet(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="terminal-loader relative border border-[#333] text-green-500 font-mono text-base px-4 py-6 w-48 shadow-lg rounded overflow-hidden box-border">
          <div className="terminal-header absolute top-0 left-0 right-0 h-6 bg-[#333] rounded-t px-2 box-border flex items-center justify-between">
            <div className="terminal-title text-gray-200 leading-6">Status</div>
            <div className="terminal-controls flex items-center space-x-1 ml-auto">
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-red-600"></div>
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-yellow-400"></div>
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-green-600"></div>
            </div>
          </div>
          <div className="text inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 mt-6 animate-typeAndDelete">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full max-w-6xl mx-auto flex flex-col items-center mt-10 px-4 mb-6">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sheets</h2>
        {authUser?.role === "ADMIN" && (
          <button
            onClick={() => setIsCreateSheetModalOpen(true)}
            className="btn bg-sky-600 gap-2"
          >
            <Plus className="w-4 h-4 text-white" />
            Create Sheet
          </button>
        )}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {allSheets?.length > 0 ? (
          allSheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className="flex flex-col justify-between h-full min-h-60 bg-black/10 shadow-lg backdrop-blur-md bg-opacity-10 border border-white/10 rounded-lg p-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="badge bg-sky-600 font-semibold text-xs px-3 py-1">
                    {sheet.company}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-100">
                  {sheet.title}
                </h2>

                <p className="text-sm text-gray-300">{sheet.description}</p>
              </div>

              <div className="mt-4 flex justify-end">
                <Link to={`/sheet/${sheet.id}`}>
                  <button className="btn bg-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:brightness-110 transition">
                    Solve Now
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
            No Sheets found!
          </p>
        )}
      </div>
      
      <CreateSheetModal
        isOpen={isCreateSheetModalOpen}
        onClose={() => setIsCreateSheetModalOpen(false)}
        onSubmit={handleCreateSheet}
      />
    </section>
  );
};

export default SheetListPage;
