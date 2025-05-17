import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";

export const executeCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;

  try {
    //validate our test cases
    //check stdin and expected_outputs are an array or not
    //check length of stdin
    //check expected output length same as stdin length
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        message: "Invalid or Missing test cases",
      });
    }

    //prepare each test case for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    //sent this submission to judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((req) => req.token);

    //pull judge0 for result of all submitted test cases
    const result = await pollBatchResults(tokens);

    //check testcase results with status id 3
    let allPassed = true;
    const detailedResults = result.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();

      const passed = stdout === expected_output;
      if (!passed) {
        allPassed = false;
      }

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    //Store submission summary
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });

    //if all test case is passed then mark that problem as a done
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    // now save individual test case results
    const testCaseResult = detailedResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr ?? null,
      compileOutput: result.compile_output ?? null,
      status: result.status,
      memory: result.memory ?? null,
      time: result.time ?? null,
    }));

    try {
      await db.testCaseResult.createMany({
        data: testCaseResult,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Failed to update record in database",
      });
    }

    const submissionWithTestCases = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Code executed successfully",
      submission: submissionWithTestCases,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to execute code",
    });
  }
};

export const runCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  try {
    if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length !== stdin.length
      ) {
        return res.status(400).json({
          message: "Invalid or Missing test cases",
        });
      }
  
      //prepare each test case for judge0 batch submission
      const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input,
      }));
  
      //sent this submission to judge0
      const submitResponse = await submitBatch(submissions);
  
      const tokens = submitResponse.map((req) => req.token);
  
      //pull judge0 for result of all submitted test cases
      const result = await pollBatchResults(tokens);
  
      //check testcase results with status id 3
      let allPassed = true;
      const detailedResults = result.map((result, i) => {
        const stdout = result.stdout?.trim();
        const expected_output = expected_outputs[i]?.trim();
  
        const passed = stdout === expected_output;
        if (!passed) {
          allPassed = false;
        }
  
        return {
          testCase: i + 1,
          passed,
          stdout,
          expected: expected_output,
          stderr: result.stderr || null,
          compile_output: result.compile_output || null,
          status: result.status.description,
          memory: result.memory ? `${result.memory} KB` : undefined,
          time: result.time ? `${result.time} s` : undefined,
        };
      });

      return res.status(200).json({
        message: allPassed ? "Accepted" : "Wrong Answer",
        results: detailedResults,
      });
  } catch (error) {
    return res.status(500).json({
        message: "Problem can't run"
    });
  }
};