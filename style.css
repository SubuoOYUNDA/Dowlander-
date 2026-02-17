// Bu fonksiyon "Otomatik İndirme" tetikleyicisidir.
function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'indirilen_dosya';
    document.body.appendChild(a);
    a.click(); // Sanki kullanıcı tıklamış gibi yapar
    document.body.removeChild(a);
}

async function startDownload(type) {
    const linkInput = document.getElementById('linkInput');
    const statusArea = document.getElementById('statusArea');
    const url = linkInput.value.trim();

    if (!url) {
        statusArea.innerText = "❌ Önce bir link yapıştır!";
        statusArea.style.color = "red";
        return;
    }

    statusArea.innerText = "⏳ Link işleniyor, indirme birazdan başlayacak...";
    statusArea.style.color = "yellow";

    // Kanka burası API kısmı. 
    // Cobalt.tools ücretsiz ve popüler bir API'dir.
    // Eğer çalışmazsa "api.cobalt.tools" yerine başka bir public instance bulup yazman gerekir.
    
    const requestData = {
        url: url,
        vCodec: "h264",
        vQuality: "720",
        aFormat: "mp3",
        isAudioOnly: type === 'audio' // MP3 istendiyse true olur
    };

    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (data.status === 'stream' || data.status === 'redirect') {
            statusArea.innerText = "✅ İndirme başladı!";
            statusArea.style.color = "#00ff7f";
            
            // İşte sihirli kod: Linki aldığı an indirmeyi tetikler.
            triggerDownload(data.url, 'medya_dosyasi');
            
            // Bazı tarayıcılar (özellikle iOS) otomatik indirmeyi engellerse diye
            // güvenlik önlemi olarak linki yeni sekmede de açmayı deneyebiliriz:
            // window.location.href = data.url; 
        } else if (data.status === 'picker') {
            // Bazen birden fazla seçenek döner (video/ses ayrımı gibi)
            statusArea.innerText = "✅ Dosya hazır, indiriliyor...";
            data.picker.forEach(item => {
                triggerDownload(item.url, 'dosya');
            });
        } else {
            statusArea.innerText = "❌ Hata: " + (data.text || "Bilinmeyen hata");
            statusArea.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        statusArea.innerText = "❌ Sunucu hatası veya link geçersiz.";
        statusArea.style.color = "red";
    }
}
