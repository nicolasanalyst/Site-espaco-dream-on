// Garante que o script rode apenas depois que o HTML for completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // 1. Inicializa os ícones da biblioteca Lucide
  lucide.createIcons();

  // 2. Atualiza o ano atual no rodapé automaticamente
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Adiciona funcionalidade ao formulário de agendamento (COM MELHORIAS)
  const agendamentoForm = document.getElementById("agendamentoForm");
  const submitButton = document.getElementById("submitButton");
  const successMessage = document.getElementById("successMessage");

  if (agendamentoForm) {
    agendamentoForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão

      // Mostra feedback para o usuário
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
      successMessage.classList.remove("hidden");

      // Coleta dos dados do formulário
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const tipoEvento = document.getElementById("tipoEvento").value;
      const data = document.getElementById("data").value;
      const convidados = document.getElementById("convidados").value;
      const mensagemAdicional = document.getElementById("mensagem").value;

      // Formata a data para o padrão brasileiro (DD/MM/AAAA)
      const [ano, mes, dia] = data.split("-");
      const dataFormatada = `${dia}/${mes}/${ano}`;

      // Cria a mensagem para o WhatsApp
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

      // Aguarda 2 segundos para o usuário ler a mensagem e então redireciona
      setTimeout(() => {
        window.open(linkWhatsApp, "_blank");

        // Reseta o formulário
        agendamentoForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Solicitar Agendamento";
        successMessage.classList.add("hidden");
      }, 2000);
    });
  }

  // 4. Funcionalidade da Galeria Interativa (Modal) (NOVO)
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

  // 5. Funcionalidade do FAQ (Accordion)
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Primeiro, verifica se o item clicado já está ativo
      const isAlreadyActive = item.classList.contains("active");

      // Fecha todos os outros itens para garantir que apenas um esteja aberto
      faqItems.forEach((otherItem) => {
        if (otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Se o item clicado não estava ativo, ele é aberto.
      // Se já estava, o loop acima já o fechou.
      if (!isAlreadyActive) {
        item.classList.add("active");
      }
    });
  });
});