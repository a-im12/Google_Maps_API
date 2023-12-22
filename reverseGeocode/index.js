const nominatimEndpoint = 'https://nominatim.openstreetmap.org/reverse';

async function reverseGeocode(lat, lon) {
    const url = `${nominatimEndpoint}?lat=${lat}&lon=${lon}&format=json`;
    console.log('url:', url);
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 都道府県名の取得


        console.log('逆ジオコーディング結果:', data);
        console.log('逆ジオコーディング結果:', data.address.state);
    } catch (error) {
        console.error('エラー:', error);
    }
}

window.addEventListener('load', () => {
    // reverseGeocode(35.6812362, 139.7671248);
    reverseGeocode(40.7127, -74.0059);
});