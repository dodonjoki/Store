<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dafzx Joki & Store v100 PROMAX – Fish It Edition</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap">
  <style>
    /* ===== 🌊 Tema Hijau-Black Neon Glass ===== */
    *{margin:0;padding:0;box-sizing:border-box;font-family:"Poppins",sans-serif;}
    body{
      background:radial-gradient(circle at top,#001a0a,#000);
      color:#fff;overflow-x:hidden;min-height:100vh;
    }

    /* Background animasi */
    .bg-anim{
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:linear-gradient(120deg,#00330044,#00ff8844,#00110044);
      background-size:400% 400%;
      animation:bgMove 12s ease infinite;
      z-index:-2;
    }
    @keyframes bgMove{
      0%{background-position:0% 50%;}
      50%{background-position:100% 50%;}
      100%{background-position:0% 50%;}
    }

    header{
      text-align:center;padding:40px 20px;
      background:rgba(0,40,0,0.4);
      border-bottom:2px solid #00ff88;
      box-shadow:0 0 25px #00ff88;
    }
    header h1{
      font-size:2.5em;font-weight:700;
      color:#00ff88;text-shadow:0 0 15px #00ffcc;
    }

    .promo-bar{
      background:#003d26;color:#00ffcc;text-align:center;
      padding:10px;font-weight:600;letter-spacing:1px;
      border-bottom:2px solid #00ff88;
    }

    main{padding:40px 20px;}

    /* Produk grid */
    #produkList{
      display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:20px;max-width:1000px;margin:0 auto;
    }
    .produk-card{
      background:rgba(0,30,0,0.6);
      border:1px solid #00ff88;
      border-radius:15px;
      padding:15px;text-align:center;
      box-shadow:0 0 15px #00ff88;
      transition:0.3s;
    }
    .produk-card:hover{transform:translateY(-5px);box-shadow:0 0 25px #00ffaa;}
    .produk-card img{
      width:100%;height:150px;object-fit:cover;
      border-radius:10px;margin-bottom:10px;
    }
    .produk-card h3{color:#00ffaa;margin-bottom:6px;}
    .produk-card button{
      background:#00ff88;border:none;color:#000;
      font-weight:700;padding:8px 15px;border-radius:8px;
      cursor:pointer;transition:0.3s;
    }
    .produk-card button:hover{background:#55ffbb;}

    /* Keranjang */
    .cart-section{margin-top:60px;text-align:center;}
    ul#cartList{list-style:none;padding:0;margin:20px auto;max-width:400px;text-align:left;}
    #totalHarga{font-weight:bold;color:#00ffaa;}

    /* Review */
    .review-section{margin-top:60px;text-align:center;}
    .review-section form{
      background:rgba(0,30,0,0.6);
      max-width:400px;margin:0 auto 20px;padding:20px;
      border-radius:10px;box-shadow:0 0 15px #00ff88;
    }
    textarea,input{width:100%;padding:8px;border:none;border-radius:5px;margin:5px 0;background:#001a0a;color:#fff;}
    .review-item{border-bottom:1px solid #00ff88;padding:8px 0;color:#ccffdd;text-align:left;}

    footer{
      background:#001a0a;padding:15px;text-align:center;
      font-size:0.9em;border-top:2px solid #00ff88;margin-top:40px;
    }

    /* Admin & karakter */
    .admin-btn{
      position:fixed;bottom:20px;right:20px;
      background:#00ff88;color:#000;border:none;
      padding:12px 20px;border-radius:50px;
      font-weight:700;cursor:pointer;
      box-shadow:0 0 20px #00ff88;
    }

    #adminPanel{
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.7);
      display:none;align-items:center;justify-content:center;z-index:99;
    }
    .admin-content{
      background:rgba(0,30,0,0.9);
      border:1px solid #00ff88;
      border-radius:15px;padding:20px;max-width:500px;width:90%;
      color:#ccffdd;box-shadow:0 0 25px #00ff88;
    }

    /* Karakter Vtuber 2D */
    .character{
      position:fixed;bottom:0;right:0;width:180px;height:180px;
      background:url('https://i.ibb.co/dGqHtRp/green-anime.png') center/contain no-repeat;
      animation:charFloat 4s ease-in-out infinite;
      pointer-events:none;opacity:0.95;
      z-index:10;
    }
    @keyframes charFloat{
      0%,100%{transform:translateY(0);}
      50%{transform:translateY(-10px);}
    }
  </style>
</head>

<body>
  <div class="bg-anim"></div>

  <header>
    <h1>🎣 JOKI DAFZX STORE v100 PROMAX</h1>
    <p>Fish It Edition – Glass Neon Theme</p>
  </header>

  <div class="promo-bar" id="promoText">🔥 Diskon 10% pakai kode DAFZX2025!</div>

  <main>
    <section id="produkSection">
      <h2 style="text-align:center;color:#00ffaa;margin-bottom:20px;">🛒 Daftar Produk Fish It</h2>
      <div id="produkList"></div>
    </section>

    <section class="cart-section">
      <h2>🧺 Keranjang</h2>
      <ul id="cartList"></ul>
      <p>Total: <span id="totalHarga">Rp0</span></p>
      <button onclick="checkout()">Checkout via WhatsApp</button>
    </section>

    <section class="review-section">
      <h2>⭐ Review Pelanggan</h2>
      <form id="reviewForm" onsubmit="kirimReview(event)">
        <input id="reviewNama" placeholder="Nama kamu">
        <textarea id="reviewText" placeholder="Tulis review kamu..."></textarea>
        <button type="submit">Kirim Review</button>
      </form>
      <div id="reviewList"></div>
    </section>
  </main>

  <footer>© 2025 Dafzx Joki & Store – All Rights Reserved</footer>

  <button class="admin-btn" onclick="bukaAdmin()">👑 Admin</button>

  <div id="adminPanel">
    <div class="admin-content">
      <h2>Panel Admin</h2>
      <div id="adminMenu"></div>
    </div>
  </div>

  <div class="character"></div>

  <script src="script.js"></script>
</body>
</html>
