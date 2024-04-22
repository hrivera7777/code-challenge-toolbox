import React from "react";
import { Spinner, Table } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { backendUrl } from "../constants";
import { fetchData } from "../utils/fetch-data";

const FileTable = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const uri = "files/data";
    const url = `${backendUrl}/${uri}`;
    fetchData(url)
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setIsError(true);
      });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Stack gap={3}>
        <h1 className="bg-danger text-light p-2">File Table</h1>
        <Spinner animation="border" role="status">
          <span>Loading...</span>
        </Spinner>
      </Stack>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const generateRandomKey = (prefix) => `${prefix}-${Math.random()}`;

  return (
    <Stack gap={3}>
      <h1 className="bg-danger text-light p-2">File Table</h1>
      <Stack className="p-4">
        <Table striped bordered>
          <thead className="border-bottom border-black">
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ file, lines }, mainIndex) => (
              <React.Fragment key={generateRandomKey(`${file}-${mainIndex}`)}>
                {lines.map(({ text, number, hex }, index) => (
                  <tr key={generateRandomKey(`${file}-${index}-${mainIndex}`)}>
                    <td key={generateRandomKey(file)}>{file}</td>
                    <td key={generateRandomKey(text)}>{text ?? ""}</td>
                    <td key={generateRandomKey(number)}>{number ?? ""}</td>
                    <td key={generateRandomKey(hex)}>{hex ?? ""}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default FileTable;
