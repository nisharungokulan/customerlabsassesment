import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([]);
  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const webhookUrl =
    "https://webhook.site/d7447353-a963-4966-9529-9f207d39cca1";

  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSchemas([
        ...schemas,
        {
          [selectedSchema]: schemaOptions.find(
            (schema) => schema.value === selectedSchema
          ).label,
        },
      ]);
      setSelectedSchema("");
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: schemas,
    };

    console.log(data);
    axios
      .post(webhookUrl, {
        data,
      })
      .then(function (response) {
        console.log("Data sent successfully:", response.data);
      })
      .catch(function (error) {
        console.error("Error sending data:", error);
      });

    setSegmentName("");
    setSchemas([]);
  };

  return (
    <div className="App row container">
      <div
        className="col-6 d-flex align-items-center"
        style={{ height: "200p" }}
      >
        <button onClick={() => setShowPopup(true)} className="btn btn-primary">
          Save Segment
        </button>
      </div>
      <div className="col-6 d-flex align-items-center">
        {showPopup && (
          <div className="popup">
            <h2>Save Segment</h2>
            Enter the segment name:{" "}
            <input
              type="text"
              placeholder="Name of the Segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <select value={selectedSchema} onChange={handleSchemaChange}>
              <option value="">Add schema to segment</option>
              {schemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="blue-box">
              {schemas.map((schemaItem, index) => (
                <div key={index}>
                  <select>
                    <option value="" disabled>
                      Select Schema
                    </option>
                    {schemaOptions
                      .filter(
                        (option) =>
                          !Object.keys(schemaItem).includes(option.value)
                      )
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
              <div>
                <p>
                  To save your segment, you need to add the schemas to build the
                  query
                </p>
              </div>
              <button
                className="border border-white bg-transparent text-primary"
                onClick={handleAddSchema}
              >
                + Add new schema
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-success m-1"
                onClick={handleSaveSegment}
              >
                Save the Segment
              </button>
              <button className="btn btn-outline-danger m-1" onClick={""}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
