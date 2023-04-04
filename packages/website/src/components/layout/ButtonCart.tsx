import { Button } from "antd";
import { type FC, useContext } from "react";
import { Context } from "../app";
import CartService from "../../services/CartServices";

type ButtonCart = {
  productId?: string;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed";
  description?: string
  option?: string
};

const ButtonCart: FC<Partial<ButtonCart>> = ({description = 'Add', option, type='primary', productId }) => {
  const { store } = useContext(Context);

  async function addCart(productId?: string) {
    try {
      const response = await CartService.addCart(productId);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      store.checkCart();
    }
  }
  async function deleteCartProduct(productId?: string) {
    try {
      const response = await CartService.deleteCartProduct(productId);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      store.checkCart();
    }
  }
  return (
    <Button
      type={type}
      onClick={async () => {
        await  option === 'add' ? addCart(productId) : deleteCartProduct(productId);
      }}
    >
      {description}
    </Button>
  );
};
export { ButtonCart };
