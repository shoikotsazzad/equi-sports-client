import Swal from 'sweetalert2'

const AddSportsEquipment = () => {

    const handleAddSportsEquipment = (event) => {
        event.preventDefault();
        const form = event.target;
        const item = form.item.value;
        const category = form.category.value;
        const description = form.description.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const stock = form.stock.value;
        const photo = form.photo.value;

        const newEquipment = {
            item,
            category,
            description,
            price,
            rating,
            stock,
            photo,
        };

        console.log(newEquipment);

        // send this data to the backend or API
        fetch('https://equi-sports-server-zeta.vercel.app/sports',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEquipment),
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!!!',
                    text: 'Product added successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
            }
        })
    }
    return (
        <div className="bg-[#9eaf80] p-24 ">
            <h1 className="md:text-5xl md:font-extrabold text-center md:p-14">Add Sports Equipment</h1>
            <form onSubmit={handleAddSportsEquipment}>
                {/* Item and Category form row */}
                <div className="md:flex md:gap-4 md:mb-8">
                    <div className="form-control text-center md:w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Item Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="item" placeholder="Item Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Category Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="category" placeholder="Category Name" className="input input-bordered w-full" />
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
                            <input type="text" name="description" placeholder="Description" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="price" placeholder="Price" className="input input-bordered w-full" />
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
                            <input type="text" name="rating" placeholder="Rating" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control text-center w-1/2">
                        <label className="label">
                            <span className="label-text md:font-bold text-white">Stock Status</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="stock" placeholder="Stock Status" className="input input-bordered w-full" />
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
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>  
                </div>
                {/* Submit Button */}
                <input type="submit" value="Add Sports Equipment" className="btn btn-block" />
            </form>
        </div>
    );
};

export default AddSportsEquipment;