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
        <button onclick="downloadThumbnail('${thumbnailUrl}', '${videoId}')">Download Thumbnail</button>
    `;
}

// Function to Extract Video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to Trigger Direct Download
function downloadThumbnail(thumbnailUrl, videoId) {
    fetch(thumbnailUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = `YouTube_Thumbnail_${videoId}.jpg`; // File Name
            document.body.appendChild(a);
            a.click(); // Simulate Click
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl); // Clean up
        })
        .catch(error => console.error("Download failed:", error));
}
