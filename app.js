document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var jsonData = e.target.result;
            try {
                createTableFromJSON(jsonData);
            } catch (error) {
                console.error('Error creating table:', error);
                alert('خطا در پردازش فایل JSON: ' + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('لطفاً یک فایل انتخاب کنید.');
    }
});
function createTableFromJSON(jsonData) {
    var data = JSON.parse(jsonData);
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
    var divContainer = document.getElementById("showTable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
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