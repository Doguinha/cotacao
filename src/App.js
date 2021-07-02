import Passo1 from "./pages/passo1";
import Passo2 from "./pages/passo2";
import Passo3 from "./pages/passo3";
import Passo4 from "./pages/passo4";
import { Container } from "@material-ui/core";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useState } from "react";
function App() {
  const [passoAtual, setPassoAtual] = useState(0);
  const [dadosColetados, setDadosColetados] = useState({
    itensSelecionados: [{}],
    nome: "",
    tipo: "CompraPorItem",
    objeto: "",
  });
  const formularios = [
    <Passo1 aoEnviar={coletarDados} dadosColetados={dadosColetados} />,
    <Passo2
      aoEnviar={coletarDadosPasso2}
      dadosColetados={dadosColetados}
      voltarPasso={voltarPasso}
    />,
    <Passo3
      aoEnviar={coletarDados}
      dadosColetados={dadosColetados}
      voltarPasso={voltarPasso}
    />,
    <Passo4
      aoEnviar={coletarDados}
      dadosColetados={dadosColetados}
      voltarPasso={voltarPasso}
    />,
  ];

  function proximoPasso() {
    setPassoAtual(passoAtual + 1);
  }

  function voltarPasso() {
    setPassoAtual(passoAtual - 1);
  }

  function coletarDados(dados) {
    setDadosColetados({ ...dadosColetados, ...dados });
    proximoPasso();
  }

  function coletarDadosPasso2(itemAlterado) {
    const itensCopia = dadosColetados.itensSelecionados;
    let indice = itensCopia.findIndex(
      (itemSelecionado) => itemSelecionado.id === itemAlterado.id
    );
    itensCopia.splice(indice, 1, itemAlterado);
    setDadosColetados({
      nome: dadosColetados.nome,
      tipo: dadosColetados.tipo,
      objeto: dadosColetados.objeto,
      itensSelecionados: itensCopia,
    });
  }

  return (
    <Container maxWidth="md">
      <Stepper activeStep={passoAtual}>
        <Step>
          <StepLabel>Escolha os itens</StepLabel>
        </Step>
        <Step>
          <StepLabel>Defina as quantidades</StepLabel>
        </Step>
        <Step>
          <StepLabel>Informe os orçamentos</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finalize a cotação</StepLabel>
        </Step>
      </Stepper>
      {formularios[passoAtual]}
    </Container>
  );
}

export default App;
