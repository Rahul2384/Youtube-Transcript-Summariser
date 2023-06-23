const btn = document.getElementById("summarise");
btn.addEventListener("click", function() {
    btn.disabled = true;
    btn.innerHTML = "Summarising...";
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let url = tabs[0].url;
        console.log(url);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
        xhr.onload = function() {
            let text = xhr.responseText;
            let p = document.getElementById("output");
            p.innerHTML = text;
            btn.disabled = false;
            btn.innerHTML = "Summarise";
        }
        xhr.send();
    });
    
});

const trans = document.getElementById("translate");
trans.addEventListener("click",function () {
    trans.disabled = true;
    trans.innerHTML = "Translating...";
    // let p = document.getElementById("output");
    // var text = document.getElementById("output").innerHTML;

    // var params = 'text=' + encodeURIComponent(text);
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST','python/app.py',true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         console.log("Text sent");
    //     }
    // };
    // xhr.send(params);


});

// function sendText() {
//     var text = document.getElementById("output").innerHTML;

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST','app.py',true);
//     xhr.sendRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log("Text sent");
//         }
//     };
//     xhr.send('text=' + encodeURIComponent(text));
// }

// api key : pub_b2c843b4e0180891d8f294a7d015905d

const down = document.getElementById("dwn");
down.addEventListener("click",function(){

    console.log("download clicked");
    console.log(window);
    const element = document.getElementById("invoice");

    html2pdf()
    .from(element)
    .save();
});
   
