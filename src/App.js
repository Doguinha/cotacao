import Passo1 from "./pages/passo1";
import Passo2 from "./pages/passo2";
import Passo3 from "./pages/passo3";
import Passo4 from "./pages/passo4";
import { Container } from "@material-ui/core";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useState } from "react";
import { uuidv4 } from "./api";
function App() {
  const [passoAtual, setPassoAtual] = useState(0);
  const [dadosColetados, setDadosColetados] = useState({
    itensSelecionados: [],
    nome: "",
    tipo: "CompraPorItem",
    objeto: "",
    orcamentos: [],
  });

  const handleQuantidade = (evento, itemId) => {
    const novosItens = dadosColetados.itensSelecionados.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantidade: evento.target.value,
        };
      }
      return item;
    });
    setDadosColetados({ ...dadosColetados, itensSelecionados: novosItens });
  };

  const handleUnidadeCompra = (evento, itemId) => {
    const novosItens = dadosColetados.itensSelecionados.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          unidadeCompra: evento.target.value,
        };
      }
      return item;
    });
    setDadosColetados({ ...dadosColetados, itensSelecionados: novosItens });
  };

  const handleRemoverItem = (itemId) => {
    const novosItens = dadosColetados.itensSelecionados.filter(
      (item) => item.id !== itemId
    );
    setDadosColetados({ ...dadosColetados, itensSelecionados: novosItens });
  };

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

  const adicionarOrcamento = () => {
    const orcamentosCopia = dadosColetados.orcamentos;
    orcamentosCopia.push({
      id: uuidv4(),
      fornecedor: null,
      dataValidade: new Date().toISOString().split("T")[0],
      dataOrcamento: new Date().toISOString().split("T")[0],
      itens: dadosColetados.itensSelecionados.map((item) => ({
        ...item,
        valorUnitario: "",
      })),
    });
    setDadosColetados({ ...dadosColetados, orcamentos: orcamentosCopia });
  };

  const handleSelecionarFornecedor = (fornecedor, orcamentoId) => {
    const novosItens = dadosColetados.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          fornecedor: fornecedor,
        };
      }
      return orcamento;
    });
    setDadosColetados({ ...dadosColetados, orcamentos: novosItens });
  };

  const handleDataValidade = (evento, orcamentoId) => {
    const novosItens = dadosColetados.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          dataValidade: evento.target.value,
        };
      }
      return orcamento;
    });
    setDadosColetados({ ...dadosColetados, orcamentos: novosItens });
  };

  const handleDataOrcamento = (evento, orcamentoId) => {
    const novosItens = dadosColetados.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          dataOrcamento: evento.target.value,
        };
      }
      return orcamento;
    });
    setDadosColetados({ ...dadosColetados, orcamentos: novosItens });
  };

  const handleValorUnitarioItemOrcamento = (evento, orcamentoId, itemId) => {
    const novosItens = dadosColetados.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        const itensDoOrcamento = orcamento.itens.map((itemOrcamento) => {
          if (itemOrcamento.id === itemId) {
            return {
              ...itemOrcamento,
              valorUnitario: evento.target.value,
            };
          }
          return itemOrcamento;
        });
        return {
          ...orcamento,
          itens: itensDoOrcamento,
        };
      }
      return orcamento;
    });
    setDadosColetados({ ...dadosColetados, orcamentos: novosItens });
  };

  const formularios = [
    <Passo1 aoEnviar={coletarDados} dadosColetados={dadosColetados} />,
    <Passo2
      itensSelecionados={dadosColetados.itensSelecionados}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      handleUnidadeCompra={handleUnidadeCompra}
      handleQuantidade={handleQuantidade}
      handleRemoverItem={handleRemoverItem}
    />,
    <Passo3
      orcamentos={dadosColetados.orcamentos}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      adicionarOrcamento={adicionarOrcamento}
      handleSelecionarFornecedor={handleSelecionarFornecedor}
      handleDataOrcamento={handleDataOrcamento}
      handleDataValidade={handleDataValidade}
      handleValorUnitarioItemOrcamento={handleValorUnitarioItemOrcamento}
    />,
    <Passo4
      aoEnviar={coletarDados}
      dadosColetados={dadosColetados}
      voltarPasso={voltarPasso}
    />,
  ];

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
