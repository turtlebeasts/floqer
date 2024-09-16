import Papa from 'papaparse';

export const parseCSV = (filePath, callback) => {
    fetch(filePath)
        .then((response) => response.text())
        .then((data) => {
            Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    callback(results.data);
                },
            });
        });
};
