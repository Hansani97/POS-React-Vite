
import DefaultCard from "./card/DefaultCard.tsx";
import DefaultChart from "./card/DefaultChart.tsx";
import MinQtyCard from "./card/MinQtyCard.tsx";
import React, {useEffect, useState} from "react";
import AxiosInstance from "../config/AxiosInstance.ts";
import Product from "./Product.tsx";
const Home:React.FC=()=>{
    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState<number>();
    const [customerCount, setCustomerCount] = useState<number>();
    const [orderCount, setOrderCount] = useState<number>();
    const [income, setIncome] = useState<number>();

    useEffect(() => {
        findAllProducts();
        findAllCount();
    }, [])
    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all-min?searchText=&page=1&size=10');
        setProducts(response.data);
    }
    const findAllCount = async () => {
        const productsCount = await AxiosInstance.get('/products/find-count?searchText=&page=1&size=10');
        setProductsCount(productsCount.data);

        const customerCount = await AxiosInstance.get('/customers/find-count?searchText=&page=1&size=10');
        setCustomerCount(customerCount.data);

        const orderCount = await AxiosInstance.get('/orders/find-count?searchText=&page=1&size=10');
        setOrderCount(orderCount.data);

        const income = await AxiosInstance.get('/orders/find-all-income?searchText=&page=1&size=10');
        setIncome(income.data);
    }

    return (
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/business-partners-shaking-hands-agreement_53876-25164.jpg?w=360&t=st=1703657749~exp=1703658349~hmac=8c961dba89ed5ab7792cf333b9d54ddc3e0547c9f3a728f39479f69d79c12b8e'
                            description='This is a wider card'
                            title='Customers'
                            value={customerCount}
                            key={1}/>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/premium-psd/glossy-cosmetic-pump-bottle-branding-mockup_47987-10791.jpg?w=360'
                            description='This is a wider card '
                            title='Products'
                            value={productsCount}
                            key={1}/>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/high-angle-hand-holding-smartphone_23-2149870751.jpg?w=360&t=st=1703658393~exp=1703658993~hmac=62519dc317733eaebf6c38a8e7a678ffdae41a707d131582f3f6edd122afc4ee'
                            description='This is a wider card'
                            title='Order'
                            value={orderCount}
                            key={1}/>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/portrait-cheerful-man-holding-dollar-bills-white-background_1150-63227.jpg?w=360&t=st=1703658317~exp=1703658917~hmac=64166d6f7db08800f55723e2156ea1cbdc8ab4f5e48b3f2d8802ff6f4851994d'
                            description='This is a wider card'
                            title='Income'
                            value={income}
                            key={1}/>
                    </div>

                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="context">
                            <DefaultChart/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        {products.map((prod,index)=>(
                            <MinQtyCard name={prod.name} image={prod.image} description={prod.description} key={index}/>
                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home;