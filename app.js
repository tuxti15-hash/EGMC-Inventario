const sampleItems = [
  { id: 'i1', name: 'Cemento gris', sku: 'MAT-00124', category: 'Materiales', location: 'Obra Reforma', unit: 'saco', qty: 48, min: 20, price: 245, icon: '▰' },
  { id: 'i2', name: 'Varilla corrugada 3/8”', sku: 'MAT-00118', category: 'Materiales', location: 'Almacén central', unit: 'tramo', qty: 12, min: 25, price: 168, icon: '╱' },
  { id: 'i3', name: 'Casco de seguridad', sku: 'SEG-00047', category: 'Equipo de seguridad', location: 'Obra Las Palmas', unit: 'pieza', qty: 32, min: 10, price: 185, icon: '⌂' },
  { id: 'i4', name: 'Taladro percutor', sku: 'HER-00036', category: 'Herramientas', location: 'Almacén central', unit: 'pieza', qty: 8, min: 3, price: 2890, icon: '⌁' },
  { id: 'i5', name: 'Cable THW calibre 12', sku: 'MAT-00092', category: 'Instalaciones', location: 'Obra Reforma', unit: 'metro', qty: 5, min: 15, price: 24.5, icon: '〰' },
  { id: 'i6', name: 'Guantes de carnaza', sku: 'SEG-00031', category: 'Equipo de seguridad', location: 'Almacén central', unit: 'par', qty: 64, min: 20, price: 42, icon: '♧' },
  { id: 'i7', name: 'Disco de corte 4½”', sku: 'HER-00029', category: 'Herramientas', location: 'Obra Las Palmas', unit: 'pieza', qty: 18, min: 12, price: 38, icon: '◉' }
];

const oldItems = localStorage.getItem('obrastock-items');
const oldMovements = localStorage.getItem('obrastock-movements');
let items = JSON.parse(localStorage.getItem('egmc-inventario-items') || oldItems || 'null') || sampleItems;
let movements = JSON.parse(localStorage.getItem('egmc-inventario-movements') || oldMovements || '[]');
let activeStatus = 'all';
let activeCategory = 'Todas las categorías';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (amount) => new Intl.NumberFormat('es-MX', {
  style: 'currency', currency: 'MXN', maximumFractionDigits: 2
}).format(amount);

function saveData() {
  localStorage.setItem('egmc-inventario-items', JSON.stringify(items));
  localStorage.setItem('egmc-inventario-movements', JSON.stringify(movements));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function updateCategoryOptions() {
  const select = $('#categoryFilter');
  const categories = ['Todas las categorías', ...new Set(items.map((item) => item.category))];
  select.innerHTML = categories.map((category) =>
    `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`
  ).join('');
  select.value = categories.includes(activeCategory) ? activeCategory : categories[0];
  activeCategory = select.value;
}

function renderInventory() {
  updateCategoryOptions();
  const query = $('#searchInput').value.trim().toLowerCase();
  const filtered = items.filter((item) => {
    const matchesStatus = activeStatus === 'all' ||
      (activeStatus === 'low' ? item.qty <= item.min : item.qty > item.min);
    const matchesCategory = activeCategory === 'Todas las categorías' || item.category === activeCategory;
    const searchable = `${item.name} ${item.sku} ${item.location} ${item.category}`.toLowerCase();
    return matchesStatus && matchesCategory && (!query || searchable.includes(query));
  });

  $('#inventoryBody').innerHTML = filtered.map((item) => {
    const lowStock = item.qty <= item.min;
    return `<tr>
      <td><div class="item-cell"><span class="item-thumb">${escapeHtml(item.icon || '▦')}</span><span><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.sku)}</small></span></div></td>
      <td class="category">${escapeHtml(item.category)}</td>
      <td>${escapeHtml(item.location)}</td>
      <td class="qty"><b>${item.qty} ${escapeHtml(item.unit || 'pieza')}</b><small>mín. ${item.min}</small></td>
      <td><span class="status ${lowStock ? 'status-low' : 'status-ok'}">${lowStock ? 'Stock bajo' : 'En existencia'}</span></td>
      <td class="price">${money(item.price)}</td>
      <td><div class="row-menu"><button title="Registrar entrada o salida" data-move="${item.id}">↕</button><button title="Editar artículo" data-edit="${item.id}">✎</button><button title="Eliminar artículo" data-delete="${item.id}">×</button></div></td>
    </tr>`;
  }).join('');

  $('#emptyState').hidden = filtered.length > 0;
  $('#totalItems').textContent = items.length;
  $('#totalValue').textContent = money(items.reduce((sum, item) => sum + item.qty * item.price, 0));
  $('#lowItems').textContent = items.filter((item) => item.qty <= item.min).length;
  $('#activeWorks').textContent = new Set(
    items.filter((item) => /^Obra\b/i.test(item.location)).map((item) => item.location)
  ).size;
  $('#allCount').textContent = items.length;
  $('#lowCount').textContent = items.filter((item) => item.qty <= item.min).length;
  $('#movementNavCount').textContent = movements.length;
  $('#tableSummary').textContent = `Mostrando ${filtered.length} de ${items.length} artículos`;
  renderMovements();
}

function renderMovements() {
  if (!movements.length) {
    $('#movementList').innerHTML = '<div class="movement-empty">Todavía no hay movimientos registrados.</div>';
    return;
  }

  $('#movementList').innerHTML = movements.slice(0, 8).map((movement) => {
    const isEntry = movement.type === 'in';
    const date = new Intl.DateTimeFormat('es-MX', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    }).format(new Date(movement.date));
    return `<div class="movement-row">
      <span class="movement-symbol ${isEntry ? 'in' : 'out'}">${isEntry ? '↓' : '↑'}</span>
      <span><b>${isEntry ? 'Entrada' : 'Salida'} · ${escapeHtml(movement.item)}</b><small>${escapeHtml(movement.note || 'Sin observaciones')} · ${date}</small></span>
      <span>${isEntry ? '+' : '−'}${movement.amount} ${escapeHtml(movement.unit || 'pieza')}</span>
      <span class="status ${isEntry ? 'status-ok' : 'status-low'}">${isEntry ? 'Entrada' : 'Salida'}</span>
    </div>`;
  }).join('');
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function openModal(selector) {
  $(selector).hidden = false;
  $(selector + ' input:not([type=hidden]), ' + selector + ' select')?.focus();
}

function closeModals() {
  $$('.modal-backdrop').forEach((modal) => { modal.hidden = true; });
}

function makeSku(category) {
  const prefix = category === 'Herramientas' ? 'HER' :
    category === 'Equipo de seguridad' ? 'SEG' :
    category === 'Maquinaria' ? 'MAQ' : 'MAT';
  return `${prefix}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
}

function fillItemForm(item) {
  $('#itemId').value = item?.id || '';
  $('#itemName').value = item?.name || '';
  $('#itemCategory').value = item?.category || 'Materiales';
  $('#itemLocation').value = item?.location || '';
  $('#itemUnit').value = item?.unit || 'pieza';
  $('#itemQty').value = item?.qty ?? '';
  $('#itemMin').value = item?.min ?? '';
  $('#itemPrice').value = item?.price ?? '';
  $('#modalTitle').textContent = item ? 'Editar artículo' : 'Agregar artículo';
}

$('#today').textContent = new Intl.DateTimeFormat('es-MX', {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
}).format(new Date());
$('#year').textContent = new Date().getFullYear();

$('#addBtn').addEventListener('click', () => {
  $('#itemForm').reset();
  fillItemForm(null);
  openModal('#itemModal');
});

$('#itemForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const id = $('#itemId').value;
  const category = $('#itemCategory').value;
  const data = {
    name: $('#itemName').value.trim(), category,
    location: $('#itemLocation').value.trim(), unit: $('#itemUnit').value,
    qty: Number($('#itemQty').value), min: Number($('#itemMin').value),
    price: Number($('#itemPrice').value)
  };

  if (id) {
    items = items.map((item) => item.id === id ? { ...item, ...data } : item);
    showToast('Se actualizaron los datos del artículo.');
  } else {
    items.unshift({ id: crypto.randomUUID(), sku: makeSku(category), icon: '▦', ...data });
    showToast('Artículo agregado al inventario.');
  }
  saveData();
  renderInventory();
  closeModals();
});

$('#inventoryBody').addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit]');
  const deleteButton = event.target.closest('[data-delete]');
  const movementButton = event.target.closest('[data-move]');

  if (editButton) {
    const item = items.find((row) => row.id === editButton.dataset.edit);
    fillItemForm(item);
    openModal('#itemModal');
  }
  if (deleteButton) {
    const item = items.find((row) => row.id === deleteButton.dataset.delete);
    if (confirm(`¿Eliminar “${item.name}” del inventario?`)) {
      items = items.filter((row) => row.id !== item.id);
      saveData();
      renderInventory();
      showToast('Artículo eliminado.');
    }
  }
  if (movementButton) openMovement(movementButton.dataset.move);
});

function openMovement(itemId) {
  $('#movementForm').reset();
  $('#movementItem').innerHTML = items.map((item) =>
    `<option value="${item.id}" ${item.id === itemId ? 'selected' : ''}>${escapeHtml(item.name)} · ${item.qty} ${escapeHtml(item.unit || 'pieza')}</option>`
  ).join('');
  openModal('#movementModal');
}

$('#movementAddBtn').addEventListener('click', () => {
  if (items.length) openMovement(items[0].id);
  else showToast('Primero agrega un artículo al inventario.');
});

$('#movementForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const item = items.find((row) => row.id === $('#movementItem').value);
  const amount = Number($('#movementQty').value);
  const type = $('#movementType').value;
  if (type === 'out' && amount > item.qty) {
    showToast('La salida supera las existencias disponibles.');
    return;
  }

  item.qty += type === 'in' ? amount : -amount;
  movements.unshift({
    id: crypto.randomUUID(), item: item.name, unit: item.unit || 'pieza',
    type, amount, note: $('#movementNote').value.trim(), date: new Date().toISOString()
  });
  saveData();
  renderInventory();
  closeModals();
  showToast(type === 'in' ? 'Entrada registrada.' : 'Salida registrada.');
});

$$('[data-close]').forEach((button) => button.addEventListener('click', closeModals));
$$('.modal-backdrop').forEach((modal) => modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModals();
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModals();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#searchInput').focus();
  }
});

$$('.tab').forEach((button) => button.addEventListener('click', () => {
  $$('.tab').forEach((tab) => tab.classList.remove('selected'));
  button.classList.add('selected');
  activeStatus = button.dataset.status;
  renderInventory();
}));
$('#searchInput').addEventListener('input', renderInventory);
$('#categoryFilter').addEventListener('change', (event) => {
  activeCategory = event.target.value;
  renderInventory();
});

$('#exportBtn').addEventListener('click', () => {
  const rows = [
    ['Artículo', 'Código', 'Categoría', 'Obra / almacén', 'Unidad', 'Existencias', 'Mínimo', 'Precio unitario (MXN)', 'Valor total (MXN)'],
    ...items.map((item) => [item.name, item.sku, item.category, item.location, item.unit || 'pieza', item.qty, item.min, item.price, (item.qty * item.price).toFixed(2)])
  ];
  const csv = '\ufeff' + rows.map((row) => row.map((value) =>
    `"${String(value).replaceAll('"', '""')}"`
  ).join(',')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = 'EGMC_Inventario.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Inventario descargado en formato CSV.');
});

renderInventory();

