let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImg");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn");

function generateQR() {
    if(qrText.value.length > 0){
        const data = encodeURIComponent(qrText.value);
        const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`;
        qrImg.src = qrURL;

        qrImg.onload = ()=> {
            imgBox.classList.add("show-img");
            downloadBtn.style.display = "block";
        };
    }
    else{
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
        downloadBtn.style.display = "none";
    }
}

function downloadQR(){
    fetch(qrImg.src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        })
    .catch(error => {
        alert("Failed to download QR Code.");
        console.error(error);
    });
}

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  body.classList.toggle("dark-mode");
  btn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
}
