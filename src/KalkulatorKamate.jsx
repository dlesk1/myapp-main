import { createSignal } from "solid-js";
import "./KalkulatorKamate.css";

export default KalkulatorKamate;

function KalkulatorKamate() {
  const [kapital, setKapital] = createSignal(0);
  const [kamatnaStopa, setKamatnaStopa] = createSignal(0);
  const [godine, setGodine] = createSignal(0);
  const [jednostavnaKamata, setJednostavnaKamata] = createSignal(0);
  const [slozenaKamata, setSlozenaKamata] = createSignal(0);
  const [brojObracuna, setBrojObracuna] = createSignal(1);
  const [errorMessage, setErrorMessage] = createSignal("");

  // Funkcija za validaciju unosa
  const validateInputs = () => {
    const P = parseFloat(kapital());
    const r = parseFloat(kamatnaStopa());
    const t = parseFloat(godine());
    const n = parseFloat(brojObracuna());

    if (isNaN(P) || P <= 0) {
      setErrorMessage("Početni kapital mora biti pozitivan broj.");
      return false;
    }
    if (isNaN(r) || r <= 0) {
      setErrorMessage("Kamatna stopa mora biti pozitivan broj.");
      return false;
    }
    if (isNaN(t) || t <= 0) {
      setErrorMessage("Vremenski period mora biti pozitivan broj.");
      return false;
    }
    if (isNaN(n) || n <= 0) {
      setErrorMessage("Broj obračuna mora biti pozitivan broj.");
      return false;
    }

    setErrorMessage(""); // Ako su svi unosi ispravni, nema greške
    return true;
  };

  // Funkcija za izračun jednostavne kamate
  const izracunajJednostavnuKamatu = () => {
    if (!validateInputs()) return;
    const P = parseFloat(kapital());
    const r = parseFloat(kamatnaStopa()) / 100;
    const t = parseFloat(godine());

    const kamata = P * r * t;
    setJednostavnaKamata(kamata.toFixed(2));
  };

  // Funkcija za izračun složene kamate
  const izracunajSlozenuKamatu = () => {
    if (!validateInputs()) return;
    const P = parseFloat(kapital());
    const r = parseFloat(kamatnaStopa()) / 100;
    const t = parseFloat(godine());
    const n = parseFloat(brojObracuna());

    const iznos = P * Math.pow(1 + r / n, n * t);
    setSlozenaKamata((iznos - P).toFixed(2));
  };

  return (
    <div>
      <h1>Kalkulator kamatnih stopa</h1>
      <div>
        <label>
          Početni kapital (P):
          <input type="number" value={kapital()} onInput={(e) => setKapital(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Kamatna stopa (%) :
          <input type="number" value={kamatnaStopa()} onInput={(e) => setKamatnaStopa(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Vremenski period (u godinama):
          <input type="number" value={godine()} onInput={(e) => setGodine(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Broj obračuna godišnje (za složenu kamatu, npr. 1 za godišnji, 12 za mjesečni):
          <input type="number" value={brojObracuna()} onInput={(e) => setBrojObracuna(e.target.value)} />
        </label>
      </div>
      <button onClick={izracunajJednostavnuKamatu}>Izračunaj jednostavnu kamatu</button>
      <button onClick={izracunajSlozenuKamatu}>Izračunaj složenu kamatu</button>

      <div>
        <h2>Rezultati:</h2>
        <p>Jednostavna kamata: {jednostavnaKamata()} EUR</p>
        <p>Složena kamata: {slozenaKamata()} EUR</p>
      </div>

      {errorMessage() && <p style={{ color: "red" }}>{errorMessage()}</p>}
    </div>
  );
}
