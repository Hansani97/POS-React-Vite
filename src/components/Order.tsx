import React, {useEffect, useState} from "react";
import Customer from "./Customer.tsx";
import Product from "./Product.tsx";
import AxiosInstance from "../config/AxiosInstance.ts";

interface Cart {
    _id: string | undefined,
    productName: string | undefined,
    unitPrice: number | '',
    qty: number | undefined,
    total: number | undefined
}

const Order: React.FC = () => {
    const styleObj: React.CSSProperties = {
        marginBottom: '20px'
    }
    const bottomContext: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    const total: React.CSSProperties = {
        color: 'red',
        margin: '0',
    }

    const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
    const [productsDetails, setProductsDetails] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);

    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');
    const [userQty, setUserQty] = useState<number>(0);
    const [name, setName] = useState('');
    const [netTotal, setNetTotal] = useState<number>(0);


    useEffect(() => {
        findAllCustomers();
        findAllProducts();
    }, [])

    const findAllCustomers = async () => {
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
        setCustomerDetails(response.data);
        console.log(customerDetails);

    }

    const getCoustomerById = async (id: string) => {
        const customer = await AxiosInstance.get('/customers/find-by-id/' + id);
        console.log(customer.data)

        setSelectedCustomer(customer.data)
        setAddress(customer.data.address)
        setSalary(parseFloat(customer.data.salary))
    }

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProductsDetails(response.data);
    }

    const getProductById = async (id: string) => {
        const product = await AxiosInstance.get('/products/find-by-id/' + id);
        console.log(product.data)

        setSelectedProduct(product.data)
        setName(product.data.name)
        setDescription(product.data.description)
        setQtyOnHand(product.data.qtyOnHand)
        setUnitPrice(parseFloat(product.data.unitPrice))
    }

    const addToCart = (newItem: Cart) => {
        setCart((prevState) => [...prevState, newItem])

    }
    const setTotal = () => {
        let amount = 0;
        cart.map((data) => {
            amount += data.total;
            setNetTotal(amount)
        })
    }

    const placeOrder = async ()=>{
        const order = await AxiosInstance.post('/orders/create',{
            date:new Date(),
            customerDetails:selectedCustomer,
            totalCost:1300,
            products:cart
        });

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="customer">Select Customer</label>
                            <select id="customer" className='form-control'
                                    onChange={(e) => getCoustomerById(e.target.value)}>
                                <option value=''>select value</option>
                                {customerDetails.map((customer, index) => (
                                    <option key={index} value={customer._id}>{customer.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="address">Customer Address</label>
                            <input value={address} type="text" disabled className='form-control' id='address'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="address">Customer Salary</label>
                            <input value={salary} type="text" disabled className='form-control' id='salary'/>
                        </div>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="product">Select Product</label>
                            <select id="product" className='form-control'
                                    onChange={(e) => getProductById(e.target.value)}>
                                <option value=''>select value</option>
                                {productsDetails.map((product, index) => (
                                    <option key={index} value={product._id}>{product.name} </option>

                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input value={description} type="text" disabled className='form-control' id='description'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input value={unitPrice} type="text" disabled className='form-control' id='price'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="qtyonhand">Qty On Hand</label>
                            <input value={qtyOnHand} type="number" disabled className='form-control' id='qtyonhand'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY</label>
                            <input value={userQty} type="number" className='form-control' id='qty'
                                   onChange={(e) => {
                                       setUserQty(parseFloat(e.target.value))
                                   }}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary col-12" onClick={() => {
                            const cartProduct: Cart = {
                                _id: selectedProduct?._id,
                                productName: selectedProduct?.name,
                                unitPrice: unitPrice,
                                qty: userQty,
                                total: (userQty * (unitPrice ? unitPrice : 0))
                            }
                            addToCart(cartProduct);
                            setTotal();
                        }}>+ Add Product
                        </button>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th>#id</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((data, index) => (
                                <tr key={index}>
                                    <td>#{data._id}</td>
                                    <td>{data.productName}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <button onClick={() => {
                                            setCart((prevState) => prevState.filter((cartData) => cartData._id != data._id))
                                            setTotal();
                                        }}
                                                className='btn btn-outline-danger btn-sm'>Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bottom-context" style={bottomContext}>
                    <div className="total-outer">
                        <h1 style={total}>Total : {netTotal}</h1>
                    </div>
                    <div className="place-orde-button-context">
                        <button onClick={placeOrder} className='btn btn-primary'>Place Order</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Order;