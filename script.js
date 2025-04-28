document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  const dateInput = document.getElementById('expense-date');
  const addButton = document.getElementById('add-button');
  const expensesContainer = document.getElementById('expenses-container');
  const totalDisplay = document.getElementById('total-display');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Add Expense
  addButton.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    // Validation
    if (!name || !amount || !date) {
      alert('Please fill all fields correctly!');
      return;
    }

    // Add to array
    expenses.push({
      name: name,
      amount: amount,
      date: new Date(date).toLocaleDateString('en-IN')
    });

    // Save and update
    saveExpenses();
    renderExpenses();
    clearInputs();
  });

  // Render all expenses
  function renderExpenses() {
    expensesContainer.innerHTML = '';
    let total = 0;

    if (expenses.length === 0) {
      expensesContainer.innerHTML = '<p>No expenses added yet</p>';
      totalDisplay.textContent = '0.00';
      return;
    }

    expenses.forEach((expense, index) => {
      total += expense.amount;
      
      const expenseElement = document.createElement('div');
      expenseElement.className = 'expense-item';
      expenseElement.innerHTML = `
        <div>
          <strong>${expense.name}</strong>
          <div>${expense.date}</div>
        </div>
        <div>
          ₹${expense.amount.toFixed(2)}
          <button class="delete-btn" data-id="${index}">Delete</button>
        </div>
      `;
      expensesContainer.appendChild(expenseElement);
    });

    totalDisplay.textContent = total.toFixed(2);
    addDeleteListeners();
  }

  // Delete functionality
  function addDeleteListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-id'));
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
      });
    });
  }

  // Helper functions
  function clearInputs() {
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    nameInput.focus();
  }

  function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Initial render
  renderExpenses();
});