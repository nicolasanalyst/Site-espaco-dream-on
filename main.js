document.addEventListener("DOMContentLoaded", function () {
  
  lucide.createIcons();

  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const agendamentoForm = document.getElementById("agendamentoForm");
  const submitButton = document.getElementById("submitButton");
  const successMessage = document.getElementById("successMessage");

  if (agendamentoForm) {
    agendamentoForm.addEventListener("submit", function (event) {
      event.preventDefault(); 

      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
      successMessage.classList.remove("hidden");

      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const tipoEvento = document.getElementById("tipoEvento").value;
      const data = document.getElementById("data").value;
      const convidados = document.getElementById("convidados").value;
      const mensagemAdicional = document.getElementById("mensagem").value;

      const [ano, mes, dia] = data.split("-");
      const dataFormatada = `${dia}/${mes}/${ano}`;

      let mensagem = `Olá! Gostaria de solicitar um agendamento para o Espaço Dream On:\n\n`;
      mensagem += `*Nome:* ${nome}\n`;
      mensagem += `*Telefone:* ${telefone}\n`;
      mensagem += `*Tipo de Evento:* ${tipoEvento}\n`;
      mensagem += `*Data Desejada:* ${dataFormatada}\n`;
      if (convidados) {
        mensagem += `*Nº de Convidados:* ${convidados}\n`;
      }
      if (mensagemAdicional) {
        mensagem += `*Mensagem:* ${mensagemAdicional}\n`;
      }

      const mensagemCodificada = encodeURIComponent(mensagem);
      const numeroWhatsApp = "5519993339597";
      const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

      setTimeout(() => {
        window.open(linkWhatsApp, "_blank");

        agendamentoForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Solicitar Agendamento";
        successMessage.classList.add("hidden");
      }, 2000);
    });
  }

  const galleryImages = document.querySelectorAll(".gallery-img");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalImage.src = img.src;
    });
  });

  const hideModal = () => {
    modal.classList.add("hidden");
  };

  closeModal.addEventListener("click", hideModal);
  modal.addEventListener("click", (e) => {
    // Fecha se clicar no fundo (fora da imagem)
    if (e.target === modal) {
      hideModal();
    }
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {  
      const isAlreadyActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      if (!isAlreadyActive) {
        item.classList.add("active");
      }
    });
  });
});
