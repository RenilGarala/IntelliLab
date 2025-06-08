import { db } from "../libs/db.js";

export const createSheet = async (req, res) => {
  const { title, company, description } = req.body;

  try {
    const exisitingSheet = await db.Sheet.findUnique({
      where: {
        title_company: {
          title,
          company,
        },
      },
    });

    if (exisitingSheet) {
      res.status(406).json({
        message: "Sheet Already Exist",
      });
    }

    const sheet = await db.Sheet.create({
      data: {
        title,
        company,
        description,
        userId: req.user.id,
      },
    });

    if (!sheet) {
      return res.status(400).json({
        message: "Sheet creation failed",
      });
    }

    return res.status(201).json({
      message: "Sheet created Successfully",
      sheet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error While creating sheet",
      sheet,
    });
  }
};

export const getAllSheets = async (req, res) => {
  try {
    const sheets = await db.Sheet.findMany();

    if (!sheets) {
      return res.status(404).json({
        message: "No sheets found",
      });
    }

    return res.status(200).json({
      message: "Sheets fetched successfully",
      sheets,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching sheets",
      sheets,
    });
  }
};

export const getSheetById = async (req, res) => {
  const { sheetId } = req.params;

  try {
    const sheet = await db.Sheet.findUnique({
      where: {
        id: sheetId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!sheet) {
      return res.status(404).json({
        message: "Sheet not found",
      });
    }

    return res.status(200).json({
      message: "Sheet fetched successfully",
      sheet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching sheet",
    });
  }
};

export const updateSheet = async (req, res) => {
  const { title, company, description } = req.body;
  const { sheetId } = req.params;

  try {
    const sheet = await db.Sheet.findUnique({
      where: {
        id: sheetId,
      },
    });

    if (!sheet) {
      return res.status(404).json({
        message: "sheet not found",
      });
    }

    const updatedSheet = await db.Sheet.update({
      where: {
        id: sheetId,
      },
      data: {
        title,
        company,
        description,
      },
    });

    return res.status(200).json({
      message: "Sheet updated successfully",
      updatedSheet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating sheet",
    });
  }
};

export const addProblemInSheet = async (req, res) => {
  const { sheetId } = req.params;
  const { problemIds } = req.body;

  try {
    const exisitingSheet = await db.Sheet.findUnique({
      where: {
        id: sheetId,
      },
    });

    if (!exisitingSheet) {
      return res.status(404).json({
        message: "Sheet not found",
      });
    }

    const sheetProblems = [];

    for (let i = 0; i < problemIds.length; i++) {
      const problemId = problemIds[i];

      const addedProblem = await db.ProblemInSheet.upsert({
        where: {
          sheetId_problemId: {
            problemId,
            sheetId,
          },
        },
        update: {},
        create: {
          sheetId,
          problemId,
        },
      });

      sheetProblems.push(addedProblem);
    }

    return res.status(201).json({
      message: "Problem added in sheet successfully",
      sheetProblems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While adding problems in sheet",
    });
  }
};

export const removeProblemFromSheet = async (req, res) => {
  const { sheetId } = req.params;
  const { problemIds } = req.body;

  try {
    const exisitingSheet = await db.Sheet.findUnique({
      where: {
        id: sheetId,
      },
    });

    if (!exisitingSheet) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    const deletedProblems = await db.ProblemInSheet.deleteMany({
      where: {
        sheetId,
        problemId: {
          in: problemIds,
        },
      },
    });

    return res.status(200).json({
      message: "Problem removed successfully from sheet",
      deletedProblems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While removing problem from sheet",
    });
  }
};

export const deleteSheet = async (req, res) => {
  const { sheetId } = req.params;

  try {
    const exisitingSheet = await db.Sheet.findUnique({
      where: {
        id: sheetId,
      },
    });

    if (!exisitingSheet) {
      return res.status(404).json({
        deletedSheet,
        message: "Sheet not found or already deleted",
      });
    }

    const deletedSheet = await db.Sheet.delete({
      where: {
        id: sheetId,
      },
    });

    return res.status(200).json({
      message: "Sheet deleted successfully",
      deletedSheet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While deleting sheet",
    });
  }
};
