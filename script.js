async function startDownload() {
    const link = document.getElementById('linkInput').value;
    const format = document.getElementById('formatSelect').value;
    const resultArea = document.getElementById('resultArea');
    const statusText = document.getElementById('statusText');
    const loader = document.getElementById('loader');
    const downloadLink = document.getElementById('downloadLink');

    if (!link) {
        alert("Lütfen bir link yapıştırın!");
        return;
    }

    // UI Güncelleme
    resultArea.classList.remove('hidden');
    loader.style.display = 'block';
    downloadLink.classList.add('hidden');
    statusText.innerText = "Sunucuya bağlanılıyor ve link işleniyor...";

    // BURAYA RAPIDAPI KEY'İNİ GİRMELİSİN
    // Eğer key girmezsen kod simülasyon modunda çalışır.
    const RAPIDAPI_KEY = 'BURAYA_API_KEY_GELECEK'; 
    const RAPIDAPI_HOST = 'social-media-video-downloader.p.rapidapi.com'; // Örnek host

    try {
        // Eğer API Key yoksa kullanıcıyı uyar (Demo Modu)
        if (RAPIDAPI_KEY === 'BURAYA_API_KEY_GELECEK') {
            setTimeout(() => {
                loader.style.display = 'none';
                statusText.innerText = "⚠ API Anahtarı Eksik! Kodun içine RapidAPI Key eklemelisin.";
                alert("Kanka bu bir demo. Gerçekten indirmek için script.js dosyasına bir API Key eklemelisin.");
            }, 2000);
            return;
        }

        // API İsteği (Örnek Yapı)
        const response = await fetch(`https://${RAPIDAPI_HOST}/smvd/get/all?url=${encodeURIComponent(link)}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        });

        const data = await response.json();

        // API'den gelen veriye göre linki al
        // Not: Her API'nin yanıt yapısı farklıdır. Kullandığın API'ye göre burayı düzenle.
        let finalUrl = "";
        
        if (data && data.links) {
            finalUrl = data.links[0].link; // Örnek
        } else {
            throw new Error("Link bulunamadı");
        }

        // Başarılı olursa
        loader.style.display = 'none';
        statusText.innerText = "İndirme hazır! ✅";
        downloadLink.href = finalUrl;
        downloadLink.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        loader.style.display = 'none';
        statusText.innerText = "Hata oluştu veya API limiti doldu.";
    }
}
