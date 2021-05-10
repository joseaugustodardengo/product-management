import { ChangeEvent } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    height: 32,
    width: 300,
    margin: "32px 0"
  },

  closeButton: {
    height: 54,
    margin: "32px 0",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "normal"
  }
});

interface ITextFieldProps {
  filterText: string;
  onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export function Filter({ filterText, onFilter, onClear }: ITextFieldProps) {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Filtro"
        placeholder="Busque pelo nome"
        className={classes.input}
        variant="outlined"
        value={filterText}
        onChange={onFilter}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Close />}
        size="small"
        className={classes.closeButton}
        onClick={onClear}
      />
    </>
  );
}
