import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js";

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

//   if (
//     !title ||
//     !description ||
//     !difficulty ||
//     !tags ||
//     !examples ||
//     !constraints ||
//     !testcases ||
//     !codeSnippets ||
//     !referenceSolutions
//   ) {
//     return res.status(400).json({
//       message: "All field is required",
//     });
//   }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      console.log("1");
      
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      console.log("2");

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      console.log("3");

      const submissionResults = await submitBatch(submissions);

      console.log("4");

      const tokens = submissionResults.map((res) => res.token);

      console.log("5");

      const results = await pollBatchResults(tokens);

      console.log("6");

      for (let i = 0; i < results.length; i++) {
        console.log("ee");
        const result = results[i];
        console.log("Result-----", result);

        if (result.status.id !== 3) {
      console.log("7");

          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
      console.log("8");

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
