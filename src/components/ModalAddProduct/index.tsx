import {
  Modal,
  makeStyles,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  ButtonGroup
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm, Controller } from "react-hook-form";
import { IProduct } from "../../types";
import { useProducts } from "../../hooks/useProducts";

interface IModalAddProductProps {
  setIsOpen: () => void;
  isOpen: boolean;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 700,
    border: "none",
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#F0F0F5",
    color: "#000000",
    borderRadius: "8px",
    fontFamily: "Roboto"
  },
  input: {
    width: "100%",
    margin: "8px 0"
  },
  formControl: {
    padding: theme.spacing(0, 1),
    minWidth: 120
  },
  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px"
  },
  button: {
    width: "100%"
  }
}));

export function ModalAddProduct({ isOpen, setIsOpen }: IModalAddProductProps) {
  const { addProduct } = useProducts();
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProduct>();

  const onSubmit = (data: IProduct) => {
    addProduct(data);
    setIsOpen();
    reset();
  };

  const body = (
    <div className={styles.modal}>
      <h3>Adicionar produto</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="codSKU"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="SKU"
              variant="outlined"
              className={styles.input}
            />
          )}
        />
        {errors.codSKU && <Alert severity="error">SKU é obrigatório</Alert>}
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              variant="outlined"
              className={styles.input}
            />
          )}
        />
        {errors.name && <Alert severity="error">Nome é obrigatório</Alert>}
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl variant="outlined" className={styles.input}>
              <InputLabel htmlFor="outlined-category-native-simple">
                Categoria
              </InputLabel>
              <Select
                native
                {...field}
                inputProps={{
                  name: "category",
                  id: "outlined-category-native-simple"
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Doce"}>Doce</option>
                <option value={"Iogurte"}>Iogurte</option>
                <option value={"Leite"}>Leite</option>
              </Select>
            </FormControl>
          )}
        />
        {errors.category && (
          <Alert severity="error">Categoria é obrigatório</Alert>
        )}
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Preço"
              variant="outlined"
              className={styles.input}
            />
          )}
        />
        {errors.price && <Alert severity="error">Preço é obrigatório</Alert>}
        <ButtonGroup className={styles.buttonGroup}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            className={styles.button}
          >
            Salvar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="medium"
            onClick={setIsOpen}
            className={styles.button}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
  return (
    <Modal open={isOpen} onClose={setIsOpen}>
      {body}
    </Modal>
  );
}
