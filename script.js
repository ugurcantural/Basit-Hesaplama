/* Double Click ile siler */
let sepetDolar = 0;
let sepetLira = 0;
let pop;

/* MAP */
let id = 0;
const urunler = new Map();

/* Pop-Up */
window.addEventListener("load", function () {
  pop = prompt("Lütfen kur oranını giriniz: ", 18);
  if (pop < 0) {
    alert("Negatif değer alamaz!");
    location.reload();
  } else if (pop == null || pop == "") {
    pop = 18;
  }
});

const urunListe = document.querySelector(".list-group");
const urunToplam = document.querySelector(".card-footer");

const btnKaydet = document.querySelector("#btnKaydet");
const inputText = document.querySelector("#inputText");
const inputFiyat = document.querySelector("#inputFiyat");

/* Txt Enter Click */
inputText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnKaydet.click();
  }
});

btnKaydet.addEventListener("click", function () {
  if (inputText.value === "") {
    alert("Ürün adı boş bırakılamaz!");
  } else {
    id += 1;
    let htmlUrun = `<li ondblclick="urunSil(${id})" id="${id}" class="list-group-item">
                    ${inputText.value} ${inputFiyat.value} $
                    </li>`;
    urunListe.insertAdjacentHTML("beforeend", htmlUrun);
    /* Map eleman ekleme */
    urunler.set(id, parseInt(inputFiyat.value));
    sepetDolar += inputFiyat.value * 1;
    sepetLira += inputFiyat.value * pop;
    displayFooter();
  }
});

function displayFooter() {
  let htmlToplam = `<li class="list-group-item">Toplam: ${sepetDolar.toFixed(2)} $</li>
                    <li class="list-group-item">Toplam: ${sepetLira.toFixed(2)} ₺</li>`;
  urunToplam.innerHTML = htmlToplam;
}

function urunSil (id){
    let fiyatSil = urunler.get(id);
    sepetDolar -= fiyatSil * 1;
    sepetLira -= fiyatSil * pop;
    displayFooter();
    urunler.delete(id);
    document.getElementById(id).remove();
};