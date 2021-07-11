import { Button, TextField, Grid, Paper, IconButton } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { fornecedores } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  PlusOne as PlusOneIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import React from "react";
export default function Passo3({
  orcamentos,
  proximoPasso,
  voltarPasso,
  adicionarOrcamento,
  handleSelecionarFornecedor,
  handleDataOrcamento,
  handleDataValidade,
  handleValorUnitarioItemOrcamento,
  handleRemoveItemOrcamento,
  handleChangeArquivos,
}) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      margin: theme.spacing(2),
      border: "1px solid #eeeeee",
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
                    variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
              />
            </Grid>
            {orcamento.itens.map((itemOrcamento, indice) => (
              <React.Fragment key={indice}>
                <Grid item xs={8}>
                  <TextField
                    required
                    label="Item"
                    fullWidth
                    defaultValue={itemOrcamento.nome}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
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
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() =>
                      handleRemoveItemOrcamento(orcamento.id, itemOrcamento.id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                error={false}
                helperText=""
                onChange={(evento) =>
                  handleChangeArquivos(evento, orcamento.id)
                }
                variant="outlined"
                inputProps={{ multiple: true }}
              />
              {orcamento.arquivos && (
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5em",
                    alignItems: "start",
                  }}
                >
                  {orcamento.arquivos.map((arquivo) => (
                    <li
                      key={arquivo.nome}
                      style={{
                        padding: "0.3em",
                        borderBottom: "1px dotted #cccccc",
                      }}
                    >
                      <a href={arquivo.url} target="_blank" key={arquivo.url}>
                        {arquivo.nome}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Grid>
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
