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


export function Filter() {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Filtro"
        placeholder="Busque pelo nome"
        className={classes.input}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Close />}
        size="small"
        className={classes.closeButton}
      />
    </>
  );
}
