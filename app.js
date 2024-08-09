document.addEventListener('DOMContentLoaded', function() {
    var uploadForm = document.getElementById('uploadForm');
    var fileInput = document.getElementById('fileInput');
    var fileContentDiv = document.getElementById('fileContent');
    var showTableDiv = document.getElementById('showTable');

    if (uploadForm && fileInput && fileContentDiv && showTableDiv) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = fileInput.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var fileContent = e.target.result;
                    fileContentDiv.textContent = fileContent;
                    try {
                        var jsonData = JSON.parse(fileContent);
                        createTableFromJSON(jsonData);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        alert( 'JSON:' + error.message);
                    }
                };
                reader.readAsText(file);
            } else {
                alert('Choose a file please');
            }
        });
    } 
});

function createTableFromJSON(data) {
    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    var headers = getHeaders(data);
    headers.forEach(function(header) {
        var th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
    });

    if (Array.isArray(data)) {
        data.forEach(function(item) {
            addRow(table, item, headers);
        });
    } else if (typeof data === 'object') {
        addRow(table, data, headers);
    }

    var showTableDiv = document.getElementById("showTable");
    if (showTableDiv) {
        showTableDiv.innerHTML = "";
        showTableDiv.appendChild(table);
    }
}

function getHeaders(data) {
    var headers = new Set();
    if (Array.isArray(data)) {
        data.forEach(function(item) {
            Object.keys(item).forEach(key => headers.add(key));
        });
    } else if (typeof data === 'object') {
        Object.keys(data).forEach(key => headers.add(key));
    }
    return Array.from(headers);
}

function addRow(table, rowData, headers) {
    var tr = table.insertRow(-1);
    headers.forEach(function(header) {
        var tabCell = tr.insertCell(-1);
        var cellData = rowData[header];
        tabCell.innerHTML = cellData !== undefined ? JSON.stringify(cellData) : '';
    });
}