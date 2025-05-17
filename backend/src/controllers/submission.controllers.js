import { db } from "../libs/db.js";

export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return req.status(400).json({
        message: "user not found",
      });
    }

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submission Fatched Successfully",
      submissions,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fatch submission",
    });
  }
};

export const getSubmissionForProblem = async (req, res) => {};

export const getAllSubmissionForProblem = async (req, res) => {};
