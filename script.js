/**
 * FAKE API AND GOOGLE MAPS LOCATION
 * This script fetches user data and adds Google Maps location links
 * Using the exact format: https://www.google.com/maps/@lat,lng,15z
 */

// ============================================
// STEP 1: YOUR PERSONAL INFORMATION
// ============================================
// REPLACE THESE VALUES WITH YOUR ACTUAL INFORMATION
const personalInfo = {
    id: 11, // Keep as 11 (API has 10 users)
    firstname: "Albert",      // ← CHANGE THIS to your first name
    lastname: "Venegas",        // ← CHANGE THIS to your last name
    username: "Venegas23", // ← CHANGE THIS to your username
    email: "albert.venegas@msuzs.edu.ph", // ← CHANGE THIS to your email
    address: {
        zipcode: "7009",    // ← CHANGE THIS to your zipcode
        geo: {
            lat: "7.727364",  // ← CHANGE THIS to your latitude
            lng: "7.727364, 123.060448" // ← CHANGE THIS to your longitude
        }
    }
};

// ============================================
// STEP 2: GOOGLE MAPS LINK CREATOR
// ============================================
/**
 * Creates a Google Maps link in the EXACT format from the instruction
 * Instruction example: https://www.google.com/maps/@8.0570696,123.7224303,15z
 * 
 * @param {string} lat - Latitude coordinate
 * @param {string} lng - Longitude coordinate
 * @returns {string} - Complete Google Maps URL
 */
function createGoogleMapsLink(lat, lng) {
    // Using the EXACT format from the instruction
    // Format: https://www.google.com/maps/@latitude,longitude,15z
    const googleMapsUrl = `https://www.google.com/maps/@${lat},${lng},15z`;
    
    // Log for debugging (you can see this in browser console)
    console.log(`📍 Location link created: ${googleMapsUrl}`);
    
    return googleMapsUrl;
}

// ============================================
// STEP 3: EXTRACT NAME PARTS
// ============================================
function extractNameParts(fullName) {
    const nameParts = fullName.split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';
    return { firstname, lastname };
}

// ============================================
// STEP 4: MAIN FUNCTION TO FETCH AND DISPLAY DATA
// ============================================
async function loadAndDisplayData() {
    const tableBody = document.getElementById('tableBody');
    
    // Show loading message
    tableBody.innerHTML = `
        <tr>
            <td colspan="9" class="loading">
                ⏳ Fetching user data from API...
            </td>
        </tr>
    `;

    try {
        // Fetch data from the fake API
        console.log('📡 Fetching data from JSONPlaceholder API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log(`✅ Successfully fetched ${users.length} users from API`);
        
        // Clear the loading message
        tableBody.innerHTML = '';

        // ============================================
        // STEP 5: DISPLAY API USERS WITH LOCATION LINKS
        // ============================================
        users.forEach(user => {
            const { firstname, lastname } = extractNameParts(user.name);
            const row = document.createElement('tr');
            
            // Create the Google Maps link using the coordinates
            const googleMapsLink = createGoogleMapsLink(
                user.address.geo.lat,
                user.address.geo.lng
            );
            
            // Log each user's location (for debugging)
            console.log(`👤 ${user.name} lives at: ${user.address.geo.lat}, ${user.address.geo.lng}`);
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.zipcode}</td>
                <td><strong>${user.address.geo.lat}</strong></td>
                <td><strong>${user.address.geo.lng}</strong></td>
                <td>
                    <a href="${googleMapsLink}" 
                       target="_blank" 
                       title="Click to open this location in Google Maps"
                       class="location-link">
                        View Location
                    </a>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // ============================================
        // STEP 6: ADD YOUR PERSONAL INFORMATION
        // ============================================
        const personalRow = document.createElement('tr');
        personalRow.classList.add('personal-row');
        
        // Create Google Maps link for YOUR location
        const personalGoogleMapsLink = createGoogleMapsLink(
            personalInfo.address.geo.lat,
            personalInfo.address.geo.lng
        );
        
        console.log(`👤 YOUR location: ${personalInfo.address.geo.lat}, ${personalInfo.address.geo.lng}`);
        console.log(`📍 YOUR Google Maps link: ${personalGoogleMapsLink}`);
        
        personalRow.innerHTML = `
            <td><strong>${personalInfo.id}</strong></td>
            <td><strong>${personalInfo.firstname}</strong></td>
            <td><strong>${personalInfo.lastname}</strong></td>
            <td><strong>${personalInfo.username}</strong></td>
            <td><strong>${personalInfo.email}</strong></td>
            <td><strong>${personalInfo.address.zipcode}</strong></td>
            <td><strong style="color:#ff9800;">${personalInfo.address.geo.lat}</strong></td>
            <td><strong style="color:#ff9800;">${personalInfo.address.geo.lng}</strong></td>
            <td>
                <a href="${personalGoogleMapsLink}" 
                   target="_blank" 
                   title="Click to see YOUR location on Google Maps"
                   class="location-link personal-link">
                    My Location
                </a>
            </td>
        `;
        
        tableBody.appendChild(personalRow);

        // Show success message in console
        console.log('✅ Table loaded successfully with ' + (users.length + 1) + ' users (including you!)');

    } catch (error) {
        console.error('❌ Error:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="error">
                    ❌ Error loading data: ${error.message}<br>
                    Please check your internet connection and try again.
                </td>
            </tr>
        `;
    }
}

// ============================================
// STEP 7: START THE APPLICATION
// ============================================
// Wait for the page to load, then start
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Application starting...');
    loadAndDisplayData();
});