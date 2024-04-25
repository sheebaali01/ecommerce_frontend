import { ChangeEvent, useState,FormEvent } from 'react'
import AdminSidebar from "../../../components/admin/admin-sidebar";
import { FaTrash } from 'react-icons/fa';
import { Skeleton } from '../../../components/loader';
import { server } from '../../../redux/store';

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const ProductManagement = () => {

    const [name,setName] = useState<string>("Puma Shoes");
    const [price,setPrice] = useState<number>(2000);
    const [stock,setStock] = useState<number>(10);
    const [photo,setPhoto] = useState<string>(img);

    const [nameUpdate,setNameUpdate] = useState<string>(name);
    const [priceUpdate,setPriceUpdate] = useState<number>(price);
    const [stockUpdate,setStockUpdate] = useState<number>(stock);
    const [photoUpdate,setPhotoUpdate] = useState<string>(photo);
    
    

    const changeImageHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        const file:File|undefined = e.target.files?.[0];
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onload = () =>{
                if(typeof reader.result==="string"){
                    setPhotoUpdate(reader.result);
                }
            }
        }

    }

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName(nameUpdate);
        setPrice(priceUpdate);
        setStock(stockUpdate);
        setPhoto(photoUpdate);

    }
    const deleteHandler = async () => {

    }

    return (
        <div className="admin-container">
          <AdminSidebar />
          <main className="product-management">
            {/* {isLoading ? (
              <Skeleton length={20} />
            ) : (
              <> */}
                <section>
                  <strong>ID - hjhjhjhj</strong>
                  <img src={`${server}/${photo}`} alt="Product" />
                  <p>{name}</p>
                  {stock > 0 ? (
                    <span className="green">{stock} Available</span>
                  ) : (
                    <span className="red"> Not Available</span>
                  )}
                  <h3>₹{price}</h3>
                </section>
                <article>
                  <button className="product-delete-btn" onClick={deleteHandler}>
                    <FaTrash />
                  </button>
                  <form onSubmit={submitHandler}>
                    <h2>Manage</h2>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={nameUpdate}
                        onChange={(e) => setNameUpdate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Price</label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={priceUpdate}
                        onChange={(e) => setPriceUpdate(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label>Stock</label>
                      <input
                        type="number"
                        placeholder="Stock"
                        value={stockUpdate}
                        onChange={(e) => setStockUpdate(Number(e.target.value))}
                      />
                    </div>
    
                    {/* <div>
                      <label>Category</label>
                      <input
                        type="text"
                        placeholder="eg. laptop, camera etc"
                        value={categoryUpdate}
                        onChange={(e) => setCategoryUpdate(e.target.value)}
                      />
                    </div> */}
    
                    <div>
                      <label>Photo</label>
                      <input type="file" onChange={changeImageHandler} />
                    </div>
    
                    {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                    <button type="submit">Update</button>
                  </form>
                </article>
              {/* </> */}
            
          </main>
        </div>
      );
}

export default ProductManagement