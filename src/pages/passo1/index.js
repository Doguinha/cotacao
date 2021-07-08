import React from "react";
import { useState } from "react";
import {
  Button,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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
              variant="standard"
            />
          )}
          onChange={handleItemSelecionado}
        />
        <TextField
          required
          label="Nome"
          placeholder="Dê um nome para cotação"
          fullWidth
          value={nome}
          error={false}
          helperText="Dê um nome para cotação para ser usada nos filtros"
          onChange={handleNome}
        />
        <TextField
          required
          label="Objeto"
          placeholder="Informe o objeto da cotação"
          fullWidth
          value={objeto}
          error={false}
          helperText="Informe o objeto da cotação para ser usada nos filtros"
          onChange={handleObjeto}
        />
        <div style={{ marginTop: "1em" }}>
          <InputLabel id="label-tipo">Tipo</InputLabel>
          <Select
            labelId="label-tipo"
            value={tipo}
            onChange={handleTipo}
            fullWidth
          >
            <MenuItem value={"CompraGlobal"}>Compra Global</MenuItem>
            <MenuItem value={"CompraPorItem"}>Compra por Item</MenuItem>
          </Select>
          <FormHelperText>O tipo de compra afeta os cálculos</FormHelperText>
        </div>
        <div
          style={{
            width: "100%",
            marginTop: "1em",
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
        </div>
      </form>
    </>
  );
}
