import {
  Button,
  FormHelperText,
  InputLabel,
  TextField,
  Grid,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { fornecedores } from "../../api";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  PlusOne as PlusOneIcon,
} from "@material-ui/icons";
export default function Passo3({
  orcamentos,
  proximoPasso,
  voltarPasso,
  adicionarOrcamento,
  handleSelecionarFornecedor,
  handleDataOrcamento,
  handleDataValidade,
}) {
  return (
    <form>
      {orcamentos.map((orcamento, indice) => (
        <Grid container spacing={3} key={indice}>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              options={fornecedores}
              value={orcamento.fornecedor}
              getOptionLabel={(option) => `${option.cpfcnpj} - ${option.nome}`}
              getOptionSelected={(option, value) =>
                option.cpfcnpj === value.cpfcnpj
              }
              filterSelectedOptions={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escolha o fornecedor"
                  variant="standard"
                />
              )}
              onChange={(evento, novosValores) =>
                handleSelecionarFornecedor(novosValores, orcamento.id)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              label="Data do orçamento"
              fullWidth
              type="date"
              error={false}
              value={orcamento.dataOrcamento}
              helperText=""
              onChange={(evento) => handleDataOrcamento(evento, orcamento.id)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              label="Data de validade"
              fullWidth
              type="date"
              error={false}
              value={orcamento.dataValidade}
              helperText=""
              onChange={(evento) => handleDataValidade(evento, orcamento.id)}
            />
          </Grid>
        </Grid>
      ))}

      <div
        style={{
          width: "100%",
          margin: "2em 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<PlusOneIcon />}
          onClick={adicionarOrcamento}
        >
          Orçamento
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={voltarPasso}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={proximoPasso}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
