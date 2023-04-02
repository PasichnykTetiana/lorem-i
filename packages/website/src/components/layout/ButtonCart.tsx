import {Button} from "antd";
import {type FC, useContext, useEffect} from "react";
import {Context} from "../app";
import {toJS} from 'mobx';
import CartService from "../../services/CartServices";

type ButtonCart = {
    productId: string;
};

const ButtonCart: FC<Partial<ButtonCart>> = ({productId}) => {
    const {store} = useContext(Context);

    async function addCart(productId?: string) {
        try {
            const response = await CartService.addCart(productId);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
        finally {
            store.checkCart();
        }
    }


    return (<Button type="primary" onClick={() => addCart(productId)}>
        Add
    </Button>)
}
export {ButtonCart};
