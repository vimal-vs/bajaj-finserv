"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { message, Select } from "antd";
import { postData } from "@/actions/postData";

export default function Home() {
  const [data, setData] = useState("");
  const [responseData, setResponseData] = useState({});
  const [filter, setFilter] = useState([]);

  const options = [
    { label: "Numbers", value: "numbers" },
    { label: "Highest Alphabet", value: "highest_alphabet" },
  ];

  const handleChange = (value) => {
    setFilter(value);
  };

  const filteredResponse = filter.reduce((acc, key) => {
    if (responseData[key]) {
      acc[key] = responseData[key];
    }
    return acc;
  }, {});

  const handleSubmit = async () => {
    if (!data) {
      message.error("Please provide a valid data");
      return;
    }
    try {
      const parsedData = JSON.parse(data);
      const file_b64 =
        "data:imag;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgcBApI8U1sAAAAASUVORK5CYII=";
      const response = await postData(parsedData, file_b64);
      if (response) {
        message.success("Data processed.");
        setResponseData(response?.data);
      }
    } catch (err) {
      message.error(err?.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20">
      <div className="w-[90%] md:w-[400px] space-y-8">
        <TextField
          id="outlined-basic"
          label="API Input"
          variant="outlined"
          className="w-full"
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="w-full py-2 rounded-md bg-blue-400 hover:bg-blue-500 transition-colors duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {responseData?.is_success && (
          <Select
            mode="multiple"
            className="h-12"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Multi Filter"
            onChange={handleChange}
            options={options}
          />
        )}
        {filter?.length > 0 && (
          <>
            <div>
              <h3 className="font-semibold">Response Data:</h3>
            </div>
            {Object.keys(filteredResponse).length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold mb-2">Filtered Response:</h3>
                {Object.keys(filteredResponse).map((key) => (
                  <div key={key} className="flex gap-2 mb-2">
                    <p>{key}:</p>
                    <p>
                      {Array.isArray(filteredResponse[key])
                        ? filteredResponse[key].join(", ")
                        : JSON.stringify(filteredResponse[key])}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
