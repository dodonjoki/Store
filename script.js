// =========================
// 🎣 Data Produk Fish It
// =========================
const produkData = [
  { nama: "Astral Rod", harga: 15000, gambar: "https://i.ibb.co/3rKp0G6/fishit1.png", deskripsi: "Pancing langka untuk mancing dewa 🎣" },
  { nama: "Ares Rod", harga: 20000, gambar: "https://i.ibb.co/z72gWrp/fishit2.png", deskripsi: "Senjata para pemancing profesional 💪" },
  { nama: "Angler Rod", harga: 25000, gambar: "https://cdn-offer-photos.zeusx.com/e1505222-1ca0-4180-80ff-37aeb1bda6c8.jpg", deskripsi: "Rod cepat & ringan untuk AFK mancing 🎯" },
  { nama: "Ghostfind Rod", harga: 30000, gambar: "https://i.ebayimg.com/images/g/sEQAAeSwfNxo23oh/s-l400.png", deskripsi: "Rod hantu yang bisa dapet rare item 👻" },
  { nama: "1M Coin", harga: 15000, gambar: "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/183/2025/10/14/Screenshot_2339-1269319107.jpg", deskripsi: "Tambah 1 juta coin instan 💰" },
  { nama: "AFK 24 Jam", harga: 10000, gambar: "https://cdn-icons-png.flaticon.com/512/2920/2920341.png", deskripsi: "Auto mancing 24 jam tanpa gangguan 💤" }
];

// =========================
// 🎨 Render Produk
// =========================
const produkList = document.getElementById("produkList");
function renderProduk() {
  produkList.innerHTML = "";
  produkData.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produk-card";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp${p.harga.toLocaleString()}</strong></p>
      <button onclick="tambahKeranjang(${i})">Tambah</button>
    `;
    produkList.appendChild(card);
  });
}
renderProduk();

// =========================
// 🛒 Keranjang
// =========================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
function tambahKeranjang(index) {
  playClick();
  const produk = produkData[index];
  const ada = cart.find(item => item.nama === produk.nama);
  if (ada) ada.jumlah++;
  else cart.push({ ...produk, jumlah: 1 });
  simpanCart(); renderCart();
}
function simpanCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.harga * item.jumlah;
    const li = document.createElement("li");
    li.innerHTML = `${item.nama} x${item.jumlah} - Rp${(item.harga * item.jumlah).toLocaleString()}
    <button onclick="hapusItem(${i})">X</button>`;
    cartList.appendChild(li);
  });
  document.getElementById("totalHarga").innerText = `Rp${total.toLocaleString()}`;
}
renderCart();
function hapusItem(i){ playClick(); cart.splice(i,1); simpanCart(); renderCart(); }
function checkout(){
  playClick();
  if(cart.length===0) return alert("Keranjang masih kosong!");
  let pesan="Halo, saya mau order di Dafzx Store:\n\n";
  cart.forEach(item=>{pesan+=`• ${item.nama} x${item.jumlah} = Rp${(item.harga*item.jumlah).toLocaleString()}\n`;});
  const total=document.getElementById("totalHarga").innerText;
  pesan+=`\nTotal: ${total}\n\nTerima kasih!`;
  window.open(`https://wa.me/6281266435034?text=${encodeURIComponent(pesan)}`);
}

// =========================
// ⭐ Review
// =========================
function kirimReview(e){
  e.preventDefault(); playClick();
  const nama=document.getElementById("reviewNama").value.trim();
  const teks=document.getElementById("reviewText").value.trim();
  if(!nama||!teks)return alert("Isi semua kolom!");
  const review={nama,teks};
  const reviews=JSON.parse(localStorage.getItem("reviews")||"[]");
  reviews.push(review); localStorage.setItem("reviews",JSON.stringify(reviews));
  renderReview(); e.target.reset();
}
function renderReview(){
  const reviewList=document.getElementById("reviewList");
  const reviews=JSON.parse(localStorage.getItem("reviews")||"[]");
  reviewList.innerHTML="";
  reviews.forEach(r=>{
    const div=document.createElement("div");
    div.className="review-item";
    div.innerHTML=`<strong>${r.nama}</strong><br>${r.teks}`;
    reviewList.appendChild(div);
  });
}
renderReview();

// =========================
// 🔐 Admin
// =========================
function bukaAdmin(){
  const pass=prompt("Masukkan password admin:");
  if(pass==="DafzxJoki"){
    document.getElementById("adminPanel").style.display="flex";
    renderAdminMenu();
  } else alert("Password salah!");
}
function tutupAdmin(){document.getElementById("adminPanel").style.display="none";}
function renderAdminMenu(){
  const adminMenu=document.getElementById("adminMenu");
  adminMenu.innerHTML=`
    <button onclick="lihatStatistik()">📊 Statistik</button>
    <button onclick="hapusData()">🗑️ Hapus Data</button>
    <button onclick="tutupAdmin()">Tutup</button>`;
}
function lihatStatistik(){
  const reviews=JSON.parse(localStorage.getItem("reviews")||"[]");
  alert(`📊 Review: ${reviews.length}\nItem di Keranjang: ${cart.length}`);
}
function hapusData(){
  if(confirm("Yakin hapus semua data?")){
    localStorage.clear(); cart=[]; renderCart(); renderReview();
  }
}

// =========================
// 🌊 Bubble Background
// =========================
const canvas=document.getElementById("bubble-bg");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth; canvas.height=innerHeight;
const bubbles=Array.from({length:25},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*6+2,
  s:Math.random()*1+0.3
}));
function drawBubbles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(0,255,150,0.2)";
  bubbles.forEach(b=>{
    ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
    b.y-=b.s; if(b.y<0){b.y=canvas.height;b.x=Math.random()*canvas.width;}
  });
  requestAnimationFrame(drawBubbles);
}
drawBubbles();

// =========================
// 🧑‍💻 VTuber Hijau
// =========================
const vtuber=document.createElement("img");
vtuber.src="https://i.ibb.co/XxMbsFt/green-vtuber.png";
vtuber.alt="Dafzx VTuber";
vtuber.style.position="fixed";
vtuber.style.bottom="10px";
vtuber.style.right="20px";
vtuber.style.width="130px";
vtuber.style.animation="floaty 3s ease-in-out infinite";
document.getElementById("vtuberContainer").appendChild(vtuber);

const style=document.createElement("style");
style.textContent=`@keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}`;
document.head.appendChild(style);

// =========================
// 🎵 Click Sound
// =========================
const clickSound=document.getElementById("clickSound");
function playClick(){clickSound.currentTime=0; clickSound.play();}
