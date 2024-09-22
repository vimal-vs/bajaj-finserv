const decodeBase64 = (base64String) => {
  let matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mime_type: matches[1],
      data: Buffer.from(matches[2], "base64"),
    };
  }
  return null;
};

exports.validateFile = (file_b64) => {
  const decodedFile = decodeBase64(file_b64);
  return decodedFile !== null;
};

exports.getFileDetails = (file_b64) => {
  const decodedFile = decodeBase64(file_b64);
  if (!decodedFile) return { mime_type: null, size_kb: null };

  const fileSizeKb = decodedFile.data.length / 1024;
  return {
    mime_type: decodedFile.mime_type,
    size_kb: fileSizeKb.toFixed(2),
  };
};
