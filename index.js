// Define el umbral de confianza mínima
const umbral = 0.5; // Umbral de confianza mínima

// Define la función para analizar el texto del usuario
window.analizarTexto = async () => {
  const textoUsuario = document.getElementById('textoUsuario').value.trim(); // Eliminar espacios en blanco al inicio y al final

  if (textoUsuario === '') {
    alert('Por favor, ingresa un texto.');
    return;
  }

  // Carga el modelo de toxicidad
  toxicity.load(umbral).then(model => {
    // Clasifica el texto ingresado por el usuario
    model.classify(textoUsuario).then(predictions => {
      console.log(predictions)
      // Muestra los resultados en la página
      mostrarResultados(predictions);
    });
  }).catch(error => {
    console.error('Error al cargar el modelo de toxicidad:', error);
  });
};

// Función para mostrar los resultados en la página
function mostrarResultados(predictions) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

  predictions.forEach(prediction => {
    const label = prediction.label;
    const score = prediction.results[0].probabilities[1]; // Obtener la probabilidad de toxicidad
    let resultText = '';

    if (score > umbral) {
      resultText = `${label}: true`;
    } else {
      resultText = `${label}: false`;
    }

    const resultElement = document.createElement('div');
    resultElement.textContent = resultText;
    resultadosDiv.appendChild(resultElement);
  });
}
