/* ==========================================================================
   HARVESTHUB - COMPLETE FRONTEND CONTROLLER & REVENUE LOGIC
   ========================================================================== */
const PRODUCT_API_URL = "http://localhost:8080/api/products";
   document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATABASE STATE ---
  const state = {
    users: [
      { id: 1, name: "Harrison Vance", email: "harrison@harvesthub.farm", role: "Farm Owner", fields: "All Fields", status: "Active", lastActive: "10 mins ago" },
      { id: 2, name: "Elena Rostova", email: "elena@harvesthub.farm", role: "Agronomist", fields: "Field A-1, Field B-2", status: "Active", lastActive: "Just now" },
      { id: 3, name: "Mateo Ramos", email: "mateo@harvesthub.farm", role: "Field Supervisor", fields: "Field C-1, Field C-2", status: "Active", lastActive: "2 hours ago" },
      { id: 4, name: "Liam Miller", email: "liam@harvesthub.farm", role: "Equipment Operator", fields: "Machinery Fleet", status: "Inactive", lastActive: "3 days ago" }
    ],
    crops: [
      { id: "wheat", name: "Winter Wheat", family: "Poaceae", maturity: 180, window: "Oct - Nov", temp: "15°C - 24°C", stages: "Germination, Tillering, Heading, Grain-fill", demand: "High Nitrogen" },
      { id: "rice", name: "Paddy Rice", family: "Poaceae", maturity: 140, window: "May - Jun", temp: "22°C - 32°C", stages: "Vegetative, Panicle, Flowering, Ripening", demand: "High NPK" },
      { id: "maize", name: "Sweet Maize", family: "Poaceae", maturity: 100, window: "Apr - May", temp: "18°C - 28°C", stages: "Emergence, Tasseling, Silking, Maturity", demand: "Heavy Nitrogen" },
      { id: "tomato", name: "Roma Tomato", family: "Solanaceae", maturity: 85, window: "Mar - Apr", temp: "20°C - 30°C", stages: "Seedling, Flowering, Fruit Set, Ripening", demand: "Potassium & Cal-Mag" },
      { id: "potato", name: "Russet Potato", family: "Solanaceae", maturity: 110, window: "Mar - May", temp: "15°C - 20°C", stages: "Sprouting, Tuber Initiation, Bulking", demand: "High Phosphorus & Potassium" },
      { id: "soybean", name: "Edamame Soybean", family: "Fabaceae", maturity: 95, window: "May - Jun", temp: "20°C - 30°C", stages: "Emergence, Flowering, Pod Development", demand: "Nitrogen-Fixing (Restorative)" },
      { id: "peas", name: "Snap Peas", family: "Fabaceae", maturity: 70, window: "Feb - Mar", temp: "12°C - 20°C", stages: "Vegetative, Blossom, Pod Fill", demand: "Nitrogen-Fixing (Restorative)" },
      { id: "chickpea", name: "Chickpea", family: "Fabaceae", maturity: 100, window: "Oct - Nov", temp: "15°C - 25°C", stages: "Seedling, Branching, Flowering, Podding", demand: "Nitrogen-Fixing (Restorative)" },
      { id: "mustard", name: "Yellow Mustard", family: "Brassicaceae", maturity: 80, window: "Sep - Oct", temp: "10°C - 22°C", stages: "Rosette, Bud, Flowering, Pod Fill", demand: "Sulfur & Nitrogen" }
    ],
    fields: [
      { id: "A1", name: "Field A-1 (North Prairie)", acreage: 30, soilTexture: "Silt Loam", ph: 6.4, drainage: "Good", om: "3.8%", fertility: "Optimal", prevCrop: "tomato", currentCrop: "potato", plannedCrop: "soybean", season: "Spring 2026" },
      { id: "A2", name: "Field A-2 (North Plateau)", acreage: 30, soilTexture: "Clay Loam", ph: 6.7, drainage: "Moderate", om: "4.1%", fertility: "Optimal", prevCrop: "maize", currentCrop: "wheat", plannedCrop: "peas", season: "Spring 2026" },
      { id: "B1", name: "Field B-1 (East Creek)", acreage: 40, soilTexture: "Sandy Loam", ph: 6.2, drainage: "Excessive", om: "2.9%", fertility: "Moderate", prevCrop: "soybean", currentCrop: "maize", plannedCrop: "chickpea", season: "Spring 2026" },
      { id: "B2", name: "Field B-2 (East Bench)", acreage: 20, soilTexture: "Sandy Clay", ph: 6.8, drainage: "Good", om: "3.2%", fertility: "Optimal", prevCrop: "mustard", currentCrop: "rice", plannedCrop: "wheat", season: "Summer 2026" },
      { id: "C1", name: "Field C-1 (South Bottom)", acreage: 50, soilTexture: "Clay Loam", ph: 6.5, drainage: "Fair", om: "4.5%", fertility: "High", prevCrop: "potato", currentCrop: "tomato", plannedCrop: "soybean", season: "Spring 2026" },
      { id: "C2", name: "Field C-2 (South Terrace)", acreage: 30, soilTexture: "Silt Loam", ph: 6.6, drainage: "Good", om: "3.5%", fertility: "Optimal", prevCrop: "peas", currentCrop: "maize", plannedCrop: "wheat", season: "Autumn 2026" },
      { id: "D1", name: "Field D-1 (West Timber)", acreage: 25, soilTexture: "Loam", ph: 6.3, drainage: "Good", om: "3.9%", fertility: "Optimal", prevCrop: "wheat", currentCrop: "soybean", plannedCrop: "maize", season: "Spring 2026" },
      { id: "D2", name: "Field D-2 (Hill Slope)", acreage: 15, soilTexture: "Stony Silt", ph: 5.9, drainage: "Rapid", om: "2.2%", fertility: "Low", prevCrop: "rice", currentCrop: "chickpea", plannedCrop: "mustard", season: "Spring 2026" }
    ],
    tasks: [
      { id: 101, name: "Pre-Emergence Herbicide Spraying", fieldId: "A-1", worker: "Mateo Ramos (Crew A)", start: "2026-03-28", due: "2026-03-31", priority: "High", status: "Delayed", progress: 25 },
      { id: 102, name: "Basal NPK Fertilization Run", fieldId: "B-1", worker: "Liam Miller", start: "2026-03-30", due: "2026-04-03", priority: "Critical", status: "In Progress", progress: 60 },
      { id: 103, name: "Center-Pivot Nozzle Check & Drip Flush", fieldId: "C-1", worker: "Lucas Vance", start: "2026-04-01", due: "2026-04-02", priority: "Medium", status: "Scheduled", progress: 0 },
      { id: 104, name: "Spring Bed Preparation & Subsoiling", fieldId: "D-1", worker: "Mateo Ramos (Crew B)", start: "2026-03-24", due: "2026-03-28", priority: "Medium", status: "Completed", progress: 100 },
      { id: 105, name: "Selective Broadleaf Weed Cultivation", fieldId: "A-2", worker: "Arturo Silva", start: "2026-04-02", due: "2026-04-06", priority: "Low", status: "Scheduled", progress: 0 }
    ],
    workforce: [
      { id: 1, name: "Mateo Ramos", role: "Field Supervisor", assignment: "Task #101 Spraying", shift: "Morning (06:00 - 14:00)", attendance: "Present", hoursLogged: 38, status: "Active" },
      { id: 2, name: "Liam Miller", role: "Equipment Operator", assignment: "Task #102 Fertilizing", shift: "Morning (06:00 - 14:00)", attendance: "Present", hoursLogged: 42, status: "Active" },
      { id: 3, name: "Lucas Vance", role: "Irrigation Technician", assignment: "Task #103 Pivot Flush", shift: "Afternoon (14:00 - 22:00)", attendance: "Late", hoursLogged: 32, status: "Active" },
      { id: 4, name: "Arturo Silva", role: "General Farmhand", assignment: "Field Prep Team", shift: "Morning (06:00 - 14:00)", attendance: "Present", hoursLogged: 40, status: "Active" },
      { id: 5, name: "Clara Jimenez", role: "IPM Scout", assignment: "Field Scouting", shift: "Day (08:00 - 16:00)", attendance: "Absent", hoursLogged: 24, status: "On Leave" }
    ],
    inventory: [
      { id: 1, name: "Urea 46-0-0 Granular", category: "Fertilizers", qty: 120, unit: "Bags (50kg)", minQty: 150, unitCost: 32.50 },
      { id: 2, name: "Potassium Sulfate SOP", category: "Fertilizers", qty: 320, unit: "Bags (50kg)", minQty: 100, unitCost: 45.00 },
      { id: 3, name: "Glyphosate Pro Herbicide", category: "Agrochemicals", qty: 18, unit: "Drums (20L)", minQty: 25, unitCost: 110.00 },
      { id: 4, name: "Pioneer P1197 Seed Corn", category: "Seeds", qty: 85, unit: "Units (80k)", minQty: 50, unitCost: 260.00 },
      { id: 5, name: "Low-Sulfur Agricultural Diesel", category: "Fuel", qty: 3400, unit: "Liters", minQty: 4000, unitCost: 1.15 }
    ],
    wages: [
      { id: 1, worker: "Mateo Ramos", date: "2026-03-28", field: "Field A-1", hours: 8, rate: 24.50 },
      { id: 2, worker: "Liam Miller", date: "2026-03-28", field: "Field B-1", hours: 9, rate: 26.00 },
      { id: 3, worker: "Arturo Silva", date: "2026-03-28", field: "Field D-1", hours: 8, rate: 18.00 },
      { id: 4, worker: "Lucas Vance", date: "2026-03-27", field: "Field C-1", hours: 7, rate: 22.00 }
    ],
    harvests: [
      { id: 1, crop: "Winter Wheat", field: "Field A-2", qty: "96 Tonnes", grade: "Grade 1 (Milling)", revenue: 31200, cost: 18400 },
      { id: 2, crop: "Roma Tomato", field: "Field C-1", qty: "140 Tonnes", grade: "Grade A Premium", revenue: 58800, cost: 26500 },
      { id: 3, crop: "Edamame Soybean", field: "Field D-1", qty: "54 Tonnes", grade: "Grade 1 Export", revenue: 29700, cost: 14200 },
      { id: 4, crop: "Sweet Maize", field: "Field B-1", qty: "115 Tonnes", grade: "Grade 2 Standard", revenue: 36800, cost: 21100 }
    ],
    machinery: [
      { id: "EQ-101", name: "John Deere 8R 370", type: "Tractor", brand: "John Deere", model: "8R 370", hours: 265, interval: 250, mileage: "3,410 km", lastService: "2025-11-10", nextService: "Overdue by 15 hrs" },
      { id: "EQ-102", name: "Case IH Axial-Flow 8250", type: "Harvester", brand: "Case IH", model: "8250", hours: 238, interval: 250, mileage: "1,890 km", lastService: "2025-10-15", nextService: "In 12 hrs" },
      { id: "EQ-103", name: "Amazone Pantera 4504", type: "Sprayer", brand: "Amazone", model: "4504", hours: 140, interval: 200, mileage: "2,200 km", lastService: "2026-01-20", nextService: "In 60 hrs" },
      { id: "EQ-104", name: "Valmont Valley 8000 Pivot", type: "Irrigation Pump", brand: "Valley", model: "Center-Pivot", hours: 490, interval: 500, mileage: "N/A", lastService: "2025-08-12", nextService: "In 10 hrs" }
    ],
    tickets: [
      { id: 201, machine: "John Deere 8R 370 (EQ-101)", issue: "250-hr Service: Engine Oil, Hydraulic Filters & Grease", hours: 265, date: "2026-03-31", priority: "Urgent", status: "Maintenance Due" },
      { id: 202, machine: "Case IH Axial-Flow (EQ-102)", issue: "Rotor Belt Tension & Sieve Calibration", hours: 238, date: "2026-04-05", priority: "Routine", status: "Scheduled" }
    ],
    notifications: [
      { id: 1, icon: "fa-triangle-exclamation", color: "text-danger", text: "John Deere 8R exceeded 250 service threshold (265 hrs)." },
      { id: 2, icon: "fa-triangle-exclamation", color: "text-warning", text: "Rotation warning: Tomato to Potato consecutive Solanaceae planting on Field A-1." },
      { id: 3, icon: "fa-box-open", color: "text-warning", text: "Low Inventory: Glyphosate and Diesel below reorder points." }
    ]
  };

  // --- INITIALIZATION ---
  initNavigation();
  initModals();
  initGlobalSearch();
  renderAll();

  function renderAll() {
    renderKPIs();
    renderDashboardWidgets();
    renderFarmProfile();
    renderUsers();
    renderCropCatalog();
    renderRotationPlanner();
    renderTasks();
    renderWorkforce();
    renderResourcesAndCosts();
    renderHarvestAnalytics();
    renderMachinery();
    renderMaintenance();
    renderNotifications();
    initChart();
    fetchProducts();
  }

  // --- NAVIGATION CONTROLLER ---
  function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.app-section');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const sidebarClose = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('sidebar');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        navItems.forEach(i => i.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        item.classList.add('active');
        const targetSection = document.getElementById(target);
        if (targetSection) targetSection.classList.add('active');
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('mobile-open');
        }
      });
    });

    document.querySelectorAll('.view-all-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const navBtn = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (navBtn) navBtn.click();
      });
    });

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => sidebar.classList.add('mobile-open'));
    }
    if (sidebarClose) {
      sidebarClose.addEventListener('click', () => sidebar.classList.remove('mobile-open'));
    }

    const notifBtn = document.getElementById('notificationsBtn');
    const notifDropdown = document.getElementById('notificationsDropdown');
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => notifDropdown.classList.remove('show'));

    document.getElementById('clearNotifsBtn').addEventListener('click', () => {
      state.notifications = [];
      renderNotifications();
    });
  }

  // --- MODAL CONTROLLERS ---
  function initModals() {
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).classList.remove('open');
      });
    });

    // Add User Modal
    document.getElementById('openAddUserModalBtn').addEventListener('click', () => {
      document.getElementById('userForm').reset();
      document.getElementById('userIdInput').value = '';
      document.getElementById('userModalTitle').innerText = 'Add New User';
      document.getElementById('userModal').classList.add('open');
    });

    document.getElementById('userForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('userIdInput').value;
      const userObj = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('userNameInput').value,
        email: document.getElementById('userEmailInput').value,
        role: document.getElementById('userRoleInput').value,
        fields: document.getElementById('userFieldsInput').value || 'Unassigned',
        status: document.getElementById('userStatusInput').value,
        lastActive: 'Just now'
      };
      if (id) {
        const idx = state.users.findIndex(u => u.id === parseInt(id));
        if (idx !== -1) state.users[idx] = userObj;
      } else {
        state.users.push(userObj);
      }
      document.getElementById('userModal').classList.remove('open');
      renderUsers();
    });

    // Add Task Modal
    document.getElementById('openAddTaskModalBtn').addEventListener('click', () => {
      document.getElementById('taskForm').reset();
      document.getElementById('taskIdInput').value = '';
      document.getElementById('taskModalTitle').innerText = 'Schedule Field Operation';
      document.getElementById('progressValueLabel').innerText = '0%';
      populateTaskFieldSelect();
      document.getElementById('taskModal').classList.add('open');
    });

    document.getElementById('taskProgressInput').addEventListener('input', (e) => {
      document.getElementById('progressValueLabel').innerText = `${e.target.value}%`;
    });

    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('taskIdInput').value;
      const progress = parseInt(document.getElementById('taskProgressInput').value);
      let status = document.getElementById('taskStatusInput').value;
      if (progress === 100) status = 'Completed';
      const taskObj = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('taskNameInput').value,
        fieldId: document.getElementById('taskFieldInput').value,
        worker: document.getElementById('taskWorkerInput').value,
        start: document.getElementById('taskStartDateInput').value,
        due: document.getElementById('taskDueDateInput').value,
        priority: document.getElementById('taskPriorityInput').value,
        status: status,
        progress: progress
      };
      if (id) {
        const idx = state.tasks.findIndex(t => t.id === parseInt(id));
        if (idx !== -1) state.tasks[idx] = taskObj;
      } else {
        state.tasks.push(taskObj);
      }
      document.getElementById('taskModal').classList.remove('open');
      renderTasks();
      renderKPIs();
      renderDashboardWidgets();
    });

    // Add Ticket Modal
    document.getElementById('openAddTicketModalBtn').addEventListener('click', () => {
      document.getElementById('ticketForm').reset();
      populateTicketMachineSelect();
      document.getElementById('ticketModal').classList.add('open');
    });

    document.getElementById('ticketForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const ticket = {
        id: Date.now(),
        machine: document.getElementById('ticketMachineInput').value,
        issue: document.getElementById('ticketTypeInput').value,
        hours: parseInt(document.getElementById('ticketHoursInput').value),
        date: document.getElementById('ticketDateInput').value,
        priority: document.getElementById('ticketPriorityInput').value,
        status: 'Maintenance Due'
      };
      state.tickets.push(ticket);
      document.getElementById('ticketModal').classList.remove('open');
      renderMaintenance();
    });

    // Rotation Modal
    const rotCurSelect = document.getElementById('rotationCurrentCrop');
    const rotPlanSelect = document.getElementById('rotationPlannedCrop');
    rotCurSelect.addEventListener('change', checkRotationPreview);
    rotPlanSelect.addEventListener('change', checkRotationPreview);

    document.getElementById('rotationForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fieldId = document.getElementById('rotationFieldId').value;
      const field = state.fields.find(f => f.id === fieldId);
      if (field) {
        field.currentCrop = rotCurSelect.value;
        field.plannedCrop = rotPlanSelect.value;
        field.season = document.getElementById('rotationSeason').value;
      }
      document.getElementById('rotationModal').classList.remove('open');
      renderRotationPlanner();
      renderKPIs();
      renderDashboardWidgets();
      initChart();
    });

    // Product Modal Listeners
    const openProdBtn = document.getElementById('openAddProductModalBtn');
    if (openProdBtn) {
      openProdBtn.addEventListener('click', () => {
        document.getElementById('productForm').reset();
        document.getElementById('productIdInput').value = '';
        document.getElementById('productModalTitle').innerText = 'Add New Product';
        document.getElementById('productModal').classList.add('open');
      });
    }

    const prodForm = document.getElementById('productForm');
    if (prodForm) {
      prodForm.addEventListener('submit', handleProductFormSubmit);
    }

    const refreshProdBtn = document.getElementById('refreshProductsBtn');
    if (refreshProdBtn) {
      refreshProdBtn.addEventListener('click', fetchProducts);
    }
  }

  function populateTaskFieldSelect() {
    const sel = document.getElementById('taskFieldInput');
    sel.innerHTML = state.fields.map(f => `<option value="${f.name}">${f.name}</option>`).join('');
  }

  function populateTicketMachineSelect() {
    const sel = document.getElementById('ticketMachineInput');
    sel.innerHTML = state.machinery.map(m => `<option value="${m.name} (${m.id})">${m.name} (${m.id})</option>`).join('');
  }

  function checkRotationPreview() {
    const curVal = document.getElementById('rotationCurrentCrop').value;
    const planVal = document.getElementById('rotationPlannedCrop').value;
    const preview = document.getElementById('rotationValidationPreview');
    const result = evaluateRotationHealth(curVal, planVal);
    preview.className = `rotation-preview-box show ${result.boxClass}`;
    preview.innerHTML = `<strong>${result.status}:</strong> ${result.message}`;
  }

  // --- AGRONOMIC ROTATION ENGINE ---
  function evaluateRotationHealth(currentCropId, plannedCropId) {
    const currentCrop = state.crops.find(c => c.id === currentCropId);
    const plannedCrop = state.crops.find(c => c.id === plannedCropId);
    if (!currentCrop || !plannedCrop) {
      return { status: "Valid", color: "badge-success", message: "Balanced rotation", boxClass: "bg-success-subtle" };
    }

    if (currentCrop.family === plannedCrop.family) {
      return {
        status: "High Risk",
        color: "badge-danger",
        boxClass: "bg-danger-subtle",
        message: `Botanical Family Conflict: Consecutive planting of ${currentCrop.family} (${currentCrop.name} → ${plannedCrop.name}) drastically compounds soil pathogens and nematode infestation.`
      };
    }

    const isCurrentDemanding = currentCrop.demand.toLowerCase().includes("high") || currentCrop.demand.toLowerCase().includes("heavy");
    const isPlannedDemanding = plannedCrop.demand.toLowerCase().includes("high") || plannedCrop.demand.toLowerCase().includes("heavy");
    if (isCurrentDemanding && isPlannedDemanding) {
      return {
        status: "Needs Attention",
        color: "badge-warning",
        boxClass: "bg-warning-subtle",
        message: `Nutrient Depletion: Consecutive heavy-demand crops. Agronomist recommendation: Intercalate restorative legumes (Soybean, Chickpea, or Snap Peas) to replenish biological nitrogen.`
      };
    }

    return {
      status: "Valid Rotation",
      color: "badge-success",
      boxClass: "bg-success-subtle",
      message: `Optimal Rotation: Well-balanced nutrient profile and family diversity preserved.`
    };
  }

  // --- RENDERING MODULES ---
  function renderKPIs() {
    document.getElementById('kpiTotalArea').innerText = '240.0 Ac';
    document.getElementById('kpiActiveFields').innerText = `${state.fields.length} / 8`;
    const pending = state.tasks.filter(t => t.status !== 'Completed').length;
    const delayed = state.tasks.filter(t => t.status === 'Delayed').length;
    document.getElementById('kpiPendingTasks').innerText = `${pending} Tasks`;
    document.getElementById('kpiDelayedTasks').innerText = `${delayed} Delayed`;

    const totalHarvestCost = state.harvests.reduce((acc, h) => acc + h.cost, 0);
    const totalWageCost = state.wages.reduce((acc, w) => acc + (w.hours * w.rate), 0);
    const totalCost = totalHarvestCost + totalWageCost;
    const totalRevenue = state.harvests.reduce((acc, h) => acc + h.revenue, 0);
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0;

    document.getElementById('kpiTotalCost').innerText = `$${totalCost.toLocaleString()}`;
    document.getElementById('kpiTotalRevenue').innerText = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('kpiProfitMargin').innerText = `+${margin}% Profit Margin`;

    const dueMachines = state.machinery.filter(m => m.hours >= m.interval).length;
    document.getElementById('kpiFleetAlerts').innerText = `${dueMachines} Overdue`;
  }

  function renderDashboardWidgets() {
    const rotContainer = document.getElementById('dashboardRotationHealth');
    let highRiskCount = 0;
    let attentionCount = 0;
    state.fields.forEach(f => {
      const res = evaluateRotationHealth(f.currentCrop, f.plannedCrop);
      if (res.status.includes('High Risk')) highRiskCount++;
      if (res.status.includes('Attention')) attentionCount++;
    });
    rotContainer.innerHTML = `
      <div style="font-size:0.85rem; line-height: 1.6;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
          <span>High-Risk Family Conflicts:</span>
          <strong class="${highRiskCount > 0 ? 'text-danger' : 'text-success'}">${highRiskCount} Fields</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
          <span>Nutrient Imbalance Alerts:</span>
          <strong class="${attentionCount > 0 ? 'text-warning' : 'text-success'}">${attentionCount} Fields</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
          <span>Optimal Rotation Compliance:</span>
          <strong class="text-success">${state.fields.length - highRiskCount - attentionCount} Fields</strong>
        </div>
      </div>
    `;

    const taskContainer = document.getElementById('dashboardTasksList');
    taskContainer.innerHTML = state.tasks.slice(0, 3).map(t => `
      <div class="widget-item">
        <div>
          <strong>${t.name}</strong>
          <div style="font-size:0.7rem; color:var(--text-muted);">${t.fieldId} • Due ${t.due}</div>
        </div>
        <span class="badge ${getStatusBadgeClass(t.status)}">${t.status}</span>
      </div>
    `).join('');

    const invContainer = document.getElementById('dashboardInventoryList');
    const lowStock = state.inventory.filter(i => i.qty <= i.minQty);
    invContainer.innerHTML = lowStock.map(i => `
      <div class="widget-item">
        <div>
          <strong>${i.name}</strong>
          <div style="font-size:0.7rem; color:var(--text-muted);">${i.qty} ${i.unit} (Threshold: ${i.minQty})</div>
        </div>
        <span class="badge badge-danger">Reorder</span>
      </div>
    `).join('');
  }

  function renderFarmProfile() {
    const cadastralGrid = document.getElementById('cadastralGrid');
    cadastralGrid.innerHTML = state.fields.map(f => {
      const curCropObj = state.crops.find(c => c.id === f.currentCrop);
      return `
        <div class="plot-card">
          <div class="plot-header">
            <span class="plot-name">${f.name}</span>
            <span class="plot-acreage">${f.acreage} Ac</span>
          </div>
          <div class="plot-details">
            <div>Current Crop: <strong>${curCropObj ? curCropObj.name : f.currentCrop}</strong></div>
            <div>Soil: <strong>${f.soilTexture}</strong></div>
            <div>pH: <strong>${f.ph}</strong> | Fertility: <strong>${f.fertility}</strong></div>
          </div>
        </div>
      `;
    }).join('');

    const soilContainer = document.getElementById('soilCardsContainer');
    soilContainer.innerHTML = state.fields.map(f => `
      <div class="soil-card">
        <div class="soil-card-header">${f.name}</div>
        <div class="soil-metric-row">
          <span>Soil Texture</span>
          <strong>${f.soilTexture}</strong>
        </div>
        <div class="soil-metric-row">
          <span>Soil pH</span>
          <strong>${f.ph}</strong>
        </div>
        <div class="soil-metric-row">
          <span>Drainage Capacity</span>
          <strong>${f.drainage}</strong>
        </div>
        <div class="soil-metric-row">
          <span>Organic Matter</span>
          <strong>${f.om}</strong>
        </div>
        <div class="soil-metric-row">
          <span>Fertility Status</span>
          <strong>${f.fertility}</strong>
        </div>
      </div>
    `).join('');
  }

  function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    const filterRole = document.getElementById('userRoleFilter').value;
    const search = document.getElementById('userSearchInput').value.toLowerCase();
    const filtered = state.users.filter(u => {
      const matchRole = filterRole === 'All' || u.role === filterRole;
      const matchSearch = u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search);
      return matchRole && matchSearch;
    });

    tbody.innerHTML = filtered.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.fields}</td>
        <td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-secondary'}">${u.status}</span></td>
        <td>${u.lastActive}</td>
        <td>
          <button class="icon-btn edit-user-btn" data-id="${u.id}"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="icon-btn delete-user-btn" data-id="${u.id}"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.edit-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const user = state.users.find(u => u.id === parseInt(btn.getAttribute('data-id')));
        if (user) {
          document.getElementById('userIdInput').value = user.id;
          document.getElementById('userNameInput').value = user.name;
          document.getElementById('userEmailInput').value = user.email;
          document.getElementById('userRoleInput').value = user.role;
          document.getElementById('userFieldsInput').value = user.fields;
          document.getElementById('userStatusInput').value = user.status;
          document.getElementById('userModalTitle').innerText = 'Edit User Permissions';
          document.getElementById('userModal').classList.add('open');
        }
      });
    });

    document.querySelectorAll('.delete-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        if (confirm('Are you sure you want to revoke and delete this user?')) {
          state.users = state.users.filter(u => u.id !== id);
          renderUsers();
        }
      });
    });
  }

  document.getElementById('userRoleFilter').addEventListener('change', renderUsers);
  document.getElementById('userSearchInput').addEventListener('input', renderUsers);

  function renderCropCatalog() {
    const grid = document.getElementById('cropCatalogContainer');
    grid.innerHTML = state.crops.map(c => `
      <div class="crop-card">
        <div class="crop-card-header">
          <div class="crop-title-group">
            <h3>${c.name}</h3>
            <span class="botanical-family">Fam. ${c.family}</span>
          </div>
          <span class="badge badge-info">${c.maturity} Days</span>
        </div>
        <div class="crop-spec-grid">
          <div>
            <span class="crop-spec-label">Sowing Window</span>
            <span class="crop-spec-val">${c.window}</span>
          </div>
          <div>
            <span class="crop-spec-label">Thermal Optimum</span>
            <span class="crop-spec-val">${c.temp}</span>
          </div>
          <div style="grid-column: span 2;">
            <span class="crop-spec-label">Nutrient Demand</span>
            <span class="crop-spec-val">${c.demand}</span>
          </div>
          <div style="grid-column: span 2;">
            <span class="crop-spec-label">Growth Stages</span>
            <span class="crop-spec-val" style="font-size:0.7rem;">${c.stages}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderRotationPlanner() {
    const tbody = document.getElementById('rotationTableBody');
    tbody.innerHTML = state.fields.map(f => {
      const prevCropObj = state.crops.find(c => c.id === f.prevCrop);
      const curCropObj = state.crops.find(c => c.id === f.currentCrop);
      const planCropObj = state.crops.find(c => c.id === f.plannedCrop);
      const evalRes = evaluateRotationHealth(f.currentCrop, f.plannedCrop);
      return `
        <tr>
          <td><strong>${f.name}</strong></td>
          <td>${prevCropObj ? prevCropObj.name : f.prevCrop}</td>
          <td>${curCropObj ? curCropObj.name : f.currentCrop}</td>
          <td><strong>${planCropObj ? planCropObj.name : f.plannedCrop}</strong></td>
          <td>${f.season}</td>
          <td>
            <span class="badge ${evalRes.color}">${evalRes.status}</span>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-top:3px;">${evalRes.message}</div>
          </td>
          <td>
            <button class="btn btn-secondary plan-rotation-btn" data-id="${f.id}">Plan Cycle</button>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.plan-rotation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const field = state.fields.find(f => f.id === btn.getAttribute('data-id'));
        if (field) {
          document.getElementById('rotationFieldId').value = field.id;
          document.getElementById('rotationFieldNameDisplay').innerText = field.name;
          const cropOpts = state.crops.map(c => `<option value="${c.id}">${c.name} (${c.family})</option>`).join('');
          document.getElementById('rotationCurrentCrop').innerHTML = cropOpts;
          document.getElementById('rotationPlannedCrop').innerHTML = cropOpts;
          document.getElementById('rotationCurrentCrop').value = field.currentCrop;
          document.getElementById('rotationPlannedCrop').value = field.plannedCrop;
          document.getElementById('rotationSeason').value = field.season;
          checkRotationPreview();
          document.getElementById('rotationModal').classList.add('open');
        }
      });
    });
  }

  function renderTasks() {
    const tbody = document.getElementById('tasksTableBody');
    const search = document.getElementById('taskSearchInput').value.toLowerCase();
    const statusFilter = document.getElementById('taskStatusFilter').value;
    const priorityFilter = document.getElementById('taskPriorityFilter').value;
    const filtered = state.tasks.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search) || t.fieldId.toLowerCase().includes(search);
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });

    tbody.innerHTML = filtered.map(t => `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td>${t.fieldId}</td>
        <td>${t.worker}</td>
        <td>${t.start}</td>
        <td>${t.due}</td>
        <td><span class="badge ${getPriorityBadgeClass(t.priority)}">${t.priority}</span></td>
        <td><span class="badge ${getStatusBadgeClass(t.status)}">${t.status}</span></td>
        <td>
          <div class="progress-container">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${t.progress}%"></div>
            </div>
            <span class="progress-text">${t.progress}%</span>
          </div>
        </td>
        <td>
          <button class="icon-btn edit-task-btn" data-id="${t.id}"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="icon-btn delete-task-btn" data-id="${t.id}"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.edit-task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const task = state.tasks.find(t => t.id === parseInt(btn.getAttribute('data-id')));
        if (task) {
          populateTaskFieldSelect();
          document.getElementById('taskIdInput').value = task.id;
          document.getElementById('taskNameInput').value = task.name;
          document.getElementById('taskFieldInput').value = task.fieldId;
          document.getElementById('taskWorkerInput').value = task.worker;
          document.getElementById('taskStartDateInput').value = task.start;
          document.getElementById('taskDueDateInput').value = task.due;
          document.getElementById('taskPriorityInput').value = task.priority;
          document.getElementById('taskStatusInput').value = task.status;
          document.getElementById('taskProgressInput').value = task.progress;
          document.getElementById('progressValueLabel').innerText = `${task.progress}%`;
          document.getElementById('taskModalTitle').innerText = 'Edit Field Operation';
          document.getElementById('taskModal').classList.add('open');
        }
      });
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        if (confirm('Delete this scheduled operation?')) {
          state.tasks = state.tasks.filter(t => t.id !== id);
          renderTasks();
          renderKPIs();
          renderDashboardWidgets();
        }
      });
    });
  }

  document.getElementById('taskSearchInput').addEventListener('input', renderTasks);
  document.getElementById('taskStatusFilter').addEventListener('change', renderTasks);
  document.getElementById('taskPriorityFilter').addEventListener('change', renderTasks);

  function renderWorkforce() {
    const tbody = document.getElementById('workforceTableBody');
    tbody.innerHTML = state.workforce.map(w => `
      <tr>
        <td><strong>${w.name}</strong></td>
        <td>${w.role}</td>
        <td>${w.assignment}</td>
        <td>${w.shift}</td>
        <td><span class="badge ${w.attendance === 'Present' ? 'badge-success' : (w.attendance === 'Late' ? 'badge-warning' : 'badge-danger')}">${w.attendance}</span></td>
        <td>${w.hoursLogged} hrs</td>
        <td><span class="badge ${w.status === 'Active' ? 'badge-success' : 'badge-secondary'}">${w.status}</span></td>
      </tr>
    `).join('');
  }

  function renderResourcesAndCosts() {
    const invTbody = document.getElementById('inventoryTableBody');
    invTbody.innerHTML = state.inventory.map(i => {
      const isLow = i.qty <= i.minQty;
      return `
        <tr>
          <td><strong>${i.name}</strong></td>
          <td>${i.category}</td>
          <td>${i.qty} ${i.unit}</td>
          <td>${i.minQty} ${i.unit}</td>
          <td>$${i.unitCost.toFixed(2)}</td>
          <td><span class="badge ${isLow ? 'badge-danger' : 'badge-success'}">${isLow ? 'Low Stock Warning' : 'Adequate'}</span></td>
        </tr>
      `;
    }).join('');

    const wageTbody = document.getElementById('wagesTableBody');
    wageTbody.innerHTML = state.wages.map(w => `
      <tr>
        <td><strong>${w.worker}</strong></td>
        <td>${w.date}</td>
        <td>${w.field}</td>
        <td>${w.hours} hrs</td>
        <td>$${w.rate.toFixed(2)}/hr</td>
        <td><strong>$${(w.hours * w.rate).toFixed(2)}</strong></td>
      </tr>
    `).join('');

    const costContainer = document.getElementById('fieldCostBreakdownList');
    costContainer.innerHTML = state.fields.slice(0, 5).map(f => {
      const harvestAlloc = state.harvests.find(h => h.field.includes(f.id));
      const costVal = harvestAlloc ? harvestAlloc.cost : 8500;
      return `
        <div class="cost-row">
          <span>${f.name}</span>
          <strong>$${costVal.toLocaleString()}</strong>
        </div>
      `;
    }).join('');
  }

  function renderHarvestAnalytics() {
    const tbody = document.getElementById('harvestTableBody');
    tbody.innerHTML = state.harvests.map(h => {
      const profit = h.revenue - h.cost;
      const margin = ((profit / h.revenue) * 100).toFixed(1);
      return `
        <tr>
          <td><strong>${h.crop}</strong></td>
          <td>${h.field}</td>
          <td>${h.qty}</td>
          <td>${h.grade}</td>
          <td>$${h.revenue.toLocaleString()}</td>
          <td>$${h.cost.toLocaleString()}</td>
          <td><strong class="text-success">+$${profit.toLocaleString()} (${margin}%)</strong></td>
        </tr>
      `;
    }).join('');
  }

  function renderMachinery() {
    const container = document.getElementById('machineryCardsContainer');
    container.innerHTML = state.machinery.map(m => {
      let statusBadge = '<span class="badge badge-success">Healthy</span>';
      if (m.hours >= m.interval) {
        statusBadge = '<span class="badge badge-danger">Maintenance Due</span>';
      } else if (m.hours >= m.interval - 20) {
        statusBadge = '<span class="badge badge-warning">Service Soon</span>';
      }
      return `
        <div class="machine-card">
          <div class="machine-card-header">
            <div>
              <div class="machine-name">${m.name}</div>
              <div class="machine-model">${m.brand} • ${m.model}</div>
            </div>
            ${statusBadge}
          </div>
          <div class="crop-spec-grid">
            <div>
              <span class="crop-spec-label">Machine ID</span>
              <span class="crop-spec-val">${m.id}</span>
            </div>
            <div>
              <span class="crop-spec-label">Operational Hours</span>
              <span class="crop-spec-val">${m.hours} hrs (limit: ${m.interval})</span>
            </div>
            <div>
              <span class="crop-spec-label">Service Status</span>
              <span class="crop-spec-val">${m.nextService}</span>
            </div>
            <div>
              <span class="crop-spec-label">Last Logged Inspection</span>
              <span class="crop-spec-val">${m.lastService}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderMaintenance() {
    const tbody = document.getElementById('maintenanceTableBody');
    tbody.innerHTML = state.tickets.map(t => `
      <tr>
        <td><strong>${t.machine}</strong></td>
        <td>${t.issue}</td>
        <td>${t.hours} hrs</td>
        <td>${t.date}</td>
        <td><span class="badge ${t.priority === 'Urgent' ? 'badge-danger' : 'badge-warning'}">${t.priority}</span></td>
        <td><span class="badge ${t.status === 'Maintenance Due' ? 'badge-danger' : 'badge-info'}">${t.status}</span></td>
        <td>
          <button class="btn btn-secondary complete-ticket-btn" data-id="${t.id}">Resolve</button>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.complete-ticket-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        state.tickets = state.tickets.filter(t => t.id !== id);
        renderMaintenance();
        renderKPIs();
      });
    });
  }

  function renderNotifications() {
    const countBadge = document.getElementById('notifCount');
    const container = document.getElementById('notificationList');
    countBadge.innerText = state.notifications.length;
    if (state.notifications.length === 0) {
      container.innerHTML = '<div style="padding:1rem; font-size:0.8rem; color:var(--text-muted); text-align:center;">No new notifications</div>';
      return;
    }
    container.innerHTML = state.notifications.map(n => `
      <div class="notif-item">
        <i class="fa-solid ${n.icon} ${n.color}"></i>
        <div>${n.text}</div>
      </div>
    `).join('');
  }

  function initGlobalSearch() {
    const input = document.getElementById('globalSearchInput');
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        if (!val) return;
        if (state.fields.some(f => f.name.toLowerCase().includes(val))) {
          document.querySelector('.nav-item[data-target="farm-profile-section"]').click();
        } else if (state.crops.some(c => c.name.toLowerCase().includes(val))) {
          document.querySelector('.nav-item[data-target="crop-catalog-section"]').click();
        } else if (state.machinery.some(m => m.name.toLowerCase().includes(val))) {
          document.querySelector('.nav-item[data-target="machinery-section"]').click();
        } else {
          document.querySelector('.nav-item[data-target="field-ops-section"]').click();
          document.getElementById('taskSearchInput').value = val;
          renderTasks();
        }
      }
    });
  }

  var chartInstance = null;
  function initChart() {
    const ctx = document.getElementById('cropDistributionChart');
    if (!ctx) return;
    if (chartInstance) {
      chartInstance.destroy();
    }
    const cropTotals = {};
    state.fields.forEach(f => {
      const crop = state.crops.find(c => c.id === f.currentCrop);
      const name = crop ? crop.name : f.currentCrop;
      cropTotals[name] = (cropTotals[name] || 0) + f.acreage;
    });
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(cropTotals),
        datasets: [{
          label: 'Acreage Allocation (Acres)',
          data: Object.values(cropTotals),
          backgroundColor: '#2D6A4F',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    });
  }

  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Scheduled': return 'badge-secondary';
      case 'Delayed': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  function getPriorityBadgeClass(priority) {
    switch (priority) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-warning';
      case 'Medium': return 'badge-info';
      case 'Low': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  }

  // ==========================================================================
  // SPRING BOOT REST API - LIVE PRODUCTS CRUD CONTROLLER
  // ==========================================================================
  function fetchProducts() {
    fetch(PRODUCT_API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Network error fetching products");
        return res.json();
      })
      .then(products => renderProducts(products))
      .catch(err => {
        console.error(err);
        const container = document.getElementById("product-container");
        if (container) {
          container.innerHTML = `<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: 8px; border: 1px dashed var(--border-color);">Backend not reachable on <code>${PRODUCT_API_URL}</code>. Verify your Spring Boot server is started.</div>`;
        }
      });
  }

  function renderProducts(products) {
    const container = document.getElementById("product-container");
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: 8px;">No products currently stored in the database. Click "+ Add Product" above to create one.</div>`;
      return;
    }

    container.innerHTML = products.map(p => `
      <div class="crop-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="crop-card-header">
            <div class="crop-title-group">
              <h3>${escapeHtml(p.name)}</h3>
              <span class="botanical-family">${escapeHtml(p.category)}</span>
            </div>
            <span class="badge badge-success">Stock: ${p.quantity}</span>
          </div>
          <div class="crop-spec-grid" style="margin-top: 1rem;">
            <div>
              <span class="crop-spec-label">Unit Price</span>
              <span class="crop-spec-val" style="font-weight: 700; color: var(--primary);">$${Number(p.price).toFixed(2)}</span>
            </div>
            <div>
              <span class="crop-spec-label">Database ID</span>
              <span class="crop-spec-val">#${p.id}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <button class="icon-btn edit-product-btn" onclick="openEditProductModal(${p.id}, '${escapeHtml(p.name)}', '${escapeHtml(p.category)}', ${p.price}, ${p.quantity})">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="icon-btn delete-product-btn" onclick="deleteProductById(${p.id})">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  window.openEditProductModal = function(id, name, category, price, quantity) {
    document.getElementById('productIdInput').value = id;
    document.getElementById('productNameInput').value = name;
    document.getElementById('productCategoryInput').value = category;
    document.getElementById('productPriceInput').value = price;
    document.getElementById('productQuantityInput').value = quantity;
    document.getElementById('productModalTitle').innerText = 'Edit Product';
    document.getElementById('productModal').classList.add('open');
  };

  function handleProductFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('productIdInput').value;
    const payload = {
      name: document.getElementById('productNameInput').value.trim(),
      category: document.getElementById('productCategoryInput').value.trim(),
      price: parseFloat(document.getElementById('productPriceInput').value),
      quantity: parseInt(document.getElementById('productQuantityInput').value, 10)
    };

    const isUpdating = Boolean(id);
    const endpoint = isUpdating ? `${PRODUCT_API_URL}/${id}` : PRODUCT_API_URL;
    const method = isUpdating ? 'PUT' : 'POST';

    fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to persist product");
        return res.json();
      })
      .then(() => {
        document.getElementById('productModal').classList.remove('open');
        fetchProducts();
      })
      .catch(err => {
        console.error("Error saving product:", err);
        alert("Could not save product. Please check console logs.");
      });
  }

  window.deleteProductById = function(id) {
    if (!confirm("Are you sure you want to permanently remove this product from inventory?")) return;

    fetch(`${PRODUCT_API_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete product");
        fetchProducts();
      })
      .catch(err => {
        console.error("Error deleting product:", err);
        alert("Could not delete product. Check backend connection.");
      });
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/'/g, "&#39;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});