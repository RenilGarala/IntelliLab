import axios from "axios";

export const getJudge0LanguageId = (language)=>{
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    return languageMap[language.toUpperCase()];
}

const sleep = (ms)=> new Promise((resolve)=> setTimeout(resolve , ms))

export const pollBatchResults = async (tokens) => {
  while (true) {
    try {
      const results = [];

      for (const token of tokens) {
        const options = {
          method: 'GET',
          url: `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`,
          },
        };

        const { data } = await axios.request(options);
        results.push(data);
      }

      const isAllDone = results.every(
        (r) => r.status.id !== 1 && r.status.id !== 2
      );

      if (isAllDone) {
        return results;
      }

      await sleep(1000);
    } catch (error) {
      console.error("Polling error:", error.response?.data || error.message);
      throw error;
    }
  }
};

export const submitBatch = async (submissions) => {
  try {
    const tokens = [];

    for (const submission of submissions) {
      const options = {
        method: 'POST',
        url: `${process.env.JUDGE0_API_URL}/submissions`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`,
        },
        data: submission,
      };

      const { data } = await axios.request(options);
      tokens.push(data);
    }

    return tokens;

  } catch (error) {
    console.error("Batch submission error:", error.message);
    throw error;
  }
};