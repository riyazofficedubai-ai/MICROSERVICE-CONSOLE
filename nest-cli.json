<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manifest — Product & Order Console | Syed Riyaz</title>
  <meta name="description" content="Microservice-based Product & Order management console with a dynamic JSON-driven signup form." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: #1F2A37;
      --ink-light: #3A4A5C;
      --amber: #E08A2C;
      --amber-dark: #B66B17;
      --paper: #F6F5F2;
      --white: #FFFFFF;
      --border: #E2DFD8;
      --text: #1A2026;
      --muted: #5C6773;
      --success: #2E7D5B;
      --error: #C0432F;
      --mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
      --sans: 'Inter', 'Segoe UI', system-ui, sans-serif;
      --radius: 10px;
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: var(--sans);
      background: var(--paper);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
    }

    /* ── NAV ── */
    nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--ink);
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 32px;
      gap: 24px;
      box-shadow: 0 1px 0 rgba(255,255,255,0.06);
    }
    nav .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      font-weight: 700;
      font-size: 1.1rem;
      text-decoration: none;
      letter-spacing: -0.01em;
      flex: 1;
    }
    nav .brand svg { color: var(--amber); }
    nav .nav-links { display: flex; gap: 4px; }
    nav a.nav-link {
      color: rgba(255,255,255,0.82);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 7px;
      transition: background 0.15s, color 0.15s;
    }
    nav a.nav-link:hover, nav a.nav-link.active {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }

    /* ── LAYOUT ── */
    .page { display: none; }
    .page.active { display: block; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    /* ── TYPOGRAPHY ── */
    h1 { font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; }
    h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 700; letter-spacing: -0.02em; }
    h3 { font-size: 1.15rem; font-weight: 600; }
    p { color: var(--muted); }
    code { font-family: var(--mono); font-size: 0.85em; background: rgba(0,0,0,0.06); padding: 2px 5px; border-radius: 4px; }

    /* ── CHIP ── */
    .chip {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-family: var(--mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      background: var(--amber);
      color: var(--ink);
    }
    .chip.dark { background: var(--ink); color: #fff; }
    .chip.success { background: var(--success); color: #fff; }
    .chip.error { background: var(--error); color: #fff; }
    .chip.warning { background: var(--amber); color: var(--ink); }

    /* ── CARDS ── */
    .card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
    }
    .card-hover {
      text-decoration: none;
      color: inherit;
      transition: border-color 0.15s, transform 0.15s;
      display: block;
    }
    .card-hover:hover { border-color: var(--amber); transform: translateY(-2px); }

    /* ── BUTTONS ── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      border-radius: 8px;
      font-family: var(--sans);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 0.15s, transform 0.1s;
      text-decoration: none;
    }
    .btn:active { transform: scale(0.98); }
    .btn-primary { background: var(--ink); color: #fff; }
    .btn-primary:hover { background: var(--ink-light); }
    .btn-amber { background: var(--amber); color: var(--ink); }
    .btn-amber:hover { background: var(--amber-dark); color: #fff; }
    .btn-outline { background: transparent; border: 1.5px solid var(--border); color: var(--text); }
    .btn-outline:hover { border-color: var(--ink); }
    .btn-danger { background: transparent; border: 1.5px solid var(--error); color: var(--error); font-size: 0.8rem; padding: 4px 10px; }
    .btn-sm { padding: 5px 12px; font-size: 0.82rem; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-full { width: 100%; justify-content: center; }

    /* ── FORM ELEMENTS ── */
    .form-group { display: flex; flex-direction: column; gap: 5px; }
    label { font-size: 0.88rem; font-weight: 500; color: var(--text); }
    label .req { color: var(--error); margin-left: 2px; }
    input, select, textarea {
      font-family: var(--sans);
      font-size: 0.92rem;
      padding: 10px 13px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      background: var(--white);
      color: var(--text);
      transition: border-color 0.15s;
      width: 100%;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--ink);
    }
    input.error-field, select.error-field { border-color: var(--error); }
    .field-error { font-size: 0.78rem; color: var(--error); }
    .field-helper { font-size: 0.78rem; color: var(--muted); }

    /* Radio group */
    .radio-group { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
    .radio-label { display: flex; align-items: center; gap: 7px; font-size: 0.9rem; cursor: pointer; }
    .radio-label input[type=radio] { width: auto; cursor: pointer; accent-color: var(--ink); }

    /* ── GRID ── */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
      .grid-3 { grid-template-columns: 1fr; }
      nav { padding: 0 16px; }
      nav .nav-links { gap: 2px; }
      nav a.nav-link { padding: 6px 8px; font-size: 0.82rem; }
    }

    /* ── ALERT ── */
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.88rem;
      margin-bottom: 20px;
    }
    .alert-success { background: #EDFAF3; color: #1A5C3A; border: 1px solid #A8DCBC; }
    .alert-error { background: #FDF2F2; color: #8B2020; border: 1px solid #F4BABA; }
    .alert-info { background: #EFF6FF; color: #1A3C7A; border: 1px solid #BFDBFE; }

    /* ── DIVIDER ── */
    .divider { border: none; border-top: 1px solid var(--border); margin: 16px 0; }

    /* ── TABLE ── */
    .mono { font-family: var(--mono); font-size: 0.82rem; }

    /* ── TOGGLE ── */
    .toggle-group { display: flex; border: 1.5px solid var(--border); border-radius: 8px; overflow: hidden; width: fit-content; }
    .toggle-btn {
      padding: 8px 20px;
      background: transparent;
      border: none;
      font-family: var(--sans);
      font-size: 0.88rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      color: var(--muted);
    }
    .toggle-btn.active { background: var(--ink); color: #fff; }

    /* ── SCROLL LIST ── */
    .scroll-list { max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; }
    .scroll-list::-webkit-scrollbar { width: 4px; }
    .scroll-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

    /* ── SPINNER ── */
    .spinner {
      width: 36px; height: 36px;
      border: 3px solid var(--border);
      border-top-color: var(--ink);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 48px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── STATUS DOT ── */
    .status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .dot-active { background: var(--success); }
    .dot-warn { background: var(--amber); }
    .dot-error { background: var(--error); }
    .dot-info { background: #3B82F6; }

    /* ── PAGE SECTIONS ── */
    .page-header { padding: 52px 0 36px; }
    .page-header .eyebrow { margin-bottom: 10px; }
    .page-header p { margin-top: 10px; font-size: 1rem; max-width: 620px; }

    /* ── TWO COL LAYOUT ── */
    .two-col { display: grid; grid-template-columns: 420px 1fr; gap: 32px; }
    .sticky-panel { position: sticky; top: 80px; align-self: start; }
    @media (max-width: 900px) {
      .two-col { grid-template-columns: 1fr; }
      .sticky-panel { position: static; }
    }

    /* ── PRODUCT / ORDER CARDS ── */
    .item-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px 20px;
    }
    .item-card + .item-card { margin-top: 10px; }
    .item-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
    .item-meta { display: flex; gap: 16px; font-family: var(--mono); font-size: 0.78rem; color: var(--muted); margin-top: 6px; }

    /* ── CART ── */
    .cart-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; }
    .qty-ctrl { display: flex; align-items: center; gap: 4px; }
    .qty-btn {
      width: 26px; height: 26px;
      border: 1.5px solid var(--border);
      border-radius: 6px;
      background: var(--white);
      cursor: pointer;
      font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.1s;
    }
    .qty-btn:hover { border-color: var(--ink); }
    .qty-val { min-width: 24px; text-align: center; font-weight: 600; font-size: 0.9rem; }

    /* ── SAVED ENTRIES ── */
    .saved-entry {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
    }
    .saved-entry + .saved-entry { margin-top: 10px; }
    .entry-row { display: flex; gap: 12px; }
    .entry-key { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); min-width: 130px; }
    .entry-val { font-size: 0.88rem; }

    /* empty state */
    .empty-state {
      text-align: center;
      padding: 48px 24px;
      border: 1.5px dashed var(--border);
      border-radius: var(--radius);
      color: var(--muted);
    }
  </style>
</head>
<body>

<!-- ═══════════════════════════ NAVIGATION ═══════════════════════════ -->
<nav>
  <a class="brand" href="#" onclick="navigate('home')">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E08A2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 8h14M5 8a2 2 0 1 0-4 0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8m-14 0V6a2 2 0 1 1 4 0v2"/>
    </svg>
    Manifest
  </a>
  <div class="nav-links">
    <a class="nav-link" onclick="navigate('signup')" href="#">Sign Up</a>
    <a class="nav-link" onclick="navigate('schema-demo')" href="#">Schema Demo</a>
    <a class="nav-link" onclick="navigate('products')" href="#">Products</a>
    <a class="nav-link" onclick="navigate('orders')" href="#">Orders</a>
  </div>
</nav>

<!-- ═══════════════════════════ HOME PAGE ═══════════════════════════ -->
<div id="page-home" class="page active">
  <div class="container">
    <div class="page-header">
      <div class="eyebrow"><span class="chip">MICROSERVICE CONSOLE</span></div>
      <h1>Two services,<br>one manifest.</h1>
      <p>A Product Service and an Order Service communicate over TCP to validate stock and assemble orders. The client renders forms straight from JSON — no hardcoded fields, no rebuilds for schema changes.</p>
    </div>
    <div class="grid-3" style="margin-bottom: 64px;">
      <a class="card card-hover" onclick="navigate('signup')" href="#">
        <div style="font-family:var(--mono);font-size:0.72rem;color:var(--amber-dark);letter-spacing:.05em;font-weight:600;margin-bottom:10px;">JSON-DRIVEN</div>
        <h3 style="margin-bottom:8px;">Signup Form</h3>
        <p style="font-size:0.88rem;">A form rendered entirely from a field-definition JSON array. Change a fieldType from TEXT to LIST or RADIO and the UI swaps instantly.</p>
        <div style="margin-top:16px;font-weight:600;font-size:0.88rem;color:var(--ink);display:flex;align-items:center;gap:4px;">Open →</div>
      </a>
      <a class="card card-hover" onclick="navigate('products')" href="#">
        <div style="font-family:var(--mono);font-size:0.72rem;color:var(--amber-dark);letter-spacing:.05em;font-weight:600;margin-bottom:10px;">PRODUCT SERVICE · :3001</div>
        <h3 style="margin-bottom:8px;">Products</h3>
        <p style="font-size:0.88rem;">Create, browse, and manage product inventory — the source of truth the Order Service queries over TCP to check and decrement stock.</p>
        <div style="margin-top:16px;font-weight:600;font-size:0.88rem;color:var(--ink);display:flex;align-items:center;gap:4px;">Open →</div>
      </a>
      <a class="card card-hover" onclick="navigate('orders')" href="#">
        <div style="font-family:var(--mono);font-size:0.72rem;color:var(--amber-dark);letter-spacing:.05em;font-weight:600;margin-bottom:10px;">ORDER SERVICE · :3002</div>
        <h3 style="margin-bottom:8px;">Orders</h3>
        <p style="font-size:0.88rem;">Place orders against live product stock. Each order snapshot captures product details at order time via inter-service communication.</p>
        <div style="margin-top:16px;font-weight:600;font-size:0.88rem;color:var(--ink);display:flex;align-items:center;gap:4px;">Open →</div>
      </a>
    </div>

    <!-- Architecture diagram -->
    <div class="card" style="margin-bottom:64px;">
      <h3 style="margin-bottom:20px;">Architecture Overview</h3>
      <div style="display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;">
        <div style="text-align:center;padding:16px 24px;background:var(--paper);border:1.5px solid var(--border);border-radius:var(--radius);">
          <div style="font-size:1.5rem;margin-bottom:4px;">🖥️</div>
          <div style="font-weight:600;font-size:0.88rem;">Next.js Client</div>
          <div style="font-family:var(--mono);font-size:0.72rem;color:var(--muted);">Port 3000</div>
        </div>
        <div style="padding:0 12px;color:var(--muted);font-size:1.2rem;">⟶ REST ⟶</div>
        <div style="text-align:center;padding:16px 24px;background:var(--paper);border:1.5px solid var(--border);border-radius:var(--radius);">
          <div style="font-size:1.5rem;margin-bottom:4px;">📦</div>
          <div style="font-weight:600;font-size:0.88rem;">Product Service</div>
          <div style="font-family:var(--mono);font-size:0.72rem;color:var(--muted);">Port 3001</div>
        </div>
        <div style="padding:0 12px;color:var(--muted);font-size:1.2rem;">⟵ TCP ⟶</div>
        <div style="text-align:center;padding:16px 24px;background:var(--paper);border:1.5px solid var(--border);border-radius:var(--radius);">
          <div style="font-size:1.5rem;margin-bottom:4px;">🧾</div>
          <div style="font-weight:600;font-size:0.88rem;">Order Service</div>
          <div style="font-family:var(--mono);font-size:0.72rem;color:var(--muted);">Port 3002</div>
        </div>
      </div>
      <p style="text-align:center;margin-top:16px;font-size:0.85rem;">Client talks REST to both services. Services talk to each other via NestJS TCP microservice transport.</p>
    </div>
  </div>
</div>

<!-- ═══════════════════════════ SIGNUP PAGE ═══════════════════════════ -->
<div id="page-signup" class="page">
  <div class="container">
    <div class="page-header">
      <div class="eyebrow"><span class="chip">JSON-DRIVEN FORM</span></div>
      <h2>Create your account</h2>
      <p>Every field — its label, type, required flag, placeholder, and options — comes from a JSON array. Change a <code>fieldType</code> from <code>LIST</code> to <code>RADIO</code> and the rendered component swaps. No other code changes.</p>
    </div>
    <div style="max-width:560px;">
      <div id="signup-success" class="alert alert-success" style="display:none;"></div>
      <div class="card" style="margin-bottom:32px;">
        <form id="signup-form" novalidate></form>
      </div>
      <div id="saved-signups-section" style="display:none;">
        <h3 style="margin-bottom:16px;" id="saved-count">Saved signups</h3>
        <div id="saved-signups-list"></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════ SCHEMA DEMO PAGE ═══════════════════════════ -->
<div id="page-schema-demo" class="page">
  <div class="container">
    <div class="page-header">
      <div class="eyebrow"><span class="chip">LIVE SCHEMA SWAP</span></div>
      <h2>Same field, different fieldType</h2>
      <p>Same label, same options, same required flag. Only <code>fieldType</code> in the JSON changes. The rendered control swaps with no other code change — this is requirement 4 from the assignment.</p>
    </div>
    <div style="max-width:480px;">
      <div style="margin-bottom:20px;">
        <div class="toggle-group" style="margin-bottom:8px;">
          <button class="toggle-btn active" id="toggle-list" onclick="setDemoType('LIST')">LIST (dropdown)</button>
          <button class="toggle-btn" id="toggle-radio" onclick="setDemoType('RADIO')">RADIO (buttons)</button>
          <button class="toggle-btn" id="toggle-text" onclick="setDemoType('TEXT')">TEXT (input)</button>
        </div>
        <div style="font-family:var(--mono);font-size:0.78rem;color:var(--muted);">
          Current JSON: <code id="demo-json-display">"fieldType": "LIST"</code>
        </div>
      </div>
      <div class="card">
        <div id="demo-field-container"></div>
        <hr class="divider" />
        <button class="btn btn-primary btn-full" onclick="submitDemo()">Submit Demo</button>
        <div id="demo-result" class="alert alert-success" style="display:none;margin-top:16px;"></div>
      </div>

      <div class="card" style="margin-top:24px;">
        <h3 style="margin-bottom:12px;">The JSON driving this field</h3>
        <pre style="background:var(--paper);padding:16px;border-radius:8px;font-family:var(--mono);font-size:0.8rem;line-height:1.6;overflow-x:auto;"><code id="demo-full-json">{
  "id": 6,
  "name": "Gender",
  "fieldType": "LIST",
  "defaultValue": "1",
  "required": true,
  "listOfValues1": ["Male", "Female", "Others"]
}</code></pre>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════ PRODUCTS PAGE ═══════════════════════════ -->
<div id="page-products" class="page">
  <div class="container">
    <div class="page-header">
      <div class="eyebrow"><span class="chip dark">PRODUCT SERVICE · PORT 3001</span></div>
      <h2>Products</h2>
      <p>Products here are what the Order Service validates stock against via TCP before creating an order.</p>
    </div>
    <div id="products-alert"></div>
    <div class="two-col">
      <div class="sticky-panel">
        <div class="card">
          <h3 style="margin-bottom:20px;">New Product</h3>
          <form id="product-form" novalidate>
            <div style="display:flex;flex-direction:column;gap:16px;">
              <div class="form-group">
                <label>Name <span class="req">*</span></label>
                <input type="text" id="p-name" placeholder="Wireless Headphones Pro" required />
                <span class="field-error" id="p-name-err"></span>
              </div>
              <div class="form-group">
                <label>Description <span class="req">*</span></label>
                <textarea id="p-desc" rows="2" placeholder="Brief product description…" required></textarea>
                <span class="field-error" id="p-desc-err"></span>
              </div>
              <div class="grid-2">
                <div class="form-group">
                  <label>Price (USD) <span class="req">*</span></label>
                  <input type="number" id="p-price" min="0" step="0.01" value="0" />
                </div>
                <div class="form-group">
                  <label>Stock <span class="req">*</span></label>
                  <input type="number" id="p-stock" min="0" value="0" />
                </div>
              </div>
              <div class="form-group">
                <label>SKU <span class="req">*</span></label>
                <input type="text" id="p-sku" placeholder="WHP-001-BLK" required />
                <span class="field-error" id="p-sku-err"></span>
              </div>
              <div class="form-group">
                <label>Category</label>
                <select id="p-category">
                  <option>ELECTRONICS</option><option>CLOTHING</option><option>FOOD</option>
                  <option>BOOKS</option><option>FURNITURE</option><option>SPORTS</option><option>OTHER</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary btn-full">+ Create Product</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 id="product-count">Inventory (0)</h3>
          <button class="btn btn-outline btn-sm" onclick="loadProducts()">↻ Refresh</button>
        </div>
        <div id="products-list"></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════ ORDERS PAGE ═══════════════════════════ -->
<div id="page-orders" class="page">
  <div class="container">
    <div class="page-header">
      <div class="eyebrow"><span class="chip dark">ORDER SERVICE · PORT 3002</span></div>
      <h2>Orders</h2>
      <p>Placing an order calls the Product Service over TCP to check and decrement stock before the order is recorded.</p>
    </div>
    <div id="orders-alert"></div>
    <div class="two-col">
      <div class="sticky-panel">
        <div class="card">
          <h3 style="margin-bottom:4px;">New Order</h3>
          <p style="font-size:0.82rem;margin-bottom:18px;">Pick products → fill details → place order.</p>

          <div style="font-weight:600;font-size:0.85rem;margin-bottom:8px;color:var(--muted);">1 · SELECT PRODUCTS</div>
          <div class="scroll-list" id="order-product-picker"></div>

          <div id="cart-section" style="display:none;">
            <hr class="divider" />
            <div style="font-weight:600;font-size:0.85rem;margin-bottom:8px;color:var(--muted);">CART</div>
            <div id="cart-lines"></div>
            <hr class="divider" />
            <div style="display:flex;justify-content:space-between;font-size:0.9rem;margin-bottom:16px;">
              <span style="color:var(--muted);">Subtotal</span>
              <strong id="cart-subtotal">$0.00</strong>
            </div>
          </div>

          <hr class="divider" />
          <div style="font-weight:600;font-size:0.85rem;margin-bottom:12px;color:var(--muted);">2 · CUSTOMER DETAILS</div>
          <form id="order-form" novalidate>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="form-group">
                <label>Full Name <span class="req">*</span></label>
                <input type="text" id="o-name" required placeholder="Syed Riyaz" />
              </div>
              <div class="form-group">
                <label>Email <span class="req">*</span></label>
                <input type="email" id="o-email" required placeholder="riyaz@example.com" />
              </div>
              <div class="form-group">
                <label>Payment Method</label>
                <select id="o-payment">
                  <option value="UPI">UPI</option>
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="DEBIT_CARD">Debit Card</option>
                  <option value="NET_BANKING">Net Banking</option>
                  <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                  <option value="WALLET">Wallet</option>
                </select>
              </div>
              <div class="form-group">
                <label>Address <span class="req">*</span></label>
                <input type="text" id="o-address" required placeholder="123 MG Road" />
              </div>
              <div class="grid-2">
                <div class="form-group">
                  <label>City <span class="req">*</span></label>
                  <input type="text" id="o-city" required placeholder="Bengaluru" />
                </div>
                <div class="form-group">
                  <label>State</label>
                  <input type="text" id="o-state" placeholder="Karnataka" />
                </div>
              </div>
              <div class="grid-2">
                <div class="form-group">
                  <label>Postal Code <span class="req">*</span></label>
                  <input type="text" id="o-postal" required placeholder="560001" />
                </div>
                <div class="form-group">
                  <label>Phone <span class="req">*</span></label>
                  <input type="text" id="o-phone" required placeholder="+91 98765 43210" />
                </div>
              </div>
              <button type="submit" class="btn btn-amber btn-full" id="place-order-btn">Place Order</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 id="order-count">Orders (0)</h3>
          <button class="btn btn-outline btn-sm" onclick="loadOrders()">↻ Refresh</button>
        </div>
        <div id="orders-list"></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════════════ -->
<script>
// ── CONFIG ──────────────────────────────────────────────────────────
const PRODUCT_API = 'http://localhost:3001';
const ORDER_API   = 'http://localhost:3002';

// ── ROUTING ─────────────────────────────────────────────────────────
const PAGES = ['home','signup','schema-demo','products','orders'];
function navigate(page) {
  PAGES.forEach(p => {
    document.getElementById('page-' + p).classList.toggle('active', p === page);
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.textContent.toLowerCase().includes(page));
  });
  window.scrollTo(0, 0);
  if (page === 'signup')      initSignup();
  if (page === 'schema-demo') initDemo();
  if (page === 'products')    loadProducts();
  if (page === 'orders')      initOrders();
}

// ── LOCAL STORAGE HELPERS ────────────────────────────────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ── UUID ──────────────────────────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function fmtDate(d) { return new Date(d).toLocaleString(); }
function fmtMoney(n) { return '$' + Number(n).toFixed(2); }

// ════════════════════════════════════════════════════════════════════
// SIGNUP — JSON-DRIVEN FORM
// ════════════════════════════════════════════════════════════════════
const SIGNUP_SCHEMA = [
  { id: 1, name: 'Full Name',   fieldType: 'TEXT',  minLength: 1, maxLength: 100, defaultValue: 'John Doe',       required: true,  placeholder: 'Enter your full name' },
  { id: 2, name: 'Email',       fieldType: 'TEXT',  minLength: 1, maxLength: 50,  defaultValue: 'hello@mail.com', required: true,  placeholder: 'you@example.com' },
  { id: 6, name: 'Gender',      fieldType: 'LIST',  defaultValue: '1',            required: true,  listOfValues1: ['Male','Female','Others'] },
  { id: 7, name: 'Love React?', fieldType: 'RADIO', defaultValue: '1',            required: true,  listOfValues1: ['Yes','No'] },
];

function toKey(name) {
  return name.replace(/[^a-zA-Z0-9 ]/g,'').trim().split(/\s+/)
    .map((w,i) => i===0 ? w[0].toLowerCase()+w.slice(1) : w[0].toUpperCase()+w.slice(1).toLowerCase()).join('');
}

function getDefaultValue(field) {
  if ((field.fieldType==='LIST'||field.fieldType==='RADIO') && field.listOfValues1) {
    const idx = parseInt(field.defaultValue||'1',10)-1;
    return field.listOfValues1[idx] || '';
  }
  return field.defaultValue || '';
}

function renderFormField(field) {
  const key = toKey(field.name);
  const def = getDefaultValue(field);
  const req = field.required ? '<span class="req">*</span>' : '';
  let input = '';

  if (field.fieldType === 'LIST') {
    const opts = (field.listOfValues1||[]).map(o =>
      `<option value="${o}" ${o===def?'selected':''}>${o}</option>`).join('');
    input = `<select id="sf-${key}"><option value="">Select ${field.name}</option>${opts}</select>`;
  } else if (field.fieldType === 'RADIO') {
    const radios = (field.listOfValues1||[]).map(o =>
      `<label class="radio-label"><input type="radio" name="sf-${key}" value="${o}" ${o===def?'checked':''}> ${o}</label>`).join('');
    input = `<div class="radio-group">${radios}</div>`;
  } else {
    input = `<input type="text" id="sf-${key}" value="${def}" placeholder="${field.placeholder||''}" maxlength="${field.maxLength||''}" />`;
  }
  return `<div class="form-group" style="margin-bottom:20px;">
    <label for="sf-${key}">${field.name} ${req}</label>
    ${input}
    <span class="field-error" id="sf-${key}-err"></span>
  </div>`;
}

function getFieldValue(field) {
  const key = toKey(field.name);
  if (field.fieldType === 'RADIO') {
    const el = document.querySelector(`input[name="sf-${key}"]:checked`);
    return el ? el.value : '';
  }
  const el = document.getElementById('sf-' + key);
  return el ? el.value.trim() : '';
}

function validateSignup() {
  let ok = true;
  SIGNUP_SCHEMA.forEach(field => {
    const key = toKey(field.name);
    const val = getFieldValue(field);
    const errEl = document.getElementById('sf-' + key + '-err');
    if (errEl) errEl.textContent = '';
    if (field.required && !val) {
      if (errEl) errEl.textContent = field.name + ' is required';
      ok = false;
    } else if (field.fieldType === 'TEXT' && val && field.name.toLowerCase().includes('email')) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        if (errEl) errEl.textContent = 'Enter a valid email address';
        ok = false;
      }
    }
  });
  return ok;
}

function initSignup() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.innerHTML = SIGNUP_SCHEMA.map(renderFormField).join('') +
    `<div style="display:flex;gap:12px;margin-top:8px;">
       <button type="submit" class="btn btn-primary" style="flex:1;">Create Account</button>
       <button type="button" class="btn btn-outline" onclick="resetSignup()">Reset</button>
     </div>`;
  form.onsubmit = e => { e.preventDefault(); submitSignup(); };
  renderSavedSignups();
}

function resetSignup() {
  SIGNUP_SCHEMA.forEach(field => {
    const key = toKey(field.name);
    const def = getDefaultValue(field);
    if (field.fieldType === 'RADIO') {
      const el = document.querySelector(`input[name="sf-${key}"][value="${def}"]`);
      if (el) el.checked = true;
    } else {
      const el = document.getElementById('sf-'+key);
      if (el) el.value = def;
    }
  });
}

function submitSignup() {
  if (!validateSignup()) return;
  const values = {};
  SIGNUP_SCHEMA.forEach(f => { values[toKey(f.name)] = getFieldValue(f); });
  const records = lsGet('manifest:signups', []);
  records.unshift({ id: uuid(), values, createdAt: new Date().toISOString() });
  lsSet('manifest:signups', records);
  const msg = document.getElementById('signup-success');
  msg.textContent = '✓ Account created and saved locally.';
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3500);
  renderSavedSignups();
}

function renderSavedSignups() {
  const records = lsGet('manifest:signups', []);
  const section = document.getElementById('saved-signups-section');
  const list = document.getElementById('saved-signups-list');
  const count = document.getElementById('saved-count');
  if (!records.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  count.textContent = `Saved signups (${records.length})`;
  list.innerHTML = records.map(r => `
    <div class="saved-entry">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>${Object.entries(r.values).map(([k,v]) =>
          `<div class="entry-row"><span class="entry-key">${k}</span><span class="entry-val">${v||'—'}</span></div>`).join('')}
          <div style="font-size:0.75rem;color:var(--muted);margin-top:8px;">${fmtDate(r.createdAt)}</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteSignup('${r.id}')">✕</button>
      </div>
    </div>
  `).join('');
}

function deleteSignup(id) {
  const records = lsGet('manifest:signups', []).filter(r => r.id !== id);
  lsSet('manifest:signups', records);
  renderSavedSignups();
}

// ════════════════════════════════════════════════════════════════════
// SCHEMA DEMO
// ════════════════════════════════════════════════════════════════════
let demoType = 'LIST';
const DEMO_FIELD = { id: 6, name: 'Gender', required: true, defaultValue: '1', listOfValues1: ['Male','Female','Others'] };

function initDemo() { renderDemoField(); }

function setDemoType(type) {
  demoType = type;
  ['LIST','RADIO','TEXT'].forEach(t => {
    document.getElementById('toggle-'+t.toLowerCase()).classList.toggle('active', t===type);
  });
  document.getElementById('demo-json-display').textContent = `"fieldType": "${type}"`;
  document.getElementById('demo-full-json').textContent = JSON.stringify({
    ...DEMO_FIELD, fieldType: type
  }, null, 2);
  document.getElementById('demo-result').style.display = 'none';
  renderDemoField();
}

function renderDemoField() {
  const container = document.getElementById('demo-field-container');
  if (!container) return;
  container.innerHTML = renderFormField({ ...DEMO_FIELD, fieldType: demoType });
}

function submitDemo() {
  const val = getFieldValue({ ...DEMO_FIELD, fieldType: demoType });
  const res = document.getElementById('demo-result');
  if (!val) { res.className='alert alert-error'; res.textContent='Gender is required.'; res.style.display='block'; return; }
  res.className='alert alert-success'; res.textContent=`✓ Submitted: "${val}" via fieldType="${demoType}"`; res.style.display='block';
}

// ════════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════════
// In-memory local products store (mirrors what the NestJS service would store)
let localProducts = lsGet('manifest:products', [
  { id: uuid(), name: 'Wireless Headphones Pro', description: 'Premium noise-cancelling wireless headphones with 30h battery life', price: 299.99, stock: 150, sku: 'WHP-001-BLK', category: 'ELECTRONICS', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: uuid(), name: 'Running Shoes Ultra',     description: 'Lightweight running shoes with advanced cushioning technology',    price: 129.99, stock: 200, sku: 'RSU-002-WHT', category: 'SPORTS',      status: 'ACTIVE', createdAt: new Date().toISOString() },
]);
lsSet('manifest:products', localProducts);

function loadProducts() {
  renderProducts();
  // Also try live API
  fetch(PRODUCT_API + '/products').then(r => r.json()).then(res => {
    if (res.data && res.data.length) { localProducts = res.data; renderProducts(); }
  }).catch(() => {});
}

function renderProducts() {
  const list = document.getElementById('products-list');
  const count = document.getElementById('product-count');
  if (!list) return;
  count.textContent = `Inventory (${localProducts.length})`;
  if (!localProducts.length) {
    list.innerHTML = '<div class="empty-state">No products yet. Create one to get started.</div>';
    return;
  }
  list.innerHTML = localProducts.map(p => `
    <div class="item-card">
      <div class="item-row">
        <div style="flex:1;">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
            <strong>${p.name}</strong>
            <span class="chip ${p.status==='ACTIVE'?'success':'warning'}" style="font-size:0.68rem;padding:2px 7px;">${p.status}</span>
          </div>
          <p style="font-size:0.85rem;margin-bottom:6px;">${p.description}</p>
          <div class="item-meta">
            <span>SKU: ${p.sku}</span>
            <span>Stock: ${p.stock}</span>
            <span>${fmtMoney(p.price)}</span>
            <span>${p.category}</span>
          </div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

function showProductAlert(msg, type='success') {
  const el = document.getElementById('products-alert');
  el.className = 'alert alert-' + type;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  const pf = document.getElementById('product-form');
  if (pf) pf.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('p-name').value.trim();
    const desc = document.getElementById('p-desc').value.trim();
    const sku  = document.getElementById('p-sku').value.trim();
    if (!name) { document.getElementById('p-name-err').textContent='Name is required'; return; }
    if (!desc) { document.getElementById('p-desc-err').textContent='Description is required'; return; }
    if (!sku)  { document.getElementById('p-sku-err').textContent='SKU is required'; return; }
    document.getElementById('p-name-err').textContent='';
    document.getElementById('p-desc-err').textContent='';
    document.getElementById('p-sku-err').textContent='';

    if (localProducts.find(p => p.sku === sku)) {
      showProductAlert('A product with this SKU already exists.', 'error'); return;
    }

    const payload = {
      id: uuid(), name, description: desc,
      price: parseFloat(document.getElementById('p-price').value)||0,
      stock: parseInt(document.getElementById('p-stock').value)||0,
      sku, category: document.getElementById('p-category').value,
      status: 'ACTIVE', createdAt: new Date().toISOString()
    };

    // Try live API first, fallback to local
    try {
      const res = await fetch(PRODUCT_API + '/products', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.data) { localProducts.unshift(data.data); }
      else { localProducts.unshift(payload); }
    } catch {
      localProducts.unshift(payload);
    }
    lsSet('manifest:products', localProducts);
    pf.reset();
    document.getElementById('p-price').value='0';
    document.getElementById('p-stock').value='0';
    document.getElementById('p-category').value='ELECTRONICS';
    renderProducts();
    showProductAlert('Product created successfully.');
  });
});

function deleteProduct(id) {
  localProducts = localProducts.filter(p => p.id !== id);
  lsSet('manifest:products', localProducts);
  fetch(PRODUCT_API+'/products/'+id, {method:'DELETE'}).catch(()=>{});
  renderProducts();
}

// ════════════════════════════════════════════════════════════════════
// ORDERS
// ════════════════════════════════════════════════════════════════════
let cart = []; // { productId, quantity }
let localOrders = lsGet('manifest:orders', []);
let orderSeq = lsGet('manifest:orderSeq', 1);

function initOrders() {
  loadOrders();
  renderOrderPicker();
  renderCart();
}

function loadOrders() {
  renderOrders();
  fetch(ORDER_API + '/orders').then(r => r.json()).then(res => {
    if (res.data && res.data.length) { localOrders = res.data; renderOrders(); }
  }).catch(() => {});
}

function renderOrderPicker() {
  const picker = document.getElementById('order-product-picker');
  if (!picker) return;
  if (!localProducts.length) {
    picker.innerHTML = '<p style="font-size:0.82rem;color:var(--muted);">No products available. Create some first.</p>';
    return;
  }
  picker.innerHTML = localProducts.map(p => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid var(--border);border-radius:8px;background:var(--paper);">
      <div>
        <div style="font-weight:600;font-size:0.85rem;">${p.name}</div>
        <div style="font-size:0.75rem;color:var(--muted);">${fmtMoney(p.price)} · ${p.stock} in stock</div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="addToCart('${p.id}')" ${p.stock===0?'disabled':''}>Add</button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const existing = cart.find(c => c.productId === productId);
  if (existing) existing.quantity++;
  else cart.push({ productId, quantity: 1 });
  renderCart();
}

function updateCartQty(productId, delta) {
  const item = cart.find(c => c.productId === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(c => c.productId !== productId);
  renderCart();
}

function renderCart() {
  const section = document.getElementById('cart-section');
  const lines   = document.getElementById('cart-lines');
  const subtotal = document.getElementById('cart-subtotal');
  if (!section || !lines) return;
  if (!cart.length) { section.style.display='none'; return; }
  section.style.display='block';
  let total = 0;
  lines.innerHTML = cart.map(c => {
    const p = localProducts.find(x => x.id === c.productId);
    if (!p) return '';
    total += p.price * c.quantity;
    return `<div class="cart-row">
      <span style="font-size:0.88rem;">${p.name}</span>
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="updateCartQty('${p.id}',-1)">−</button>
        <span class="qty-val">${c.quantity}</span>
        <button class="qty-btn" onclick="updateCartQty('${p.id}',1)">+</button>
        <button class="qty-btn" style="color:var(--error);" onclick="updateCartQty('${p.id}',-999)">✕</button>
      </div>
    </div>`;
  }).join('');
  subtotal.textContent = fmtMoney(total);
}

function showOrderAlert(msg, type='success') {
  const el = document.getElementById('orders-alert');
  el.className = 'alert alert-'+type;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display='none', 4000);
}

const STATUS_COLORS = {
  PENDING:'warning', CONFIRMED:'info', PROCESSING:'info', SHIPPED:'dark',
  DELIVERED:'success', CANCELLED:'error', REFUNDED:'dark'
};

function renderOrders() {
  const list  = document.getElementById('orders-list');
  const count = document.getElementById('order-count');
  if (!list) return;
  count.textContent = `Orders (${localOrders.length})`;
  if (!localOrders.length) {
    list.innerHTML='<div class="empty-state">No orders yet. Create one to get started.</div>';
    return;
  }
  list.innerHTML = [...localOrders].reverse().map(o => {
    const statusCol = STATUS_COLORS[o.status] || 'dark';
    const items = (o.items||[]).map(it =>
      `<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:3px 0;">
         <span>${it.productName} × ${it.quantity}</span>
         <span class="mono">${fmtMoney(it.totalPrice)}</span>
       </div>`).join('');
    return `<div class="item-card" style="margin-bottom:10px;">
      <div class="item-row" style="margin-bottom:10px;">
        <div>
          <div class="mono" style="font-weight:600;">${o.orderNumber}</div>
          <div style="font-size:0.78rem;color:var(--muted);">${o.customerName} · ${fmtDate(o.createdAt)}</div>
        </div>
        <span class="chip ${statusCol}" style="font-size:0.7rem;">${o.status}</span>
      </div>
      ${items}
      <hr class="divider" />
      <div style="display:flex;justify-content:space-between;font-size:0.88rem;">
        <span style="color:var(--muted);">Total (incl. 18% GST + shipping)</span>
        <strong>${fmtMoney(o.totalAmount)}</strong>
      </div>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const of_ = document.getElementById('order-form');
  if (!of_) return;
  of_.addEventListener('submit', async e => {
    e.preventDefault();
    if (!cart.length) { showOrderAlert('Add at least one product to your cart.','error'); return; }
    const name   = document.getElementById('o-name').value.trim();
    const email  = document.getElementById('o-email').value.trim();
    const address= document.getElementById('o-address').value.trim();
    const city   = document.getElementById('o-city').value.trim();
    const postal = document.getElementById('o-postal').value.trim();
    const phone  = document.getElementById('o-phone').value.trim();
    if (!name||!email||!address||!city||!postal||!phone) {
      showOrderAlert('Please fill in all required fields.','error'); return;
    }

    // Build order items from cart + local products
    const items = cart.map(c => {
      const p = localProducts.find(x => x.id === c.productId);
      return { productId: p.id, productName: p.name, productSku: p.sku,
               quantity: c.quantity, unitPrice: p.price, totalPrice: +(p.price*c.quantity).toFixed(2) };
    });
    const subtotal = items.reduce((s,i) => s+i.totalPrice, 0);
    const tax = +(subtotal*0.18).toFixed(2);
    const shipping = 50;
    const total = +(subtotal + tax + shipping).toFixed(2);

    const pad = n => String(n).padStart(4,'0');
    const d = new Date();
    const orderNum = `ORD-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${pad(orderSeq++)}`;
    lsSet('manifest:orderSeq', orderSeq);

    const order = {
      id: uuid(), orderNumber: orderNum,
      customerId: 'cust-'+email.split('@')[0], customerName: name, customerEmail: email,
      items, subtotal: +subtotal.toFixed(2), taxAmount: tax, shippingCost: shipping, totalAmount: total,
      discountTotal: 0, status: 'PENDING', paymentMethod: document.getElementById('o-payment').value,
      paymentStatus: 'PENDING',
      shippingAddress: { fullName: name, addressLine1: address, city, state: document.getElementById('o-state').value||'', postalCode: postal, country: 'India', phone },
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };

    // Decrement local stock
    cart.forEach(c => {
      const p = localProducts.find(x => x.id === c.productId);
      if (p) p.stock = Math.max(0, p.stock - c.quantity);
    });
    lsSet('manifest:products', localProducts);

    // Try live API
    const apiPayload = {
      customerId: order.customerId, customerName: name, customerEmail: email,
      items: cart.map(c => ({ productId: c.productId, quantity: c.quantity })),
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress
    };
    try {
      const res = await fetch(ORDER_API+'/orders', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(apiPayload) });
      const data = await res.json();
      if (data.data) { localOrders.push(data.data); }
      else { localOrders.push(order); }
    } catch {
      localOrders.push(order);
    }
    lsSet('manifest:orders', localOrders);
    cart = [];
    renderCart();
    document.getElementById('cart-section').style.display='none';
    of_.reset();
    renderOrders();
    renderOrderPicker();
    showOrderAlert(`✓ Order ${orderNum} placed — stock updated in Product Service.`);
  });
});

// ── INIT ──────────────────────────────────────────────────────────────
navigate('home');
</script>
</body>
</html>
