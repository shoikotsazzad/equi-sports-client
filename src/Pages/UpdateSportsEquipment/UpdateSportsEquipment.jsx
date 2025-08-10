import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateSportsEquipment = () => {

    const equipment = useLoaderData();
    const {
        _id,
        item,
        category,
        description,
        price,
        rating,
        stock,
        photo
    } = equipment;

    const handleUpdateSportsEquipment = (event) => {
            event.preventDefault();
            const form = event.target;
            const item = form.item.value;
            const category = form.category.value;
            const description = form.description.value;
            const price = form.price.value;
            const rating = form.rating.value;
            const stock = form.stock.value;
            const photo = form.photo.value;
    
            const updatedEquipment = {
                item,
                category,
                description,
                price,
                rating,
                stock,
                photo
            };
    
            console.log(updatedEquipment);
    
            // send this data to the backend or API
            fetch(`https://equi-sports-server-zeta.vercel.app/sports/${_id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEquipment),
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.modifiedCount){
                    Swal.fire({
                        title: 'Success!!!',
                        text: 'Product Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      })
                }
            })
        }


    return (
        <div className="bg-[#9eaf80] p-24 ">
            <h1 className="md:text-5xl md:font-extrabold text-center md:p-14">Update Sports Equipment: {item}</h1>
            <form onSubmit={handleUpdateSportsEquipment}>
                {/* Item and Category form row */}
                <div className="md:flex md:gap-4 md:mb-8">
                    <div className="form-control text-center md:w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Item Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="item" defaultValue={item} placeholder="Item Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Category Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="category" defaultValue={category} placeholder="Category Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/*Description and Price form row */}
                <div className="md:flex md:gap-4 md:mb-8">
                    <div className="form-control text-center md:w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="description" defaultValue={description} placeholder="Description" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="price" defaultValue={price} placeholder="Price" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Rating and Stock form row */}
                <div className="md:flex md:gap-4 md:mb-8">
                    <div className="form-control text-center md:w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Rating</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="rating" defaultValue={rating} placeholder="Rating" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Stock Status</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="stock" defaultValue={stock} placeholder="Stock Status" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Image form row */}
                <div className="md:mb-8">
                    <div className="form-control text-center md:w-full">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" defaultValue={photo} placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>  
                </div>
                {/* Submit Button */}
                <input type="submit" value="Update Sports Equipment" className="btn btn-block" />
            </form>
        </div>
    );
};

export default UpdateSportsEquipment;