// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') === 'true' || localStorage.getItem('userLoggedIn') === 'true') {
        document.getElementById('authenticated-content').style.display = 'block';
        document.getElementById('unauthenticated-content').style.display = 'none';
        
        loadProducts();
    }
});

// Handle adding new products to the marketplace
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all the product details from the form
    const productData = {
        id: Date.now(), 
        name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        unit: document.getElementById('unit').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        dateAdded: new Date().toLocaleDateString()
    };
    
    // Save the product to browser storage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
    
    loadProducts();
    
    document.getElementById('addProductForm').reset();
    
    alert('Product added successfully!');
});

// Load and display all products in the table
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('productsTableBody');
    
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-products">No products available. Add your first product using the form.</td></tr>';
    } else {
       
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity} ${product.unit}</td>
                <td>KSh ${product.price}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}


function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
    
        loadProducts();
    }
} 