let orderItems = [];
let count = 0;
document.querySelectorAll('.menu-item').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        addItem(name, price);
    });
});
function addItem(name, price) {
    const existingItem = orderItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderItems.push({
            id: ++count,
            name: name,
            price: price,
            quantity: 1
        });
    }
    updateTable();
}
function removeItem(id) {
    orderItems = orderItems.filter(item => item.id !== id);
    updateTable();
}
function updateTable() {
    const tbody = document.getElementById("order-body");
    tbody.innerHTML = "";

    let subtotal = 0;
    orderItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${itemTotal}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
    const tax = subtotal * 0.09;
    const total = subtotal + tax;


    document.getElementById("subtotal").textContent = `Subtotal: Rs. ${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `Tax (9%): Rs. ${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: Rs. ${total.toFixed(2)}`;
}
document.getElementById("place-order").addEventListener("click", function () {
    if (orderItems.length === 0) {
        alert("No items in your order!");
        return;
    }
    alert("Thank you! Your order has been placed successfully.");
    orderItems = [];
    updateTable();
});