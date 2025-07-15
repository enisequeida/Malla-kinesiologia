/* -------- MAPA DE PRERREQUISITOS --------
 * Para cada ramo que necesite requisitos, agrega
 *  código : ["REQ1","REQ2", ...]
 * Si un ramo no figura aquí, se considera libre
 * (aparece desbloqueado al cargar la página).
 */
const requisitos = {
  // 2° semestre
  BIOL188: ["BIOL038"],
  KINE103: ["KINE101"],
  KINE104: ["KINE102"],
  MORF319: ["MORF318"],

  // 3° semestre
  BIOL288: ["BIOL188"],
  ING129: ["ING119"],
  KINE203: ["KINE104"],

  // 4° semestre
  ING239: ["ING129"],
  KINE206: ["KINE204"],
  KINE207: ["KINE104"],
  KINE208: ["BIOL188"],
  KINE209: ["KINE104"],

  // 5° semestre
  ING249: ["ING239"],
  KINE311: ["BIOL288"],
  KINE313: ["KINE314"],
  KINE314: ["BIOL288", "KINE203"],

  // 6° semestre
  FCRE002: ["KINE312"],
  KINE315: ["KINE313"],
  KINE316: ["KINE313"],
  KINE317: ["KINE312"],
  KINE318: ["KINE313"],

  // 7° semestre
  KINE414: ["KINE318"],
  KINE415: ["KINE315"],
  KINE416: ["KINE316"],
  KINE418: ["KINE315"],
  KINE420: ["KINE313"],

  // 8° semestre
  FCRE003: ["FCRE002"],
  KINE426: ["KINE415", "KINE416", "KINE414"],
  KINE427: ["KINE311"],
  KINE428: ["KINE420"],
  KINE429: ["KINE420"],
  KINE430: ["KINE429"],

  // 9°-10° semestres
  KINE511: ["KINE430"],
  KINE512: ["KINE430"],
  KINE521: ["KINE512"],
  KINE522: ["KINE521"]
};

/* -------- LÓGICA DE DESBLOQUEO -------- */
function toggleRamo(btn){
  if(btn.classList.contains("bloqueado")) return; // Por si acaso
  btn.classList.toggle("aprobado");
  actualizarDesbloqueos();
}

function actualizarDesbloqueos(){
  // Lista de códigos aprobados
  const aprobados = [...document.querySelectorAll(".aprobado")]
    .map(b=>b.closest(".ramo").dataset.codigo);

  document.querySelectorAll(".ramo").forEach(div=>{
    const codigo = div.dataset.codigo;
    const button = div.querySelector("button");
    const reqs = requisitos[codigo] || [];

    // Si todos los requisitos están aprobados → desbloquear
    const habilitado = reqs.every(r=>aprobados.includes(r));

    if(habilitado){
      button.classList.remove("bloqueado");
      // Mantén clase aprobado si ya lo estaba
    }else{
      if(!button.classList.contains("aprobado")){
        button.classList.add("bloqueado");
      }
    }
  });
}

/* -------- Al iniciar: desbloquear ramos sin requisitos -------- */
window.addEventListener("DOMContentLoaded", ()=>{
  actualizarDesbloqueos();
});
