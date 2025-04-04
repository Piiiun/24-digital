document.querySelectorAll('a[data-filename]').forEach(link => {
    const filename = link.getAttribute('data-filename');
    if (filename) {
        link.href = `/viewer.html?file=${encodeURIComponent(filename)}`;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const booksGrid = document.getElementById('booksGrid');
    const bookItems = document.querySelectorAll('.book-item');
    const noResults = document.getElementById('noResults');
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsFound = false;
        
        // If search is empty, show all books
        if (searchTerm === '') {
            bookItems.forEach(item => {
                item.style.display = 'block';
            });
            noResults.style.display = 'none';
            return;
        }
        
        // Search through book titles
        bookItems.forEach(item => {
            const bookTitle = item.querySelector('.book-info h3').textContent.toLowerCase();
            const bookLevel = item.querySelector('.book-level').textContent.toLowerCase();
            
            if (bookTitle.includes(searchTerm) || bookLevel.includes(searchTerm)) {
                item.style.display = 'block';
                resultsFound = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide "no results" message
        if (resultsFound) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }
    }
    
    // Add event listeners
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key press
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add real-time search (optional)
    searchInput.addEventListener('input', function() {
        // Only do real-time search if input has at least 2 characters
        if (this.value.length >= 2 || this.value.length === 0) {
            performSearch();
        }
    });
});