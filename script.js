function searchDuckDuckGo() {
    const searchBox = document.getElementById("search-box");
    const searchResults = document.getElementById("search-results");

    // Clear previous search results
    searchResults.innerHTML = "";

    const query = searchBox.value;

    if (query.trim() === "") {
        searchResults.style.display = "none";
        return;
    }

    // Construct DuckDuckGo API URL
    const apiUrl = `https://api.duckduckgo.com/?q=${query}&format=json`;

    // Make a GET request to DuckDuckGo API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.Results;

            if (results.length === 0) {
                searchResults.style.display = "none";
                return;
            }

            // Display search results
            results.forEach((result) => {
                const resultItem = document.createElement("div");
                resultItem.className = "result";
                resultItem.textContent = result.Text;
                searchResults.appendChild(resultItem);
            });

            searchResults.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Close search results when clicking outside the search box
document.addEventListener("click", function (event) {
    const searchBox = document.getElementById("search-box");
    const searchResults = document.getElementById("search-results");

    if (!searchBox.contains(event.target)) {
        searchResults.style.display = "none";
    }
});
