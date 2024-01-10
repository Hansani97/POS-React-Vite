import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import AxiosInstance from "../config/AxiosInstance.ts";
import {storage} from '../config/firebase.ts';

interface Product {
    _id: string,
    name: string,
    description: string,
    image: string,
    unitPrice: number,
    qtyOnHand: number,
}

const Product: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [modalState, setModalState] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');

    const [selectedProductId, setSelectedProductId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateUnitPrice, setUpdateUnitPrice] = useState<number | ''>('');
    const [updateQtyOnHand, setUpdateQtyOnHand] = useState<number | ''>('');

    useEffect(() => {
        findAllProducts();
    }, [])

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setImage(event.target.files[0]);
    }

    const saveProduct = async () => {
        let imageUrl = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages6.alphacoders.com%2F396%2Fthumb-1920-396589.jpg&tbnid=Z_aAUdEAIJgXPM&vet=12ahUKEwi8zL_Iob6DAxUxTWwGHcf4ADUQMyguegUIARDhAQ..i&imgrefurl=https%3A%2F%2Fwall.alphacoders.com%2Fbig.php%3Fi%3D396589&docid=lKXWXfxra5HUAM&w=1920&h=1200&q=donut&hl=en&ved=2ahUKEwi8zL_Iob6DAxUxTWwGHcf4ADUQMyguegUIARDhAQ';
        if (image) {
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random() + '-' + image}`);
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL();
            }catch (e){
                console.log(e);
            }
        }
        
        try {

            const response = await AxiosInstance.post('/products/create', {
                name, description, unitPrice, qtyOnHand, image: imageUrl
            });
            console.log(response);

            setName('');
            setDescription('');
            setUnitPrice('');
            setQtyOnHand('');

            findAllProducts();

        } catch (e) {
            console.log(e)
        }

    }

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }

    const deleteProducts = async (id: string) => {
        await AxiosInstance.delete('/products/delete-by-id/' + id);
        findAllProducts();
    }

    const updateProducts = async () => {
        try {

            await AxiosInstance.put('/products/update/' + selectedProductId, {
                name: updateName, description: updateDescription, unitPrice: updateUnitPrice, qtyOnHand: updateQtyOnHand
            });
            setModalState(false);
            findAllProducts();

        } catch (e) {
            console.log(e)
        }
    }

    const loadModal = async (id: string) => {
        const product = await AxiosInstance.get('/products/find-by-id/' + id);
        console.log(product.data)

        setSelectedProductId(product.data._id)
        setUpdateName(product.data.name)
        setUpdateDescription(product.data.description)
        setUpdateUnitPrice(parseFloat(product.data.unitPrice))
        setUpdateQtyOnHand(parseFloat(product.data.qtyOnHand))

        setModalState(true);
    }

    const styleObj: React.CSSProperties = {
        marginBottom: '20px'
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input value={name} type="text" onChange={(e) => setName(e.target.value)}
                                   className='form-control'
                                   id='productName'/>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input value={unitPrice} type="text"
                                   onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                   className='form-control' id='price'/>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="qty">Qty On Hand</label>
                            <input value={qtyOnHand} type="text"
                                   onChange={(e) => setQtyOnHand(parseFloat(e.target.value))}
                                   className='form-control' id='qty'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="image">Product Image</label>
                            <input onChange={handleFile}
                                   type="file" className='form-control' id='image'/>
                        </div>
                    </div>
                    <div className="col-12 " style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea value={description} rows={5} onChange={(e) => setDescription(e.target.value)}
                                      className='form-control'
                                      id='description'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button onClick={saveProduct} className="btn btn-primary col-12">Save Product</button>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-12">
                        <form className='col-12'>
                            <input type="search" className='form-control' placeholder='Search product here'/>
                        </form>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th>#id</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Qty on Hand</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                                <th>See more</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index) =>
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.qtyOnHand}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                if (confirm('are you sure?')) {
                                                    deleteProducts(product._id)
                                                }
                                            }} className='btn btn-outline-danger btn-sm'>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            loadModal(product._id);
                                        }} className='btn btn-outline-warning btn-sm'>Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            loadModal(product._id)
                                        }} className='btn btn-outline-info btn-sm'>View
                                        </button>
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Update Products</h2>
                    <hr/>

                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateName} onChange={(e) => setUpdateName(e.target.value)}
                                   type="text" className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateUnitPrice}
                                   onChange={(e) => setUpdateUnitPrice(parseFloat(e.target.value))}
                                   type="text" className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateQtyOnHand}
                                   onChange={(e) => setUpdateQtyOnHand(parseFloat(e.target.value))}
                                   type="text" className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateDescription}
                                   onChange={(e) => setUpdateDescription(e.target.value)}
                                   type="text" className='form-control'/>
                        </div>
                        <br/>
                    </div>

                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={() => updateProducts()}
                        >Update Customer
                        </button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12'
                                onClick={() => setModalState(false)}>Close Modal
                        </button>
                    </div>

                </div>

            </Modal>

            {/*      <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Product Details</h2>
                    <hr/>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={selectedProductId} type="text" className='form-control' disabled/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateName} type="text" className='form-control' disabled/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateUnitPrice} type="text" className='form-control' disabled/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateQtyOnHand} type="text" className='form-control' disabled/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input defaultValue={updateDescription} type="text" className='form-control' disabled/>
                        </div>
                        <br/>
                    </div>
                    <div>
                        <button type='button' className='btn-warning btn col-sm-12'
                                onClick={() => setModalState(false)}>Close Modal
                        </button>
                    </div>
                </div>
            </Modal>*/}

        </>
    )
}

export default Product;