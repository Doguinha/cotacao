import Passo1 from "./pages/passo1";
import Passo2 from "./pages/passo2";
import Passo3 from "./pages/passo3";
import Passo4 from "./pages/passo4";
import { Container } from "@material-ui/core";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useState } from "react";
import { uuidv4 } from "./api";
const App = () => {
  const [cotacao, setCotacao] = useState({
    nome: "",
    objeto: "",
    tipo: "",
    itens: [],
    orcamentos: [],
  });
  const [passoAtual, setPassoAtual] = useState(0);

  const handleChangeAtributosCotacao = (evento) => {
    setCotacao({ ...cotacao, [evento.target.name]: evento.target.value });
  };

  const handleItemSelecionado = (evento, novosValores) => {
    const itensFaltantes = novosValores
      .filter(
        ({ id: idNovoItem }) =>
          !cotacao.itens.some(
            ({ id: idItemExistente }) => idNovoItem === idItemExistente
          )
      )
      .map((itemFaltante) => {
        return {
          ...itemFaltante,
          valorUnitario: "",
          arquivos: [],
        };
      });
    const novosOrcamentos = cotacao.orcamentos
      .map((orcamento) => {
        const itensOrcamentoAtual = orcamento.itens.filter((item) =>
          novosValores.some((itemNovo) => itemNovo.id === item.id)
        );
        const itensOrcamentoFinal = [...itensFaltantes, ...itensOrcamentoAtual];
        return {
          ...orcamento,
          itens: itensOrcamentoFinal,
        };
      })
      .filter((orcamento) => orcamento.itens.length > 0);

    setCotacao({
      ...cotacao,
      itens: novosValores,
      orcamentos: novosOrcamentos,
    });
  };

  const handleChangeAtributosItem = (evento, itemId) => {
    const novosItens = cotacao.itens.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          [evento.target.name]: evento.target.value,
        };
      }
      return item;
    });
    setCotacao({ ...cotacao, itens: novosItens });
  };

  const handleRemoverItem = (itemId) => {
    const novosItens = cotacao.itens.filter((item) => item.id !== itemId);
    const novosOrcamentos = cotacao.orcamentos
      .map((orcamento) => {
        const itensOrcamento = orcamento.itens.filter(
          (item) => item.id !== itemId
        );
        return {
          ...orcamento,
          itens: itensOrcamento,
        };
      })
      .filter((orcamento) => orcamento.itens.length > 0);
    setCotacao({ ...cotacao, itens: novosItens, orcamentos: novosOrcamentos });
  };

  const proximoPasso = () => {
    setPassoAtual(passoAtual + 1);
  };

  const voltarPasso = () => {
    setPassoAtual(passoAtual - 1);
  };

  const adicionarOrcamento = () => {
    const novosOrcamentos = [
      ...cotacao.orcamentos,
      {
        id: uuidv4(),
        fornecedor: null,
        dataValidade: new Date().toISOString().split("T")[0],
        dataOrcamento: new Date().toISOString().split("T")[0],
        itens: cotacao.itens.map((item) => ({
          ...item,
          valorUnitario: "",
          arquivos: [],
        })),
      },
    ];
    setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
  };

  const handleSelecionarFornecedor = (fornecedor, orcamentoId) => {
    const novosOrcamentos = cotacao.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          fornecedor: fornecedor,
        };
      }
      return orcamento;
    });
    setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
  };

  const handleDatasOrcamento = (evento, orcamentoId) => {
    const novosOrcamentos = cotacao.orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          [evento.target.name]: evento.target.value,
        };
      }
      return orcamento;
    });
    setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
  };

  const handleValorUnitarioItemOrcamento = (evento, orcamentoId, itemId) => {
    const novosOrcamentos = cotacao.orcamentos.map((orcamento) => {
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
    setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
  };

  const handleRemoveItemOrcamento = (orcamentoId, itemId) => {
    let novosOrcamentos = cotacao.orcamentos
      .map((orcamento) => {
        if (orcamento.id === orcamentoId) {
          const itensDoOrcamento = orcamento.itens.filter(
            (itemOrcamento) => itemOrcamento.id !== itemId
          );
          return {
            ...orcamento,
            itens: itensDoOrcamento,
          };
        }
        return orcamento;
      })
      .filter((orcamento) => orcamento.itens.length > 0);
    setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
  };

  const handleChangeArquivos = (evento, orcamentoId) => {
    if (evento.target.files.length > 0) {
      let novosOrcamentos = cotacao.orcamentos.map((orcamento) => {
        if (orcamento.id === orcamentoId) {
          return {
            ...orcamento,
            arquivos: Array.from(evento.target.files).map((file) => {
              return {
                nome: file.name,
                url: URL.createObjectURL(file),
              };
            }),
          };
        }
        return orcamento;
      });
      setCotacao({ ...cotacao, orcamentos: novosOrcamentos });
    }
  };

  const formularios = [
    <Passo1
      handleChangeAtributosCotacao={handleChangeAtributosCotacao}
      handleItemSelecionado={handleItemSelecionado}
      proximoPasso={proximoPasso}
      cotacao={cotacao}
    />,
    <Passo2
      cotacao={cotacao}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      handleChangeAtributosItem={handleChangeAtributosItem}
      handleRemoverItem={handleRemoverItem}
    />,
    <Passo3
      cotacao={cotacao}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      adicionarOrcamento={adicionarOrcamento}
      handleSelecionarFornecedor={handleSelecionarFornecedor}
      handleDatasOrcamento={handleDatasOrcamento}
      handleValorUnitarioItemOrcamento={handleValorUnitarioItemOrcamento}
      handleRemoveItemOrcamento={handleRemoveItemOrcamento}
      handleChangeArquivos={handleChangeArquivos}
    />,
    <Passo4 voltarPasso={voltarPasso} />,
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
};

export default App;
