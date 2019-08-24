function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadJson(path, callback) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", () => {
        callback(JSON.parse(request.responseText))
    });

    request.open("GET", path);
    request.send();
}