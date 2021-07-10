import React from "react";
import { useState } from "react";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import { itens } from "../../api";

export default function Passo1({ aoEnviar, dadosColetados }) {
  const [nome, setNome] = useState(dadosColetados.nome);
  const [objeto, setObjeto] = useState(dadosColetados.objeto);
  const [tipo, setTipo] = useState(dadosColetados.tipo);
  const [itensSelecionados, setItensSelecionados] = useState(
    dadosColetados.itensSelecionados
  );

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
    setItensSelecionados(novosValores);
  };
  const handleSubmit = (evento) => {
    evento.preventDefault();
    aoEnviar({ nome, objeto, tipo, itensSelecionados });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              fullWidth
              options={itens}
              value={itensSelecionados}
              getOptionLabel={(option) => option.nome}
              getOptionSelected={(option, value) => option.id === value.id}
              filterSelectedOptions={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escolha os itens"
                  variant="outlined"
                />
              )}
              onChange={handleItemSelecionado}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Nome"
              placeholder="Dê um nome para cotação"
              fullWidth
              value={nome}
              error={false}
              onChange={handleNome}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Objeto"
              placeholder="Informe o objeto da cotação"
              fullWidth
              value={objeto}
              error={false}
              onChange={handleObjeto}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="label-tipo">Tipo</InputLabel>
              <Select
                labelId="label-tipo"
                value={tipo}
                onChange={handleTipo}
                label="Tipo"
              >
                <MenuItem value={"CompraGlobal"}>Compra Global</MenuItem>
                <MenuItem value={"CompraPorItem"}>Compra por Item</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
