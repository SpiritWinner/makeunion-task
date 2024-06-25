document.addEventListener("DOMContentLoaded", () => {
    const userListView = document.getElementById('user-list');
    const userDetailsView = document.getElementById('user-details');
    const usersList = document.getElementById('users');
    const detailsDiv = document.getElementById('details');
    const backButton = document.getElementById('back-button');

    function showView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        view.classList.add('active');
    }

    function fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                usersList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.name;
                    li.addEventListener('click', () => showUserDetails(user));
                    usersList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    function showUserDetails(user) {
        detailsDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
        showView(userDetailsView);
    }

    backButton.addEventListener('click', () => {
        showView(userListView);
    });

    fetchUsers();
    showView(userListView);
});
