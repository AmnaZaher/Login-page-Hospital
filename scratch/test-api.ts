
async function testApi() {
    const BASE_URL = 'https://nabd.runasp.net/api';
    try {
        console.log('Fetching clinics list...');
        const response = await fetch(`${BASE_URL}/Clinics?PageSize=5&PageIndex=0`);
        const text = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Text (first 500 chars):', text.substring(0, 500));

        if (text.startsWith('{') || text.startsWith('[')) {
            const data = JSON.parse(text);
            console.log('Clinics List JSON:', JSON.stringify(data, null, 2));
        } else {
            console.log('Response is not JSON.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

testApi();
