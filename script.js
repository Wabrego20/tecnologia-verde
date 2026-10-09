const formulario = document.querySelector("#form-quiz");
const resultado = document.querySelector("#resultado");
const botonReiniciar = document.querySelector("#reiniciar");

const respuestasCorrectas = {
  p1: "b",
  p2: "c",
  p3: "a",
  p4: "b",
  p5: "c"
};

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  let aciertos = 0;
  const total = Object.keys(respuestasCorrectas).length;
  const sinResponder = Object.keys(respuestasCorrectas).filter((pregunta) => !datos.has(pregunta));

  if (sinResponder.length > 0) {
    resultado.hidden = false;
    resultado.innerHTML = `<strong>¡Casi listo!</strong><p>Responde las ${sinResponder.length} pregunta(s) que te faltan y vuelve a comprobar.</p>`;
    resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  for (const [pregunta, respuesta] of Object.entries(respuestasCorrectas)) {
    if (datos.get(pregunta) === respuesta) aciertos++;
  }

  let mensaje;
  if (aciertos === total) {
    mensaje = "¡Excelente! Tus decisiones ayudan a construir un planeta más sostenible.";
  } else if (aciertos >= 3) {
    mensaje = "¡Buen trabajo! Revisa los consejos y vuelve a intentarlo para mejorar tu resultado.";
  } else {
    mensaje = "Cada respuesta es una oportunidad para aprender. Revisa los consejos ecológicos e inténtalo de nuevo.";
  }

  resultado.hidden = false;
  resultado.innerHTML = `<strong>Obtuviste ${aciertos} de ${total} respuestas correctas.</strong><p>${mensaje}</p>`;
  resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

botonReiniciar.addEventListener("click", () => {
  resultado.hidden = true;
  resultado.textContent = "";
});
