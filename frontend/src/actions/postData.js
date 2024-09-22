import axios from "axios";

export const postData = async (parsedData, file_b64) => {
  try {
    const data = {
      ...parsedData,
      file_b64,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bfhl`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
