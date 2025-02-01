function fetchThumbnail() {
    const videoUrl = document.getElementById("video-url").value;
    const resultDiv = document.getElementById("thumbnail-result");

    if (!videoUrl) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter a valid YouTube URL!</p>";
        return;
    }

    // Extract Video ID from YouTube URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        resultDiv.innerHTML = "<p style='color:red;'>Invalid YouTube URL!</p>";
        return;
    }

    // Generate the Thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Display the Thumbnail
    resultDiv.innerHTML = `
        <p>Thumbnail:</p>
        <img src="${thumbnailUrl}" alt="YouTube Thumbnail">
        <br>
        <a href="${thumbnailUrl}" download="thumbnail.jpg">
            <button>Download Thumbnail</button>
        </a>
    `;
}

// Function to Extract Video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
