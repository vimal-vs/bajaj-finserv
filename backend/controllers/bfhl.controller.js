const { validateFile, getFileDetails } = require("../services/fileService");

exports.postData = async (req, res) => {
  try {
    const { data, file_b64 } = req.body;
    console.log(data);
    if (!Array.isArray(data) || data.length === 0) {
      res.status(400).json({ error: "Data must have atleast one value." });
      return;
    }

    if (data.some((item) => typeof item !== "string")) {
      res.status(400).json({ error: "Data can contain only string values." });
      return;
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    let highest_alphabet = "";
    alphabets.forEach((alphabet) => {
      if (
        !highest_alphabet ||
        alphabet.toLowerCase() > highest_alphabet.toLowerCase()
      ) {
        highest_alphabet = alphabet;
      }
    });

    // 3. File Handling
    const file_valid = validateFile(file_b64);
    const { mime_type, size_kb } = getFileDetails(file_b64);

    let response = {
      is_success: true,
      user_id: "Vimal",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet !== "" ? [highest_alphabet] : [],
      file_valid,
    };

    if (file_valid) {
      response.file_mime_type = mime_type;
      response.file_size_kb = size_kb;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    res.status(500).json();
  }
};
