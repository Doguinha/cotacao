import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { fornecedores } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
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
  handleValorUnitarioItemOrcamento,
}) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      margin: theme.spacing(2),
      border: "1px solid #eeeeee",
    },
    fieldset: {
      border: "1px solid",
      padding: "0 1.4em 1.4em 1.4em !important",
      margin: "0 0 1.5em 0 !important",
      boxShadow: "0px 0px 0px 0px #000",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    legend: {
      display: "block",
      maxWidth: "100%",
      padding: 0,
      marginBottom: ".5rem",
      fontSize: "1.5rem",
      lineHeight: "inherit",
      color: "inherit",
      whiteSpace: "normal",
    },
  }));
  const classes = useStyles();
  return (
    <form>
      {orcamentos.map((orcamento) => (
        <Paper className={classes.paper} key={orcamento.id}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                fullWidth
                options={fornecedores}
                value={orcamento.fornecedor}
                getOptionLabel={(option) =>
                  `(${option.cpfcnpj}) ${option.nome}`
                }
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
            {orcamento.itens.map((itemOrcamento) => (
              <>
                <Grid item xs={8}>
                  <TextField
                    required
                    label="Item"
                    fullWidth
                    defaultValue={itemOrcamento.nome}
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    label="Valor Unitário"
                    fullWidth
                    error={false}
                    value={itemOrcamento.valorUnitario}
                    helperText=""
                    onChange={(evento) =>
                      handleValorUnitarioItemOrcamento(
                        evento,
                        orcamento.id,
                        itemOrcamento.id
                      )
                    }
                  />
                </Grid>
              </>
            ))}
          </Grid>
        </Paper>
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
