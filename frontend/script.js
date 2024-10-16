document.addEventListener('DOMContentLoaded', () => {
    // Fetch user dashboard data
    const userId = new URLSearchParams(window.location.search).get('userId');
    
    fetch(`/api/dashboard?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('welcome-message').textContent = `Welcome, ${data.name}!`;
            document.getElementById('referral-code').textContent = data.referralCode;
            document.getElementById('total-donations').textContent = data.totalDonations;
        })
        .catch(error => console.error('Error fetching dashboard data:', error));

    // Copy referral link to clipboard
    document.getElementById('copy-link').addEventListener('click', () => {
        const referralCode = document.getElementById('referral-code').textContent;
        const donationLink = `${window.location.origin}/donate?ref=${referralCode}`;

        navigator.clipboard.writeText(donationLink)
            .then(() => alert('Donation link copied to clipboard!'))
            .catch(err => console.error('Failed to copy link:', err));
    });

    // Share donation link on WhatsApp
    document.getElementById('share-whatsapp').addEventListener('click', () => {
        const referralCode = document.getElementById('referral-code').textContent;
        const donationLink = `${window.location.origin}/donate?ref=${referralCode}`;
        const message = `Hi, I am raising funds for NayePankh Foundation. Please support me by donating through this link ${donationLink} and make a difference!`;

        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
});
