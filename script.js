async function fetchEmployees() {
  const response = await fetch('employees.json');
  if (!response.ok) throw new Error('Failed to load employee data');
  return await response.json();
}

function sortBySalary(employees) {
  return employees.slice().sort((a, b) => b.salary - a.salary);
}

function filterExperienced(employees) {
  return employees.filter(emp => emp.experience >= 3);
}

function createSummary(employees) {
  return employees.map(emp => ({
    name: emp.name,
    department: emp.department,
    bonus: +(emp.salary * 0.10 * emp.experience).toFixed(2)
  }));
}

function totalSalary(employees) {
  return employees.reduce((sum, emp) => sum + emp.salary, 0);
}

function displaySorted(listEl, employees) {
  listEl.innerHTML = '';
  employees.forEach(emp => {
    const li = document.createElement('li');
    li.textContent = `${emp.name} | Salary: ₹${emp.salary} | Experience: ${emp.experience}`;
    listEl.appendChild(li);
  });
}

function displaySummary(tableEl, summary) {
  tableEl.innerHTML = '';
  summary.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>₹${emp.bonus}</td>
    `;
    tableEl.appendChild(tr);
  });
}

function displayTotal(el, total) {
  el.textContent = `₹${total}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const employees = await fetchEmployees();

    const sortedEmployees = sortBySalary(employees);
    const experienced = filterExperienced(sortedEmployees);
    const summary = createSummary(experienced);
    const total = totalSalary(experienced);

    displaySorted(document.getElementById('sorted-list'), sortedEmployees);
    displaySummary(document.getElementById('summary-table'), summary);
    displayTotal(document.getElementById('total-expenditure'), total);

  } catch (err) {
    alert(err.message);
  }
});
