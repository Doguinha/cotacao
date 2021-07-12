import Passo1 from "./pages/passo1";
import Passo2 from "./pages/passo2";
import Passo3 from "./pages/passo3";
import Passo4 from "./pages/passo4";
import { Container } from "@material-ui/core";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useState } from "react";
import { uuidv4 } from "./api";
const App = () => {
  const [passoAtual, setPassoAtual] = useState(0);
  const [nome, setNome] = useState("");
  const [objeto, setObjeto] = useState("");
  const [tipo, setTipo] = useState("CompraGlobal");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  const handleTipo = (evento) => {
    setTipo(evento.target.value);
  };

  const handleNome = (evento) => {
    setNome(evento.target.value);
  };

  const handleObjeto = (evento) => {
    setObjeto(evento.target.value);
  };

  const handleItemSelecionado = (evento, novosValores) => {
    const itensFaltantes = novosValores.filter(
      ({ id: idNovoItem }) =>
        !itensSelecionados.some(
          ({ id: idItemExistente }) => idNovoItem === idItemExistente
        )
    );
    const novosItensOrcamento = itensFaltantes.map((itemFaltante) => {
      return {
        ...itemFaltante,
        valorUnitario: "",
        arquivos: [],
      };
    });
    setItensSelecionados(novosValores);
    const novosOrcamentos = orcamentos.map((orcamento) => {
      const itensOrc = [...orcamento.itens, ...novosItensOrcamento];
      return {
        ...orcamento,
        itens: itensOrc,
      };
    });
    setOrcamentos(novosOrcamentos);
  };

  const handleQuantidade = (evento, itemId) => {
    const novosItens = itensSelecionados.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantidade: evento.target.value,
        };
      }
      return item;
    });
    setItensSelecionados(novosItens);
  };

  const handleUnidadeCompra = (evento, itemId) => {
    const novosItens = itensSelecionados.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          unidadeCompra: evento.target.value,
        };
      }
      return item;
    });
    setItensSelecionados(novosItens);
  };

  const handleRemoverItem = (itemId) => {
    const novosItens = itensSelecionados.filter((item) => item.id !== itemId);
    const novosOrcamentos = orcamentos.map((orcamento) => {
      const itensOrcamento = orcamento.itens.filter(
        (item) => item.id !== itemId
      );
      return {
        ...orcamento,
        itens: itensOrcamento,
      };
    });
    setItensSelecionados(novosItens);
    setOrcamentos(novosOrcamentos);
  };

  const proximoPasso = () => {
    setPassoAtual(passoAtual + 1);
  };

  const voltarPasso = () => {
    setPassoAtual(passoAtual - 1);
  };

  const adicionarOrcamento = () => {
    const orcamentosCopia = [
      ...orcamentos,
      {
        id: uuidv4(),
        fornecedor: null,
        dataValidade: new Date().toISOString().split("T")[0],
        dataOrcamento: new Date().toISOString().split("T")[0],
        itens: itensSelecionados.map((item) => ({
          ...item,
          valorUnitario: "",
          arquivos: [],
        })),
      },
    ];
    setOrcamentos(orcamentosCopia);
  };

  const handleSelecionarFornecedor = (fornecedor, orcamentoId) => {
    const novosItens = orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          fornecedor: fornecedor,
        };
      }
      return orcamento;
    });
    setOrcamentos(novosItens);
  };

  const handleDataValidade = (evento, orcamentoId) => {
    const novosItens = orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          dataValidade: evento.target.value,
        };
      }
      return orcamento;
    });
    setOrcamentos(novosItens);
  };

  const handleDataOrcamento = (evento, orcamentoId) => {
    const novosItens = orcamentos.map((orcamento) => {
      if (orcamento.id === orcamentoId) {
        return {
          ...orcamento,
          dataOrcamento: evento.target.value,
        };
      }
      return orcamento;
    });
    setOrcamentos(novosItens);
  };

  const handleValorUnitarioItemOrcamento = (evento, orcamentoId, itemId) => {
    const novosItens = orcamentos.map((orcamento) => {
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
    setOrcamentos(novosItens);
  };
  const handleRemoveItemOrcamento = (orcamentoId, itemId) => {
    let novosOrcamentos = orcamentos.map((orcamento) => {
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
    });
    novosOrcamentos = novosOrcamentos.filter(
      (orcamento) => orcamento.itens.length > 0
    );
    setOrcamentos(novosOrcamentos);
  };

  const handleChangeArquivos = (evento, orcamentoId) => {
    if (evento.target.files.length > 0) {
      let novosOrcamentos = orcamentos.map((orcamento) => {
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
      console.log(JSON.stringify(novosOrcamentos));
      setOrcamentos(novosOrcamentos);
    }
  };

  const formularios = [
    <Passo1
      handleNome={handleNome}
      handleObjeto={handleObjeto}
      handleTipo={handleTipo}
      handleItemSelecionado={handleItemSelecionado}
      proximoPasso={proximoPasso}
      nome={nome}
      tipo={tipo}
      objeto={objeto}
      itensSelecionados={itensSelecionados}
    />,
    <Passo2
      itensSelecionados={itensSelecionados}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      handleUnidadeCompra={handleUnidadeCompra}
      handleQuantidade={handleQuantidade}
      handleRemoverItem={handleRemoverItem}
    />,
    <Passo3
      orcamentos={orcamentos}
      voltarPasso={voltarPasso}
      proximoPasso={proximoPasso}
      adicionarOrcamento={adicionarOrcamento}
      handleSelecionarFornecedor={handleSelecionarFornecedor}
      handleDataOrcamento={handleDataOrcamento}
      handleDataValidade={handleDataValidade}
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
