import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported` 
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};

export const getAllProblem = async (req, res) => {
  try {
    const problems = await db.problem.findMany();

    if (!problems) {
      return res.status(400).json({
        message: "No Problem Available",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem Fatched Successfully",
      problems,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error While Fetching Problem list",
    });
  }
};

export const getProblemById = async (req, res) => {
  //get problem id from parameter
  const { id } = req.params;

  try {
    //Fetch problem using params id
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    //validate problem
    if (!problem) {
      return res.status(400).json({
        message: "Problem Not Found!",
      });
    }

    //return problem with success message
    return res.status(200).json({
      sucess: true,
      message: "Problem Fetched",
      problem,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error While Fetching Problem",
    });
  }
};

export const updateProblem = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return req.status(400).json({
      message: "Problem Not Found!"
    })
  }

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  try {
    const problem = await db.problem.findUnique({ 
        where: { 
          id 
        } 
      }
    );

    if (!problem) {
      return res.status(404).json({ 
        error: "Problem not found" 
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ 
        error: "Forbidden: Only admin can update problems" 
      });
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported` 
        });
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const updatedProblem = await db.problem.update({
      where: { 
        id 
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error While Updating Problem",
    });
  }
  
};

export const deleteProblem = async (req, res) => {};

export const getAllProblemsSolvedByUser = async (req, res) => {};
